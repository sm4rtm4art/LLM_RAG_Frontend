// Mock API route for development purposes
import { NextResponse } from "next/server"
import type { QueryRequest, QueryResponse } from "@/types/api"

export async function POST(request: Request) {
  try {
    const body: QueryRequest = await request.json()

    // In a real app, this would call your actual backend API
    // This is just a mock response for development
    const mockResponse: QueryResponse = {
      query: body.query,
      response: `This is a mock response to your query: "${body.query}"\n\n## Key Points\n\n- Point 1: This is a simulated response\n- Point 2: In a real app, this would come from your FastAPI backend\n- Point 3: You can test the UI with this mock data\n\n\`\`\`python\ndef hello_world():\n    print("Hello, world!")\n\`\`\`\n\n![Example Image](/placeholder.svg?height=200&width=400)`,
      retrieved_documents: [
        {
          content:
            "This is the first retrieved document that contains information relevant to the query. It provides context about the topic and helps the model generate an accurate response.",
          metadata: {
            source: "knowledge_base",
            filename: "document1.txt",
            chunk_index: 3,
            confidence: 0.92,
            content_type: "text",
          },
        },
        {
          content: "/placeholder.svg?height=300&width=500",
          metadata: {
            source: "knowledge_base",
            filename: "example_image.png",
            confidence: 0.85,
            content_type: "image",
          },
        },
        {
          content:
            "This is the third retrieved document that provides alternative perspectives on the topic. It helps ensure a balanced and comprehensive response.",
          metadata: {
            source: "knowledge_base",
            filename: "document3.txt",
            chunk_index: 2,
            confidence: 0.78,
            content_type: "text",
          },
        },
      ],
    }

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json(mockResponse)
  } catch (error) {
    console.error("Error processing query:", error)
    return NextResponse.json({ error: "Failed to process query" }, { status: 500 })
  }
}
