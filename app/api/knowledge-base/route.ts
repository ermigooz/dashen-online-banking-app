import { NextResponse } from "next/server"
import { getAllKnowledgeEntries, addKnowledgeEntry } from "@/lib/knowledge-base"

// Get all knowledge entries
export async function GET() {
  try {
    const entries = await getAllKnowledgeEntries()
    return NextResponse.json(entries)
  } catch (error) {
    console.error("Error fetching knowledge entries:", error)
    return NextResponse.json({ error: "Failed to fetch knowledge entries" }, { status: 500 })
  }
}

// Add a new knowledge entry
export async function POST(req) {
  try {
    const data = await req.json()

    // Validate required fields
    if (!data.topic || !data.content || !data.keywords) {
      return NextResponse.json({ error: "Missing required fields: topic, content, or keywords" }, { status: 400 })
    }

    // Process keywords if they're a string
    const keywords = typeof data.keywords === "string" ? data.keywords.split(",").map((k) => k.trim()) : data.keywords

    // Add the new entry
    const newEntry = await addKnowledgeEntry({
      topic: data.topic,
      content: data.content,
      keywords: keywords,
    })

    if (!newEntry) {
      return NextResponse.json({ error: "Failed to add knowledge entry" }, { status: 500 })
    }

    return NextResponse.json(newEntry, { status: 201 })
  } catch (error) {
    console.error("Error adding knowledge entry:", error)
    return NextResponse.json({ error: "Failed to add knowledge entry" }, { status: 500 })
  }
}
