"use client"

import { useI18n } from "@/lib/i18n/i18n-context"

export function LoadingIndicator() {
  const { t } = useI18n()

  return (
    <div className="flex flex-col items-center justify-center py-4 gap-2">
      <div className="flex space-x-1">
        <div
          className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"
          style={{ animationDelay: "0s" }}
        ></div>
        <div
          className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.2s" }}
        ></div>
        <div
          className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.4s" }}
        ></div>
      </div>
      <span className="text-sm text-muted-foreground">{t("common.loading")}</span>
    </div>
  )
}
