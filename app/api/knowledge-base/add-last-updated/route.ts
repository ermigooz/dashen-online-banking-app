import { NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { getTableColumns } from "@/lib/knowledge-base"

export async function GET() {
  try {
    // Check if last_updated column exists
    const columns = await getTableColumns("knowledge_base")
    const hasLastUpdated = columns.includes("last_updated")

    if (hasLastUpdated) {
      return NextResponse.json({
        message: "last_updated column already exists",
        success: true,
      })
    }

    // Add last_updated column
    await sql`
      ALTER TABLE knowledge_base
      ADD COLUMN last_updated TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    `

    return NextResponse.json({
      message: "last_updated column added successfully",
      success: true,
    })
  } catch (error) {
    console.error("Error adding last_updated column:", error)
    return NextResponse.json(
      {
        error: "Failed to add last_updated column",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
