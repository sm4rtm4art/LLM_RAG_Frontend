"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Download, ExternalLink, FileText } from "lucide-react"
import { useI18n } from "@/lib/i18n/i18n-context"

interface SimpleDocumentViewerProps {
  documentId: string
  title: string
  filename: string
  onBack: () => void
}

export function SimpleDocumentViewer({ documentId, title, filename, onBack }: SimpleDocumentViewerProps) {
  const { t } = useI18n()
  const [isLoading, setIsLoading] = useState(false)

  // In a real app, this would be a real URL to the document
  const documentUrl = `/api/documents/view/${documentId}`
  const downloadUrl = `/api/documents/download/${documentId}`

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          {t("knowledgeBase.backToArticle")}
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(documentUrl, "_blank")}
            className="flex items-center gap-1"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="hidden sm:inline">{t("pdf.openInNewTab")}</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(downloadUrl, "_blank")}
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">{t("pdf.download")}</span>
          </Button>
        </div>
      </div>

      <Card className="h-[600px] flex flex-col">
        <CardHeader className="py-3">
          <CardTitle className="flex items-center gap-2 text-base">
            <FileText className="h-5 w-5" />
            {title || filename}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center p-8 text-center">
          <div className="max-w-md">
            <FileText className="h-16 w-16 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">{t("knowledgeBase.documentPreview")}</h3>
            <p className="text-muted-foreground mb-6">{t("knowledgeBase.documentPreviewMessage")}</p>
            <div className="flex justify-center gap-4">
              <Button onClick={() => window.open(documentUrl, "_blank")} className="flex items-center gap-2">
                <ExternalLink className="h-4 w-4" />
                {t("pdf.openInNewTab")}
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(downloadUrl, "_blank")}
                className="flex items-center gap-2"
              >
                <Download className="h-4 w-4" />
                {t("pdf.download")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
