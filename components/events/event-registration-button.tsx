"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Calendar, Video } from "lucide-react"
import type { Event } from "@/types/database"

interface EventRegistrationButtonProps {
  event: Event
  isRegistered: boolean
}

export default function EventRegistrationButton({ event, isRegistered }: EventRegistrationButtonProps) {
  const [loading, setLoading] = useState(false)
  const [registered, setRegistered] = useState(isRegistered)
  const { toast } = useToast()

  const handleRegistration = async () => {
    setLoading(true)

    try {
      const response = await fetch(`/api/events/${event.id}/register`, {
        method: "POST",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to register for event")
      }

      setRegistered(true)
      toast({
        title: "Registration successful",
        description: `You have been registered for "${event.title}"`,
      })
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCancelRegistration = async () => {
    setLoading(true)

    try {
      const response = await fetch(`/api/events/${event.id}/cancel`, {
        method: "POST",
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || "Failed to cancel registration")
      }

      setRegistered(false)
      toast({
        title: "Registration cancelled",
        description: `Your registration for "${event.title}" has been cancelled`,
      })
    } catch (error) {
      console.error("Cancellation error:", error)
      toast({
        title: "Cancellation failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  if (event.event_type === "webinar") {
    return (
      <Button
        className="w-full"
        disabled={loading}
        onClick={registered ? handleCancelRegistration : handleRegistration}
        variant={registered ? "outline" : "default"}
      >
        <Video className="h-4 w-4 mr-2" />
        {loading ? "Processing..." : registered ? "Cancel Registration" : "Register for Webinar"}
      </Button>
    )
  }

  return (
    <Button
      className="w-full"
      disabled={loading}
      onClick={registered ? handleCancelRegistration : handleRegistration}
      variant={registered ? "outline" : "default"}
    >
      <Calendar className="h-4 w-4 mr-2" />
      {loading ? "Processing..." : registered ? "Cancel Registration" : "Register for Event"}
    </Button>
  )
}
