"use client"

import { useState, useCallback } from "react"
import { type Message, MessageRole } from "@/types/chat"
import { apiService } from "@/services/api-service"

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [conversationId, setConversationId] = useState<string | null>(null)

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
          // TODO: FASTAPI INTEGRATION
          // This handles file uploads to your FastAPI backend
          // The apiService.sendConversationMessageWithFile method should be updated
          // to call your FastAPI file upload endpoint
          const formData = new FormData()
          formData.append("query", content)
          formData.append("file", file)
          if (conversationId) {
            formData.append("conversation_id", conversationId)
          }

          response = await apiService.sendConversationMessageWithFile(formData)
        } else {
          // TODO: FASTAPI INTEGRATION
          // This sends regular text messages to your FastAPI backend
          // The apiService.sendConversationMessage method should be updated
          // to call your FastAPI conversation endpoint
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
    [conversationId],
  )

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    conversationId,
  }
}
