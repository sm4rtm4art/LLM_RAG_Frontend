"use client"
import { useQuery } from "@/hooks/use-query"
import { LoadingIndicator } from "../ui/loading-indicator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { MarkdownRenderer } from "../ui/markdown-renderer"
import { RetrievedDocuments } from "../documents/retrieved-documents"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useI18n } from "@/lib/i18n/i18n-context"
import { QueryInput } from "./query-input"

export function QueryInterface() {
  const { sendQuery, response, isLoading, error } = useQuery()
  const { t } = useI18n()

  const handleSubmit = (query: string) => {
    if (query.trim() && !isLoading) {
      sendQuery(query)
    }
  }

  return (
    <div className="space-y-6">
      <QueryInput onSubmit={handleSubmit} isLoading={isLoading} />

      {isLoading && (
        <div className="py-8 flex justify-center">
          <LoadingIndicator />
        </div>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {response && (
        <div className="space-y-6">
          <Card className="bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
            <CardHeader>
              <CardTitle>{t("common.response")}</CardTitle>
            </CardHeader>
            <CardContent>
              <MarkdownRenderer content={response.response} />
            </CardContent>
          </Card>

          {response.retrievedDocuments && response.retrievedDocuments.length > 0 && (
            <Card className="bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700">
              <CardHeader>
                <CardTitle>
                  {t("common.sources")} ({response.retrievedDocuments.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RetrievedDocuments documents={response.retrievedDocuments} />
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
