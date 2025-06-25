import { type NextRequest, NextResponse } from "next/server"
import { bulkImportKnowledgeEntries } from "@/lib/knowledge-base"

export async function POST(req: NextRequest) {
  try {
    const data = await req.json()

    if (!Array.isArray(data) || data.length === 0) {
      return NextResponse.json(
        { error: "Invalid data format. Expected non-empty array of knowledge entries" },
        { status: 400 },
      )
    }

    // Validate each entry
    const validEntries = data
      .filter(
        (entry) =>
          entry.topic && entry.content && (Array.isArray(entry.keywords) || typeof entry.keywords === "string"),
      )
      .map((entry) => ({
        topic: entry.topic,
        content: entry.content,
        keywords: Array.isArray(entry.keywords)
          ? entry.keywords
          : entry.keywords.split(",").map((k: string) => k.trim()),
      }))

    if (validEntries.length === 0) {
      return NextResponse.json({ error: "No valid entries found" }, { status: 400 })
    }

    // Bulk import entries
    const insertedCount = await bulkImportKnowledgeEntries(validEntries)

    return NextResponse.json({
      success: true,
      message: `Successfully imported ${insertedCount} knowledge entries`,
      count: insertedCount,
    })
  } catch (error) {
    console.error("Error bulk importing knowledge entries:", error)
    return NextResponse.json({ error: "Failed to import knowledge entries" }, { status: 500 })
  }
}
