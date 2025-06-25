import { NextResponse } from "next/server"
import { testDatabaseConnection } from "@/lib/db"
import { checkRequiredEnvVars } from "@/lib/env-checker"

export async function GET() {
  try {
    // Check database connection
    const dbStatus = await testDatabaseConnection()

    // Check environment variables
    const envStatus = checkRequiredEnvVars()

    // Check if we're in production
    const isProduction = process.env.NODE_ENV === "production"

    // Get app version from package.json if available
    let version = "unknown"
    try {
      // This is a safe way to try to get the version without requiring the file
      const pkg = { version: process.env.npm_package_version || "1.0.0" }
      version = pkg.version
    } catch (e) {
      // Ignore error
    }

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      version,
      database: dbStatus,
      env: isProduction ? { valid: envStatus.valid } : envStatus,
    })
  } catch (error) {
    console.error("Health check failed:", error)
    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        error:
          process.env.NODE_ENV === "production"
            ? "Health check failed"
            : error instanceof Error
              ? error.message
              : String(error),
      },
      { status: 500 },
    )
  }
}
