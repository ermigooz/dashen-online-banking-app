type ErrorWithMessage = {
  message: string
  stack?: string
  code?: string | number
  name?: string
}

// Convert unknown error to standard error object
export function toErrorWithMessage(error: unknown): ErrorWithMessage {
  if (error instanceof Error) return error

  try {
    // Try to convert to JSON if it's a string
    if (typeof error === "string") {
      try {
        const parsed = JSON.parse(error)
        if (parsed && typeof parsed === "object") {
          return {
            message: parsed.message || "Unknown error",
            ...parsed,
          }
        }
      } catch {
        // If parsing fails, use the string as is
        return { message: error }
      }
    }

    // For other types, do our best
    return {
      message: error && typeof error === "object" && "message" in error ? String(error.message) : JSON.stringify(error),
    }
  } catch {
    // Last resort
    return { message: "Unknown error occurred" }
  }
}

// Log error with appropriate level
export function logError(error: unknown, context?: string): ErrorWithMessage {
  const errorWithMessage = toErrorWithMessage(error)

  const logData = {
    message: errorWithMessage.message,
    stack: errorWithMessage.stack,
    code: errorWithMessage.code,
    name: errorWithMessage.name,
    context,
  }

  // In production, we might want to send this to a logging service
  if (process.env.NODE_ENV === "production") {
    // Log in a format that's easy to parse by logging services
    console.error(JSON.stringify(logData))
  } else {
    // In development, provide more readable logs
    console.error(`Error${context ? ` in ${context}` : ""}:`, errorWithMessage)
  }

  return errorWithMessage
}

// Safe error handler for API routes
export function handleApiError(error: unknown, context?: string) {
  const errorWithMessage = logError(error, context)

  // Don't expose internal error details in production
  if (process.env.NODE_ENV === "production") {
    return {
      error: "An unexpected error occurred",
      code: errorWithMessage.code || "INTERNAL_ERROR",
    }
  }

  // In development, return more details
  return {
    error: errorWithMessage.message,
    stack: errorWithMessage.stack,
    code: errorWithMessage.code,
  }
}
