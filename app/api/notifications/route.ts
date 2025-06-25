import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { sql } from "@/lib/db"
import { logError } from "@/lib/error-handler"

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit") ? Number.parseInt(searchParams.get("limit")!) : 10
    const page = searchParams.get("page") ? Number.parseInt(searchParams.get("page")!) : 1
    const offset = (page - 1) * limit

    // Get notifications with pagination
    const notifications = await sql`
      SELECT * FROM notifications
      WHERE shareholder_id = ${session.user.id}
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    `

    // Get total count for pagination
    const countResult = await sql`
      SELECT COUNT(*) FROM notifications
      WHERE shareholder_id = ${session.user.id}
    `

    const total = Number.parseInt(countResult[0].count)
    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      notifications,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit,
      },
    })
  } catch (error) {
    logError(error, "api/notifications GET")
    return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { title, message, notification_type, related_entity_id } = await request.json()

    if (!title || !message || !notification_type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await sql`
      INSERT INTO notifications (
        shareholder_id, title, message, notification_type, related_entity_id
      )
      VALUES (
        ${session.user.id}, ${title}, ${message}, ${notification_type}, ${related_entity_id || null}
      )
      RETURNING id
    `

    return NextResponse.json({ id: result[0].id }, { status: 201 })
  } catch (error) {
    logError(error, "api/notifications POST")
    return NextResponse.json({ error: "Failed to create notification" }, { status: 500 })
  }
}
