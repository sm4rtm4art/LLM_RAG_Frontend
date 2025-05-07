"use client"

import { useEffect, useState } from "react"
import type { Highlight } from "@/types/pdf"

interface PDFHighlighterProps {
  highlights: Highlight[]
  scale: number
}

export function PDFHighlighter({ highlights, scale }: PDFHighlighterProps) {
  const [renderedHighlights, setRenderedHighlights] = useState<JSX.Element[]>([])

  useEffect(() => {
    const highlightElements = highlights.map((highlight, index) => {
      const { x, y, width, height, page, text, confidence } = highlight

      // Scale the coordinates based on the current zoom level
      const scaledStyle = {
        left: `${x * scale}px`,
        top: `${y * scale}px`,
        width: `${width * scale}px`,
        height: `${height * scale}px`,
        position: "absolute" as const,
        backgroundColor: "rgba(255, 255, 0, 0.3)",
        border: "1px solid rgba(255, 200, 0, 0.7)",
        borderRadius: "2px",
        pointerEvents: "none" as const,
        zIndex: 1,
      }

      return (
        <div
          key={`highlight-${page}-${index}`}
          style={scaledStyle}
          title={text || `Confidence: ${confidence || "N/A"}`}
          data-testid={`highlight-${index}`}
        />
      )
    })

    setRenderedHighlights(highlightElements)
  }, [highlights, scale])

  return <div className="absolute top-0 left-0 w-full h-full pointer-events-none">{renderedHighlights}</div>
}
