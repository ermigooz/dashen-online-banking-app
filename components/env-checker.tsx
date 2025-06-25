"use client"

import { useEffect, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertTriangle } from "lucide-react"

export function EnvChecker() {
  const [missingVars, setMissingVars] = useState<string[]>([])
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== "development") return

    const checkEnvVars = async () => {
      try {
        const response = await fetch("/api/check-env")
        if (response.ok) {
          const data = await response.json()
          // Filter to only show relevant missing variables
          const relevantMissingVars = data.missingVars.filter(
            (varName: string) => varName === "NEON_DATABASE_URL" || varName === "DATABASE_URL",
          )

          if (relevantMissingVars && relevantMissingVars.length > 0) {
            setMissingVars(relevantMissingVars)
            setShowAlert(true)
          }
        }
      } catch (error) {
        console.error("Failed to check environment variables:", error)
      }
    }

    checkEnvVars()
  }, [])

  if (!showAlert || missingVars.length === 0) return null

  return (
    <Alert variant="destructive" className="mb-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Missing Environment Variables</AlertTitle>
      <AlertDescription>
        <p>The following environment variables are missing:</p>
        <ul className="list-disc pl-5 mt-2">
          {missingVars.map((variable) => (
            <li key={variable}>{variable}</li>
          ))}
        </ul>
        <p className="mt-2">Some features may not work correctly. Please add these variables to your environment.</p>
      </AlertDescription>
    </Alert>
  )
}
