import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { sql } from "@/lib/db"
import { logError } from "@/lib/error-handler"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const eventId = params.id

    // Check if the event exists
    const event = await sql`
      SELECT * FROM events WHERE id = ${eventId}
    `

    if (event.length === 0) {
      return NextResponse.json({ error: "Event not found" }, { status: 404 })
    }

    // Check if registered
    const existingRegistration = await sql`
      SELECT * FROM event_registrations 
      WHERE event_id = ${eventId} AND shareholder_id = ${session.user.id}
    `

    if (existingRegistration.length === 0) {
      return NextResponse.json({ error: "Not registered for this event" }, { status: 400 })
    }

    // Cancel registration
    await sql`
      DELETE FROM event_registrations
      WHERE event_id = ${eventId} AND shareholder_id = ${session.user.id}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    logError(error, "api/events/[id]/cancel")
    return NextResponse.json({ error: "Failed to cancel registration" }, { status: 500 })
  }
}
