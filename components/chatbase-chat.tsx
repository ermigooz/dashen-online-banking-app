"use client"

import { useEffect } from "react"

export default function ChatbaseChat() {
  useEffect(() => {
    // Create a script element for Chatbase
    const script = document.createElement("script")
    script.async = true
    script.defer = true

    // Use the exact script content provided by Chatbase
    script.textContent = `
      (function(){if(!window.chatbase||window.chatbase("getState")!=="initialized"){window.chatbase=(...arguments)=>{if(!window.chatbase.q){window.chatbase.q=[]}window.chatbase.q.push(arguments)};window.chatbase=new Proxy(window.chatbase,{get(target,prop){if(prop==="q"){return target.q}return(...args)=>target(prop,...args)}})}const onLoad=function(){const script=document.createElement("script");script.src="https://www.chatbase.co/embed.min.js";script.id="e_Bz-nHLJzJWVM5wsvD2v";script.domain="www.chatbase.co";document.body.appendChild(script)};if(document.readyState==="complete"){onLoad()}else{window.addEventListener("load",onLoad)}})();
    `

    // Append the script to the document
    document.head.appendChild(script)

    // Cleanup function
    return () => {
      if (script && script.parentNode) {
        script.parentNode.removeChild(script)
      }

      // Remove any Chatbase elements
      const chatbaseElements = document.querySelectorAll('[id^="chatbase-"]')
      chatbaseElements.forEach((el) => el.remove())
    }
  }, [])

  return null
}
