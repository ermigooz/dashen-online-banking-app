import { sql } from "@/lib/db"

export interface KnowledgeEntry {
  id: number
  topic: string
  content: string
  keywords: string[]
  last_updated: string
}

/**
 * Get all knowledge entries from the database
 */
export async function getAllKnowledgeEntries(): Promise<KnowledgeEntry[]> {
  try {
    const result = await sql`
      SELECT id, topic, content, keywords, last_updated 
      FROM knowledge_base
      ORDER BY last_updated DESC
    `

    return result.rows.map((row) => ({
      id: row.id,
      topic: row.topic,
      content: row.content,
      keywords: Array.isArray(row.keywords) ? row.keywords : row.keywords.split(",").map((k: string) => k.trim()),
      last_updated: row.last_updated,
    }))
  } catch (error) {
    console.error("Error fetching knowledge entries:", error)
    return []
  }
}

/**
 * Add a new knowledge entry to the database
 */
export async function addKnowledgeEntry(entry: {
  topic: string
  content: string
  keywords: string[]
}): Promise<KnowledgeEntry | null> {
  try {
    // Convert keywords array to comma-separated string if needed
    const keywordsValue = Array.isArray(entry.keywords) ? entry.keywords.join(",") : entry.keywords

    const result = await sql`
      INSERT INTO knowledge_base (topic, content, keywords)
      VALUES (${entry.topic}, ${entry.content}, ${keywordsValue})
      RETURNING id, topic, content, keywords, last_updated
    `

    if (result.rows.length > 0) {
      const row = result.rows[0]
      return {
        id: row.id,
        topic: row.topic,
        content: row.content,
        keywords: Array.isArray(row.keywords) ? row.keywords : row.keywords.split(",").map((k: string) => k.trim()),
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
      updateFields.push(`topic = $${updateFields.length + 1}`)
      values.push(updates.topic)
    }

    if (updates.content !== undefined) {
      updateFields.push(`content = $${updateFields.length + 1}`)
      values.push(updates.content)
    }

    if (updates.keywords !== undefined) {
      updateFields.push(`keywords = $${updateFields.length + 1}`)
      values.push(Array.isArray(updates.keywords) ? updates.keywords.join(",") : updates.keywords)
    }

    // Add last_updated field
    updateFields.push(`last_updated = CURRENT_TIMESTAMP`)

    // If no fields to update, return null
    if (updateFields.length === 0) {
      return null
    }

    // Add id as the last parameter
    values.push(id)

    const query = `
      UPDATE knowledge_base
      SET ${updateFields.join(", ")}
      WHERE id = $${values.length}
      RETURNING id, topic, content, keywords, last_updated
    `

    const result = await sql.query(query, values)

    if (result.rows.length > 0) {
      const row = result.rows[0]
      return {
        id: row.id,
        topic: row.topic,
        content: row.content,
        keywords: Array.isArray(row.keywords) ? row.keywords : row.keywords.split(",").map((k: string) => k.trim()),
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

    return result.rowCount > 0
  } catch (error) {
    console.error("Error deleting knowledge entry:", error)
    return false
  }
}

/**
 * Search for knowledge entries based on a query
 */
export async function searchKnowledge(query: string): Promise<KnowledgeEntry[]> {
  try {
    const normalizedQuery = query.toLowerCase()

    const result = await sql`
      SELECT id, topic, content, keywords, last_updated
      FROM knowledge_base
      WHERE 
        LOWER(topic) LIKE ${"%" + normalizedQuery + "%"} OR
        LOWER(content) LIKE ${"%" + normalizedQuery + "%"} OR
        LOWER(keywords) LIKE ${"%" + normalizedQuery + "%"}
      ORDER BY 
        CASE
          WHEN LOWER(topic) LIKE ${"%" + normalizedQuery + "%"} THEN 1
          WHEN LOWER(keywords) LIKE ${"%" + normalizedQuery + "%"} THEN 2
          ELSE 3
        END,
        last_updated DESC
      LIMIT 3
    `

    return result.rows.map((row) => ({
      id: row.id,
      topic: row.topic,
      content: row.content,
      keywords: Array.isArray(row.keywords) ? row.keywords : row.keywords.split(",").map((k: string) => k.trim()),
      last_updated: row.last_updated,
    }))
  } catch (error) {
    console.error("Error searching knowledge entries:", error)
    return []
  }
}
