"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Loader2 } from "lucide-react"
import LoginPrompt from "./login-prompt"

interface ProtectedRouteProps {
  children: React.ReactNode
  redirectTo?: string
  showLoginPrompt?: boolean
}

export default function ProtectedRoute({
  children,
  redirectTo = "/auth/login",
  showLoginPrompt = true,
}: ProtectedRouteProps) {
  const router = useRouter()
  const { user, loading, isAuthenticated } = useAuth()
  const [authChecked, setAuthChecked] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    // Only proceed if loading is complete
    if (!loading) {
      console.log("ProtectedRoute - Auth state:", { isAuthenticated, loading })

      // If user is not authenticated and we should redirect
      if (!isAuthenticated && !showLoginPrompt && !isRedirecting) {
        setIsRedirecting(true)

        // Get current path for callback URL
        const currentPath = window.location.pathname
        const redirectUrl = `${redirectTo}?callbackUrl=${encodeURIComponent(currentPath)}`

        console.log("Redirecting to:", redirectUrl)

        // Add a small delay to prevent rapid redirects
        setTimeout(() => {
          router.push(redirectUrl)
        }, 100)
      }

      setAuthChecked(true)
    }
  }, [isAuthenticated, loading, redirectTo, router, showLoginPrompt, isRedirecting])

  // Show loading state while checking authentication
  if (loading || !authChecked) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-8rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Verifying authentication...</p>
      </div>
    )
  }

  // If not authenticated and showing login prompt is enabled
  if (!isAuthenticated && showLoginPrompt) {
    return <LoginPrompt redirectPath={redirectTo} />
  }

  // If authenticated or redirect is in progress, render children
  return <>{children}</>
}
