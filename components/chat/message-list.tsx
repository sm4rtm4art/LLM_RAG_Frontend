"use client"

import type { Message } from "@/types/chat"
import { MessageItem } from "./message-item"

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="space-y-6">
      {messages.map((message, index) => (
        <MessageItem key={index} message={message} isLastMessage={index === messages.length - 1} />
      ))}
    </div>
  )
}
