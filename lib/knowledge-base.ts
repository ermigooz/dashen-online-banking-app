import { sql } from "@/lib/db"

export interface KnowledgeEntry {
  id: number
  topic: string
  content: string
  keywords: string[]
  last_updated?: string
}

/**
 * Search for knowledge entries based on a query
 */
export async function searchKnowledge(query: string): Promise<KnowledgeEntry[]> {
  try {
    const normalizedQuery = query.toLowerCase()

    const result = await sql`
      SELECT id, topic, content, keywords
      FROM knowledge_base
      WHERE 
        LOWER(topic) LIKE ${"%" + normalizedQuery + "%"} OR
        LOWER(content) LIKE ${"%" + normalizedQuery + "%"} OR
        LOWER(keywords) LIKE ${"%" + normalizedQuery + "%"}
      ORDER BY id DESC
      LIMIT 3
    `

    return result.map((row) => ({
      id: row.id,
      topic: row.topic,
      content: row.content,
      keywords: typeof row.keywords === "string" ? row.keywords.split(",").map((k) => k.trim()) : row.keywords,
      last_updated: row.last_updated,
    }))
  } catch (error) {
    console.error("Error searching knowledge entries:", error)
    return []
  }
}

/**
 * Get all knowledge entries
 */
export async function getAllKnowledgeEntries(): Promise<KnowledgeEntry[]> {
  try {
    const result = await sql`
      SELECT id, topic, content, keywords, last_updated
      FROM knowledge_base
      ORDER BY id DESC
    `

    return result.map((row) => ({
      id: row.id,
      topic: row.topic,
      content: row.content,
      keywords: typeof row.keywords === "string" ? row.keywords.split(",").map((k) => k.trim()) : row.keywords,
      last_updated: row.last_updated,
    }))
  } catch (error) {
    console.error("Error fetching knowledge entries:", error)
    return []
  }
}

/**
 * Add a new knowledge entry
 */
export async function addKnowledgeEntry(entry: {
  topic: string
  content: string
  keywords: string[]
}): Promise<KnowledgeEntry | null> {
  try {
    const keywordsValue = Array.isArray(entry.keywords) ? entry.keywords.join(",") : entry.keywords

    const result = await sql`
      INSERT INTO knowledge_base (topic, content, keywords)
      VALUES (${entry.topic}, ${entry.content}, ${keywordsValue})
      RETURNING id, topic, content, keywords, last_updated
    `

    if (result.length > 0) {
      const row = result[0]
      return {
        id: row.id,
        topic: row.topic,
        content: row.content,
        keywords: typeof row.keywords === "string" ? row.keywords.split(",").map((k) => k.trim()) : row.keywords,
        last_updated: row.last_updated,
      }
    }
    return null
  } catch (error) {
    console.error("Error adding knowledge entry:", error)
    return null
  }
}

/**
 * Update an existing knowledge entry
 */
export async function updateKnowledgeEntry(
  id: number,
  updates: Partial<{
    topic: string
    content: string
    keywords: string[]
  }>,
): Promise<KnowledgeEntry | null> {
  try {
    // Build the SET part of the query dynamically based on provided updates
    const updateFields = []
    const values: any[] = []

    if (updates.topic !== undefined) {
      updateFields.push(`topic = ${sql(updates.topic)}`)
    }

    if (updates.content !== undefined) {
      updateFields.push(`content = ${sql(updates.content)}`)
    }

    if (updates.keywords !== undefined) {
      const keywordsValue = Array.isArray(updates.keywords) ? updates.keywords.join(",") : updates.keywords
      updateFields.push(`keywords = ${sql(keywordsValue)}`)
    }

    if (updateFields.length === 0) {
      return null
    }

    const result = await sql`
      UPDATE knowledge_base
      SET ${sql.raw(updateFields.join(", "))}
      WHERE id = ${id}
      RETURNING id, topic, content, keywords, last_updated
    `

    if (result.length > 0) {
      const row = result[0]
      return {
        id: row.id,
        topic: row.topic,
        content: row.content,
        keywords: typeof row.keywords === "string" ? row.keywords.split(",").map((k) => k.trim()) : row.keywords,
        last_updated: row.last_updated,
      }
    }
    return null
  } catch (error) {
    console.error("Error updating knowledge entry:", error)
    return null
  }
}

/**
 * Delete a knowledge entry
 */
export async function deleteKnowledgeEntry(id: number): Promise<boolean> {
  try {
    const result = await sql`
      DELETE FROM knowledge_base
      WHERE id = ${id}
    `

    return result.count > 0
  } catch (error) {
    console.error("Error deleting knowledge entry:", error)
    return false
  }
}

/**
 * Get table columns
 */
export async function getTableColumns(tableName: string): Promise<string[]> {
  try {
    const result = await sql`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = ${tableName}
    `

    return result.map((row) => row.column_name)
  } catch (error) {
    console.error("Error getting table columns:", error)
    return []
  }
}

/**
 * Bulk import knowledge entries
 */
export async function bulkImportKnowledgeEntries(
  entries: { topic: string; content: string; keywords: string[] }[],
): Promise<number> {
  try {
    let insertedCount = 0
    for (const entry of entries) {
      const keywordsValue = Array.isArray(entry.keywords) ? entry.keywords.join(",") : entry.keywords
      await sql`
        INSERT INTO knowledge_base (topic, content, keywords)
        VALUES (${entry.topic}, ${entry.content}, ${keywordsValue})
      `
      insertedCount++
    }
    return insertedCount
  } catch (error) {
    console.error("Error bulk importing knowledge entries:", error)
    throw error
  }
}
