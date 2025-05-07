// TODO: FASTAPI INTEGRATION
// This entire file should be replaced with calls to your FastAPI backend
// The frontend should directly call your FastAPI endpoints instead of these Next.js API routes
// These mock routes are only for development purposes

import { NextResponse } from "next/server"
import type { PDFComparisonResult } from "@/types/pdf"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { file1, file2 } = body

    if (!file1 || !file2) {
      return NextResponse.json({ error: "Both file1 and file2 are required" }, { status: 400 })
    }

    // TODO: FASTAPI INTEGRATION
    // In a real app, this would:
    // 1. Send both files to your FastAPI backend
    // 2. The backend would compare the PDFs using a library like PyPDF2 or pdf-diff
    // 3. Return the comparison results
    // Example FastAPI endpoint: /documents/pdf/compare

    // Mock comparison result
    const mockComparisonResult: PDFComparisonResult = {
      differences: [
        {
          page: 1,
          type: "addition",
          boundingBox: {
            x: 100,
            y: 200,
            width: 300,
            height: 20,
          },
          text: "This text was added in the second document.",
        },
        {
          page: 1,
          type: "deletion",
          boundingBox: {
            x: 100,
            y: 300,
            width: 300,
            height: 20,
          },
          text: "This text was removed from the first document.",
        },
        {
          page: 2,
          type: "modification",
          boundingBox: {
            x: 150,
            y: 250,
            width: 250,
            height: 40,
          },
          text: "This text was modified between documents.",
        },
      ],
      similarityScore: 0.85,
    }

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return NextResponse.json(mockComparisonResult)
  } catch (error) {
    console.error("Error processing PDF comparison request:", error)
    return NextResponse.json({ error: "Failed to process PDF comparison request" }, { status: 500 })
  }
}
