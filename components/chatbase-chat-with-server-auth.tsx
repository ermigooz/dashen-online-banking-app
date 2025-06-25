"use client"

import { useEffect } from "react"
import { useAuth } from "@/components/auth-provider"

export default function ChatbaseChat() {
  const { user } = useAuth()

  useEffect(() => {
    // Only proceed if we have a user
    if (!user) return

    const loadChatbase = async () => {
      try {
        // First, get the authentication data from our API
        const response = await fetch("/api/chatbase-auth")

        if (!response.ok) {
          console.error("Failed to authenticate with Chatbase")
          return
        }

        const authData = await response.json()

        // Create a global function to handle Chatbase initialization
        window.chatbaseConfig = {
          chatbotId: "e_Bz-nHLJzJWVM5wsvD2v",
          domain: "www.chatbase.co",
          identity: {
            userId: authData.userId,
            hmac: authData.hmac,
            userInfo: {
              email: authData.email,
              name: authData.name,
            },
          },
        }

        // Create and load the Chatbase script
        const script = document.createElement("script")
        script.src = "https://www.chatbase.co/embed.min.js"
        script.defer = true
        script.onload = () => {
          console.log("Chatbase script loaded successfully")
        }
        script.onerror = () => {
          console.error("Failed to load Chatbase script")
        }
        document.body.appendChild(script)
      } catch (error) {
        console.error("Error setting up Chatbase:", error)
      }
    }

    loadChatbase()

    // Cleanup function
    return () => {
      // Remove any Chatbase elements from the DOM
      const chatbaseElements = document.querySelectorAll('[id^="chatbase-"]')
      chatbaseElements.forEach((el) => el.remove())

      // Remove the script
      const scriptElement = document.querySelector('script[src="https://www.chatbase.co/embed.min.js"]')
      if (scriptElement) {
        scriptElement.remove()
      }

      // Clean up global variables
      delete window.chatbaseConfig
    }
  }, [user])

  return null // This component doesn't render anything visible
}

// Add TypeScript declaration for the chatbase global
declare global {
  interface Window {
    chatbaseConfig?: {
      chatbotId: string
      domain: string
      identity?: {
        userId: string
        hmac: string
        userInfo?: {
          email?: string
          name?: string
        }
      }
    }
  }
}
