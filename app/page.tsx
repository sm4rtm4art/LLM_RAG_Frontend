"use client"

import { useState } from "react"
import { ChatInterface } from "@/components/chat/chat-interface"
import { QueryInterface } from "@/components/query/query-interface"
import { KnowledgeBaseInterface } from "@/components/knowledge-base/knowledge-base-interface"
import { TextComparisonInterface } from "@/components/text-comparison/text-comparison-interface"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ThemeProvider } from "@/components/theme-provider"
import { I18nProvider, useI18n } from "@/lib/i18n/i18n-context"

function Home() {
  const [activeTab, setActiveTab] = useState<string>("chat")
  const { t } = useI18n()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-8 bg-slate-50 dark:bg-slate-900">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">{t("appTitle")}</h1>

        <Tabs defaultValue="chat" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="chat">{t("tabs.chat")}</TabsTrigger>
            <TabsTrigger value="query">{t("tabs.query")}</TabsTrigger>
            <TabsTrigger value="knowledgeBase">{t("tabs.knowledgeBase")}</TabsTrigger>
            <TabsTrigger value="textComparison">{t("tabs.textComparison")}</TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="w-full">
            <ChatInterface />
          </TabsContent>

          <TabsContent value="query" className="w-full">
            <QueryInterface />
          </TabsContent>

          <TabsContent value="knowledgeBase" className="w-full">
            <KnowledgeBaseInterface />
          </TabsContent>

          <TabsContent value="textComparison" className="w-full">
            <TextComparisonInterface />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

export default function WrappedHome() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <Home />
      </I18nProvider>
    </ThemeProvider>
  )
}
