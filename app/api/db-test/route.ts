import { NextResponse } from "next/server"
import { testDatabaseConnection } from "@/lib/db"

export async function GET() {
  try {
    const result = await testDatabaseConnection()

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: "Database connection successful",
        timestamp: result.timestamp,
        driver: "neon",
      })
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "Database connection failed",
          error: result.error,
          timestamp: new Date().toISOString(),
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Database test error:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Database test failed",
        error: error instanceof Error ? error.message : String(error),
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
