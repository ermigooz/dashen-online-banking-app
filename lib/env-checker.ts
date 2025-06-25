// List of required environment variables for production
const REQUIRED_ENV_VARS = ["NEXTAUTH_SECRET", "NEON_DATABASE_URL", "NEXTAUTH_URL", "CHATBASE_SECRET_KEY"]

// List of optional environment variables
const OPTIONAL_ENV_VARS = ["NEXT_PUBLIC_APP_URL"]

export function checkRequiredEnvVars(): { valid: boolean; missing: string[] } {
  // Only check in production
  if (process.env.NODE_ENV !== "production") {
    return { valid: true, missing: [] }
  }

  const missing = REQUIRED_ENV_VARS.filter((varName) => {
    const value = process.env[varName]
    return !value || value.trim() === ""
  })

  return {
    valid: missing.length === 0,
    missing,
  }
}

export function checkOptionalEnvVars(): { present: string[]; missing: string[] } {
  const present = OPTIONAL_ENV_VARS.filter((varName) => {
    const value = process.env[varName]
    return value && value.trim() !== ""
  })

  const missingOptional = OPTIONAL_ENV_VARS.filter((varName) => {
    const value = process.env[varName]
    return !value || value.trim() === ""
  })

  return {
    present,
    missing: missingOptional,
  }
}

// Function to log environment status on startup
export function logEnvironmentStatus() {
  const { valid, missing } = checkRequiredEnvVars()
  const { present, missing: missingOptional } = checkOptionalEnvVars()

  if (!valid) {
    console.error("❌ Missing required environment variables:", missing.join(", "))
    if (process.env.NODE_ENV === "production") {
      console.error("Application may not function correctly in production!")
    } else {
      console.warn("⚠️ Some features may be limited in development mode.")
      console.info("💡 Create a .env.local file with the required variables for full functionality.")
    }
  } else {
    console.log("✅ All required environment variables are set")
  }

  if (present.length > 0) {
    console.log("ℹ️ Optional environment variables set:", present.join(", "))
  }

  if (missingOptional.length > 0) {
    console.log("⚠️ Missing optional environment variables:", missingOptional.join(", "))
  }

  // Check for database URL specifically
  if (!process.env.NEON_DATABASE_URL) {
    console.warn("⚠️ NEON_DATABASE_URL not set - database features will be disabled")
    console.info("💡 Set NEON_DATABASE_URL to enable database functionality")
  }
}
