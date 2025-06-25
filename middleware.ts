import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname

  // Skip middleware for all API routes, NextAuth routes, and public assets
  if (
    path.startsWith("/api/") ||
    path.includes("/api/auth/") ||
    path.startsWith("/_next/") ||
    path.includes(".") // Files with extensions like favicon.ico
  ) {
    const response = NextResponse.next()

    // Add security headers for API routes
    if (path.startsWith("/api/")) {
      response.headers.set("X-Content-Type-Options", "nosniff")
      response.headers.set("X-Frame-Options", "DENY")
      response.headers.set("X-XSS-Protection", "1; mode=block")
      response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
      response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")
    }

    return response
  }

  // For all other routes, add security headers
  const response = NextResponse.next()
  response.headers.set("X-Content-Type-Options", "nosniff")
  response.headers.set("X-Frame-Options", "DENY")
  response.headers.set("X-XSS-Protection", "1; mode=block")
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin")
  response.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()")

  // Add Content Security Policy for non-API routes
  response.headers.set(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self' https://*.vercel-insights.com",
  )

  return response
}

// Match all routes except static assets and API routes
export const config = {
  matcher: [
    // Skip all internal paths (_next), API routes, and NextAuth routes
    "/((?!_next|api/auth|api|favicon.ico).*)",
  ],
}
