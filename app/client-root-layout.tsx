"use client"

import type React from "react"
import { AuthProvider } from "@/components/auth-provider"
import AuthDebugger from "@/components/auth/auth-debugger"
import Header from "@/components/header"
import { Footer } from "@/components/footer"
import ZaIChatbot from "@/components/zai-chatbot"
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
    // Check if we're in production by looking at the hostname
    const hostname = window.location.hostname
    const isProd = !hostname.includes("localhost") && !hostname.includes("127.0.0.1")
    setIsProduction(isProd)
  }, [])

  return (
    <AuthProvider>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />

      {/* Always include Chatbase widget */}
      <ChatbaseWidget />

      {/* Only show ZaI chatbot in development */}
      {!isProduction && <ZaIChatbot />}

      <AuthDebugger />
    </AuthProvider>
  )
}

export default ClientRootLayout
