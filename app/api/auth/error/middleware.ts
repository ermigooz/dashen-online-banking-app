import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  try {
    // Just pass through the request
    return NextResponse.next()
  } catch (error) {
    console.error("Error in auth error middleware:", error)

    // Return a simple HTML response
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Error</title>
        </head>
        <body>
          <h1>Error</h1>
          <p>An error occurred while processing your request.</p>
          <a href="/auth/login">Go to Login</a>
        </body>
      </html>
    `

    return new NextResponse(html, {
      status: 500,
      headers: {
        "Content-Type": "text/html",
      },
    })
  }
}
