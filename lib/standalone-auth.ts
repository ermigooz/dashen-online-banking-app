// A standalone authentication system that doesn't rely on NextAuth or crypto

// Demo user for authentication
export const DEMO_USER = {
  id: "user-1",
  email: "abebe@gmail.com",
  name: "Abebe Kebede",
  password: "password123", // In a real app, this would be hashed
}

// Authenticate a user with email and password
export function authenticateUser(email: string, password: string) {
  console.log(`Authenticating user: ${email}`)

  // For demo purposes, only check against the hardcoded user
  if (email === DEMO_USER.email && password === DEMO_USER.password) {
    // Return user without the password
    const { password: _, ...userWithoutPassword } = DEMO_USER
    console.log("Authentication successful")
    return { success: true, user: userWithoutPassword }
  }

  console.log("Authentication failed")
  return { success: false, error: "Invalid email or password" }
}

// Create a simple session token
export function createSessionToken(user: { id: string; email: string }) {
  // For demo purposes, just create a simple token
  return `session_${user.id}_${Date.now()}`
}

// Validate a session token
export function validateSession(token: string) {
  try {
    // For demo purposes, just check if the token contains the user ID
    if (token && typeof token === "string" && token.includes(DEMO_USER.id)) {
      const { password: _, ...userWithoutPassword } = DEMO_USER
      return { valid: true, user: userWithoutPassword }
    }
    return { valid: false, user: null }
  } catch (error) {
    console.error("Session validation error:", error)
    return { valid: false, user: null, error: "Invalid session" }
  }
}
