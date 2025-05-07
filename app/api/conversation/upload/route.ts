import { NextResponse } from "next/server"
import type { ConversationResponse } from "@/types/api"

// Simple in-memory store for conversations
// In a real app, this would be a database
const conversations: Record<string, ConversationResponse> = {}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const query = (formData.get("query") as string) || ""
    const file = formData.get("file") as File
    const conversationId = (formData.get("conversation_id") as string) || `conv_${Date.now()}`

    // Get file details
    const fileName = file.name
    const fileType = file.type
    const fileSize = file.size

    // In a real app, you would process the file here
    // For PDFs, you might extract text, create embeddings, etc.

    // Get existing conversation or create new one
    const existingConversation = conversations[conversationId]

    // Create a mock response
    const mockResponse: ConversationResponse = {
      query: query,
      response: `I've processed your file "${fileName}" (${fileType}, ${Math.round(fileSize / 1024)} KB).\n\n${
        query ? `Regarding your question: "${query}"\n\n` : ""
      }## Analysis\n\n- This is a simulated response to your uploaded file\n- In a real app, this would analyze the content of your file\n- The file would be processed by your FastAPI backend`,
      retrieved_documents: [
        {
          content: `This is content extracted from your uploaded file "${fileName}". In a real implementation, this would contain actual content from the file.`,
          metadata: {
            source: "uploaded_file",
            filename: fileName,
            content_type: fileType,
            confidence: 0.95,
            additional_metadata: {
              file_size: fileSize,
              upload_time: new Date().toISOString(),
            },
          },
        },
      ],
      conversation_id: conversationId,
      history: existingConversation
        ? [
            ...existingConversation.history,
            { user: `[File Upload: ${fileName}] ${query}`, assistant: `Response to file upload: "${fileName}"` },
          ]
        : [{ user: `[File Upload: ${fileName}] ${query}`, assistant: `Response to file upload: "${fileName}"` }],
    }

    // Store the updated conversation
    conversations[conversationId] = mockResponse

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 2000))

    return NextResponse.json(mockResponse)
  } catch (error) {
    console.error("Error processing file upload:", error)
    return NextResponse.json({ error: "Failed to process file upload" }, { status: 500 })
  }
}
