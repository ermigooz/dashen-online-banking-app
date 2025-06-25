"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"

export default function BulkImport() {
  const [files, setFiles] = useState<File[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const { toast } = useToast()

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files).filter((file) => file.type === "application/pdf")
      setFiles(fileArray)
    }
  }

  const handleUpload = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please select at least one PDF file to import.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setProgress(0)

    try {
      const formData = new FormData()
      files.forEach((file) => {
        formData.append("files", file)
      })

      // Simulate progress (in a real app, you'd use upload progress events)
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 5
          if (newProgress >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return newProgress
        })
      }, 300)

      const response = await fetch("/api/knowledge-base/bulk-import", {
        method: "POST",
        body: formData,
      })

      clearInterval(progressInterval)
      setProgress(100)

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Import successful",
          description: data.message,
        })
        setFiles([])
      } else {
        throw new Error(data.error || "Failed to import files")
      }
    } catch (error) {
      toast({
        title: "Import failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
      setProgress(0)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bulk Import from PDFs</CardTitle>
        <CardDescription>Upload PDF documents to automatically extract knowledge entries</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <Input
            type="file"
            accept=".pdf"
            multiple
            onChange={handleFileChange}
            disabled={isUploading}
            className="hidden"
            id="pdf-upload"
          />
          <label htmlFor="pdf-upload" className="cursor-pointer text-blue-600 hover:text-blue-800">
            Click to select PDF files
          </label>
          <p className="text-sm text-gray-500 mt-2">or drag and drop files here</p>
        </div>

        {files.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Selected Files ({files.length})</h3>
            <ul className="text-sm space-y-1">
              {files.map((file, index) => (
                <li key={index} className="flex justify-between">
                  <span>{file.name}</span>
                  <span className="text-gray-500">{(file.size / 1024).toFixed(1)} KB</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {isUploading && (
          <div className="space-y-2">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-center text-gray-500">Processing files... {progress}%</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button onClick={handleUpload} disabled={isUploading || files.length === 0} className="w-full">
          {isUploading ? "Importing..." : "Import Knowledge from PDFs"}
        </Button>
      </CardFooter>
    </Card>
  )
}
