"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useLoading, type LoadingStage } from "@/contexts/loading-context"

export function LoadingDemo() {
  const { startLoading, updateLoading, stopLoading } = useLoading()
  const [stage, setStage] = useState<LoadingStage>("connecting")
  const [message, setMessage] = useState("")
  const [duration, setDuration] = useState("3")
  const [showProgress, setShowProgress] = useState(false)

  const handleStartLoading = () => {
    startLoading(stage, message || undefined)

    if (showProgress) {
      simulateProgress()
    } else {
      setTimeout(() => {
        stopLoading()
      }, Number.parseInt(duration) * 1000)
    }
  }

  const simulateProgress = () => {
    const durationMs = Number.parseInt(duration) * 1000
    const steps = 10
    const stepTime = durationMs / steps

    let currentStep = 0

    const interval = setInterval(() => {
      currentStep++
      const progress = (currentStep / steps) * 100

      if (currentStep <= steps) {
        updateLoading(stage, message || undefined, progress)
      } else {
        clearInterval(interval)
        updateLoading("complete", "Operation complete!")
        setTimeout(() => stopLoading(), 1000)
      }
    }, stepTime)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loading Animation Demo</CardTitle>
        <CardDescription>Test different loading animations and states</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Loading Stage</label>
            <Select value={stage} onValueChange={(value) => setStage(value as LoadingStage)}>
              <SelectTrigger>
                <SelectValue placeholder="Select stage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="connecting">Connecting</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="generating">Generating</SelectItem>
                <SelectItem value="saving">Saving</SelectItem>
                <SelectItem value="complete">Complete</SelectItem>
                <SelectItem value="error">Error</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Duration (seconds)</label>
            <Input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} min="1" max="10" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Custom Message (optional)</label>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter a custom loading message"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="show-progress"
            checked={showProgress}
            onChange={(e) => setShowProgress(e.target.checked)}
            className="rounded border-gray-300"
          />
          <label htmlFor="show-progress" className="text-sm font-medium">
            Show progress indicator
          </label>
        </div>

        <Button onClick={handleStartLoading} className="w-full">
          Start Loading Animation
        </Button>
      </CardContent>
    </Card>
  )
}
