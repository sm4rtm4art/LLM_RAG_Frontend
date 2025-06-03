"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Paperclip, X, FileText, ImageIcon, File } from "lucide-react"
import { useI18n } from "@/lib/i18n/i18n-context"

interface FileUploadProps {
  onFileSelect: (file: File) => void
  acceptedFileTypes?: string
  maxFileSizeMB?: number
}

export function FileUpload({
  onFileSelect,
  acceptedFileTypes = ".pdf,.txt,.doc,.docx,.jpg,.jpeg,.png",
  maxFileSizeMB = 10,
}: FileUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { t } = useI18n()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file size
    if (file.size > maxFileSizeMB * 1024 * 1024) {
      setError(t("chat.fileTooLarge", { maxSize: maxFileSizeMB }))
      return
    }

    setSelectedFile(file)
    setError(null)
    onFileSelect(file)
  }

  const handleRemoveFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const getFileIcon = (file: File) => {
    const fileType = file.type.split("/")[0]
    if (fileType === "image") return <ImageIcon className="h-4 w-4" />
    if (file.name.endsWith(".pdf")) return <FileText className="h-4 w-4" />
    return <File className="h-4 w-4" />
  }

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept={acceptedFileTypes}
        className="hidden"
        aria-label={t("chat.attachFile")}
      />

      {!selectedFile ? (
        <Button
          type="button"
          variant="outline"
          size="icon"
          onClick={() => fileInputRef.current?.click()}
          title={t("chat.attachFile")}
        >
          <Paperclip className="h-4 w-4" />
          <span className="sr-only">{t("chat.attachFile")}</span>
        </Button>
      ) : (
        <div className="flex items-center gap-2 p-2 bg-slate-100 dark:bg-slate-800 rounded-md">
          {getFileIcon(selectedFile)}
          <span className="text-xs truncate max-w-[150px]">{selectedFile.name}</span>
          <Button type="button" variant="ghost" size="icon" className="h-5 w-5" onClick={handleRemoveFile}>
            <X className="h-3 w-3" />
            <span className="sr-only">{t("common.remove")}</span>
          </Button>
        </div>
      )}

      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  )
}
