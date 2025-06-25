import { neon, neonConfig } from "@neondatabase/serverless"
import { Pool } from "@neondatabase/serverless"

// Configure neon for production
neonConfig.fetchConnectionCache = true

// Get the database URL from environment variables
const databaseUrl = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL

// Check if database URL is available
if (!databaseUrl) {
  console.warn("No database URL found in environment variables. Some features may not work correctly.")
}

// Create a SQL client with the database URL
export const sql = databaseUrl
  ? neon(databaseUrl)
  : {
      // Provide a fallback implementation that logs errors instead of crashing
      query: async (...args: any[]) => {
        console.error("Database connection not available. Query:", args[0])
        return { rows: [] }
      },
      // Add other methods as needed with fallbacks
      ...Object.fromEntries(
        ["select", "insert", "update", "delete", "transaction"].map((method) => [
          method,
          async () => {
            console.error(`Database connection not available. Method: ${method}`)
            return { rows: [] }
          },
        ]),
      ),
    }

// Create a connection pool for more intensive operations
let pool: Pool | null = null

export function getPool() {
  if (!pool && databaseUrl) {
    pool = new Pool({ connectionString: databaseUrl })
  }
  return pool
}

// Simple test query function to verify connection
export async function testDatabaseConnection() {
  try {
    if (!databaseUrl) {
      return { success: false, error: "No database URL configured" }
    }

    const result = await sql.query("SELECT NOW()")
    return { success: true, timestamp: result.rows[0]?.now }
  } catch (error) {
    console.error("Database connection error:", error)
    return { success: false, error: error instanceof Error ? error.message : String(error) }
  }
}

// Cleanup function for serverless environments
export async function closePool() {
  if (pool) {
    await pool.end()
    pool = null
  }
}
