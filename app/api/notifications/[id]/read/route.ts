import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { sql } from "@/lib/db"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const notificationId = params.id

    // Verify the notification belongs to the user
    const notification = await sql`
      SELECT * FROM notifications
      WHERE id = ${notificationId} AND shareholder_id = ${session.user.id}
    `

    if (notification.length === 0) {
      return NextResponse.json({ error: "Notification not found" }, { status: 404 })
    }

    // Mark as read
    await sql`
      UPDATE notifications
      SET is_read = true
      WHERE id = ${notificationId}
    `

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error marking notification as read:", error)
    return NextResponse.json({ error: "Failed to mark notification as read" }, { status: 500 })
  }
}
