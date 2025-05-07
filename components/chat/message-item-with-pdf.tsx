"use client"

import { useState } from "react"
import { type Message, MessageRole } from "@/types/chat"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, User, Bot, ThumbsUp, ThumbsDown, FileText } from "lucide-react"
import { cn } from "@/lib/utils"
import { MarkdownRenderer } from "../ui/markdown-renderer"
import { RetrievedDocuments } from "../documents/retrieved-documents"
import { PDFDocumentViewer } from "../pdf/pdf-document-viewer"
import { useI18n } from "@/lib/i18n/i18n-context"

interface MessageItemWithPDFProps {
  message: Message
  isLastMessage: boolean
}

export function MessageItemWithPDF({ message, isLastMessage }: MessageItemWithPDFProps) {
  const [showDocuments, setShowDocuments] = useState(isLastMessage)
  const [showPdfViewer, setShowPdfViewer] = useState(false)
  const { t } = useI18n()

  const isUser = message.role === MessageRole.USER
  const hasPdfDocuments = message.retrievedDocuments?.some((doc) => {
    const metadata = doc.metadata || {}
    const filename = metadata.filename || ""
    return filename.toLowerCase().endsWith(".pdf")
  })

  return (
    <div className={cn("flex flex-col", isUser ? "items-end" : "items-start")}>
      <div className="flex items-start gap-3 max-w-[80%]">
        <Avatar className={cn("h-8 w-8 rounded-full", isUser ? "order-2 bg-emerald-600" : "bg-blue-600")}>
          {isUser ? <User className="h-5 w-5 text-white" /> : <Bot className="h-5 w-5 text-white" />}
        </Avatar>

        <div
          className={cn(
            "rounded-lg p-4",
            isUser
              ? "bg-emerald-100 dark:bg-emerald-900 text-emerald-950 dark:text-emerald-50 order-1"
              : "bg-blue-100 dark:bg-blue-900 text-blue-950 dark:text-blue-50",
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap">{message.content}</p>
          ) : (
            <MarkdownRenderer content={message.content} />
          )}

          {!isUser && message.retrievedDocuments && message.retrievedDocuments.length > 0 && (
            <div className="mt-2 pt-2 border-t border-blue-200 dark:border-blue-700">
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-1 text-xs hover:bg-blue-200 dark:hover:bg-blue-800"
                  onClick={() => setShowDocuments(!showDocuments)}
                >
                  {showDocuments ? (
                    <>
                      <ChevronUp className="h-3 w-3" />
                      {t("common.hideSources")} ({message.retrievedDocuments.length})
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3 w-3" />
                      {t("common.showSources")} ({message.retrievedDocuments.length})
                    </>
                  )}
                </Button>

                {hasPdfDocuments && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-1 text-xs hover:bg-blue-200 dark:hover:bg-blue-800"
                    onClick={() => setShowPdfViewer(!showPdfViewer)}
                  >
                    <FileText className="h-3 w-3 mr-1" />
                    {showPdfViewer ? t("pdf.hidePdfViewer") : t("pdf.showPdfViewer")}
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {!isUser && message.retrievedDocuments && showDocuments && (
        <div className="ml-11 mt-2 w-full">
          <RetrievedDocuments documents={message.retrievedDocuments} />
        </div>
      )}

      {!isUser && message.retrievedDocuments && showPdfViewer && hasPdfDocuments && (
        <div className="ml-11 mt-2 w-full h-[600px]">
          <PDFDocumentViewer documents={message.retrievedDocuments} />
        </div>
      )}

      {!isUser && isLastMessage && (
        <div className="ml-11 mt-2 flex items-center gap-2">
          <span className="text-sm text-muted-foreground">{t("chat.feedbackQuestion")}</span>
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ThumbsUp className="h-4 w-4" />
            <span className="sr-only">{t("common.helpful")}</span>
          </Button>
          <Button variant="outline" size="icon" className="h-7 w-7">
            <ThumbsDown className="h-4 w-4" />
            <span className="sr-only">{t("common.notHelpful")}</span>
          </Button>
        </div>
      )}
    </div>
  )
}
