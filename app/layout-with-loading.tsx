import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { I18nProvider } from "@/lib/i18n/i18n-context"
import { LoadingProvider } from "@/contexts/loading-context"
import { LoadingOverlay } from "@/components/ui/loading-overlay"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RAG Assistant",
  description: "A RAG-powered assistant for knowledge retrieval",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <I18nProvider>
            <LoadingProvider>
              {children}
              <LoadingOverlay isLoading={false} /> {/* This will be controlled by the LoadingContext */}
            </LoadingProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
