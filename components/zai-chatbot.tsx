"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useAuth } from "@/components/auth-provider"
import { Loader2, Send, X, ChevronUp, ChevronDown, MessageSquare } from "lucide-react"

type Message = {
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

// Mock responses for the ZaI chatbot
const mockResponses: Record<string, string> = {
  hello: "Hello! I'm ZaI, your Zemen Bank AI assistant. How can I help you today?",
  hi: "Hi there! I'm ZaI, your Zemen Bank AI assistant. How can I help you today?",
  "how are you": "I'm functioning well, thank you for asking! How can I assist you with Zemen Bank services today?",
  "what is zemen bank":
    "Zemen Bank is a private commercial bank in Ethiopia established in 2008. It operates under a unique 'one branch' model with a main branch in Addis Ababa and service centers throughout the country, offering comprehensive banking services to individuals and businesses.",
  shares:
    "Zemen Bank shares are currently trading on the secondary market. Shareholders receive dividends annually based on the bank's performance. For the most current share value, please contact our shareholder services department.",
  dividends:
    "Zemen Bank distributes dividends annually after the fiscal year ends. The dividend amount varies based on the bank's performance and is approved by the board of directors. Last year, shareholders received competitive returns on their investment.",
  branches:
    "Zemen Bank operates with a unique 'one branch' model, with its main branch in Addis Ababa and multiple service centers across Ethiopia. Our banking centers provide full-service banking with extended hours, and we also offer comprehensive digital banking services.",
  "mobile banking":
    "Zemen Bank offers a comprehensive mobile banking app called 'ZemenMobile' that allows you to check balances, transfer money, pay bills, and more. You can download it from the App Store or Google Play Store.",
  "account types":
    "Zemen Bank offers various account types including savings accounts, checking accounts, fixed deposit accounts, and special accounts for youth and seniors. Each has different features and benefits tailored to your needs.",
  loans:
    "Zemen Bank provides various loan products including personal loans, business loans, mortgage loans, and agricultural loans. Our interest rates are competitive and terms are flexible based on your needs.",
  contact:
    "You can contact Zemen Bank customer service at +251-116-661-380 or email info@zemenbank.com. Our main branch is located at Kazanchis (near Zemen Building), Addis Ababa, Ethiopia.",
  investment:
    "Zemen Bank offers various investment opportunities including fixed deposits, treasury bills, and share purchases. Our current annual return rates are competitive depending on the investment type and duration.",
  "exchange rate":
    "Zemen Bank provides competitive foreign exchange services. Current exchange rates are updated daily on our website and mobile app. For major currencies like USD, EUR, and GBP, we offer special rates for large transactions.",
  atm: "Zemen Bank has ATMs located throughout Ethiopia. You can withdraw cash, check your balance, and make deposits at our ATMs. Daily withdrawal limits apply based on your account type.",
  "online banking":
    "Zemen Bank's online banking platform 'ZemenConnect' allows you to manage your accounts, transfer funds, pay bills, and more from your computer. To register, visit our website or any banking center with your account details and valid ID.",
}

export default function ZaIChatbot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()

  // Quick reply options
  const quickReplies = [
    "What services does Zemen Bank offer?",
    "How can I check my share value?",
    "When are dividends distributed?",
    "How do I open an account?",
    "Where are your branches located?",
  ]

  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Replace the entire useEffect for Chatbase initialization with this improved version:

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

    // Ensure Chatbase is properly configured
    if (typeof window !== "undefined") {
      window.chatbaseConfig = {
        chatbotId: "e_Bz-nHLJzJWVM5wsvD2v",
        domain: "www.chatbase.co",
      }
    }

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

  // Send welcome message when chat is first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "assistant",
          content: "Hello! I'm ZaI, your Zemen Bank AI assistant. How can I help you today?",
          timestamp: new Date(),
        },
      ])
    }
  }, [isOpen, messages.length])

  // Handle sending a message
  const handleSend = async (message: string = input) => {
    if (!message.trim()) return

    // Add user message to chat
    const userMessage: Message = {
      role: "user",
      content: message,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // Simple keyword matching for mock responses
      const lowerMessage = message.toLowerCase()
      let botResponse =
        "I'm sorry, I don't have information about that yet. Please contact our support team for assistance at +251-116-661-380 or email info@zemenbank.com."

      // Check for keyword matches in our mock responses
      for (const [keyword, response] of Object.entries(mockResponses)) {
        if (lowerMessage.includes(keyword)) {
          botResponse = response
          break
        }
      }

      // Add assistant response to chat after a small delay to simulate thinking
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: botResponse,
            timestamp: new Date(),
          },
        ])
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error getting response:", error)

      // Add error message to chat
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
          timestamp: new Date(),
        },
      ])
      setIsLoading(false)
    }
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSend()
  }

  // Toggle chat open/closed
  const toggleChat = () => {
    setIsOpen(!isOpen)
    setIsMinimized(false)
  }

  // Toggle chat minimized/maximized
  const toggleMinimize = () => {
    setIsMinimized(!isMinimized)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat button */}
      {!isOpen && (
        <Button
          onClick={toggleChat}
          className="rounded-full w-14 h-14 shadow-lg bg-zemen-red hover:bg-zemen-darkRed text-white"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {/* Chat window */}
      {isOpen && (
        <Card className="w-80 sm:w-96 shadow-lg border-zemen-red/20">
          <CardHeader className="p-3 border-b flex flex-row items-center justify-between bg-zemen-red text-white">
            <div className="flex items-center">
              <Avatar className="h-8 w-8 mr-2">
                <AvatarFallback className="bg-white text-zemen-red flex items-center justify-center h-full w-full font-bold">
                  ZaI
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">ZaI</h3>
                <p className="text-xs">Zemen Bank Assistant</p>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMinimize}
                className="h-8 w-8 rounded-full hover:bg-white/20"
              >
                {isMinimized ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-full hover:bg-white/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>

          {!isMinimized && (
            <>
              <CardContent className="p-3 h-80 overflow-y-auto">
                {messages.map((message, index) => (
                  <div key={index} className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.role === "user" ? "bg-zemen-red text-white" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-muted rounded-lg p-3">
                      <Loader2 className="h-5 w-5 animate-spin" />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </CardContent>

              {/* Quick replies */}
              {messages.length === 1 && messages[0].role === "assistant" && (
                <div className="px-3 pb-2">
                  <p className="text-xs text-muted-foreground mb-2">Quick replies:</p>
                  <div className="flex flex-wrap gap-2">
                    {quickReplies.slice(0, 3).map((reply, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs py-1 h-auto text-zemen-red border-zemen-red hover:bg-zemen-red/10"
                        onClick={() => handleSend(reply)}
                      >
                        {reply}
                      </Button>
                    ))}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs py-1 h-auto text-zemen-red border-zemen-red hover:bg-zemen-red/10"
                        >
                          More...
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-60 p-2">
                        <div className="flex flex-col gap-2">
                          {quickReplies.slice(3).map((reply, index) => (
                            <Button
                              key={index}
                              variant="ghost"
                              size="sm"
                              className="justify-start text-xs h-auto py-1"
                              onClick={() => {
                                handleSend(reply)
                              }}
                            >
                              {reply}
                            </Button>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              )}

              <CardFooter className="p-3 pt-0 border-t">
                <form onSubmit={handleSubmit} className="flex w-full gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading}
                    className="flex-1"
                  />
                  <Button
                    type="submit"
                    size="icon"
                    disabled={isLoading || !input.trim()}
                    className="shrink-0 bg-zemen-red hover:bg-zemen-darkRed text-white"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardFooter>
            </>
          )}
        </Card>
      )}
    </div>
  )
}
