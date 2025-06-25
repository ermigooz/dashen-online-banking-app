"use client"

import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, DollarSign, Info } from "lucide-react"
import { formatDate } from "@/lib/utils"

// Define the Notification type
interface Notification {
  id: string
  shareholder_id: string
  title: string
  message: string
  notification_type: string
  related_entity_id: string | null
  is_read: boolean
  created_at: string
}

export default function NotificationsContent() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=/notifications")
      return
    }

    if (status === "authenticated") {
      // For demo purposes, use mock data
      const mockNotifications: Notification[] = [
        {
          id: "1",
          shareholder_id: "user-1",
          title: "Dividend Payment",
          message: "Your semi-annual dividend of $3,750 has been processed.",
          notification_type: "dividend",
          related_entity_id: null,
          is_read: false,
          created_at: new Date().toISOString(),
        },
        {
          id: "2",
          shareholder_id: "user-1",
          title: "Annual Meeting",
          message: "The annual shareholders meeting is scheduled for December 15th.",
          notification_type: "event",
          related_entity_id: null,
          is_read: true,
          created_at: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        },
        {
          id: "3",
          shareholder_id: "user-1",
          title: "Share Certificate",
          message: "Your share certificate is now available for download.",
          notification_type: "transaction",
          related_entity_id: null,
          is_read: true,
          created_at: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        },
      ]

      setNotifications(mockNotifications)
      setLoading(false)
    }
  }, [status, router])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "dividend":
        return <DollarSign className="h-5 w-5" />
      case "event":
        return <Calendar className="h-5 w-5" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((notification) =>
        notification.id === id ? { ...notification, is_read: !notification.is_read } : notification,
      ),
    )
  }

  if (status === "loading" || loading) {
    return <NotificationsLoading />
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-destructive">Error</h3>
        <p className="text-muted-foreground mt-2">{error}</p>
      </div>
    )
  }

  if (notifications.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium">No notifications</h3>
        <p className="text-muted-foreground mt-2">You don't have any notifications yet.</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {notifications.map((notification) => (
        <div key={notification.id} className={`p-4 border rounded-lg ${!notification.is_read ? "bg-muted/20" : ""}`}>
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-2 rounded-md">{getNotificationIcon(notification.notification_type)}</div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium">{notification.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-xs text-muted-foreground">{formatDate(notification.created_at)}</span>
                  {!notification.is_read && (
                    <Badge variant="default" className="text-xs">
                      New
                    </Badge>
                  )}
                </div>
              </div>
              <div className="mt-4">
                <Button onClick={() => markAsRead(notification.id)} variant="outline" size="sm" className="text-xs">
                  {notification.is_read ? "Mark as unread" : "Mark as read"}
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

function NotificationsLoading() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-4 border rounded-lg animate-pulse">
          <div className="flex items-start gap-4">
            <div className="bg-muted h-10 w-10 rounded-md"></div>
            <div className="flex-1">
              <div className="h-5 bg-muted rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-muted rounded w-full mb-4"></div>
              <div className="h-8 bg-muted rounded w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
