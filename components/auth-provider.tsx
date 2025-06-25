"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

// User type
interface User {
  id: string
  email: string
  name: string
}

// Auth context type
interface AuthContextType {
  user: User | null
  loading: boolean
  logout: () => void
  login: (user: User) => void
  isAuthenticated: boolean
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Auth provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check if user is logged in on initial load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("Checking authentication status...")

        // Try to get user from session storage first as a fallback
        let sessionUser = null
        try {
          const storedUser = sessionStorage.getItem("user")
          if (storedUser) {
            sessionUser = JSON.parse(storedUser)
            console.log("Found user in session storage:", sessionUser)
          }
        } catch (err) {
          console.log("No user in session storage or error reading it")
        }

        // Call our API to check if the user is authenticated
        const response = await fetch("/api/auth/me", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          // Include credentials to send cookies
          credentials: "include",
        })

        if (!response.ok) {
          console.warn(`Auth API returned status: ${response.status}`)

          // If we have a user in session storage, use that as fallback
          if (sessionUser) {
            console.log("Using session storage user as fallback")
            setUser(sessionUser)
            setIsAuthenticated(true)
          } else {
            setUser(null)
            setIsAuthenticated(false)
          }
          return
        }

        const data = await response.json()
        console.log("Auth check response:", data)

        if (data.authenticated && data.user) {
          setUser(data.user)
          setIsAuthenticated(true)

          // Update session storage
          try {
            sessionStorage.setItem("user", JSON.stringify(data.user))
          } catch (err) {
            console.error("Error storing user in session storage:", err)
          }
        } else {
          // If API says not authenticated but we have session user, prefer API
          setUser(null)
          setIsAuthenticated(false)

          // Clear session storage
          try {
            sessionStorage.removeItem("user")
          } catch (err) {
            console.error("Error clearing session storage:", err)
          }
        }
      } catch (error) {
        console.error("Error checking authentication:", error)

        // Try to recover from session storage
        try {
          const storedUser = sessionStorage.getItem("user")
          if (storedUser) {
            const sessionUser = JSON.parse(storedUser)
            console.log("Recovering from session storage after API error")
            setUser(sessionUser)
            setIsAuthenticated(true)
            return
          }
        } catch (err) {
          console.log("No recovery possible from session storage")
        }

        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Login function
  const login = (userData: User) => {
    console.log("Logging in user:", userData)
    // Set the user and authentication state
    setUser(userData)
    setIsAuthenticated(true)

    // Store user in session storage as a backup
    try {
      sessionStorage.setItem("user", JSON.stringify(userData))
    } catch (error) {
      console.error("Error storing user in session storage:", error)
    }
  }

  // Logout function
  const logout = async () => {
    console.log("Logging out...")
    try {
      // Call logout API
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })

      // Clear session storage
      try {
        sessionStorage.removeItem("user")
      } catch (error) {
        console.error("Error clearing session storage:", error)
      }

      // Reset state
      setUser(null)
      setIsAuthenticated(false)

      // Redirect to home
      window.location.href = "/"
    } catch (error) {
      console.error("Error logging out:", error)
      // Force a page reload as a fallback
      window.location.href = "/"
    }
  }

  return (
    <AuthContext.Provider value={{ user, loading, logout, login, isAuthenticated }}>{children}</AuthContext.Provider>
  )
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
