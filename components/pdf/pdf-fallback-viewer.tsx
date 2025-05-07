"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Download, ExternalLink } from "lucide-react"
import { useI18n } from "@/lib/i18n/i18n-context"

interface PDFFallbackViewerProps {
  url: string
  filename?: string
}

export function PDFFallbackViewer({ url, filename = "document.pdf" }: PDFFallbackViewerProps) {
  const { t } = useI18n()

  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          {filename}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <FileText className="h-16 w-16 text-slate-400 mb-4" />
        <h3 className="text-lg font-medium mb-2">{t("pdf.viewerNotAvailable")}</h3>
        <p className="text-muted-foreground mb-6 max-w-md">{t("pdf.viewerFallbackMessage")}</p>
        <div className="flex gap-4">
          <Button onClick={() => window.open(url, "_blank")} className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            {t("pdf.openInNewTab")}
          </Button>
          <Button variant="outline" onClick={() => window.open(url, "_blank")} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            {t("pdf.download")}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
