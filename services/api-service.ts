"use client"

import type { QueryRequest, QueryResponse, ConversationRequest, ConversationResponse } from "@/types/api"

class ApiService {
  private baseUrl: string

  constructor() {
    // TODO: FASTAPI INTEGRATION
    // Replace this with your FastAPI backend URL from environment variables
    // Example: this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"
    this.baseUrl = "/api"
  }

  async sendQuery(request: QueryRequest): Promise<QueryResponse> {
    try {
      // TODO: FASTAPI INTEGRATION
      // Replace this with a call to your FastAPI endpoint
      // Example endpoint: /rag/query
      const response = await fetch(`${this.baseUrl}/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error sending query:", error)
      throw error
    }
  }

  async sendConversationMessage(request: ConversationRequest): Promise<ConversationResponse> {
    try {
      // TODO: FASTAPI INTEGRATION
      // Replace this with a call to your FastAPI conversation endpoint
      // Example endpoint: /rag/conversation
      const response = await fetch(`${this.baseUrl}/conversation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error sending conversation message:", error)
      throw error
    }
  }

  async sendConversationMessageWithFile(formData: FormData): Promise<ConversationResponse> {
    try {
      // TODO: FASTAPI INTEGRATION
      // Replace this with a call to your FastAPI file upload endpoint
      // Example endpoint: /rag/conversation/upload
      // Note: FastAPI handles multipart/form-data differently than Next.js
      const response = await fetch(`${this.baseUrl}/conversation/upload`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error sending conversation message with file:", error)
      throw error
    }
  }

  async checkHealth(): Promise<boolean> {
    try {
      // TODO: FASTAPI INTEGRATION
      // Replace this with a call to your FastAPI health check endpoint
      // Example endpoint: /health
      const response = await fetch(`${this.baseUrl}/health`)
      return response.ok
    } catch (error) {
      console.error("Health check failed:", error)
      return false
    }
  }

  // TODO: FASTAPI INTEGRATION
  // Add methods for PDF-related operations
  async getPdfUrl(filename: string): Promise<string> {
    try {
      // Example endpoint: /documents/pdf/view?filename=example.pdf
      const response = await fetch(`${this.baseUrl}/documents/pdf/view?filename=${encodeURIComponent(filename)}`)

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      return data.url
    } catch (error) {
      console.error("Error getting PDF URL:", error)
      throw error
    }
  }

  // TODO: FASTAPI INTEGRATION
  // Add method for knowledge base article retrieval
  async getKnowledgeBaseArticles(category?: string, query?: string): Promise<any[]> {
    try {
      // Build query parameters
      const params = new URLSearchParams()
      if (category && category !== "all") params.append("category", category)
      if (query) params.append("query", query)

      // Example endpoint: /knowledge-base/articles
      const response = await fetch(`${this.baseUrl}/knowledge-base/articles?${params.toString()}`)

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error("Error fetching knowledge base articles:", error)
      throw error
    }
  }
}

export const apiService = new ApiService()
