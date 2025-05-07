"use client"

import { useState, useRef, useEffect } from "react"
import { Document, Page } from "react-pdf"
import type { PDFDocumentProxy } from "pdfjs-dist/types/src/display/api"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { PDFHighlighter } from "./pdf-highlighter"
import { PDFControls } from "./pdf-controls"
import type { Highlight } from "@/types/pdf"
import { Loader2, AlertCircle } from "lucide-react"
import { useI18n } from "@/lib/i18n/i18n-context"
// Add import for the fallback viewer
import { PDFFallbackViewer } from "./pdf-fallback-viewer"

// Import the worker loader
import { setupPdfWorker } from "@/lib/pdf/pdf-worker-loader"

// Set up the worker
setupPdfWorker()

export interface PDFViewerProps {
  url: string
  highlights?: Highlight[]
  onDocumentLoad?: (pdf: PDFDocumentProxy) => void
  onPageChange?: (pageNumber: number) => void
  initialPage?: number
}

export function PDFViewer({ url, highlights = [], onDocumentLoad, onPageChange, initialPage = 1 }: PDFViewerProps) {
  const [numPages, setNumPages] = useState<number | null>(null)
  const [pageNumber, setPageNumber] = useState<number>(initialPage)
  const [scale, setScale] = useState<number>(1.0)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const { t } = useI18n()
  // Add a state to track if PDF.js failed to load
  const [pdfJsError, setPdfJsError] = useState<boolean>(false)

  // Filter highlights for the current page
  const currentPageHighlights = highlights.filter((highlight) => highlight.page === pageNumber)

  // TODO: FASTAPI INTEGRATION
  // You might want to fetch highlights from your FastAPI backend based on the current page
  // Example:
  // useEffect(() => {
  //   async function fetchHighlights() {
  //     try {
  //       const fetchedHighlights = await apiService.getPdfHighlights(url, pageNumber);
  //       setCurrentPageHighlights(fetchedHighlights);
  //     } catch (error) {
  //       console.error("Error fetching highlights:", error);
  //     }
  //   }
  //   if (url && pageNumber) {
  //     fetchHighlights();
  //   }
  // }, [url, pageNumber]);

  function onDocumentLoadSuccess({ numPages, ...pdf }: PDFDocumentProxy & { numPages: number }) {
    setNumPages(numPages)
    setIsLoading(false)
    if (onDocumentLoad) {
      onDocumentLoad(pdf as PDFDocumentProxy)
    }

    // TODO: FASTAPI INTEGRATION
    // You might want to log document views or fetch additional document metadata
    // Example:
    // async function logDocumentView(documentUrl: string) {
    //   try {
    //     await apiService.logPdfView(documentUrl);
    //   } catch (error) {
    //     console.error("Error logging document view:", error);
    //   }
    // }
    // logDocumentView(url);
  }

  function changePage(offset: number) {
    const newPage = pageNumber + offset
    if (newPage >= 1 && newPage <= (numPages || 1)) {
      setPageNumber(newPage)
      if (onPageChange) {
        onPageChange(newPage)
      }
    }
  }

  function handleZoom(newScale: number) {
    setScale(newScale)
  }

  useEffect(() => {
    if (initialPage && initialPage !== pageNumber && numPages && initialPage <= numPages) {
      setPageNumber(initialPage)
    }
  }, [initialPage, numPages])

  // In the return statement, add a condition to show the fallback viewer
  return (
    <div className="flex flex-col h-full">
      {pdfJsError ? (
        <PDFFallbackViewer url={url} />
      ) : (
        <>
          <PDFControls
            pageNumber={pageNumber}
            numPages={numPages}
            scale={scale}
            onZoomIn={() => handleZoom(scale + 0.2)}
            onZoomOut={() => handleZoom(Math.max(0.5, scale - 0.2))}
            onPrevPage={() => changePage(-1)}
            onNextPage={() => changePage(1)}
            onDownload={() => window.open(url, "_blank")}
            pdfUrl={url}
          />

          <Card className="flex-1 overflow-auto bg-slate-100 dark:bg-slate-800 relative">
            <div ref={containerRef} className="min-h-full flex justify-center p-4">
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-200/50 dark:bg-slate-700/50 z-10">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
                </div>
              )}

              {error && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-200/50 dark:bg-slate-700/50 z-10">
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-md shadow-lg max-w-md text-center">
                    <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
                    <h3 className="text-lg font-semibold mb-2">{t("pdf.errorLoading")}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{error}</p>
                    <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
                      {t("common.retry")}
                    </Button>
                  </div>
                </div>
              )}

              <Document
                file={url}
                onLoadSuccess={onDocumentLoadSuccess}
                onLoadError={(err) => {
                  console.error("Error loading PDF:", err)
                  setError(t("pdf.failedToLoad"))
                  setIsLoading(false)
                  setPdfJsError(true)
                }}
                loading={null}
              >
                <div className="relative">
                  <Page
                    pageNumber={pageNumber}
                    scale={scale}
                    renderTextLayer={true}
                    renderAnnotationLayer={true}
                    loading={null}
                    onRenderError={() => setPdfJsError(true)}
                  />
                  <PDFHighlighter highlights={currentPageHighlights} scale={scale} />
                </div>
              </Document>
            </div>
          </Card>
        </>
      )}
    </div>
  )
}
