"use client"

import { useI18n } from "@/lib/i18n/i18n-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, MessageSquare } from "lucide-react"
import { MarkdownRenderer } from "../ui/markdown-renderer"
import type { KnowledgeArticleType } from "@/types/knowledge-base"
import { DocumentAttachmentList } from "./document-attachment-list"

interface KnowledgeArticleProps {
  article: KnowledgeArticleType
  onBack: () => void
  onFeedback: () => void
  onViewDocument?: (documentId: string) => void
}

export function KnowledgeArticle({ article, onBack, onFeedback, onViewDocument }: KnowledgeArticleProps) {
  const { t, formatDate } = useI18n()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={onBack} className="flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" />
          {t("common.categories")}
        </Button>
        <div className="flex items-center gap-2">
          <Badge variant="outline">{t(`knowledgeBase.categories.${article.category}`)}</Badge>
          <span className="text-xs text-muted-foreground flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDate(new Date(article.date))}
          </span>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
        <div className="flex flex-wrap gap-1 mb-4">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <MarkdownRenderer content={article.content} />
        </div>
      </div>

      {/* Document Attachments Section */}
      {article.documents && article.documents.length > 0 && (
        <div className="pt-4 border-t">
          <h3 className="text-lg font-medium mb-3">{t("knowledgeBase.relatedDocuments")}</h3>
          <DocumentAttachmentList documents={article.documents} onViewDocument={onViewDocument} />
        </div>
      )}

      <div className="pt-4 border-t flex justify-between items-center">
        <div className="text-sm text-muted-foreground">{article.author && `${t("common.by")} ${article.author}`}</div>
        <Button onClick={onFeedback} variant="outline" size="sm" className="flex items-center gap-1">
          <MessageSquare className="h-4 w-4" />
          {t("common.feedback")}
        </Button>
      </div>
    </div>
  )
}
