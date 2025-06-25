import { NextResponse } from "next/server"

export async function POST() {
  console.log("Logout API called")

  const response = NextResponse.json({ success: true })

  // Clear all auth cookies
  response.cookies.set("auth-token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  })

  response.cookies.set("user-session", "", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  })

  console.log("Auth cookies cleared")
  return response
}
