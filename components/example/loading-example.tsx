"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useApiWithLoading } from "@/hooks/use-api-with-loading"

export function LoadingExample() {
  const [result, setResult] = useState<string | null>(null)
  const apiService = useApiWithLoading()

  const handleSimpleQuery = async () => {
    try {
      const response = await apiService.sendQuery({
        query: "What is RAG?",
        top_k: 3,
      })

      setResult(response.response)
    } catch (error) {
      console.error("Error:", error)
    }
  }

  const handleFileUpload = async () => {
    try {
      // Create a mock file
      const mockFile = new File(["test content"], "test.txt", { type: "text/plain" })

      // Create form data
      const formData = new FormData()
      formData.append("query", "Please analyze this file")
      formData.append("file", mockFile)

      const response = await apiService.sendConversationMessageWithFile(formData)

      setResult(response.response)
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loading Example</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex space-x-4">
          <Button onClick={handleSimpleQuery}>Send Simple Query</Button>

          <Button onClick={handleFileUpload} variant="outline">
            Upload File
          </Button>
        </div>

        {result && (
          <div className="mt-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-md">
            <h3 className="text-lg font-medium mb-2">Result:</h3>
            <p className="whitespace-pre-wrap">{result}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
