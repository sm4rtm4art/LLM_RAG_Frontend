import { pdfjs } from "react-pdf"

// This function ensures the PDF.js worker is loaded correctly
export function setupPdfWorker() {
  try {
    // Try to load the worker from the public directory if available
    pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js"
  } catch (error) {
    console.error("Error setting up PDF worker:", error)

    // Fallback to a CDN if the local file is not available
    pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
  }
}
