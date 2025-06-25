"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, LogOut, Smartphone, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

const passwordFormSchema = z
  .object({
    currentPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    newPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirmPassword: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

export default function SecuritySettings() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  // Fetch security settings
  useEffect(() => {
    const fetchSecuritySettings = async () => {
      try {
        setError(null)
        console.log("Fetching security settings...")

        const response = await fetch("/api/profile/security", {
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
        console.log("Security settings received:", data)

        setTwoFactorEnabled(data.two_factor_enabled || false)
      } catch (error) {
        console.error("Error fetching security settings:", error)
        setError("Failed to load security settings. Using default values.")

        // Use default values
        setTwoFactorEnabled(false)
      } finally {
        setIsLoading(false)
      }
    }

    fetchSecuritySettings()
  }, [])

  async function onSubmit(values: z.infer<typeof passwordFormSchema>) {
    setIsSubmitting(true)
    setError(null)

    try {
      console.log("Submitting password update:", values)

      const response = await fetch("/api/profile/security", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const result = await response.json()
      console.log("Password update response:", result)

      form.reset()
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating password:", error)
      setError("Failed to update password. Please try again.")
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to update password. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleTwoFactorToggle = async (checked: boolean) => {
    try {
      setError(null)
      console.log("Toggling two-factor authentication:", checked)

      const response = await fetch("/api/profile/security/two-factor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          enabled: checked,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const result = await response.json()
      console.log("Two-factor toggle response:", result)

      setTwoFactorEnabled(checked)
      toast({
        title: checked ? "Two-factor authentication enabled" : "Two-factor authentication disabled",
        description: checked ? "Your account is now more secure." : "Two-factor authentication has been disabled.",
      })
    } catch (error) {
      console.error("Error updating two-factor authentication:", error)
      setError("Failed to update two-factor authentication. Please try again.")
      toast({
        title: "Error",
        description: "Failed to update two-factor authentication. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleLogoutOtherDevices = async () => {
    setIsLoggingOut(true)
    setError(null)

    try {
      console.log("Logging out from other devices...")

      const response = await fetch("/api/profile/security/logout-devices", {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const result = await response.json()
      console.log("Logout response:", result)

      toast({
        title: "Logged out from other devices",
        description: "You have been logged out from all other devices.",
      })
    } catch (error) {
      console.error("Error logging out from other devices:", error)
      setError("Failed to logout from other devices. Please try again.")
      toast({
        title: "Error",
        description: "Failed to logout from other devices. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoggingOut(false)
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
      <h3 className="text-xl font-semibold mb-4">Security Settings</h3>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        {/* Password Change Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Change Password</CardTitle>
            <CardDescription>Update your password to keep your account secure</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    "Update Password"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Two-Factor Authentication */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-green-600" />
                <CardTitle className="text-lg">Two-Factor Authentication</CardTitle>
              </div>
              <Switch checked={twoFactorEnabled} onCheckedChange={handleTwoFactorToggle} />
            </div>
            <CardDescription>Add an extra layer of security to your account</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              When two-factor authentication is enabled, you'll be required to enter a code sent to your phone in
              addition to your password when logging in.
            </p>
            {twoFactorEnabled && (
              <div className="mt-4 flex items-center">
                <Smartphone className="h-5 w-5 mr-2 text-muted-foreground" />
                <span className="text-sm">Verification method: SMS to +251 91 *** 5678</span>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Active Sessions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Active Sessions</CardTitle>
              <Button variant="outline" size="sm" onClick={handleLogoutOtherDevices} disabled={isLoggingOut}>
                {isLoggingOut ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout Other Devices
                  </>
                )}
              </Button>
            </div>
            <CardDescription>Manage your active sessions across devices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b">
                <div>
                  <p className="font-medium">Current Device</p>
                  <p className="text-sm text-muted-foreground">Chrome on Windows • Addis Ababa, Ethiopia</p>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">Active</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b">
                <div>
                  <p className="font-medium">iPhone 13</p>
                  <p className="text-sm text-muted-foreground">Safari on iOS • Last active 2 days ago</p>
                </div>
                <Button variant="ghost" size="sm" className="h-8 text-red-500 hover:text-red-600 hover:bg-red-50">
                  Revoke
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
