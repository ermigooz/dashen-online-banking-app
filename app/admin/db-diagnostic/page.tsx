"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DbDiagnosticPage() {
  const [testResult, setTestResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [envVars, setEnvVars] = useState([])

  // Safely fetch environment variables
  useEffect(() => {
    async function fetchEnvVars() {
      try {
        const response = await fetch("/api/env-check")
        if (response.ok) {
          const data = await response.json()
          setEnvVars(data.envVars || [])
        }
      } catch (error) {
        console.error("Error checking environment variables:", error)
      }
    }

    fetchEnvVars()
  }, [])

  // Test database connection
  const testConnection = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/db-test")
      const data = await response.json()
      setTestResult(data)
    } catch (error) {
      console.error("Error testing database connection:", error)
      setTestResult({
        success: false,
        message: "Error testing database connection",
        error: error instanceof Error ? error.message : String(error),
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Database Diagnostic</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Environment Variables</CardTitle>
        </CardHeader>
        <CardContent>
          {envVars.length > 0 ? (
            <ul className="space-y-2">
              {envVars.map((env, index) => (
                <li key={index} className="flex items-center">
                  <span className="font-mono bg-gray-100 px-2 py-1 rounded mr-2">{env.name}</span>
                  <span className="text-gray-500">{env.masked}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-yellow-600">No database environment variables found</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Test Database Connection</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={testConnection} disabled={isLoading}>
            {isLoading ? "Testing..." : "Test Connection"}
          </Button>

          {testResult && (
            <div className={`mt-4 p-4 rounded ${testResult.success ? "bg-green-50" : "bg-red-50"}`}>
              <h3 className={`font-bold ${testResult.success ? "text-green-600" : "text-red-600"}`}>
                {testResult.success ? "Connection Successful" : "Connection Failed"}
              </h3>
              <p className="mt-2">{testResult.message}</p>

              {testResult.error && (
                <div className="mt-4">
                  <h4 className="font-semibold text-red-600">Error Details:</h4>
                  <pre className="bg-gray-100 p-2 rounded mt-1 overflow-x-auto text-sm">{testResult.error}</pre>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
