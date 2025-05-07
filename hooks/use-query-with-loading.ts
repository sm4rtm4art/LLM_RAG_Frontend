"use client"

import { useState, useCallback } from "react"
import type { QueryResponse } from "@/types/api"
import { useApiWithLoading } from "@/hooks/use-api-with-loading"

export function useQueryWithLoading() {
  const [response, setResponse] = useState<QueryResponse | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const apiService = useApiWithLoading()

  const sendQuery = useCallback(
    async (query: string) => {
      setIsLoading(true)
      setError(null)

      try {
        // This will automatically handle loading states through the context
        const response = await apiService.sendQuery({
          query,
          top_k: 3,
        })

        setResponse(response)
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred while processing your query")
        setResponse(null)
      } finally {
        setIsLoading(false)
      }
    },
    [apiService],
  )

  return {
    response,
    isLoading,
    error,
    sendQuery,
  }
}
