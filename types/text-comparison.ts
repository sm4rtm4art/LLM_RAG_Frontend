import type { Change } from "diff"

export interface TextFile {
  name: string
  content: string
  type: string
}

export type ViewMode = "split" | "overlay" | "combined"

export interface TextPart {
  text: string
  type: "unchanged" | "added" | "removed"
}

export interface ComparisonResult {
  diffLines: Change[]
  combinedText: TextPart[]
  similarityScore: number
}
