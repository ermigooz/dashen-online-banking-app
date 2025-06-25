"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

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

// Mock notifications
const mockNotifications = [
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

export default function NotificationBell({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Simulate fetching notifications
    setTimeout(() => {
      setNotifications(mockNotifications)
      setUnreadCount(mockNotifications.filter((n) => !n.is_read).length)
      setIsLoading(false)
    }, 1000)
  }, [userId])

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, is_read: true } : notification)),
    )
    setUnreadCount((prev) => Math.max(0, prev - 1))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notification) => ({ ...notification, is_read: true })))
    setUnreadCount(0)
  }

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id)
    setIsOpen(false)

    // Navigate based on notification type
    if (notification.notification_type === "dividend" || notification.notification_type === "transaction") {
      router.push("/dashboard")
    } else if (notification.notification_type === "event") {
      router.push("/events")
    } else {
      router.push("/dashboard")
    }
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="absolute -top-1 -right-1"
              >
                <Badge
                  className="px-1.5 py-0.5 min-w-[18px] h-[18px] flex items-center justify-center"
                  variant="destructive"
                >
                  {unreadCount}
                </Badge>
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="end">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-medium">Notifications</h3>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="text-xs h-8">
              Mark all as read
            </Button>
          )}
        </div>
        <div className="max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-muted-foreground">Loading notifications...</div>
          ) : notifications.length === 0 ? (
            <div className="p-4 text-center text-muted-foreground">No notifications</div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b last:border-b-0 cursor-pointer hover:bg-muted/50 ${!notification.is_read ? "bg-muted/20" : ""}`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex justify-between items-start">
                  <h4 className="font-medium text-sm">{notification.title}</h4>
                  <span className="text-xs text-muted-foreground">
                    {new Date(notification.created_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
              </div>
            ))
          )}
        </div>
        <div className="p-2 border-t">
          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs"
            onClick={() => {
              setIsOpen(false)
              router.push("/notifications")
            }}
          >
            View all notifications
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
