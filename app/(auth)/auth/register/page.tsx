"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { ArrowLeft, Loader2, Check } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("personal")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // For demo purposes, just redirect to login
      router.push("/auth/login?registered=true")
    } catch (error) {
      console.error("Registration error:", error)
      setError("An unexpected error occurred")
    } finally {
      setIsLoading(false)
    }
  }

  const nextStep = () => {
    if (activeTab === "personal") {
      // Validate personal info
      if (!formData.fullName || !formData.email || !formData.phone) {
        setError("Please fill in all required fields")
        return
      }
      setActiveTab("security")
    }
  }

  const prevStep = () => {
    if (activeTab === "security") {
      setActiveTab("personal")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-dashen-red/5 via-dashen-lightRed/10 to-white" />

        {/* Animated shapes */}
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 rounded-full bg-dashen-red/10 blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-dashen-lightRed/10 blur-3xl"
          animate={{
            x: [0, -70, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.2]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-2 shadow-lg overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 gradient-animation" />

          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 flex items-center justify-center">
                <Image
                  src="/images/dashen-logo.png"
                  alt="Dashen Bank Logo"
                  width={64}
                  height={64}
                  className="logo-glow"
                />
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-center">Create Your Account</CardTitle>
            <CardDescription className="text-center">Join Dashen Bank's diaspora community</CardDescription>
          </CardHeader>

          <CardContent>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <ExclamationTriangleIcon className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="personal" disabled={isLoading}>
                  Personal Info
                </TabsTrigger>
                <TabsTrigger value="security" disabled={isLoading}>
                  Security
                </TabsTrigger>
              </TabsList>

              <TabsContent value="personal">
                <form className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">
                      Full Name <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-dashen-red/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-dashen-red/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">
                      Phone Number <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      placeholder="+1 (555) 123-4567"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-dashen-red/50"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        name="country"
                        placeholder="United States"
                        value={formData.country}
                        onChange={handleChange}
                        className="transition-all duration-200 focus:ring-2 focus:ring-dashen-red/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="New York"
                        value={formData.city}
                        onChange={handleChange}
                        className="transition-all duration-200 focus:ring-2 focus:ring-dashen-red/50"
                      />
                    </div>
                  </div>

                  <Button
                    type="button"
                    onClick={nextStep}
                    className="w-full bg-gradient-to-r from-dashen-red to-dashen-lightRed hover:opacity-90"
                  >
                    Continue
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="security">
                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">
                      Password <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-dashen-red/50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm Password <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="transition-all duration-200 focus:ring-2 focus:ring-dashen-red/50"
                    />
                  </div>

                  <div className="pt-2 flex gap-3">
                    <Button type="button" variant="outline" onClick={prevStep} disabled={isLoading} className="flex-1">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>

                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-gradient-to-r from-dashen-red to-dashen-lightRed hover:opacity-90"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Creating...
                        </>
                      ) : (
                        <>
                          <Check className="mr-2 h-4 w-4" />
                          Create Account
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <div className="text-sm text-center">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-dashen-red hover:underline font-medium">
                Sign In
              </Link>
            </div>
          </CardFooter>
        </Card>

        <div className="mt-4 text-center">
          <Button asChild variant="link" className="text-muted-foreground hover:text-dashen-red">
            <Link href="/home">Continue as Guest</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  )
}
