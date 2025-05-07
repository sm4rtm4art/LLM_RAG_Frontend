import { NextResponse } from "next/server"

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const documentId = params.id

    if (!documentId) {
      return NextResponse.json({ error: "Document ID is required" }, { status: 400 })
    }

    // In a real app, this would fetch the document from storage
    // For this demo, we'll return a mock PDF URL

    // Mock document URLs based on ID
    const mockDocumentUrls: Record<string, string> = {
      doc1: "/placeholder.svg?height=800&width=600&text=Knowledge+Base+Document+1",
      doc2: "/placeholder.svg?height=800&width=600&text=Knowledge+Base+Document+2",
      doc3: "/placeholder.svg?height=800&width=600&text=Knowledge+Base+Document+3",
      doc4: "/placeholder.svg?height=800&width=600&text=Knowledge+Base+Document+4",
    }

    // Default mock document if ID doesn't match
    const documentUrl =
      mockDocumentUrls[documentId] || "/placeholder.svg?height=800&width=600&text=Knowledge+Base+Document"

    return NextResponse.json({ url: documentUrl })
  } catch (error) {
    console.error("Error processing document view request:", error)
    return NextResponse.json({ error: "Failed to process document view request" }, { status: 500 })
  }
}
