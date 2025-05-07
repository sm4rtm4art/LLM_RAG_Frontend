"use client"

import type { RetrievedDocument } from "@/types/documents"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { FileText, ImageIcon } from "lucide-react"
import { useI18n } from "@/lib/i18n/i18n-context"
import { useState } from "react"

interface RetrievedDocumentsProps {
  documents: RetrievedDocument[]
}

export function RetrievedDocuments({ documents }: RetrievedDocumentsProps) {
  const { t, formatNumber } = useI18n()

  return (
    <Accordion type="multiple" className="w-full">
      {documents.map((doc, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="border-slate-200 dark:border-slate-700">
          <AccordionTrigger className="text-sm hover:bg-slate-200 dark:hover:bg-slate-700 px-3 rounded-md">
            <div className="flex items-center gap-2">
              {isImageContent(doc.content) ? <ImageIcon className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
              <span>{doc.metadata?.source || doc.metadata?.filename || `Document ${index + 1}`}</span>
              {doc.metadata?.confidence && <ConfidenceIndicator confidence={doc.metadata.confidence} />}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="p-3 bg-slate-200/50 dark:bg-slate-700/50 rounded-md text-sm">
              <div className="mb-2 text-xs text-muted-foreground">
                {doc.metadata?.filename && (
                  <span className="mr-2">
                    {t("common.file")}: {doc.metadata.filename}
                  </span>
                )}
                {doc.metadata?.chunk_index !== null && doc.metadata?.chunk_index !== undefined && (
                  <span>
                    {t("common.chunk")}: {doc.metadata.chunk_index}
                  </span>
                )}
              </div>
              {isImageContent(doc.content) ? (
                <DocumentImage src={doc.content} alt={doc.metadata?.filename || "Retrieved image"} />
              ) : (
                <div className="whitespace-pre-wrap">{doc.content}</div>
              )}
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

interface DocumentImageProps {
  src: string
  alt: string
}

function DocumentImage({ src, alt }: DocumentImageProps) {
  const [error, setError] = useState(false)
  const { t } = useI18n()

  if (error) {
    return (
      <div className="flex items-center justify-center h-32 bg-slate-300 dark:bg-slate-600 rounded-md">
        <p className="text-sm text-slate-600 dark:text-slate-300">{t("common.imageLoadError")}</p>
      </div>
    )
  }

  return (
    <div className="my-2">
      <img
        src={src || "/placeholder.svg"}
        alt={alt}
        className="max-w-full h-auto rounded-md"
        onError={() => setError(true)}
        loading="lazy"
      />
    </div>
  )
}

// Helper function to detect if content is an image (base64 or URL)
function isImageContent(content: string): boolean {
  return (
    content.startsWith("data:image") ||
    content.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i) !== null ||
    (content.startsWith("http") && content.match(/\.(jpg|jpeg|png|gif|webp|svg)/i) !== null)
  )
}

interface ConfidenceIndicatorProps {
  confidence: number
}

function ConfidenceIndicator({ confidence }: ConfidenceIndicatorProps) {
  const { formatNumber } = useI18n()

  let color = "bg-red-500"
  if (confidence >= 0.8) {
    color = "bg-green-500"
  } else if (confidence >= 0.5) {
    color = "bg-yellow-500"
  }

  return (
    <Badge variant="outline" className="ml-2">
      <div className={`w-2 h-2 rounded-full ${color} mr-1`} />
      {formatNumber(confidence * 100)}%
    </Badge>
  )
}
