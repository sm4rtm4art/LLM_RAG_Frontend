"use client"

import { useEffect } from "react"
import { useLoading } from "@/contexts/loading-context"
import { apiServiceWithLoading } from "@/services/api-service-with-loading"

export function useApiWithLoading() {
  const loadingContext = useLoading()

  useEffect(() => {
    // Set the loading context for the API service
    apiServiceWithLoading.setLoadingContext(loadingContext)
  }, [loadingContext])

  return apiServiceWithLoading
}
