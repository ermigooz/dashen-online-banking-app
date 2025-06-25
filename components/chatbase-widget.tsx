"use client"
import Script from "next/script"

export default function ChatbaseWidget() {
  return (
    <>
      {/* Use Next.js Script component for better error handling */}
      <Script id="chatbase-config" strategy="beforeInteractive">
        {`
          window.embeddedChatbotConfig = {
            chatbotId: "e_Bz-nHLJzJWVM5wsvD2v",
            domain: "www.chatbase.co"
          };
        `}
      </Script>

      <Script
        id="chatbase-embed"
        src="https://www.chatbase.co/embed.min.js"
        strategy="afterInteractive"
        onError={(e) => {
          console.error("Error loading Chatbase script:", e)
        }}
      />
    </>
  )
}
