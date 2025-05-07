export interface Highlight {
  page: number
  x: number
  y: number
  width: number
  height: number
  text?: string
  confidence?: number
}

export interface PDFDocument {
  url: string
  filename: string
  source?: string
}

export interface PDFComparisonResult {
  differences: PDFDifference[]
  similarityScore: number
}

export interface PDFDifference {
  page: number
  type: "addition" | "deletion" | "modification"
  boundingBox: {
    x: number
    y: number
    width: number
    height: number
  }
  text?: string
}
