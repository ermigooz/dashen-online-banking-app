import { NextResponse } from "next/server"
import { searchKnowledge } from "@/lib/knowledge-base"

export async function GET(req) {
  try {
    const url = new URL(req.url)
    const query = url.searchParams.get("q")

    if (!query) {
      return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 })
    }

    const results = await searchKnowledge(query)
    return NextResponse.json(results)
  } catch (error) {
    console.error("Error searching knowledge base:", error)
    return NextResponse.json({ error: "Failed to search knowledge base" }, { status: 500 })
  }
}
