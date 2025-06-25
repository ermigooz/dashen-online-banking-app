"use client"

import type React from "react"
import { AuthProvider } from "@/components/auth-provider"
// import AuthDebugger from "@/components/auth/auth-debugger" // Removed
import Header from "@/components/header"
import { Footer } from "@/components/footer"
import DaIChatbot from "@/components/dai-chatbot"
import ChatbaseWidget from "@/components/chatbase-widget"
import { useEffect, useState } from "react"
import { checkRequiredEnvVars } from "@/lib/env-checker"

function ClientRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Check environment variables on client side
  useEffect(() => {
    checkRequiredEnvVars()
  }, [])

  // Determine if we're in production
  const [isProduction, setIsProduction] = useState(false)

  useEffect(() => {
    // Check if we're in production
    setIsProduction(process.env.NODE_ENV === "production")
  }, [])

  return (
    <AuthProvider>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />

      {/* Always include Chatbase widget */}
      <ChatbaseWidget />

      {/* Only show DaI chatbot in development */}
      {!isProduction && <DaIChatbot />}

      {/* <AuthDebugger /> Removed */}
    </AuthProvider>
  )
}

export default ClientRootLayout
