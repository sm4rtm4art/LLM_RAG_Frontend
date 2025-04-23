"use client"

import { useI18n } from "@/lib/i18n/i18n-context"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import type { KnowledgeArticleType } from "@/types/knowledge-base"

interface KnowledgeArticleListProps {
  articles: KnowledgeArticleType[]
  onArticleSelect: (article: KnowledgeArticleType) => void
}

export function KnowledgeArticleList({ articles, onArticleSelect }: KnowledgeArticleListProps) {
  const { t, formatDate } = useI18n()

  if (articles.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">{t("common.noResults")}</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {articles.map((article) => (
        <Card
          key={article.id}
          className="cursor-pointer hover:shadow-md transition-shadow bg-white dark:bg-slate-900"
          onClick={() => onArticleSelect(article)}
        >
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">{article.title}</CardTitle>
            <CardDescription className="flex items-center gap-1 text-xs">
              <Calendar className="h-3 w-3" />
              {formatDate(new Date(article.date))}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm line-clamp-3">{article.summary || article.content.substring(0, 150)}...</p>
          </CardContent>
          <CardFooter className="pt-0 flex flex-wrap gap-1">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
