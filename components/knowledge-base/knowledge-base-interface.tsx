"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useI18n } from "@/lib/i18n/i18n-context"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"
import { KnowledgeArticle } from "./knowledge-article"
import { KnowledgeArticleList } from "./knowledge-article-list"
import { KnowledgeFeedbackForm } from "./knowledge-feedback-form"
import { SimpleDocumentViewer } from "./simple-document-viewer"
import { mockKnowledgeArticles } from "@/lib/mock-data/knowledge-articles"
import type { KnowledgeArticleType } from "@/types/knowledge-base"

export function KnowledgeBaseInterface() {
  const { t } = useI18n()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [articles, setArticles] = useState<KnowledgeArticleType[]>(mockKnowledgeArticles)
  const [filteredArticles, setFilteredArticles] = useState<KnowledgeArticleType[]>(mockKnowledgeArticles)
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticleType | null>(null)
  const [showFeedbackForm, setShowFeedbackForm] = useState(false)
  const [viewingDocument, setViewingDocument] = useState<string | null>(null)

  // Filter articles based on search query and selected category
  useEffect(() => {
    let filtered = [...articles]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (article) =>
          article.title.toLowerCase().includes(query) ||
          article.content.toLowerCase().includes(query) ||
          article.tags.some((tag) => tag.toLowerCase().includes(query)),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter((article) => article.category === selectedCategory)
    }

    setFilteredArticles(filtered)
  }, [searchQuery, selectedCategory, articles])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Search is already handled by the useEffect
  }

  const handleArticleSelect = (article: KnowledgeArticleType) => {
    setSelectedArticle(article)
    setViewingDocument(null)
  }

  const handleBackToList = () => {
    setSelectedArticle(null)
    setShowFeedbackForm(false)
    setViewingDocument(null)
  }

  const handleBackToArticle = () => {
    setViewingDocument(null)
  }

  const handleViewDocument = (documentId: string) => {
    setViewingDocument(documentId)
  }

  const handleFeedbackSubmit = (articleId: string, isHelpful: boolean, comment: string) => {
    // In a real app, this would send the feedback to the server
    console.log("Feedback submitted:", { articleId, isHelpful, comment })
    setShowFeedbackForm(false)
    // Show a thank you message or notification
  }

  // Find the current document being viewed
  const currentDocument = selectedArticle?.documents?.find((doc) => doc.id === viewingDocument)

  return (
    <div className="flex flex-col space-y-4">
      <Card className="bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
        <CardHeader>
          <CardTitle>
            {viewingDocument
              ? currentDocument?.title || currentDocument?.filename || t("knowledgeBase.document")
              : selectedArticle
                ? selectedArticle.title
                : t("knowledgeBase.title")}
          </CardTitle>
          <CardDescription>
            {viewingDocument
              ? t("knowledgeBase.viewingDocument")
              : selectedArticle
                ? t("knowledgeBase.readingArticle")
                : t("knowledgeBase.search")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {viewingDocument && currentDocument ? (
            <SimpleDocumentViewer
              documentId={currentDocument.id}
              title={currentDocument.title || ""}
              filename={currentDocument.filename}
              onBack={handleBackToArticle}
            />
          ) : !selectedArticle ? (
            <>
              <form onSubmit={handleSearch} className="flex gap-2 mb-4">
                <div className="relative flex-1">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={t("common.searchPlaceholder")}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Button type="submit">{t("common.search")}</Button>
              </form>

              <div className="mb-4">
                <h3 className="text-sm font-medium mb-2">{t("common.categories")}</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant={selectedCategory === "all" ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory("all")}
                  >
                    {t("common.allCategories")}
                  </Badge>
                  {Object.keys(t("knowledgeBase.categories")).map((category) => (
                    <Badge
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {t(`knowledgeBase.categories.${category}`)}
                    </Badge>
                  ))}
                </div>
              </div>

              <KnowledgeArticleList articles={filteredArticles} onArticleSelect={handleArticleSelect} />
            </>
          ) : showFeedbackForm ? (
            <KnowledgeFeedbackForm
              articleId={selectedArticle.id}
              onSubmit={handleFeedbackSubmit}
              onCancel={() => setShowFeedbackForm(false)}
            />
          ) : (
            <KnowledgeArticle
              article={selectedArticle}
              onBack={handleBackToList}
              onFeedback={() => setShowFeedbackForm(true)}
              onViewDocument={handleViewDocument}
            />
          )}
        </CardContent>
      </Card>
    </div>
  )
}
