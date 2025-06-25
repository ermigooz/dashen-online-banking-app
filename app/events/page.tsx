"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, MapPin, Video, Filter, Clock } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import EventRegistrationButton from "@/components/events/event-registration-button"

// Mock event data
const mockEvents = [
  {
    id: "1",
    title: "Annual Shareholders Meeting",
    description: "Join us for the annual shareholders meeting to discuss performance and future plans.",
    event_type: "meeting",
    start_date: "2023-12-15T09:00:00Z",
    end_date: "2023-12-15T12:00:00Z",
    location: "Abba Headquarters, Addis Ababa",
    virtual_link: "https://zoom.us/j/example",
    is_public: true,
  },
  {
    id: "2",
    title: "Diaspora Investment Webinar",
    description: "Learn about new investment opportunities for diaspora shareholders.",
    event_type: "webinar",
    start_date: "2023-11-20T15:00:00Z",
    end_date: "2023-11-20T16:30:00Z",
    location: null,
    virtual_link: "https://zoom.us/j/example2",
    is_public: true,
  },
  {
    id: "3",
    title: "Q3 Financial Results Announcement",
    description: "Presentation of the third quarter financial results for the fiscal year.",
    event_type: "announcement",
    start_date: "2023-10-30T10:00:00Z",
    end_date: null,
    location: null,
    virtual_link: null,
    is_public: true,
  },
  {
    id: "4",
    title: "Investment Strategies Workshop",
    description: "A workshop on effective investment strategies for shareholders.",
    event_type: "webinar",
    start_date: "2023-11-05T14:00:00Z",
    end_date: "2023-11-05T16:00:00Z",
    location: null,
    virtual_link: "https://zoom.us/j/example3",
    is_public: true,
  },
  {
    id: "5",
    title: "Branch Opening Ceremony",
    description: "Join us for the opening of our new branch in Bahir Dar.",
    event_type: "ceremony",
    start_date: "2023-11-12T10:00:00Z",
    end_date: "2023-11-12T12:00:00Z",
    location: "Bahir Dar City Center",
    virtual_link: null,
    is_public: true,
  },
]

// Mock registrations
const mockRegistrations = ["2", "5"] // IDs of events the user is registered for

export default function EventsPage() {
  const { user, loading } = useAuth()
  const [events, setEvents] = useState(mockEvents)
  const [registrations, setRegistrations] = useState(mockRegistrations)
  const [filter, setFilter] = useState("all")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Filter events based on type
  const filteredEvents = filter === "all" ? events : events.filter((event) => event.event_type === filter)

  // Sort events by date (upcoming first)
  const sortedEvents = [...filteredEvents].sort(
    (a, b) => new Date(a.start_date).getTime() - new Date(b.start_date).getTime(),
  )

  // Separate past and upcoming events
  const now = new Date()
  const upcomingEvents = sortedEvents.filter((event) => new Date(event.start_date) > now)
  const pastEvents = sortedEvents.filter((event) => new Date(event.start_date) <= now)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  if (isLoading) {
    return (
      <div className="container py-8 mt-16">
        <h1 className="text-3xl font-bold mb-6">Events & Webinars</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-5 bg-muted rounded w-1/3 animate-pulse"></div>
                <div className="h-4 w-4 bg-muted rounded-full animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-1/2 mb-2 animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-full mb-4 animate-pulse"></div>
                <div className="h-10 bg-muted rounded w-full animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 mt-16">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between mb-6"
      >
        <h1 className="text-3xl font-bold">Events & Webinars</h1>
        <div className="flex items-center space-x-2 mt-4 md:mt-0">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            className="bg-background border rounded-md px-3 py-1 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Events</option>
            <option value="meeting">Meetings</option>
            <option value="webinar">Webinars</option>
            <option value="announcement">Announcements</option>
            <option value="ceremony">Ceremonies</option>
          </select>
        </div>
      </motion.div>

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming">
          {upcomingEvents.length === 0 ? (
            <div className="text-center py-12 bg-muted/20 rounded-lg">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Upcoming Events</h3>
              <p className="text-muted-foreground mt-2">Check back later for new events or adjust your filter</p>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {upcomingEvents.map((event, index) => (
                <motion.div key={event.id} variants={item}>
                  <Card className="h-full flex flex-col overflow-hidden hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="bg-primary/10 p-2 rounded-md">
                          {event.event_type === "webinar" ? (
                            <Video className="h-5 w-5 text-zemen-red" />
                          ) : event.event_type === "meeting" ? (
                            <Calendar className="h-5 w-5 text-zemen-red" />
                          ) : (
                            <Calendar className="h-5 w-5 text-zemen-red" />
                          )}
                        </div>
                        <div className="text-sm font-medium capitalize">{event.event_type}</div>
                      </div>
                      <CardTitle className="mt-4">{event.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 inline" />
                        {new Date(event.start_date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="space-y-4 flex-1">
                        {event.description && <p className="text-sm text-muted-foreground">{event.description}</p>}

                        {event.location && (
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{event.location}</span>
                          </div>
                        )}

                        <div className="flex-1"></div>

                        {user ? (
                          <EventRegistrationButton event={event} isRegistered={registrations.includes(event.id)} />
                        ) : (
                          <Button className="w-full bg-zemen-red hover:bg-zemen-red/90 text-white" asChild>
                            <Link href="/auth/login?callbackUrl=/events">Login to Register</Link>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </TabsContent>

        <TabsContent value="past">
          {pastEvents.length === 0 ? (
            <div className="text-center py-12 bg-muted/20 rounded-lg">
              <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No Past Events</h3>
              <p className="text-muted-foreground mt-2">Check back later or adjust your filter</p>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
            >
              {pastEvents.map((event, index) => (
                <motion.div key={event.id} variants={item}>
                  <Card className="h-full flex flex-col overflow-hidden opacity-80 hover:opacity-100 transition-opacity">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="bg-muted p-2 rounded-md">
                          {event.event_type === "webinar" ? (
                            <Video className="h-5 w-5" />
                          ) : event.event_type === "meeting" ? (
                            <Calendar className="h-5 w-5" />
                          ) : (
                            <Calendar className="h-5 w-5" />
                          )}
                        </div>
                        <div className="text-sm font-medium capitalize">{event.event_type}</div>
                      </div>
                      <CardTitle className="mt-4">{event.title}</CardTitle>
                      <CardDescription className="flex items-center">
                        <Clock className="h-4 w-4 mr-1 inline" />
                        {new Date(event.start_date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 flex flex-col">
                      <div className="space-y-4 flex-1">
                        {event.description && <p className="text-sm text-muted-foreground">{event.description}</p>}

                        {event.location && (
                          <div className="flex items-center text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                            <span>{event.location}</span>
                          </div>
                        )}

                        <div className="flex-1"></div>

                        <Button className="w-full" variant="outline" disabled>
                          Event Completed
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
