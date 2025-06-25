import { neon } from "@neondatabase/serverless"

// Check if database URL is available
const databaseUrl = process.env.NEON_DATABASE_URL

if (!databaseUrl) {
  console.warn("⚠️ NEON_DATABASE_URL not found in environment variables. Database features will be disabled.")
}

// Create a SQL client with the pooled connection only if URL is available
const sql = databaseUrl ? neon(databaseUrl) : null

// Helper function to safely execute SQL queries
export async function safeSql<T>(queryFn: () => Promise<T>): Promise<T | null> {
  if (!sql) {
    console.warn("Database not available - skipping query")
    return null
  }
  
  try {
    return await queryFn()
  } catch (error) {
    console.error("Database query error:", error)
    return null
  }
}

export { sql }
