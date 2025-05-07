"use client"

import { useEffect, useState } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import type { LoadingStage } from "@/contexts/loading-context"
import { useI18n } from "@/lib/i18n/i18n-context"

const loadingVariants = cva(
  "fixed inset-0 flex flex-col items-center justify-center z-50 transition-opacity duration-300",
  {
    variants: {
      variant: {
        default: "bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm",
        minimal: "bg-transparent",
        overlay: "bg-slate-900/50 backdrop-blur-sm",
      },
      position: {
        fullscreen: "fixed inset-0",
        container: "absolute inset-0",
        inline: "relative min-h-[100px]",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "fullscreen",
    },
  },
)

interface LoadingOverlayProps extends VariantProps<typeof loadingVariants> {
  isLoading: boolean
  stage?: LoadingStage
  message?: string
  progress?: number
  showSpinner?: boolean
  className?: string
}

export function LoadingOverlay({
  isLoading,
  stage = "connecting",
  message,
  progress,
  variant,
  position,
  showSpinner = true,
  className,
}: LoadingOverlayProps) {
  const [visible, setVisible] = useState(isLoading)
  const { t } = useI18n()

  useEffect(() => {
    if (isLoading) {
      setVisible(true)
    } else {
      const timer = setTimeout(() => setVisible(false), 300)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  if (!visible) return null

  return (
    <div
      className={cn(loadingVariants({ variant, position }), isLoading ? "opacity-100" : "opacity-0", className)}
      aria-live="polite"
      aria-busy={isLoading}
    >
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 max-w-md w-full mx-4 flex flex-col items-center">
        {showSpinner && <LoadingAnimation stage={stage} />}

        <div className="mt-4 text-center">
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
            {t(`loading.stages.${stage}`) || getStageLabel(stage)}
          </h3>

          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            {message || t(`loading.messages.${stage}`) || getDefaultMessage(stage)}
          </p>

          {progress !== undefined && (
            <div className="w-full mt-4">
              <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-500 dark:bg-blue-400 transition-all duration-300 ease-in-out"
                  style={{ width: `${Math.min(Math.max(progress, 0), 100)}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-500 text-right">{Math.round(progress)}%</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function LoadingAnimation({ stage }: { stage: LoadingStage }) {
  // Different animations for different stages
  switch (stage) {
    case "connecting":
      return <ConnectingAnimation />
    case "processing":
      return <ProcessingAnimation />
    case "generating":
      return <GeneratingAnimation />
    case "saving":
      return <SavingAnimation />
    case "complete":
      return <CompleteAnimation />
    case "error":
      return <ErrorAnimation />
    default:
      return <DefaultAnimation />
  }
}

function ConnectingAnimation() {
  return (
    <div className="relative h-16 w-16">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-12 w-12 rounded-full border-t-2 border-b-2 border-blue-500 animate-spin"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-8 w-8 rounded-full border-r-2 border-l-2 border-blue-300 animate-spin animate-reverse"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-4 w-4 rounded-full bg-blue-500 animate-ping"></div>
      </div>
    </div>
  )
}

function ProcessingAnimation() {
  return (
    <div className="flex space-x-2">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className="h-3 w-3 bg-blue-500 rounded-full animate-bounce"
          style={{ animationDelay: `${i * 0.1}s` }}
        ></div>
      ))}
    </div>
  )
}

function GeneratingAnimation() {
  return (
    <div className="relative h-16 w-16">
      <svg className="animate-spin" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-6 w-6 bg-blue-500 rounded-full animate-pulse"></div>
      </div>
    </div>
  )
}

function SavingAnimation() {
  return (
    <div className="relative h-16 w-16 flex items-center justify-center">
      <svg
        className="animate-bounce"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="absolute bottom-0 w-12 h-1 bg-blue-500 rounded-full"></div>
    </div>
  )
}

function CompleteAnimation() {
  return (
    <div className="h-16 w-16 flex items-center justify-center bg-green-100 dark:bg-green-900/30 rounded-full">
      <svg
        className="h-8 w-8 text-green-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    </div>
  )
}

function ErrorAnimation() {
  return (
    <div className="h-16 w-16 flex items-center justify-center bg-red-100 dark:bg-red-900/30 rounded-full">
      <svg
        className="h-8 w-8 text-red-500"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    </div>
  )
}

function DefaultAnimation() {
  return (
    <div className="h-16 w-16 flex items-center justify-center">
      <div className="h-12 w-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin"></div>
    </div>
  )
}

// Helper function to get stage labels
function getStageLabel(stage: LoadingStage): string {
  switch (stage) {
    case "connecting":
      return "Connecting"
    case "processing":
      return "Processing"
    case "generating":
      return "Generating"
    case "saving":
      return "Saving"
    case "complete":
      return "Complete"
    case "error":
      return "Error"
    default:
      return "Loading"
  }
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
