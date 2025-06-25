"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Loader2 } from "lucide-react"
import LoginPrompt from "./login-prompt"

interface ProtectedRouteClientProps {
  children: React.ReactNode
  redirectTo?: string
}

export default function ProtectedRouteClient({ children, redirectTo = "/auth/login" }: ProtectedRouteClientProps) {
  const router = useRouter()
  const { user, loading, isAuthenticated, mounted } = useAuth()
  const [authChecked, setAuthChecked] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    // Only proceed if loading is complete and component is mounted
    if (mounted && !loading) {
      console.log("ProtectedRouteClient - Auth state:", { isAuthenticated, loading })
      setAuthChecked(true)

      // If user is not authenticated, show login prompt
      if (!isAuthenticated && !isRedirecting) {
        console.log("User not authenticated, showing login prompt")
      }
    }
  }, [isAuthenticated, loading, isRedirecting, mounted])

  // Show loading state while checking authentication or before mounting
  if (!mounted || loading || !authChecked) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-8rem)]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Verifying authentication...</p>
      </div>
    )
  }

  // If not authenticated, show login prompt
  if (!isAuthenticated) {
    return <LoginPrompt redirectPath={redirectTo} />
  }

  // If authenticated, render children
  return <>{children}</>
}
