import { NextResponse } from "next/server"

export async function GET() {
  // Only enable in development
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ message: "This endpoint is only available in development mode" }, { status: 403 })
  }

  // Check for required environment variables - only include the ones actually needed
  const requiredVars = ["NEON_DATABASE_URL", "DATABASE_URL", "NEXTAUTH_SECRET", "HUGGINGFACE_API_KEY"]

  // Check if at least one database URL is present
  let dbUrlPresent = false
  if (process.env.NEON_DATABASE_URL || process.env.DATABASE_URL) {
    dbUrlPresent = true
  }

  // Filter out database URLs if at least one is present
  const missingVars = requiredVars.filter((varName) => {
    // Skip database URLs if at least one is present
    if ((varName === "NEON_DATABASE_URL" || varName === "DATABASE_URL") && dbUrlPresent) {
      return false
    }
    // Otherwise check if the variable is missing
    return !process.env[varName]
  })

  return NextResponse.json({
    missingVars,
    allPresent: missingVars.length === 0,
  })
}
