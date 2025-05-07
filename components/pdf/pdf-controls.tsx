"use client"

import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Download, Maximize2, Minimize2 } from "lucide-react"
import { useState } from "react"
import { useI18n } from "@/lib/i18n/i18n-context"

interface PDFControlsProps {
  pageNumber: number
  numPages: number | null
  scale: number
  onZoomIn: () => void
  onZoomOut: () => void
  onPrevPage: () => void
  onNextPage: () => void
  onDownload: () => void
  pdfUrl: string
}

export function PDFControls({
  pageNumber,
  numPages,
  scale,
  onZoomIn,
  onZoomOut,
  onPrevPage,
  onNextPage,
  onDownload,
  pdfUrl,
}: PDFControlsProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const { t } = useI18n()

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true)
        })
        .catch((err) => {
          console.error(`Error attempting to enable fullscreen: ${err.message}`)
        })
    } else {
      if (document.exitFullscreen) {
        document
          .exitFullscreen()
          .then(() => {
            setIsFullscreen(false)
          })
          .catch((err) => {
            console.error(`Error attempting to exit fullscreen: ${err.message}`)
          })
      }
    }
  }

  return (
    <div className="flex items-center justify-between p-2 bg-slate-200 dark:bg-slate-700 rounded-t-lg">
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="icon" onClick={onZoomOut} disabled={scale <= 0.5} title={t("pdf.zoomOut")}>
          <ZoomOut className="h-4 w-4" />
          <span className="sr-only">{t("pdf.zoomOut")}</span>
        </Button>

        <div className="w-24 hidden sm:block">
          <Slider
            value={[scale * 100]}
            min={50}
            max={200}
            step={10}
            onValueChange={(value) => {
              const newScale = value[0] / 100
              if (newScale >= 0.5 && newScale <= 2) {
                onZoomIn()
              } else if (newScale < 0.5) {
                onZoomOut()
              }
            }}
          />
        </div>

        <Button variant="outline" size="icon" onClick={onZoomIn} disabled={scale >= 2} title={t("pdf.zoomIn")}>
          <ZoomIn className="h-4 w-4" />
          <span className="sr-only">{t("pdf.zoomIn")}</span>
        </Button>

        <span className="text-sm ml-2 hidden sm:inline-block">{Math.round(scale * 100)}%</span>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={onPrevPage}
          disabled={pageNumber <= 1}
          title={t("pdf.previousPage")}
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="sr-only">{t("pdf.previousPage")}</span>
        </Button>

        <span className="text-sm">
          {pageNumber} / {numPages || "?"}
        </span>

        <Button
          variant="outline"
          size="icon"
          onClick={onNextPage}
          disabled={!numPages || pageNumber >= numPages}
          title={t("pdf.nextPage")}
        >
          <ChevronRight className="h-4 w-4" />
          <span className="sr-only">{t("pdf.nextPage")}</span>
        </Button>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleFullscreen}
          title={isFullscreen ? t("pdf.exitFullscreen") : t("pdf.enterFullscreen")}
        >
          {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          <span className="sr-only">{isFullscreen ? t("pdf.exitFullscreen") : t("pdf.enterFullscreen")}</span>
        </Button>

        <Button variant="outline" size="icon" onClick={onDownload} title={t("pdf.download")}>
          <Download className="h-4 w-4" />
          <span className="sr-only">{t("pdf.download")}</span>
        </Button>
      </div>
    </div>
  )
}
