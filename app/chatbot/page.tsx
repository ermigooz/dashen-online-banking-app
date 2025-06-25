"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Bot, User, Loader2, RefreshCw, ThumbsUp, ThumbsDown } from "lucide-react"

// Mock AI responses
const mockResponses = {
  hello: "Hello! I'm Dashen Bank's AI assistant. How can I help you today?",
  hi: "Hi there! I'm Dashen Bank's AI assistant. How can I help you today?",
  "how are you": "I'm functioning well, thank you for asking! How can I assist you with Dashen Bank services today?",
  "what is dashen bank":
    "Dashen Bank is a financial institution in Ethiopia that offers various banking services including savings accounts, loans, and investment opportunities for both local and diaspora customers.",
  "how can i buy shares":
    "To purchase Dashen Bank shares, you need to complete a share purchase application form, provide identification documents, and make payment through one of our authorized channels. The minimum initial purchase is 10 shares. You can start this process online through your Diaspora Hub account or visit any Dashen Bank branch.",
  dividend:
    "Dashen Bank typically distributes dividends semi-annually, at the end of June and December, following approval by the board of directors. The dividend amount is calculated based on the bank's profit, the number of shares you own, and the dividend rate approved by the board. You can view your dividend history in the Dashboard section of the Diaspora Hub.",
  "share value":
    "The current share value is determined by the bank's board of directors based on financial performance, assets, and market conditions. The value is reviewed quarterly. For the most up-to-date share value, please check your Dashboard or contact our shareholder services department.",
  events:
    "Dashen Bank regularly hosts events for shareholders including annual general meetings, investment webinars, and financial education workshops. You can view all upcoming events in the Events & Webinars section of the Diaspora Hub. As a shareholder, you'll receive notifications about new events and can register directly through the platform.",
  "contact support":
    "You can contact Dashen Bank support through multiple channels: call our international line at +251 116 686 869, email us at support@dashen-hub.com, or use the contact form in the FAQs & Support section of the Diaspora Hub. Our support team is available Monday to Friday, 9:00 AM to 5:00 PM EAT (East Africa Time).",
}

interface Message {
  id: string
  content: string
  sender: "user" | "bot"
  timestamp: Date
}

export default function ChatbotPage() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hello! I'm Dashen Bank's AI assistant. How can I help you with your banking and investment questions today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSend = async () => {
    if (!input.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI thinking
    setTimeout(() => {
      // Find a response based on keywords in the input
      let botResponse =
        "I'm sorry, I don't have information about that yet. Please contact our support team for assistance."

      // Check for keyword matches in our mock responses
      for (const [keyword, response] of Object.entries(mockResponses)) {
        if (input.toLowerCase().includes(keyword)) {
          botResponse = response
          break
        }
      }

      const botMessage: Message = {
        id: Date.now().toString(),
        content: botResponse,
        sender: "bot",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const clearChat = () => {
    setMessages([
      {
        id: "welcome",
        content:
          "Hello! I'm Dashen Bank's AI assistant. How can I help you with your banking and investment questions today?",
        sender: "bot",
        timestamp: new Date(),
      },
    ])
  }

  return (
    <div className="container py-8 mt-16">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">AI Assistant</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Ask questions about Dashen Bank services, shareholding, dividends, and more.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <Card className="border-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-primary text-primary-foreground">ZB</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">Dashen Bank AI Assistant</CardTitle>
                  <CardDescription>Powered by AI</CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={clearChat} title="Clear chat">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[500px] overflow-y-auto p-4 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className={`flex max-w-[80%] ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                      <div className="flex-shrink-0 mt-1">
                        {message.sender === "user" ? (
                          <Avatar className="h-8 w-8 ml-2">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        ) : (
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback className="bg-primary text-primary-foreground">
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>
                      <div
                        className={`rounded-lg p-3 ${
                          message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                        <div className="mt-1 flex justify-between items-center">
                          <span className="text-xs opacity-70">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          {message.sender === "bot" && (
                            <div className="flex space-x-1">
                              <button className="text-xs opacity-70 hover:opacity-100">
                                <ThumbsUp className="h-3 w-3" />
                              </button>
                              <button className="text-xs opacity-70 hover:opacity-100">
                                <ThumbsDown className="h-3 w-3" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex justify-start"
                  >
                    <div className="flex max-w-[80%]">
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="rounded-lg p-3 bg-muted">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-center space-x-2">
              <Input
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isTyping}
                className="flex-1"
              />
              <Button type="submit" size="icon" disabled={isTyping || !input.trim()} onClick={handleSend}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            This AI assistant is currently available only in English and uses a free LLM model.
            <br />
            It can be trained with Dashen Bank-specific data for more accurate responses.
          </p>
        </div>
      </div>
    </div>
  )
}
