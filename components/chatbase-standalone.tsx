"use client"

import { useEffect } from "react"
import Script from "next/script"

export default function ChatbaseStandalone() {
  useEffect(() => {
    // Make sure Chatbase is properly configured in the global window object
    if (typeof window !== "undefined") {
      window.chatbaseConfig = {
        chatbotId: "e_Bz-nHLJzJWVM5wsvD2v",
        domain: "www.chatbase.co",
      }
    }

    return () => {
      // Clean up global variables on unmount
      if (typeof window !== "undefined") {
        delete window.chatbaseConfig
      }
    }
  }, [])

  return (
    <>
      {/* Use Next.js Script component for better loading */}
      <Script id="chatbase-config" strategy="afterInteractive">
        {`
          (function(){
            if(!window.chatbase||window.chatbase("getState")!=="initialized"){
              window.chatbase=(...arguments)=>{
                if(!window.chatbase.q){window.chatbase.q=[]}
                window.chatbase.q.push(arguments)
              };
              window.chatbase=new Proxy(window.chatbase,{
                get(target,prop){
                  if(prop==="q"){return target.q}
                  return(...args)=>target(prop,...args)
                }
              })
            }
          })();
        `}
      </Script>

      <Script
        id="chatbase-embed"
        src="https://www.chatbase.co/embed.min.js"
        strategy="afterInteractive"
        data-chatbotId="e_Bz-nHLJzJWVM5wsvD2v"
      />
    </>
  )
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
    chatbase: any
  }
}
