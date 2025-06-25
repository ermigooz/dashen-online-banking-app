import { NextResponse, type NextRequest } from "next/server"
import { mockData } from "@/lib/mock-api"

// GET /api/profile - Get user profile
export async function GET(request: NextRequest) {
  try {
    // For demo purposes, always return mock data
    console.log("Returning mock profile data")
    return NextResponse.json(mockData.profile)
  } catch (error) {
    console.error("Error in profile API:", error)
    // Even if there's an error, return mock data as fallback
    return NextResponse.json(mockData.profile)
  }
}

// PATCH /api/profile - Update user profile
export async function PATCH(request: NextRequest) {
  try {
    // Get request body
    const body = await request.json()

    console.log("Profile update requested with data:", body)

    // For demo purposes, just return success with the updated data
    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      data: { ...mockData.profile, ...body },
    })
  } catch (error) {
    console.error("Error updating profile:", error)
    // Return a more helpful error message
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update profile",
        message: "An error occurred while updating your profile. Please try again.",
      },
      { status: 400 },
    )
  }
}
