import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import crypto from "crypto"

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Generate HMAC using the secret key and user ID
    const secret = process.env.CHATBASE_SECRET_KEY || "7l8fkag1nnjdw6s32iogap01djiq2q1i"
    const userId = session.user.id

    const hmac = crypto.createHmac("sha256", secret).update(userId).digest("hex")

    return NextResponse.json({
      userId,
      hmac,
      name: session.user.name,
      email: session.user.email,
    })
  } catch (error) {
    console.error("Error generating Chatbase auth:", error)
    return NextResponse.json({ error: "Failed to generate authentication" }, { status: 500 })
  }
}
