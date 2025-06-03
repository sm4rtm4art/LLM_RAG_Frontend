import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const filename = searchParams.get("filename")

    if (!filename) {
      return NextResponse.json({ error: "Filename is required" }, { status: 400 })
    }

    // In a real app, this would validate the filename and fetch from a secure storage
    // For this demo, we'll return a mock PDF URL

    // Mock PDF URLs based on filename
    const mockPdfUrls: Record<string, string> = {
      "document1.pdf": "/placeholder.svg?height=800&width=600&text=Mock+PDF+1",
      "document2.pdf": "/placeholder.svg?height=800&width=600&text=Mock+PDF+2",
      "report.pdf": "/placeholder.svg?height=800&width=600&text=Mock+Report",
      "contract.pdf": "/placeholder.svg?height=800&width=600&text=Mock+Contract",
    }

    // Default mock PDF if filename doesn't match
    const pdfUrl = mockPdfUrls[filename] || "/placeholder.svg?height=800&width=600&text=Mock+PDF"

    return NextResponse.json({ url: pdfUrl })
  } catch (error) {
    console.error("Error processing PDF view request:", error)
    return NextResponse.json({ error: "Failed to process PDF view request" }, { status: 500 })
  }
}
