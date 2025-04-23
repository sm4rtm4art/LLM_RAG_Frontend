"use client"

import type React from "react"

import { useRef, useState } from "react"
import { useI18n } from "@/lib/i18n/i18n-context"
import { Button } from "@/components/ui/button"
import { Upload, Check, File } from "lucide-react"

interface FileUploaderProps {
  onFileUpload: (file: File) => void
  fileSelected: boolean
  fileName?: string
}

export function FileUploader({ onFileUpload, fileSelected, fileName }: FileUploaderProps) {
  const { t } = useI18n()
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      onFileUpload(file)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      onFileUpload(file)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
        isDragging
          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
          : fileSelected
            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
            : "border-slate-300 dark:border-slate-600"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept=".txt,.md,.pdf,.doc,.docx"
      />

      {fileSelected ? (
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
            <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <p className="text-sm font-medium">{t("common.fileUploaded")}</p>
            <p className="text-xs text-muted-foreground flex items-center justify-center gap-1 mt-1">
              <File className="h-3 w-3" />
              {fileName}
            </p>
          </div>
          <Button size="sm" variant="outline" onClick={handleButtonClick}>
            {t("common.uploadFile")}
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <div className="h-10 w-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
            <Upload className="h-5 w-5 text-slate-500" />
          </div>
          <p className="text-sm text-muted-foreground">{t("common.dragAndDrop")}</p>
          <Button size="sm" onClick={handleButtonClick}>
            {t("common.uploadFile")}
          </Button>
        </div>
      )}
    </div>
  )
}
