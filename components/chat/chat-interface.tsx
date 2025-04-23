"use client"

import { useRef, useEffect } from "react"
import { ChatInput } from "./chat-input"
import { MessageList } from "./message-list"
import { useChat } from "@/hooks/use-chat"
import { LoadingIndicator } from "../ui/loading-indicator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useI18n } from "@/lib/i18n/i18n-context"

export function ChatInterface() {
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { messages, isLoading, error, sendMessage, conversationId } = useChat()
  const { t } = useI18n()

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] bg-slate-100 dark:bg-slate-800 rounded-lg border shadow-sm">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-muted-foreground">
              <h3 className="text-lg font-medium">{t("chat.welcome")}</h3>
              <p className="mt-2">{t("chat.welcomeMessage")}</p>
            </div>
          </div>
        ) : (
          <MessageList messages={messages} />
        )}

        {isLoading && <LoadingIndicator />}

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div ref={messagesEndRef} />
      </div>

      <div className="border-t p-4 bg-slate-50 dark:bg-slate-900 rounded-b-lg">
        <ChatInput onSendMessage={sendMessage} isLoading={isLoading} conversationId={conversationId} />
      </div>
    </div>
  )
}
