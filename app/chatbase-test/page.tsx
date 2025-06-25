"use client"
import { Button } from "@/components/ui/button"

export default function ChatbaseTestPage() {
  // Function to manually open the chatbot
  const openChatbot = () => {
    if (typeof window !== "undefined" && window.Chatbase) {
      window.Chatbase.open()
    } else {
      console.log("Chatbase not available yet")
    }
  }

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">Chatbase Test Page</h1>
      <p className="mb-4">
        This page tests the Chatbase integration. You should see a chat bubble in the bottom right corner.
      </p>

      <Button onClick={openChatbot} className="mt-4">
        Open Chatbot Manually
      </Button>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-xl font-bold mb-2">Troubleshooting</h2>
        <p>If you don't see the chat bubble:</p>
        <ul className="list-disc pl-5 mt-2 space-y-2">
          <li>Check the browser console for any errors</li>
          <li>Verify that the Chatbase scripts are loading correctly</li>
          <li>Try clearing your browser cache and refreshing</li>
          <li>Ensure there are no content blockers preventing the scripts from loading</li>
        </ul>
      </div>
    </div>
  )
}

// Add TypeScript declaration for the Chatbase global
declare global {
  interface Window {
    embeddedChatbotConfig?: {
      chatbotId: string
      domain: string
    }
    Chatbase?: {
      open: () => void
    }
  }
}
