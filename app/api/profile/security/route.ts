import { NextResponse, type NextRequest } from "next/server"
import { mockData } from "@/lib/mock-api"

// GET /api/profile/security - Get security settings
export async function GET(request: NextRequest) {
  try {
    console.log("Returning mock security data")
    return NextResponse.json(mockData.security)
  } catch (error) {
    console.error("Error in security API:", error)
    // Even if there's an error, return mock data as fallback
    return NextResponse.json(mockData.security)
  }
}

// PATCH /api/profile/security - Update password
export async function PATCH(request: NextRequest) {
  try {
    // Get request body
    const body = await request.json()

    console.log("Password update requested")

    // For demo purposes, just return success
    return NextResponse.json({
      success: true,
      message: "Password updated successfully",
    })
  } catch (error) {
    console.error("Error updating password:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update password",
        message: "An error occurred while updating your password. Please try again.",
      },
      { status: 400 },
    )
  }
}

// POST /api/profile/security/two-factor - Toggle two-factor authentication
export async function POST(request: NextRequest) {
  try {
    // Get request body
    const body = await request.json()
    const { enabled } = body

    console.log("Two-factor authentication update requested:", { enabled })

    // For demo purposes, just return success
    return NextResponse.json({
      success: true,
      message: enabled ? "Two-factor authentication enabled" : "Two-factor authentication disabled",
      two_factor_enabled: enabled,
    })
  } catch (error) {
    console.error("Error updating two-factor authentication:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update two-factor authentication",
        message: "An error occurred while updating two-factor authentication. Please try again.",
      },
      { status: 400 },
    )
  }
}

// DELETE /api/profile/security/logout-devices - Log out from other devices
export async function DELETE(request: NextRequest) {
  try {
    console.log("Logout from other devices requested")

    // For demo purposes, just return success
    return NextResponse.json({
      success: true,
      message: "Logged out from all other devices",
    })
  } catch (error) {
    console.error("Error logging out from other devices:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to log out from other devices",
        message: "An error occurred while logging out from other devices. Please try again.",
      },
      { status: 400 },
    )
  }
}
