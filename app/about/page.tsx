"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    // Handle any errors that might occur during page load
    const handleError = (event: ErrorEvent) => {
      console.error("Error caught in about page:", event.error)
      setError("There was an error loading this page. You can continue to the Dashen Bank website or go back home.")
    }

    window.addEventListener("error", handleError)

    // Redirect to the Dashen Bank website after a brief delay if no errors
    const timer = setTimeout(() => {
      if (!error) {
        setIsRedirecting(true)
        window.location.href = "https://dashenbank.com/about"
      }
    }, 2000)

    return () => {
      window.removeEventListener("error", handleError)
      clearTimeout(timer)
    }
  }, [error])

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <Alert variant="destructive" className="max-w-md mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>

        <div className="flex gap-4">
          <Button asChild variant="outline">
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild>
            <a href="https://dashenbank.com/about" target="_blank" rel="noopener noreferrer">
              Continue to Dashen Bank
            </a>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-primary-50 to-white p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-3xl font-bold text-primary mb-4">
          {isRedirecting ? "Redirecting to Dashen Bank..." : "Welcome to Dashen Bank"}
        </h1>
        <p className="text-gray-600 mb-6">
          {isRedirecting
            ? "You are being redirected to the official Dashen Bank website."
            : "Loading information about Dashen Bank..."}
        </p>
        <div className="animate-pulse">
          <div className="h-2 w-32 bg-primary rounded mx-auto"></div>
        </div>
      </div>
    </div>
  )
}
