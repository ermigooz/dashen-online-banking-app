import { NextResponse, type NextRequest } from "next/server"
import { mockData } from "@/lib/mock-api"

// GET /api/profile/language - Get language preferences
export async function GET(request: NextRequest) {
  try {
    console.log("Returning mock language preferences")
    return NextResponse.json(mockData.language)
  } catch (error) {
    console.error("Error in language API:", error)
    // Even if there's an error, return mock data as fallback
    return NextResponse.json(mockData.language)
  }
}

// PATCH /api/profile/language - Update language preferences
export async function PATCH(request: NextRequest) {
  try {
    // Get request body
    const body = await request.json()

    console.log("Language preferences update requested:", body)

    // For demo purposes, just return success
    return NextResponse.json({
      success: true,
      message: "Language preferences updated successfully",
      data: { ...mockData.language, ...body },
    })
  } catch (error) {
    console.error("Error updating language preferences:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update language preferences",
        message: "An error occurred while updating language preferences. Please try again.",
      },
      { status: 400 },
    )
  }
}
