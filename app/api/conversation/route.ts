// Mock API route for development purposes
import { NextResponse } from "next/server"
import type { ConversationRequest, ConversationResponse } from "@/types/api"

// Simple in-memory store for conversations
// In a real app, this would be a database
const conversations: Record<string, ConversationResponse> = {}

export async function POST(request: Request) {
  try {
    const body: ConversationRequest = await request.json()

    // Generate a conversation ID if not provided
    const conversationId = body.conversation_id || `conv_${Date.now()}`

    // Get existing conversation or create new one
    const existingConversation = conversations[conversationId]

    // Create a mock response
    const mockResponse: ConversationResponse = {
      query: body.query,
      response: `This is a mock response to: "${body.query}"\n\n## Context\n\n- This is a simulated conversation\n- In a real app, this would come from your FastAPI backend\n- You can test the UI with this mock data`,
      retrieved_documents: [
        {
          content:
            "This is a retrieved document that contains information relevant to the conversation. It provides context about the topic and helps the model generate an accurate response.",
          metadata: {
            source: "knowledge_base",
            filename: "conversation_doc1.txt",
            chunk_index: 5,
            confidence: 0.89,
          },
        },
        {
          content:
            "This is another retrieved document with additional information about the topic. It contains facts and details that supplement the first document.",
          metadata: {
            source: "knowledge_base",
            filename: "conversation_doc2.txt",
            chunk_index: 2,
            confidence: 0.76,
          },
        },
      ],
      conversation_id: conversationId,
      history: existingConversation
        ? [...existingConversation.history, { user: body.query, assistant: `Response to: "${body.query}"` }]
        : [{ user: body.query, assistant: `Response to: "${body.query}"` }],
    }

    // Store the updated conversation
    conversations[conversationId] = mockResponse

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return NextResponse.json(mockResponse)
  } catch (error) {
    console.error("Error processing conversation:", error)
    return NextResponse.json({ error: "Failed to process conversation" }, { status: 500 })
  }
}
