"use client"

import { useI18n } from "@/lib/i18n/i18n-context"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Columns, Layers, GitCompare } from "lucide-react"
import type { ViewMode } from "@/types/text-comparison"

interface ComparisonViewSelectorProps {
  viewMode: ViewMode
  onViewModeChange: (mode: ViewMode) => void
}

export function ComparisonViewSelector({ viewMode, onViewModeChange }: ComparisonViewSelectorProps) {
  const { t } = useI18n()

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground">{t("common.viewOptions")}:</span>
      <ToggleGroup
        type="single"
        value={viewMode}
        onValueChange={(value) => value && onViewModeChange(value as ViewMode)}
      >
        <ToggleGroupItem value="split" aria-label={t("common.splitView")}>
          <Columns className="h-4 w-4" />
          <span className="sr-only">{t("common.splitView")}</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="overlay" aria-label={t("common.overlayView")}>
          <Layers className="h-4 w-4" />
          <span className="sr-only">{t("common.overlayView")}</span>
        </ToggleGroupItem>
        <ToggleGroupItem value="combined" aria-label={t("common.combinedView")}>
          <GitCompare className="h-4 w-4" />
          <span className="sr-only">{t("common.combinedView")}</span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  )
}
