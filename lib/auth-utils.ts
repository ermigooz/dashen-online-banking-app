import { cookies } from "next/headers"
import { jwtVerify, SignJWT } from "jose"
import { v4 as uuidv4 } from "uuid"

// Secret key for JWT signing and verification
const getSecretKey = () => {
  const secret = process.env.NEXTAUTH_SECRET
  if (!secret || secret.length < 32) {
    // In production, we should fail if the secret is not properly set
    if (process.env.NODE_ENV === "production") {
      throw new Error("NEXTAUTH_SECRET must be set and be at least 32 characters long in production")
    }
    // For development, use a fallback but warn
    console.warn("WARNING: NEXTAUTH_SECRET is not set or is too short. Using fallback secret for development only.")
    return new TextEncoder().encode("fallback-secret-do-not-use-in-production-and-this-is-at-least-32-chars")
  }
  return new TextEncoder().encode(secret)
}

// JWT expiration time (24 hours)
const expTime = "24h"

// User type
export interface User {
  id: string
  email: string
  name: string
}

// Create a JWT token
export async function signToken(user: User): Promise<string> {
  console.log("Creating JWT token for user:", user.email)
  try {
    const secretKey = getSecretKey()
    const token = await new SignJWT({ user })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(expTime)
      .setJti(uuidv4()) // Add a unique identifier to prevent replay attacks
      .sign(secretKey)

    console.log("JWT token created successfully")
    return token
  } catch (error) {
    console.error("Error creating JWT token:", error)
    throw new Error("Failed to create authentication token")
  }
}

// Verify a JWT token
export async function verifyToken(token: string): Promise<User | null> {
  try {
    console.log("Verifying JWT token")
    const secretKey = getSecretKey()
    const { payload } = await jwtVerify(token, secretKey, {
      clockTolerance: 15, // Allow 15 seconds of clock skew
    })
    console.log("Token verified successfully, user:", payload.user)
    return payload.user as User
  } catch (error) {
    console.error("Token verification error:", error)
    return null
  }
}

// Get current user from cookie
export async function getCurrentUser(): Promise<User | null> {
  try {
    const cookieStore = cookies()
    const token = cookieStore.get("auth-token")?.value

    if (!token) {
      console.log("No auth-token cookie found")
      return null
    }

    console.log("Found auth-token cookie, verifying...")
    return verifyToken(token)
  } catch (error) {
    console.error("Error getting current user from cookie:", error)
    return null
  }
}

// Mock user database for demo purposes
export const MOCK_USERS = [
  {
    id: "user-1",
    email: "abebe@gmail.com",
    name: "Abebe Kebede",
    password: "password123", // In a real app, this would be hashed
  },
  {
    id: "user-2",
    email: "john.doe@example.com",
    name: "John Doe",
    password: "password123", // In a real app, this would be hashed
  },
  {
    id: "admin-1",
    email: "admin@amharabank.com",
    name: "Admin User",
    password: "admin123", // In a real app, this would be hashed
  },
]

// Helper function to find a user by credentials
export function findUserByCredentials(email: string, password: string): User | null {
  console.log(`Attempting to find user with email: ${email}`)

  const user = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password)

  if (user) {
    console.log(`User found: ${user.name}`)
    // Return user without the password
    const { password: _, ...userWithoutPassword } = user
    return userWithoutPassword as User
  }

  console.log("No matching user found")
  return null
}
