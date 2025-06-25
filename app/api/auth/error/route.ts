import { NextResponse } from "next/server"

export async function GET(request: Request) {
  // Get error information from the URL
  const { searchParams } = new URL(request.url)
  const error = searchParams.get("error") || "Unknown error"

  // Log the error for debugging
  console.log("Auth error:", error)

  // Map error codes to user-friendly messages
  let errorMessage = "An authentication error occurred"
  let errorDescription = "Please try again or contact support if the problem persists."

  switch (error) {
    case "Configuration":
      errorMessage = "Server configuration error"
      errorDescription = "There is a problem with the server configuration."
      break
    case "AccessDenied":
      errorMessage = "Access denied"
      errorDescription = "You do not have permission to sign in."
      break
    case "Verification":
      errorMessage = "Verification failed"
      errorDescription = "The verification link may have been used or has expired."
      break
    case "CredentialsSignin":
      errorMessage = "Invalid credentials"
      errorDescription = "The email or password you entered is incorrect."
      break
    case "OAuthSignin":
    case "OAuthCallback":
    case "OAuthCreateAccount":
    case "EmailCreateAccount":
    case "Callback":
    case "OAuthAccountNotLinked":
    case "EmailSignin":
      errorMessage = "Authentication error"
      errorDescription = "There was a problem with the authentication process."
      break
    case "SessionRequired":
      errorMessage = "Session required"
      errorDescription = "You must be signed in to access this page."
      break
    default:
      errorMessage = `Error: ${error}`
      errorDescription = "An unexpected error occurred during authentication."
  }

  // Return a JSON response with detailed error information
  return NextResponse.json({
    error: errorMessage,
    description: errorDescription,
    code: error,
    timestamp: new Date().toISOString(),
  })
}
