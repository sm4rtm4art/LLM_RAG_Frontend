"use client"

import { useState } from "react"
import { PDFViewer } from "./pdf-viewer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Highlight } from "@/types/pdf"
import { useI18n } from "@/lib/i18n/i18n-context"
import type { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api"
import { ArrowLeftRight, Maximize2, Minimize2 } from "lucide-react"

interface PDFComparisonProps {
  url1: string
  url2: string
  title1?: string
  title2?: string
  highlights1?: Highlight[]
  highlights2?: Highlight[]
}

export function PDFComparison({
  url1,
  url2,
  title1 = "Document 1",
  title2 = "Document 2",
  highlights1 = [],
  highlights2 = [],
}: PDFComparisonProps) {
  const [syncedPage, setSyncedPage] = useState<number>(1)
  const [isSyncingPages, setIsSyncingPages] = useState<boolean>(true)
  const [pdf1, setPdf1] = useState<PDFDocumentProxy | null>(null)
  const [pdf2, setPdf2] = useState<PDFDocumentProxy | null>(null)
  const [isFullWidth, setIsFullWidth] = useState<boolean>(false)
  const { t } = useI18n()

  const handlePageChange = (pageNumber: number) => {
    if (isSyncingPages) {
      setSyncedPage(pageNumber)
    }
  }

  const togglePageSync = () => {
    setIsSyncingPages(!isSyncingPages)
  }

  const toggleFullWidth = () => {
    setIsFullWidth(!isFullWidth)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{t("pdf.documentComparison")}</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={togglePageSync}
            className={isSyncingPages ? "bg-blue-100 dark:bg-blue-900/30" : ""}
          >
            <ArrowLeftRight className="h-4 w-4 mr-2" />
            {isSyncingPages ? t("pdf.unsyncPages") : t("pdf.syncPages")}
          </Button>
          <Button variant="outline" size="sm" onClick={toggleFullWidth}>
            {isFullWidth ? <Minimize2 className="h-4 w-4 mr-2" /> : <Maximize2 className="h-4 w-4 mr-2" />}
            {isFullWidth ? t("pdf.splitView") : t("pdf.fullWidth")}
          </Button>
        </div>
      </div>

      {isFullWidth ? (
        <Tabs defaultValue="doc1" className="w-full h-[calc(100%-3rem)]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="doc1">{title1}</TabsTrigger>
            <TabsTrigger value="doc2">{title2}</TabsTrigger>
          </TabsList>
          <TabsContent value="doc1" className="h-full mt-2">
            <PDFViewer
              url={url1}
              highlights={highlights1}
              onDocumentLoad={setPdf1}
              onPageChange={handlePageChange}
              initialPage={syncedPage}
            />
          </TabsContent>
          <TabsContent value="doc2" className="h-full mt-2">
            <PDFViewer
              url={url2}
              highlights={highlights2}
              onDocumentLoad={setPdf2}
              onPageChange={handlePageChange}
              initialPage={syncedPage}
            />
          </TabsContent>
        </Tabs>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[calc(100%-3rem)]">
          <Card className="h-full flex flex-col">
            <CardHeader className="py-3">
              <CardTitle className="text-base">{title1}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1">
              <PDFViewer
                url={url1}
                highlights={highlights1}
                onDocumentLoad={setPdf1}
                onPageChange={handlePageChange}
                initialPage={syncedPage}
              />
            </CardContent>
          </Card>

          <Card className="h-full flex flex-col">
            <CardHeader className="py-3">
              <CardTitle className="text-base">{title2}</CardTitle>
            </CardHeader>
            <CardContent className="p-0 flex-1">
              <PDFViewer
                url={url2}
                highlights={highlights2}
                onDocumentLoad={setPdf2}
                onPageChange={handlePageChange}
                initialPage={syncedPage}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
