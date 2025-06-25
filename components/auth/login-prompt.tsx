"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Lock } from "lucide-react"
import { motion } from "framer-motion"

interface LoginPromptProps {
  title?: string
  description?: string
  redirectPath?: string
}

export default function LoginPrompt({
  title = "Authentication Required",
  description = "You need to log in to access this page.",
  redirectPath = "/auth/login",
}: LoginPromptProps) {
  const router = useRouter()

  const handleLogin = () => {
    // Redirect to login page with a callback URL to return after login
    const currentPath = window.location.pathname
    router.push(`${redirectPath}?callbackUrl=${encodeURIComponent(currentPath)}`)
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-16rem)] p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 shadow-lg">
          <CardHeader className="text-center pb-2">
            <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="h-8 w-8 text-amber-600" />
            </div>
            <CardTitle className="text-2xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="text-center pt-4 pb-2">
            <p className="text-sm text-muted-foreground mb-4">
              Please log in to your account to view and manage your profile information.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center pb-6">
            <Button
              onClick={handleLogin}
              className="px-8 bg-gradient-to-r from-amhara-blue to-amhara-green hover:opacity-90"
            >
              Log In
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
