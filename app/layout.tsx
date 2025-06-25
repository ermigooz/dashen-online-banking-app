import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import ClientRootLayout from "./client-root-layout"
import { logEnvironmentStatus } from "@/lib/env-checker"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Zemen Bank - Diaspora Portal",
  description: "Connecting the Ethiopian diaspora with Zemen Bank's services",
  icons: {
    icon: "/favicon.ico",
    apple: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/zemen_logo-dMRcp6Y7guFgX2H5GUbZN2waKXfVpI.png",
  },
  generator: "v0.dev",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

// Log environment status on server startup
if (typeof window === "undefined") {
  logEnvironmentStatus()
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Add Chatbase script directly in head */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.embeddedChatbaseConfig = {
                chatbotId: "e_Bz-nHLJzJWVM5wsvD2v",
                domain: "www.chatbase.co"
              };
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ClientRootLayout>{children}</ClientRootLayout>
        </ThemeProvider>

        {/* Add Chatbase embed script at the end of body */}
        <Script
          src="https://www.chatbase.co/embed.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  )
}