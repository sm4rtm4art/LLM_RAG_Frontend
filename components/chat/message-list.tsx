"use client"

import type { Message } from "@/types/chat"
import { MessageItemWithPDF } from "./message-item-with-pdf"

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-6">
      {messages.map((message, index) => (
        <MessageItemWithPDF key={index} message={message} isLastMessage={index === messages.length - 1} />
      ))}
    </div>
  )
}
