"use client"

import type React from "react"
import { useState } from "react"
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
  const { login } = useAuth()
  const [email, setEmail] = useState("abebe@gmail.com")
  const [password, setPassword] = useState("password123")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Get the callback URL from the query parameters
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      // Use our standalone auth API
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (data.success) {
        // Call the login function from auth context
        login(data.user)
        setSuccess("Login successful! Redirecting...")

        // Short delay before redirect
        setTimeout(() => {
          router.push(callbackUrl)
        }, 500)
      } else {
        setError(data.error || "Authentication failed")
      }
    } catch (error) {
      console.error("Login error:", error)
      setError("An unexpected error occurred. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-gradient-to-b from-dashen-red/5 to-dashen-lightRed/5 page-transition">
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
              <div className="h-20 w-20 flex items-center justify-center">
                <Image
                  src="/images/dashen-logo.png"
                  alt="Dashen Bank Logo"
                  width={80}
                  height={80}
                  className="logo-glow"
                  priority
                />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
            <CardDescription className="text-center">Sign in to access your Dashen Bank account</CardDescription>
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
                  className="transition-all duration-200 focus:ring-2 focus:ring-dashen-red/50"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/auth/forgot-password" className="text-xs text-dashen-red hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="transition-all duration-200 focus:ring-2 focus:ring-dashen-red/50"
                />
              </div>

              <Button
                type="submit"
                className="w-full transition-all duration-200 hover:shadow-md bg-gradient-to-r from-dashen-red to-dashen-lightRed hover:opacity-90"
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
              <Link href="/auth/register" className="text-dashen-red hover:underline font-medium">
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
          <Button asChild variant="link" className="text-muted-foreground hover:text-dashen-red">
            <Link href="/home">Continue as Guest</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
