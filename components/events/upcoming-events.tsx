"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, LinkIcon, Clock } from "lucide-react"
import { format } from "date-fns"
import Link from "next/link"

type Event = {
  id: string
  title: string
  description: string
  event_type: string
  location: string
  start_date: string
  end_date: string
  is_public: boolean
  virtual_link: string | null
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/events")
        if (!response.ok) {
          throw new Error("Failed to fetch events")
        }
        const data = await response.json()
        setEvents(data.events)
      } catch (err) {
        setError("Error loading events. Please try again later.")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  if (loading) {
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Upcoming Events</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="h-24 bg-gray-200 rounded-t-lg"></CardHeader>
              <CardContent className="space-y-2 py-4">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
              <CardFooter className="h-10 bg-gray-200 rounded-b-lg"></CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (events.length === 0) {
    return <div className="text-center py-8">No upcoming events scheduled at this time.</div>
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Upcoming Events</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                  <CardDescription className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    {format(new Date(event.start_date), "MMM d, yyyy")}
                  </CardDescription>
                </div>
                <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">{event.event_type}</span>
              </div>
            </CardHeader>
            <CardContent className="pb-2">
              <p className="text-sm line-clamp-2">{event.description}</p>
              <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                {event.location && (
                  <div className="flex items-center">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{event.location}</span>
                  </div>
                )}
                {event.virtual_link && (
                  <div className="flex items-center">
                    <LinkIcon className="h-4 w-4 mr-1" />
                    <span>Virtual event</span>
                  </div>
                )}
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>
                    {format(new Date(event.start_date), "h:mm a")} -
                    {event.end_date ? format(new Date(event.end_date), " h:mm a") : " TBD"}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-2">
              <Link href={`/events/${event.id}`} className="w-full">
                <Button variant="outline" className="w-full">
                  View Details
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
