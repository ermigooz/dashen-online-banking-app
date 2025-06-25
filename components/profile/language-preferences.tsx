"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { Globe, Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function LanguagePreferences() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [language, setLanguage] = useState("english")
  const [dateFormat, setDateFormat] = useState("mm/dd/yyyy")
  const [currency, setCurrency] = useState("etb")
  const { toast } = useToast()

  // Fetch language preferences
  useEffect(() => {
    const fetchLanguagePreferences = async () => {
      try {
        setError(null)
        console.log("Fetching language preferences...")

        const response = await fetch("/api/profile/language", {
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
        console.log("Language preferences received:", data)

        setLanguage(data.language || "english")
        setDateFormat(data.date_format || "mm/dd/yyyy")
        setCurrency(data.currency || "etb")
      } catch (error) {
        console.error("Error fetching language preferences:", error)
        setError("Failed to load language preferences. Using default values.")

        // Keep default values
      } finally {
        setIsLoading(false)
      }
    }

    fetchLanguagePreferences()
  }, [])

  const handleSaveLanguage = async () => {
    setIsSubmitting(true)
    setError(null)

    try {
      console.log("Saving language preferences:", { language, dateFormat, currency })

      const response = await fetch("/api/profile/language", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
          dateFormat,
          currency,
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const result = await response.json()
      console.log("Save language preferences response:", result)

      toast({
        title: "Language preference updated",
        description: "Your language preference has been saved successfully.",
      })
    } catch (error) {
      console.error("Error updating language preferences:", error)
      setError("Failed to update language preferences. Please try again.")
      toast({
        title: "Error",
        description: "Failed to update language preferences. Please try again.",
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
      <h3 className="text-xl font-semibold mb-4">Language Preferences</h3>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-blue-600" />
            <CardTitle className="text-lg">Select Your Preferred Language</CardTitle>
          </div>
          <CardDescription>Choose the language you want to use across the platform</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={language} onValueChange={setLanguage} className="space-y-4">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="english" id="english" />
              <Label htmlFor="english" className="flex items-center">
                <img src="/placeholder.svg?height=20&width=30" alt="English" className="w-5 h-4 mr-2 rounded-sm" />
                English
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="amharic" id="amharic" />
              <Label htmlFor="amharic" className="flex items-center">
                <img src="/placeholder.svg?height=20&width=30" alt="Amharic" className="w-5 h-4 mr-2 rounded-sm" />
                Amharic (አማርኛ)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="tigrinya" id="tigrinya" />
              <Label htmlFor="tigrinya" className="flex items-center">
                <img src="/placeholder.svg?height=20&width=30" alt="Tigrinya" className="w-5 h-4 mr-2 rounded-sm" />
                Tigrinya (ትግርኛ)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <RadioGroupItem value="oromo" id="oromo" />
              <Label htmlFor="oromo" className="flex items-center">
                <img src="/placeholder.svg?height=20&width=30" alt="Oromo" className="w-5 h-4 mr-2 rounded-sm" />
                Oromo (Afaan Oromoo)
              </Label>
            </div>
          </RadioGroup>

          <div className="mt-6">
            <Button onClick={handleSaveLanguage} disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Language Preference"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-lg">Language Settings</CardTitle>
          <CardDescription>Additional language configuration options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="date-format">Date Format</Label>
              <select
                id="date-format"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={dateFormat}
                onChange={(e) => setDateFormat(e.target.value)}
              >
                <option value="mm/dd/yyyy">MM/DD/YYYY</option>
                <option value="dd/mm/yyyy">DD/MM/YYYY</option>
                <option value="yyyy-mm-dd">YYYY-MM-DD</option>
              </select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="currency">Currency Display</Label>
              <select
                id="currency"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <option value="etb">Ethiopian Birr (ETB)</option>
                <option value="usd">US Dollar (USD)</option>
                <option value="eur">Euro (EUR)</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
