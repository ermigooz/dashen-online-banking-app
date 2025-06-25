"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Mail, MessageSquare, Calendar, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function NotificationPreferences() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preferences, setPreferences] = useState({
    emailDividends: true,
    emailMeetings: true,
    emailPromotions: false,
    smsDividends: true,
    smsMeetings: false,
    smsPromotions: false,
    reminderDays: 3,
  })
  const { toast } = useToast()

  // Fetch notification preferences
  useEffect(() => {
    const fetchNotificationPreferences = async () => {
      try {
        setError(null)
        console.log("Fetching notification preferences...")

        const response = await fetch("/api/profile/notifications", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          credentials: "include",
        })

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()
        console.log("Notification preferences received:", data)

        setPreferences({
          emailDividends: data.email_dividends || true,
          emailMeetings: data.email_meetings || true,
          emailPromotions: data.email_promotions || false,
          smsDividends: data.sms_dividends || true,
          smsMeetings: data.sms_meetings || false,
          smsPromotions: data.sms_promotions || false,
          reminderDays: data.reminder_days || 3,
        })
      } catch (error) {
        console.error("Error fetching notification preferences:", error)
        setError("Failed to load notification preferences. Using default values.")

        // Keep default values
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotificationPreferences()
  }, [])

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences({
      ...preferences,
      [key]: !preferences[key],
    })
  }

  const handleReminderDays = (days: number) => {
    setPreferences({
      ...preferences,
      reminderDays: days,
    })
  }

  const handleSaveChanges = async () => {
    setIsSaving(true)
    setError(null)

    try {
      console.log("Saving notification preferences:", preferences)

      const response = await fetch("/api/profile/notifications", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferences),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const result = await response.json()
      console.log("Save notification preferences response:", result)

      toast({
        title: "Notification preferences updated",
        description: "Your notification preferences have been saved successfully.",
      })
    } catch (error) {
      console.error("Error updating notification preferences:", error)
      setError("Failed to update notification preferences. Please try again.")
      toast({
        title: "Error",
        description: "Failed to update notification preferences. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="p-6 flex justify-center items-center min-h-[300px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="p-6">
      <h3 className="text-xl font-semibold mb-4">Notification Preferences</h3>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        {/* Email Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 text-blue-600" />
              <CardTitle className="text-lg">Email Notifications</CardTitle>
            </div>
            <CardDescription>Manage the emails you want to receive</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dividend Announcements</p>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications about dividend payments and changes
                  </p>
                </div>
                <Switch checked={preferences.emailDividends} onCheckedChange={() => handleToggle("emailDividends")} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Shareholder Meetings</p>
                  <p className="text-sm text-muted-foreground">
                    Get notified about upcoming shareholder meetings and events
                  </p>
                </div>
                <Switch checked={preferences.emailMeetings} onCheckedChange={() => handleToggle("emailMeetings")} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Promotions & News</p>
                  <p className="text-sm text-muted-foreground">
                    Stay updated with bank promotions, news, and special offers
                  </p>
                </div>
                <Switch checked={preferences.emailPromotions} onCheckedChange={() => handleToggle("emailPromotions")} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* SMS Notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
              <CardTitle className="text-lg">SMS Notifications</CardTitle>
            </div>
            <CardDescription>Manage text messages sent to your phone</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Dividend Alerts</p>
                  <p className="text-sm text-muted-foreground">Receive SMS alerts when dividends are paid</p>
                </div>
                <Switch checked={preferences.smsDividends} onCheckedChange={() => handleToggle("smsDividends")} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Meeting Reminders</p>
                  <p className="text-sm text-muted-foreground">Get SMS reminders before shareholder meetings</p>
                </div>
                <Switch checked={preferences.smsMeetings} onCheckedChange={() => handleToggle("smsMeetings")} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Promotional Messages</p>
                  <p className="text-sm text-muted-foreground">Receive promotional offers and news via SMS</p>
                </div>
                <Switch checked={preferences.smsPromotions} onCheckedChange={() => handleToggle("smsPromotions")} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Event Reminders */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-purple-600" />
              <CardTitle className="text-lg">Event Reminders</CardTitle>
            </div>
            <CardDescription>Set custom reminders for important events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground mb-2">
                Choose how far in advance you'd like to be reminded about events
              </p>

              <div className="flex items-center space-x-2">
                <Button
                  variant={preferences.reminderDays === 1 ? "secondary" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => handleReminderDays(1)}
                >
                  1 day
                </Button>
                <Button
                  variant={preferences.reminderDays === 3 ? "secondary" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => handleReminderDays(3)}
                >
                  3 days
                </Button>
                <Button
                  variant={preferences.reminderDays === 7 ? "secondary" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => handleReminderDays(7)}
                >
                  1 week
                </Button>
                <Button
                  variant={preferences.reminderDays === 14 ? "secondary" : "outline"}
                  size="sm"
                  className="rounded-full"
                  onClick={() => handleReminderDays(14)}
                >
                  2 weeks
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button onClick={handleSaveChanges} disabled={isSaving}>
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Notification Preferences"
          )}
        </Button>
      </div>
    </div>
  )
}
