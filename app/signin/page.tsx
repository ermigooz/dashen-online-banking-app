"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ExclamationTriangleIcon, CheckCircledIcon } from "@radix-ui/react-icons"
import { useAuth } from "@/components/auth-provider"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { login, isAuthenticated, loading } = useAuth()
  const [email, setEmail] = useState("abebe@gmail.com")
  const [password, setPassword] = useState("password123")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Get the callback URL from the query parameters
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"

  // Check if already logged in
  useEffect(() => {
    // Only redirect if we're sure the user is authenticated and not still loading
    if (!loading && isAuthenticated) {
      console.log("User is authenticated, redirecting to:", callbackUrl)

      // Add a small delay to ensure state is fully updated before redirect
      setTimeout(() => {
        router.push(callbackUrl)
      }, 100)
    }

    // Check for success message from registration
    if (searchParams.get("registered") === "true") {
      setSuccess("Account created successfully! Please sign in.")
    }
  }, [isAuthenticated, loading, router, callbackUrl, searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      // For demo purposes, we'll just check if the credentials match our demo user
      if (email === "abebe@gmail.com" && password === "password123") {
        // Create user object
        const user = {
          id: "user-1",
          email: "abebe@gmail.com",
          name: "Abebe Kebede",
        }

        console.log("Login successful, calling login function")

        // Call the login function from auth context
        login(user)

        // Show success message
        setSuccess("Login successful! Redirecting...")

        // Don't redirect here - let the useEffect handle it
        return
      }

      // If credentials don't match, show error
      setError("Invalid email or password")
    } catch (error) {
      console.error("Login error:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-b from-amhara-green/5 to-amhara-blue/5 page-transition">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-4"
      >
        <Card className="border-2 shadow-lg overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 gradient-animation" />
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-r from-amhara-green to-amhara-blue flex items-center justify-center text-white text-2xl font-bold">
                <Image
                  src="/images/amhara-bank-logo.png"
                  alt="Amhara Bank Logo"
                  width={40}
                  height={40}
                  className="logo-glow"
                />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">Sign in to access your Amhara Bank account</CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-4 border-green-500 text-green-700 bg-green-50">
                <CheckCircledIcon className="h-4 w-4 text-green-600" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-amhara-green/50"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/auth/forgot-password" className="text-xs text-amhara-blue hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-amhara-green/50"
                />
              </div>

              <Button
                type="submit"
                className="w-full transition-all duration-200 hover:shadow-md bg-gradient-to-r from-amhara-green to-amhara-blue hover:opacity-90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 rounded-full border-2 border-primary-foreground border-t-transparent animate-spin"></div>
                    <span>Signing in...</span>
                  </div>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <div className="text-sm text-muted-foreground text-center">
              Don't have an account?{" "}
              <Link href="/auth/register" className="text-amhara-blue hover:underline font-medium">
                Create Account
              </Link>
            </div>

            <div className="text-sm text-muted-foreground text-center">
              For demo purposes, use:
              <div className="mt-1 p-2 bg-muted/50 rounded-md text-sm font-mono">
                <div>Email: abebe@gmail.com</div>
                <div>Password: password123</div>
              </div>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-4 text-center">
          <Button asChild variant="link" className="text-muted-foreground hover:text-amhara-blue">
            <Link href="/home">Continue as Guest</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
