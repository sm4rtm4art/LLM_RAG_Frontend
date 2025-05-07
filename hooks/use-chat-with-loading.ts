"use client"

import { useState, useCallback } from "react"
import { type Message, MessageRole } from "@/types/chat"
import { useApiWithLoading } from "@/hooks/use-api-with-loading"

export function useChatWithLoading() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [conversationId, setConversationId] = useState<string | null>(null)
  const apiService = useApiWithLoading()

  const sendMessage = useCallback(
    async (content: string, file?: File) => {
      setIsLoading(true)
      setError(null)

      // Add user message immediately
      const userMessage: Message = {
        role: MessageRole.USER,
        content,
        hasAttachment: !!file,
      }

      setMessages((prev) => [...prev, userMessage])

      try {
        let response

        if (file) {
          // Handle file upload with loading states
          const formData = new FormData()
          formData.append("query", content)
          formData.append("file", file)
          if (conversationId) {
            formData.append("conversation_id", conversationId)
          }

          response = await apiService.sendConversationMessageWithFile(formData)
        } else {
          // Handle regular message with loading states
          response = await apiService.sendConversationMessage({
            query: content,
            conversation_id: conversationId,
            top_k: 3,
          })
        }

        // Update conversation ID
        setConversationId(response.conversation_id)

        // Add assistant message
        const assistantMessage: Message = {
          role: MessageRole.ASSISTANT,
          content: response.response,
          retrievedDocuments: response.retrieved_documents,
        }

        setMessages((prev) => [...prev, assistantMessage])
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while sending your message")
      } finally {
        setIsLoading(false)
      }
    },
    [conversationId, apiService],
  )

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    conversationId,
  }
}
