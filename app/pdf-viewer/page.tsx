"use client"

import { useState } from "react"
import { PDFViewer } from "@/components/pdf/pdf-viewer"
import { PDFComparison } from "@/components/pdf/pdf-comparison"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import type { Highlight } from "@/types/pdf"
import { useI18n } from "@/lib/i18n/i18n-context"

// Mock highlights for demonstration
const mockHighlights1: Highlight[] = [
  { page: 1, x: 50, y: 100, width: 300, height: 20, text: "This is a highlighted text in document 1" },
  { page: 1, x: 50, y: 150, width: 250, height: 20, text: "Another highlight in document 1" },
]

const mockHighlights2: Highlight[] = [
  { page: 1, x: 50, y: 100, width: 300, height: 20, text: "This is a highlighted text in document 2" },
  { page: 1, x: 50, y: 200, width: 200, height: 20, text: "A different highlight in document 2" },
]

export default function PDFViewerPage() {
  const [pdfUrl1, setPdfUrl1] = useState<string>("/placeholder.svg?height=800&width=600&text=Mock+PDF+1")
  const [pdfUrl2, setPdfUrl2] = useState<string>("/placeholder.svg?height=800&width=600&text=Mock+PDF+2")
  const { t } = useI18n()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 bg-slate-50 dark:bg-slate-900">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">{t("pdf.documentViewer")}</h1>

        <Tabs defaultValue="single" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="single">{t("pdf.singleView")}</TabsTrigger>
            <TabsTrigger value="comparison">{t("pdf.comparisonView")}</TabsTrigger>
          </TabsList>

          <TabsContent value="single" className="w-full">
            <Card className="bg-slate-100 dark:bg-slate-800 mb-4">
              <CardHeader>
                <CardTitle>{t("pdf.singleView")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-4">
                  <Input
                    placeholder="Enter PDF URL"
                    value={pdfUrl1}
                    onChange={(e) => setPdfUrl1(e.target.value)}
                    className="flex-1"
                  />
                  <Button onClick={() => setPdfUrl1("/placeholder.svg?height=800&width=600&text=Mock+PDF+1")}>
                    Reset
                  </Button>
                </div>

                <div className="h-[600px]">
                  <PDFViewer url={pdfUrl1} highlights={mockHighlights1} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="w-full">
            <Card className="bg-slate-100 dark:bg-slate-800 mb-4">
              <CardHeader>
                <CardTitle>{t("pdf.comparisonView")}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("pdf.document")} 1</label>
                    <Input placeholder="Enter PDF URL 1" value={pdfUrl1} onChange={(e) => setPdfUrl1(e.target.value)} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">{t("pdf.document")} 2</label>
                    <Input placeholder="Enter PDF URL 2" value={pdfUrl2} onChange={(e) => setPdfUrl2(e.target.value)} />
                  </div>
                </div>

                <div className="h-[600px]">
                  <PDFComparison
                    url1={pdfUrl1}
                    url2={pdfUrl2}
                    title1="Document 1"
                    title2="Document 2"
                    highlights1={mockHighlights1}
                    highlights2={mockHighlights2}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
