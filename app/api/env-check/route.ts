import { NextResponse } from "next/server"

export async function GET() {
  // Check for database-related environment variables
  const envVars = [
    { name: "DATABASE_URL", value: process.env.DATABASE_URL },
    { name: "NEON_DATABASE_URL", value: process.env.NEON_DATABASE_URL },
  ].filter((env) => env.value)

  // Mask the values for security
  const maskedEnvVars = envVars.map((env) => {
    const value = env.value || ""
    let masked = ""

    if (value.includes("postgres://")) {
      // Mask database connection strings
      masked = value.replace(/(postgres:\/\/[^:]+:)([^@]+)(@.+)/, "$1*****$3")
    } else {
      // Mask other values
      masked =
        value.length > 4
          ? `${value.substring(0, 2)}${"*".repeat(value.length - 4)}${value.substring(value.length - 2)}`
          : "****"
    }

    return { name: env.name, masked }
  })

  return NextResponse.json({
    envVars: maskedEnvVars,
    count: maskedEnvVars.length,
  })
}
