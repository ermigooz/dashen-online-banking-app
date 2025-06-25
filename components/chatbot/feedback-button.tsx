"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface FeedbackButtonProps {
  messageId: string
  response: string
}

export function FeedbackButton({ messageId, response }: FeedbackButtonProps) {
  const [feedback, setFeedback] = useState<"positive" | "negative" | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const submitFeedback = async (type: "positive" | "negative") => {
    if (isSubmitting) return

    setIsSubmitting(true)
    setFeedback(type)

    try {
      await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messageId,
          response,
          feedback: type,
        }),
      })
    } catch (error) {
      console.error("Error submitting feedback:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center gap-1 mt-1">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={`h-6 w-6 rounded-full p-0 ${feedback === "positive" ? "text-green-500" : "text-muted-foreground"}`}
              onClick={() => submitFeedback("positive")}
              disabled={feedback !== null}
            >
              <ThumbsUp className="h-3 w-3" />
              <span className="sr-only">Good response</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Good response</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={`h-6 w-6 rounded-full p-0 ${feedback === "negative" ? "text-red-500" : "text-muted-foreground"}`}
              onClick={() => submitFeedback("negative")}
              disabled={feedback !== null}
            >
              <ThumbsDown className="h-3 w-3" />
              <span className="sr-only">Bad response</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Bad response</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {feedback && <span className="text-xs text-muted-foreground ml-1">Thank you for your feedback</span>}
    </div>
  )
}
