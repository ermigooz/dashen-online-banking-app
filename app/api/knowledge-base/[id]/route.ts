import { NextResponse } from "next/server"
import { updateKnowledgeEntry, deleteKnowledgeEntry } from "@/lib/knowledge-base"

// Update a knowledge entry
export async function PUT(req, { params }) {
  try {
    const id = Number.parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 })
    }

    const data = await req.json()

    // Process keywords if they're a string
    let keywords
    if (data.keywords) {
      keywords = typeof data.keywords === "string" ? data.keywords.split(",").map((k) => k.trim()) : data.keywords
    }

    // Update the entry
    const updatedEntry = await updateKnowledgeEntry(id, {
      ...(data.topic && { topic: data.topic }),
      ...(data.content && { content: data.content }),
      ...(data.keywords && { keywords: keywords }),
    })

    if (!updatedEntry) {
      return NextResponse.json({ error: "Failed to update knowledge entry or entry not found" }, { status: 404 })
    }

    return NextResponse.json(updatedEntry)
  } catch (error) {
    console.error("Error updating knowledge entry:", error)
    return NextResponse.json({ error: "Failed to update knowledge entry" }, { status: 500 })
  }
}

// Delete a knowledge entry
export async function DELETE(_req, { params }) {
  try {
    const id = Number.parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 })
    }

    const success = await deleteKnowledgeEntry(id)

    if (!success) {
      return NextResponse.json({ error: "Failed to delete knowledge entry or entry not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting knowledge entry:", error)
    return NextResponse.json({ error: "Failed to delete knowledge entry" }, { status: 500 })
  }
}
