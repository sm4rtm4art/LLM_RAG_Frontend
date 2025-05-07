"use client"

import { LoadingDemo } from "@/components/demo/loading-demo"
import { LoadingProvider } from "@/contexts/loading-context"
import { LoadingOverlay } from "@/components/ui/loading-overlay"
import { I18nProvider } from "@/lib/i18n/i18n-context"
import { ThemeProvider } from "@/components/theme-provider"

export default function LoadingDemoPage() {
  return (
    <ThemeProvider>
      <I18nProvider>
        <LoadingProvider>
          <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-8 bg-slate-50 dark:bg-slate-900">
            <div className="w-full max-w-md mx-auto">
              <h1 className="text-3xl font-bold mb-6 text-center">Loading Animation Demo</h1>
              <LoadingDemo />
            </div>
          </main>
          <LoadingOverlay isLoading={false} /> {/* This will be controlled by the LoadingContext */}
        </LoadingProvider>
      </I18nProvider>
    </ThemeProvider>
  )
}
