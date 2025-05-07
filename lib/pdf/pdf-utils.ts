import type { Highlight } from "@/types/pdf"
import type { RetrievedDocument } from "@/types/documents"

/**
 * Extracts highlight information from retrieved documents
 * @param documents The retrieved documents from the RAG system
 * @returns A record mapping filenames to arrays of highlights
 */
export function extractHighlightsFromRetrievedDocuments(documents: RetrievedDocument[]): Record<string, Highlight[]> {
  const highlights: Record<string, Highlight[]> = {}

  documents.forEach((doc) => {
    const metadata = doc.metadata || {}
    const filename = metadata.filename || ""

    // Skip if not a PDF or no bounding box information
    if (!filename.toLowerCase().endsWith(".pdf") || !metadata.additional_metadata) {
      return
    }

    const boundingBoxes = metadata.additional_metadata.bounding_boxes || []
    const page = metadata.additional_metadata.page || 1

    if (!highlights[filename]) {
      highlights[filename] = []
    }

    // Process each bounding box
    boundingBoxes.forEach((box: any) => {
      if (box && typeof box === "object") {
        const highlight: Highlight = {
          page: page,
          x: box.x || 0,
          y: box.y || 0,
          width: box.width || 0,
          height: box.height || 0,
          text: doc.content || "",
          confidence: metadata.confidence || 0,
        }

        highlights[filename].push(highlight)
      }
    })
  })

  return highlights
}

/**
 * Converts a PDF coordinate system to the coordinate system used by react-pdf
 * @param highlight The highlight with PDF coordinates
 * @param pageHeight The height of the PDF page
 * @returns The highlight with adjusted coordinates for react-pdf
 */
export function convertPDFCoordinates(highlight: Highlight, pageHeight: number): Highlight {
  // PDF coordinates start from bottom-left, react-pdf starts from top-left
  return {
    ...highlight,
    y: pageHeight - highlight.y - highlight.height,
  }
}

/**
 * Generates a download URL for a PDF document
 * @param filename The filename of the PDF document
 * @returns The URL to download the PDF
 */
export function getPDFDownloadUrl(filename: string): string {
  return `/api/pdf/download?filename=${encodeURIComponent(filename)}`
}
