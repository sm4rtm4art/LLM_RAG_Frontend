"use client"

import { useState, useCallback } from "react"
import { useLoading, type LoadingStage } from "@/contexts/loading-context"

interface UseLoadingOverlayOptions {
  initialMessage?: string
  showProgress?: boolean
  autoHideDelay?: number
}

export function useLoadingOverlay(options: UseLoadingOverlayOptions = {}) {
  const { startLoading, updateLoading, stopLoading, loadingState } = useLoading()
  const [progressValue, setProgressValue] = useState<number>(0)
  const [progressInterval, setProgressInterval] = useState<NodeJS.Timeout | null>(null)

  const showLoading = useCallback(
    (stage: LoadingStage = "connecting", message?: string) => {
      startLoading(stage, message || options.initialMessage)

      if (options.showProgress) {
        // Clear any existing interval
        if (progressInterval) {
          clearInterval(progressInterval)
        }

        // Start a new progress simulation
        setProgressValue(0)
        const interval = setInterval(() => {
          setProgressValue((prev) => {
            const next = prev + Math.random() * 5
            if (next >= 100) {
              if (progressInterval) clearInterval(progressInterval)
              return 100
            }
            return next
          })
        }, 200)

        setProgressInterval(interval)
      }

      // Auto-hide if specified
      if (options.autoHideDelay) {
        setTimeout(() => {
          hideLoading()
        }, options.autoHideDelay)
      }
    },
    [startLoading, options.initialMessage, options.showProgress, options.autoHideDelay, progressInterval],
  )

  const updateLoadingState = useCallback(
    (stage: LoadingStage, message?: string, progress?: number) => {
      updateLoading(
        stage,
        message,
        progress !== undefined ? progress : options.showProgress ? progressValue : undefined,
      )
    },
    [updateLoading, progressValue, options.showProgress],
  )

  const hideLoading = useCallback(() => {
    if (progressInterval) {
      clearInterval(progressInterval)
      setProgressInterval(null)
    }
    stopLoading()
  }, [stopLoading, progressInterval])

  const updateProgress = useCallback(
    (progress: number) => {
      setProgressValue(progress)
      if (loadingState.isLoading) {
        updateLoading(loadingState.stage, loadingState.message, progress)
      }
    },
    [loadingState, updateLoading],
  )

  return {
    showLoading,
    updateLoadingState,
    hideLoading,
    updateProgress,
    isLoading: loadingState.isLoading,
    currentStage: loadingState.stage,
    currentMessage: loadingState.message,
    progress: progressValue,
  }
}
