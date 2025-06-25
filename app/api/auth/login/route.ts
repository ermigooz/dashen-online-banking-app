import { NextResponse } from "next/server"
import { authenticateUser, createSessionToken } from "@/lib/standalone-auth"

export async function POST(request: Request) {
  try {
    // Parse request body
    const body = await request.json()
    const { email, password } = body

    console.log(`Login attempt for email: ${email}`)

    // Validate input
    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 })
    }

    // Authenticate user
    const authResult = authenticateUser(email, password)

    if (!authResult.success) {
      return NextResponse.json({ success: false, error: authResult.error }, { status: 401 })
    }

    // Create session token
    const token = createSessionToken(authResult.user)

    // Create response
    const response = NextResponse.json({
      success: true,
      user: authResult.user,
    })

    // Set cookies
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
      sameSite: "lax",
    })

    response.cookies.set("user-session", "authenticated", {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
      sameSite: "lax",
    })

    console.log(`User ${authResult.user.email} logged in successfully`)
    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, error: "An unexpected error occurred" }, { status: 500 })
  }
}
