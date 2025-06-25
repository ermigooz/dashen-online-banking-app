// A simple authentication utility that doesn't rely on crypto

// Demo user for authentication
const DEMO_USER = {
  id: "user-1",
  email: "abebe@gmail.com",
  name: "Abebe Kebede",
  password: "password123", // In a real app, this would be hashed
}

// Authenticate a user with email and password
export function authenticateUser(email: string, password: string) {
  // For demo purposes, only check against the hardcoded user
  if (email === DEMO_USER.email && password === DEMO_USER.password) {
    // Return user without the password
    const { password: _, ...userWithoutPassword } = DEMO_USER
    return { success: true, user: userWithoutPassword }
  }

  return { success: false, error: "Invalid email or password" }
}

// Validate a session token (very simple implementation for demo)
export function validateSession(token: string) {
  try {
    // For demo purposes, just check if the token contains the user ID
    if (token && token.includes(DEMO_USER.id)) {
      const { password: _, ...userWithoutPassword } = DEMO_USER
      return { valid: true, user: userWithoutPassword }
    }
    return { valid: false }
  } catch (error) {
    console.error("Session validation error:", error)
    return { valid: false, error: "Invalid session" }
  }
}

// Create a simple session token
export function createSessionToken(user: { id: string; email: string }) {
  // For demo purposes, just create a simple token
  // In production, you would use a proper JWT library
  return `session_${user.id}_${Date.now()}`
}
