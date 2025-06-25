import { type NextRequest, NextResponse } from "next/server"
import { validateSession } from "@/lib/standalone-auth"

export async function GET(request: NextRequest) {
  console.log("GET /api/auth/me called")

  try {
    // Get the token from cookies
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      console.log("No auth-token cookie found")
      return NextResponse.json({ user: null, authenticated: false }, { status: 200 })
    }

    console.log("Found auth-token cookie, validating...")

    // Validate the token
    const { valid, user } = validateSession(token)

    if (!valid || !user) {
      console.log("Token validation failed")
      return NextResponse.json({ user: null, authenticated: false }, { status: 200 })
    }

    console.log("Token validated successfully, user:", user)
    return NextResponse.json({ user, authenticated: true })
  } catch (error) {
    console.error("Error getting current user:", error)
    // Return a 200 status with error info instead of 500
    // This prevents the client from treating it as a fatal error
    return NextResponse.json(
      {
        user: null,
        authenticated: false,
        error: "Authentication error",
        errorDetails: error instanceof Error ? error.message : String(error),
      },
      { status: 200 },
    )
  }
}
