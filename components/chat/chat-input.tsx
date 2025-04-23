"use client"

import type React from "react"
import { useState, useRef, useEffect, type FormEvent } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import { useI18n } from "@/lib/i18n/i18n-context"

interface ChatInputProps {
  onSendMessage: (message: string) => void
  isLoading: boolean
  conversationId: string | null
  preserveInput?: boolean
}

export function ChatInput({ onSendMessage, isLoading, conversationId, preserveInput = false }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const { t } = useI18n()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // Focus the textarea when the component mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (message.trim() && !isLoading) {
      onSendMessage(message)
      // Optionally preserve the message (controlled by a prop)
      if (!preserveInput) {
        setMessage("")
      }

      // Re-focus the textarea after submission
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus()
        }
      }, 0)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2">
      <div className="flex-1 relative">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("chat.inputPlaceholder")}
          className="min-h-[60px] resize-none focus-visible:ring-2 focus-visible:ring-blue-500 transition-all"
          disabled={isLoading}
          style={{ caretColor: "#3b82f6" }} // Visible cursor color
        />
        {message.length === 0 && (
          <div className="absolute top-3 left-3 pointer-events-none text-muted-foreground opacity-60">
            <span className="animate-pulse">|</span>
          </div>
        )}
      </div>
      <Button
        type="submit"
        size="icon"
        disabled={isLoading || !message.trim()}
        className="transition-all hover:scale-105"
      >
        <Send className="h-4 w-4" />
        <span className="sr-only">{t("common.send")}</span>
      </Button>
    </form>
  )
}
