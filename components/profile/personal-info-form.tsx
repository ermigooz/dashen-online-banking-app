"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Loader2, AlertCircle, Info } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { getMockData } from "@/lib/mock-api"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(10, {
    message: "Phone number must be at least 10 digits.",
  }),
  address: z.string().min(5, {
    message: "Address must be at least 5 characters.",
  }),
})

interface PersonalInfoFormProps {
  user: {
    name?: string
    email?: string
  }
}

export default function PersonalInfoForm({ user }: PersonalInfoFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [usedFallbackData, setUsedFallbackData] = useState(false)
  const { toast } = useToast()

  // Initialize form with user data
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      phone: "",
      address: "",
    },
  })

  // Fetch profile data
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setError(null)
        setUsedFallbackData(false)
        console.log("Fetching profile data...")

        const response = await fetch("/api/profile", {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
          // Include credentials to send cookies
          credentials: "include",
        })

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const data = await response.json()
        console.log("Profile data received:", data)

        form.reset({
          name: data.name || user?.name || "",
          email: data.email || user?.email || "",
          phone: data.phone || "+251911234567",
          address: data.address || "Addis Ababa, Ethiopia",
        })
      } catch (error) {
        console.error("Error fetching profile:", error)
        setError("Failed to load profile data. Using default values.")
        setUsedFallbackData(true)

        // Get fallback data from mock data
        const fallbackData = getMockData("profile")

        // Still set form values with fallback data
        form.reset({
          name: user?.name || fallbackData.name || "Abebe Kebede",
          email: user?.email || fallbackData.email || "abebe@gmail.com",
          phone: fallbackData.phone || "+251911234567",
          address: fallbackData.address || "Addis Ababa, Ethiopia",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [form, user])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    setError(null)

    try {
      console.log("Submitting profile update:", values)

      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify(values),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `HTTP error! Status: ${response.status}`)
      }

      const result = await response.json()
      console.log("Profile update response:", result)

      toast({
        title: "Profile updated",
        description: "Your personal information has been updated successfully.",
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      setError(`Failed to update profile: ${error instanceof Error ? error.message : "Unknown error"}`)
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
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
      <h3 className="text-xl font-semibold mb-4">Personal Information</h3>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {usedFallbackData && !error && (
        <Alert variant="default" className="mb-4 bg-amber-50 border-amber-200">
          <Info className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            Using demo data. In a production environment, this would display your actual profile information.
          </AlertDescription>
        </Alert>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Your email address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="Your address" className="resize-none" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </form>
      </Form>
    </div>
  )
}
