"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Calendar, DollarSign, Info } from "lucide-react"

// Define the Notification type
interface Notification {
  id: string
  title: string
  message: string
  type: string
  isRead: boolean
  createdAt: string
}

export default function NotificationsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
      return
    }

    if (user) {
      // Mock data for demonstration
      const mockNotifications: Notification[] = [
        {
          id: "1",
          title: "Dividend Payment",
          message: "Your semi-annual dividend of $3,750 has been processed.",
          type: "dividend",
          isRead: false,
          createdAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Annual Meeting",
          message: "The annual shareholders meeting is scheduled for December 15th.",
          type: "event",
          isRead: true,
          createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
        },
        {
          id: "3",
          title: "Share Certificate",
          message: "Your share certificate is now available for download.",
          type: "transaction",
          isRead: true,
          createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
        },
      ]

      setNotifications(mockNotifications)
      setIsLoading(false)
    }
  }, [user, loading, router])

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
        notification.id === id ? { ...notification, isRead: !notification.isRead } : notification,
      ),
    )
  }

  if (loading || isLoading) {
    return (
      <div className="container py-8 mt-16">
        <h1 className="text-3xl font-bold mb-6">Notifications</h1>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              <span>All Notifications</span>
            </CardTitle>
            <CardDescription>Stay updated with important information about your shares and events</CardDescription>
          </CardHeader>
          <CardContent>
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
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8 mt-16">
      <h1 className="text-3xl font-bold mb-6">Notifications</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            <span>All Notifications</span>
          </CardTitle>
          <CardDescription>Stay updated with important information about your shares and events</CardDescription>
        </CardHeader>
        <CardContent>
          {notifications.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No notifications</h3>
              <p className="text-muted-foreground mt-2">You don't have any notifications yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border rounded-lg ${!notification.isRead ? "bg-muted/20" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-2 rounded-md">{getNotificationIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{notification.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="text-xs text-muted-foreground">
                            {new Date(notification.createdAt).toLocaleDateString()}
                          </span>
                          {!notification.isRead && (
                            <Badge variant="default" className="text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="mt-4">
                        <Button
                          onClick={() => markAsRead(notification.id)}
                          variant="outline"
                          size="sm"
                          className="text-xs"
                        >
                          {notification.isRead ? "Mark as unread" : "Mark as read"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
