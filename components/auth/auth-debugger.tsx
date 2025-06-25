"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, ChevronUp, RefreshCw } from "lucide-react"

export default function AuthDebugger() {
  const { user, loading, isAuthenticated } = useAuth()
  const [isOpen, setIsOpen] = useState(false)
  const [cookies, setCookies] = useState<string[]>([])
  const [sessionData, setSessionData] = useState<string | null>(null)

  // Only show in development
  const [showDebugger, setShowDebugger] = useState(false)

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setShowDebugger(true)
    }
  }, [])

  useEffect(() => {
    // Get all cookies
    if (typeof document !== "undefined") {
      setCookies(document.cookie.split(";").map((cookie) => cookie.trim()))
    }

    // Get session storage
    if (typeof window !== "undefined") {
      setSessionData(window.sessionStorage.getItem("user"))
    }
  }, [isOpen])

  const refreshAuthState = async () => {
    // Force a refresh of the auth state by calling the API
    try {
      const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
        headers: {
          "Cache-Control": "no-cache",
        },
      })

      if (response.ok) {
        const data = await response.json()
        console.log("Auth state refreshed:", data)

        // Refresh cookies and session data
        if (typeof document !== "undefined") {
          setCookies(document.cookie.split(";").map((cookie) => cookie.trim()))
        }

        if (typeof window !== "undefined") {
          setSessionData(window.sessionStorage.getItem("user"))
        }
      }
    } catch (error) {
      console.error("Error refreshing auth state:", error)
    }
  }

  if (!showDebugger) return null

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <Card className="w-80 shadow-lg border-2 border-amber-400">
          <CardHeader className="p-3 bg-amber-50 flex flex-row items-center justify-between">
            <CardTitle className="text-sm font-medium">Auth Debugger</CardTitle>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={refreshAuthState}>
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-3 text-xs space-y-3">
            <div>
              <div className="font-semibold mb-1">Auth State:</div>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <span>Loading:</span>
                  <Badge variant={loading ? "default" : "outline"}>{loading ? "True" : "False"}</Badge>
                </div>
                <div className="flex justify-between">
                  <span>Authenticated:</span>
                  <Badge variant={isAuthenticated ? "success" : "destructive"}>
                    {isAuthenticated ? "True" : "False"}
                  </Badge>
                </div>
              </div>
            </div>

            <div>
              <div className="font-semibold mb-1">User:</div>
              {user ? (
                <div className="bg-muted p-2 rounded text-xs overflow-auto max-h-20">
                  <pre>{JSON.stringify(user, null, 2)}</pre>
                </div>
              ) : (
                <div className="text-muted-foreground italic">No user data</div>
              )}
            </div>

            <div>
              <div className="font-semibold mb-1">Cookies:</div>
              {cookies.length > 0 ? (
                <div className="bg-muted p-2 rounded text-xs overflow-auto max-h-20">
                  {cookies.map((cookie, index) => (
                    <div key={index} className="mb-1 last:mb-0">
                      {cookie}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-muted-foreground italic">No cookies found</div>
              )}
            </div>

            <div>
              <div className="font-semibold mb-1">Session Storage:</div>
              {sessionData ? (
                <div className="bg-muted p-2 rounded text-xs overflow-auto max-h-20">
                  <pre>{JSON.stringify(JSON.parse(sessionData), null, 2)}</pre>
                </div>
              ) : (
                <div className="text-muted-foreground italic">No session data found</div>
              )}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Button
          onClick={() => setIsOpen(true)}
          variant="outline"
          size="sm"
          className="bg-amber-50 border-amber-400 hover:bg-amber-100"
        >
          <ChevronUp className="h-4 w-4 mr-1" />
          Auth Debug
        </Button>
      )}
    </div>
  )
}
