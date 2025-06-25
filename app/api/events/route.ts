import { NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { logError } from "@/lib/error-handler"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse pagination parameters
    const page = Number.parseInt(searchParams.get("page") || "1")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const offset = (page - 1) * limit

    // Parse filtering parameters
    const type = searchParams.get("type")
    const upcoming = searchParams.get("upcoming") === "true"

    // Build the query dynamically
    let query = `
      SELECT 
        id, 
        title, 
        description, 
        event_type, 
        location, 
        start_date, 
        end_date, 
        is_public,
        virtual_link
      FROM events
      WHERE 1=1
    `

    const queryParams = []

    // Add filters
    if (type) {
      query += ` AND event_type = $${queryParams.length + 1}`
      queryParams.push(type)
    }

    if (upcoming) {
      query += ` AND start_date > NOW()`
    }

    // Add sorting
    query += ` ORDER BY start_date ASC`

    // Add pagination
    query += ` LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}`
    queryParams.push(limit, offset)

    // Execute the query
    const events = await sql.query(query, queryParams)

    // Get total count for pagination
    const countResult = await sql.query(
      `
      SELECT COUNT(*) FROM events 
      WHERE 1=1
      ${type ? ` AND event_type = $1` : ""}
      ${upcoming ? ` AND start_date > NOW()` : ""}
    `,
      type ? [type] : [],
    )

    const total = Number.parseInt(countResult.rows[0].count)
    const totalPages = Math.ceil(total / limit)

    return NextResponse.json(
      {
        events: events.rows,
        pagination: {
          total,
          totalPages,
          currentPage: page,
          limit,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    logError(error, "api/events")
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    // Check if user is authenticated and has admin privileges
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Parse request body
    const body = await request.json()

    // Validate required fields
    const requiredFields = ["title", "event_type", "start_date"]
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing required field: ${field}` }, { status: 400 })
      }
    }

    // Insert the new event
    const result = await sql`
      INSERT INTO events (
        title, 
        description, 
        event_type, 
        location, 
        start_date, 
        end_date, 
        is_public,
        virtual_link
      ) VALUES (
        ${body.title},
        ${body.description || null},
        ${body.event_type},
        ${body.location || null},
        ${body.start_date},
        ${body.end_date || null},
        ${body.is_public !== undefined ? body.is_public : true},
        ${body.virtual_link || null}
      )
      RETURNING id, title, event_type, start_date
    `

    return NextResponse.json(
      {
        success: true,
        event: result[0],
      },
      { status: 201 },
    )
  } catch (error) {
    logError(error, "api/events POST")
    return NextResponse.json({ error: "Failed to create event" }, { status: 500 })
  }
}
