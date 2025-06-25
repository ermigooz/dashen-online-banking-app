import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    console.log("Initializing database...")

    // Check if knowledge_base table exists
    const tableExists = await checkTableExists("knowledge_base")

    if (tableExists) {
      console.log("knowledge_base table already exists")
      return NextResponse.json({
        success: true,
        message: "knowledge_base table already exists",
      })
    }

    // Create knowledge_base table
    console.log("Creating knowledge_base table...")
    await sql`
      CREATE TABLE IF NOT EXISTS knowledge_base (
        id SERIAL PRIMARY KEY,
        topic VARCHAR(255) NOT NULL,
        content TEXT NOT NULL,
        keywords TEXT NOT NULL
      )
    `

    // Create index for faster searches
    await sql`
      CREATE INDEX IF NOT EXISTS idx_knowledge_base_topic ON knowledge_base (topic)
    `

    // Insert sample data
    console.log("Inserting sample data...")
    await sql`
      INSERT INTO knowledge_base (topic, content, keywords)
      VALUES 
        ('Account Opening', 'To open an account with Amhara Bank as a diaspora member, you need to provide your passport, proof of address, and complete the diaspora account application form.', 
         'open account,new account,account opening,diaspora account,initial deposit'),
        
        ('Share Purchase', 'Amhara Bank shares can be purchased by Ethiopian nationals and foreign nationals of Ethiopian origin. The minimum initial purchase is 10 shares.', 
         'buy shares,share purchase,stock,investment,shareholder,minimum shares'),
         
        ('Dividend Payment', 'Amhara Bank pays dividends to shareholders twice a year, in June and December. The dividend amount is determined by the bank''s performance.', 
         'dividend,payment,shareholder payment,profit sharing,returns')
    `

    return NextResponse.json({
      success: true,
      message: "Database initialized successfully",
    })
  } catch (error) {
    console.error("Error initializing database:", error)

    return NextResponse.json(
      {
        success: false,
        message: "Failed to initialize database",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}

async function checkTableExists(tableName) {
  try {
    const result = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = ${tableName}
      ) as exists
    `

    return result[0]?.exists || false
  } catch (error) {
    console.error(`Error checking if table ${tableName} exists:`, error)
    return false
  }
}
