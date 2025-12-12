"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const PDFViewer = dynamic(() => import("./pdf-viewer").then((mod) => mod.PDFViewer), {
  ssr: false,
  loading: () => <div className="h-full flex items-center justify-center">Loading PDF...</div>,
})

const PDFComparison = dynamic(() => import("./pdf-comparison").then((mod) => mod.PDFComparison), {
  ssr: false,
  loading: () => <div className="h-full flex items-center justify-center">Loading comparison...</div>,
})
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import type { Highlight, PDFDocument } from "@/types/pdf"
import { useI18n } from "@/lib/i18n/i18n-context"
import type { RetrievedDocument } from "@/types/documents"
import { extractHighlightsFromRetrievedDocuments } from "@/lib/pdf/pdf-utils"
import { Loader2, AlertCircle, FileText } from "lucide-react"

interface PDFDocumentViewerProps {
  documents?: RetrievedDocument[]
  isLoading?: boolean
  error?: string | null
}

export function PDFDocumentViewer({ documents = [], isLoading = false, error = null }: PDFDocumentViewerProps) {
  const [pdfDocuments, setPdfDocuments] = useState<PDFDocument[]>([])
  const [highlights, setHighlights] = useState<Record<string, Highlight[]>>({})
  const [activeTab, setActiveTab] = useState<string>("single")
  const [selectedDocIndex, setSelectedDocIndex] = useState<number>(0)
  const { t } = useI18n()

  useEffect(() => {
    if (documents && documents.length > 0) {
      // Process documents to extract PDF URLs and highlights
      const processedDocs: PDFDocument[] = documents
        .filter((doc) => {
          // Filter for PDF documents
          const metadata = doc.metadata || {}
          const filename = metadata.filename || ""
          return filename.toLowerCase().endsWith(".pdf")
        })
        .map((doc) => {
          const metadata = doc.metadata || {}
          return {
            url: `/api/pdf/view?filename=${encodeURIComponent(metadata.filename || "")}`,
            filename: metadata.filename || "document.pdf",
            source: metadata.source || "unknown",
          }
        })

      setPdfDocuments(processedDocs)

      // Extract highlights from retrieved documents
      const extractedHighlights = extractHighlightsFromRetrievedDocuments(documents)
      setHighlights(extractedHighlights)

      // Set the first document as selected if available
      if (processedDocs.length > 0 && selectedDocIndex >= processedDocs.length) {
        setSelectedDocIndex(0)
      }
    }
  }, [documents])

  // Handle case when no PDF documents are available
  if (!isLoading && pdfDocuments.length === 0) {
    return (
      <Card className="bg-slate-100 dark:bg-slate-800 h-full flex flex-col">
        <CardHeader>
          <CardTitle>{t("pdf.noPDFDocuments")}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <FileText className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <p className="text-muted-foreground">{t("pdf.noPDFDocumentsDescription")}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Handle loading state
  if (isLoading) {
    return (
      <Card className="bg-slate-100 dark:bg-slate-800 h-full flex flex-col">
        <CardHeader>
          <CardTitle>{t("pdf.loadingDocuments")}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <p className="text-muted-foreground">{t("pdf.loadingDocumentsDescription")}</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Handle error state
  if (error) {
    return (
      <Card className="bg-slate-100 dark:bg-slate-800 h-full flex flex-col">
        <CardHeader>
          <CardTitle>{t("common.error")}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button onClick={() => window.location.reload()}>{t("common.retry")}</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-100 dark:bg-slate-800 h-full flex flex-col">
      <CardHeader>
        <CardTitle>{t("pdf.documentViewer")}</CardTitle>
      </CardHeader>
      <CardContent className="p-4 flex-1">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="single">{t("pdf.singleView")}</TabsTrigger>
              {pdfDocuments.length > 1 && <TabsTrigger value="comparison">{t("pdf.comparisonView")}</TabsTrigger>}
            </TabsList>

            {activeTab === "single" && pdfDocuments.length > 1 && (
              <div className="flex space-x-2">
                {pdfDocuments.map((doc, index) => (
                  <Button
                    key={index}
                    variant={selectedDocIndex === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedDocIndex(index)}
                  >
                    {doc.filename.split("/").pop() || `Doc ${index + 1}`}
                  </Button>
                ))}
              </div>
            )}
          </div>

          <div className="flex-1">
            <TabsContent value="single" className="h-full mt-0">
              {pdfDocuments.length > 0 && (
                <PDFViewer
                  url={pdfDocuments[selectedDocIndex].url}
                  highlights={highlights[pdfDocuments[selectedDocIndex].filename] || []}
                />
              )}
            </TabsContent>

            <TabsContent value="comparison" className="h-full mt-0">
              {pdfDocuments.length > 1 && (
                <PDFComparison
                  url1={pdfDocuments[0].url}
                  url2={pdfDocuments[1].url}
                  title1={pdfDocuments[0].filename.split("/").pop() || "Document 1"}
                  title2={pdfDocuments[1].filename.split("/").pop() || "Document 2"}
                  highlights1={highlights[pdfDocuments[0].filename] || []}
                  highlights2={highlights[pdfDocuments[1].filename] || []}
                />
              )}
            </TabsContent>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  )
}
