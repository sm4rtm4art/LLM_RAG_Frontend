"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type LoadingStage = "initial" | "connecting" | "processing" | "generating" | "saving" | "complete" | "error"

interface LoadingState {
  isLoading: boolean
  stage: LoadingStage
  message: string
  progress?: number
}

interface LoadingContextType {
  loadingState: LoadingState
  startLoading: (stage?: LoadingStage, message?: string) => void
  updateLoading: (stage: LoadingStage, message?: string, progress?: number) => void
  stopLoading: () => void
}

const initialState: LoadingState = {
  isLoading: false,
  stage: "initial",
  message: "",
  progress: undefined,
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loadingState, setLoadingState] = useState<LoadingState>(initialState)

  const startLoading = (stage: LoadingStage = "connecting", message?: string) => {
    setLoadingState({
      isLoading: true,
      stage,
      message: message || getDefaultMessage(stage),
      progress: undefined,
    })
  }

  const updateLoading = (stage: LoadingStage, message?: string, progress?: number) => {
    setLoadingState((prev) => ({
      ...prev,
      stage,
      message: message || getDefaultMessage(stage),
      progress,
    }))
  }

  const stopLoading = () => {
    setLoadingState(initialState)
  }

  return (
    <LoadingContext.Provider value={{ loadingState, startLoading, updateLoading, stopLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (context === undefined) {
    throw new Error("useLoading must be used within a LoadingProvider")
  }
  return context
}

// Helper function to get default messages based on stage
function getDefaultMessage(stage: LoadingStage): string {
  switch (stage) {
    case "connecting":
      return "Connecting to server..."
    case "processing":
      return "Processing your request..."
    case "generating":
      return "Generating response..."
    case "saving":
      return "Saving changes..."
    case "complete":
      return "Operation complete!"
    case "error":
      return "An error occurred"
    default:
      return "Loading..."
  }
}
