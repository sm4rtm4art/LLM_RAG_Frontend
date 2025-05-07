"use client"

import { useI18n } from "@/lib/i18n/i18n-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, Eye, FileText, File, ImageIcon } from "lucide-react"
import type { DocumentAttachment } from "@/types/knowledge-base"

interface DocumentAttachmentListProps {
  documents: DocumentAttachment[]
  onViewDocument?: (documentId: string) => void
}

export function DocumentAttachmentList({ documents, onViewDocument }: DocumentAttachmentListProps) {
  const { t } = useI18n()

  const getDocumentIcon = (document: DocumentAttachment) => {
    if (document.type === "pdf") return <FileText className="h-5 w-5 text-red-500" />
    if (document.type === "image") return <ImageIcon className="h-5 w-5 text-blue-500" />
    return <File className="h-5 w-5 text-gray-500" />
  }

  const getDocumentTypeLabel = (type: string) => {
    const typeLabels: Record<string, string> = {
      pdf: "PDF",
      doc: "Word",
      docx: "Word",
      xls: "Excel",
      xlsx: "Excel",
      ppt: "PowerPoint",
      pptx: "PowerPoint",
      txt: "Text",
      csv: "CSV",
      image: "Image",
    }
    return typeLabels[type] || type.toUpperCase()
  }

  return (
    <div className="space-y-3">
      {documents.map((document) => (
        <Card key={document.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                {getDocumentIcon(document)}
                <div>
                  <h4 className="text-sm font-medium">{document.title || document.filename}</h4>
                  <p className="text-xs text-muted-foreground">
                    {getDocumentTypeLabel(document.type)} • {formatFileSize(document.size)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {onViewDocument && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onViewDocument(document.id)}
                    className="flex items-center gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    <span className="hidden sm:inline">{t("knowledgeBase.viewDocument")}</span>
                  </Button>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`/api/documents/download/${document.id}`, "_blank")}
                  className="flex items-center gap-1"
                >
                  <Download className="h-4 w-4" />
                  <span className="hidden sm:inline">{t("knowledgeBase.downloadDocument")}</span>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

// Helper function to format file size
function formatFileSize(bytes: number): string {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}
