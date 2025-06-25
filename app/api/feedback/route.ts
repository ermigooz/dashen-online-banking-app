import type { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { messageId, response, feedback } = await req.json()

    console.log("Feedback received:", {
      messageId,
      feedback,
      response: response.substring(0, 100) + (response.length > 100 ? "..." : ""),
    })

    // In a production environment, you would store this feedback in a database
    // and use it to improve your model

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  } catch (error) {
    console.error("Feedback API error:", error)

    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    )
  }
}
