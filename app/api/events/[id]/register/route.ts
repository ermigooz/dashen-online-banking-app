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

    // Check if already registered
    const existingRegistration = await sql`
      SELECT * FROM event_registrations 
      WHERE event_id = ${eventId} AND shareholder_id = ${session.user.id}
    `

    if (existingRegistration.length > 0) {
      return NextResponse.json({ error: "Already registered for this event" }, { status: 400 })
    }

    // Register for the event
    await sql`
      INSERT INTO event_registrations (event_id, shareholder_id)
      VALUES (${eventId}, ${session.user.id})
    `

    // Create a notification
    await sql`
      INSERT INTO notifications (
        shareholder_id, title, message, notification_type, related_entity_id
      )
      VALUES (
        ${session.user.id}, 
        'Event Registration Confirmed', 
        ${'You have successfully registered for "' + event[0].title + '". We look forward to your participation.'}, 
        'event', 
        ${eventId}
      )
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    logError(error, "api/events/[id]/register")
    return NextResponse.json({ error: "Failed to register for event" }, { status: 500 })
  }
}
