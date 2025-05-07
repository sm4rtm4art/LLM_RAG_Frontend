"use client"

import type { QueryRequest, QueryResponse, ConversationRequest, ConversationResponse } from "@/types/api"
import type { useLoading } from "@/contexts/loading-context"

class ApiServiceWithLoading {
  private baseUrl: string
  private loadingContext: ReturnType<typeof useLoading> | null = null

  constructor() {
    // TODO: FASTAPI INTEGRATION
    // Replace this with your FastAPI backend URL from environment variables
    // Example: this.baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"
    this.baseUrl = "/api"
  }

  // Method to set the loading context
  setLoadingContext(context: ReturnType<typeof useLoading>) {
    this.loadingContext = context
  }

  async sendQuery(request: QueryRequest): Promise<QueryResponse> {
    try {
      // Start loading with connecting stage
      this.loadingContext?.startLoading("connecting", "Connecting to RAG system...")

      // Simulate initial connection delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update to processing stage
      this.loadingContext?.updateLoading("processing", "Processing your query...")

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

      // Update to generating stage
      this.loadingContext?.updateLoading("generating", "Generating response...")

      // Simulate response processing
      await new Promise((resolve) => setTimeout(resolve, 800))

      const data = await response.json()

      // Complete loading
      this.loadingContext?.updateLoading("complete", "Response ready!")
      setTimeout(() => this.loadingContext?.stopLoading(), 500)

      return data
    } catch (error) {
      // Update to error stage
      this.loadingContext?.updateLoading("error", error instanceof Error ? error.message : "An error occurred")
      setTimeout(() => this.loadingContext?.stopLoading(), 2000)

      console.error("Error sending query:", error)
      throw error
    }
  }

  async sendConversationMessage(request: ConversationRequest): Promise<ConversationResponse> {
    try {
      // Start loading with connecting stage
      this.loadingContext?.startLoading("connecting", "Connecting to conversation system...")

      // Simulate initial connection delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Update to processing stage
      this.loadingContext?.updateLoading("processing", "Processing your message...")

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

      // Update to generating stage
      this.loadingContext?.updateLoading("generating", "Generating response...")

      const data = await response.json()

      // Complete loading
      this.loadingContext?.updateLoading("complete", "Response ready!")
      setTimeout(() => this.loadingContext?.stopLoading(), 500)

      return data
    } catch (error) {
      // Update to error stage
      this.loadingContext?.updateLoading("error", error instanceof Error ? error.message : "An error occurred")
      setTimeout(() => this.loadingContext?.stopLoading(), 2000)

      console.error("Error sending conversation message:", error)
      throw error
    }
  }

  async sendConversationMessageWithFile(formData: FormData): Promise<ConversationResponse> {
    try {
      // Get file details for better loading messages
      const file = formData.get("file") as File
      const fileName = file ? file.name : "file"

      // Start loading with connecting stage
      this.loadingContext?.startLoading("connecting", `Uploading ${fileName}...`)

      // Simulate upload start
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Simulate upload progress
      for (let progress = 0; progress <= 100; progress += 10) {
        this.loadingContext?.updateLoading("connecting", `Uploading ${fileName}... ${progress}%`, progress)
        await new Promise((resolve) => setTimeout(resolve, 200))
      }

      // Update to processing stage
      this.loadingContext?.updateLoading("processing", `Processing ${fileName}...`)

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

      // Update to generating stage
      this.loadingContext?.updateLoading("generating", "Analyzing document content...")

      const data = await response.json()

      // Complete loading
      this.loadingContext?.updateLoading("complete", "Analysis complete!")
      setTimeout(() => this.loadingContext?.stopLoading(), 500)

      return data
    } catch (error) {
      // Update to error stage
      this.loadingContext?.updateLoading("error", error instanceof Error ? error.message : "An error occurred")
      setTimeout(() => this.loadingContext?.stopLoading(), 2000)

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

  // Other methods from the original ApiService...
}

// Create a singleton instance
export const apiServiceWithLoading = new ApiServiceWithLoading()
