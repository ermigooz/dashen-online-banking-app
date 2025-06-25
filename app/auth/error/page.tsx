"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

export default function AuthErrorPage() {
  const searchParams = useSearchParams()
  const [errorMessage, setErrorMessage] = useState("Authentication Error")
  const [errorDescription, setErrorDescription] = useState("There was a problem with the authentication process.")

  useEffect(() => {
    // Get the error code from the URL
    const error = searchParams.get("error")

    if (error) {
      console.log("Auth error from URL:", error)

      // Map error codes to user-friendly messages
      switch (error) {
        case "Configuration":
          setErrorMessage("Server Configuration Error")
          setErrorDescription("There is a problem with the server configuration. Please contact support.")
          break
        case "AccessDenied":
          setErrorMessage("Access Denied")
          setErrorDescription("You do not have permission to sign in.")
          break
        case "Verification":
          setErrorMessage("Verification Failed")
          setErrorDescription("The verification link may have been used or has expired.")
          break
        case "CredentialsSignin":
          setErrorMessage("Invalid Credentials")
          setErrorDescription("The email or password you entered is incorrect. Please try again.")
          break
        case "SessionRequired":
          setErrorMessage("Session Required")
          setErrorDescription("You must be signed in to access this page.")
          break
        default:
          setErrorMessage(`Authentication Error: ${error}`)
          setErrorDescription("An unexpected error occurred during authentication. Please try again.")
      }
    }
  }, [searchParams])

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <CardTitle className="text-2xl font-bold">{errorMessage}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{errorDescription}</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/login">Try Again</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
