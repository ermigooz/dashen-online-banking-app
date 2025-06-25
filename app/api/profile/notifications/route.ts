import { NextResponse, type NextRequest } from "next/server"
import { mockData } from "@/lib/mock-api"

// GET /api/profile/notifications - Get notification preferences
export async function GET(request: NextRequest) {
  try {
    console.log("Returning mock notification preferences")
    return NextResponse.json(mockData.notifications)
  } catch (error) {
    console.error("Error in notifications API:", error)
    // Even if there's an error, return mock data as fallback
    return NextResponse.json(mockData.notifications)
  }
}

// PATCH /api/profile/notifications - Update notification preferences
export async function PATCH(request: NextRequest) {
  try {
    // Get request body
    const preferences = await request.json()

    console.log("Notification preferences update requested:", preferences)

    // For demo purposes, just return success
    return NextResponse.json({
      success: true,
      message: "Notification preferences updated successfully",
      data: { ...mockData.notifications, ...preferences },
    })
  } catch (error) {
    console.error("Error updating notification preferences:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update notification preferences",
        message: "An error occurred while updating notification preferences. Please try again.",
      },
      { status: 400 },
    )
  }
}
