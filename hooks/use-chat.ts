'use client';

import { useState, useCallback } from 'react';
import { type Message, MessageRole } from '@/types/chat';
import { apiService } from '@/services/api-service';

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (content: string) => {
      setIsLoading(true);
      setError(null);

      // Add user message immediately
      const userMessage: Message = {
        role: MessageRole.USER,
        content,
      };

      setMessages(prev => [...prev, userMessage]);

      try {
        const response = await apiService.sendConversationMessage({
          query: content,
          conversation_id: conversationId,
          top_k: 3,
        });

        // Update conversation ID
        setConversationId(response.conversation_id);

        // Add assistant message
        const assistantMessage: Message = {
          role: MessageRole.ASSISTANT,
          content: response.response,
          retrievedDocuments: response.retrieved_documents,
        };

        setMessages(prev => [...prev, assistantMessage]);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : 'An error occurred while sending your message'
        );
      } finally {
        setIsLoading(false);
      }
    },
    [conversationId]
  );

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    conversationId,
  };
}
