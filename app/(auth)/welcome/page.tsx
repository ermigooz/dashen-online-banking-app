"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { ChevronRight, ArrowRight } from "lucide-react"

export default function WelcomePage() {
  const router = useRouter()
  const { user } = useAuth()
  const [currentSlide, setCurrentSlide] = useState(0)

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      router.push("/dashboard")
    }
  }, [user, router])

  // Auto-advance slides
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentSlide((prev) => (prev === 2 ? 0 : prev + 1))
    }, 5000)
    return () => clearTimeout(timer)
  }, [currentSlide])

  const slides = [
    {
      title: "Welcome to Amhara Bank",
      description: "Your gateway to innovative banking solutions and investment opportunities",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-gbBlsZORHsMjhJSbq8Y69eyetOhAqU.png",
      color: "from-amhara-blue/20 to-amhara-lightBlue/30",
    },
    {
      title: "Invest in Your Future",
      description: "Join over 163,000 shareholders and be part of Ethiopia's growing economy",
      image: "/placeholder.svg?height=200&width=200",
      color: "from-amhara-lightBlue/20 to-amhara-blue/30",
    },
    {
      title: "Connect Globally",
      description: "Access your investments and banking services from anywhere in the world",
      image: "/placeholder.svg?height=200&width=200",
      color: "from-amhara-blue/30 to-amhara-lightBlue/20",
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-white to-amhara-blue/10" />

        {/* Animated circles */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-amhara-blue/10 blur-3xl"
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
          className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-amhara-lightBlue/10 blur-3xl"
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
        <motion.div
          className="absolute top-1/3 right-1/3 w-72 h-72 rounded-full bg-amhara-blue/10 blur-3xl"
          animate={{
            x: [0, 60, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative w-32 h-32 flex items-center justify-center"
            >
              <div
                className="absolute inset-0 rounded-full opacity-70"
                style={{
                  animation: "pulse 3s ease-in-out infinite",
                  boxShadow: "0 0 20px 10px rgba(0, 84, 166, 0.5)",
                }}
              />
              <Image
                src="/images/amhara-bank-logo.png"
                alt="Amhara Bank Logo"
                width={120}
                height={120}
                className="logo-glow relative z-10"
              />
            </motion.div>
          </div>

          {/* Slides */}
          <div className="relative h-80 mb-8">
            {slides.map((slide, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 100 }}
                animate={{
                  opacity: currentSlide === index ? 1 : 0,
                  x: currentSlide === index ? 0 : 100,
                  display: currentSlide === index ? "block" : "none",
                }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div
                  className={`h-full rounded-2xl overflow-hidden bg-gradient-to-br ${slide.color} p-6 flex flex-col items-center justify-center text-center shadow-lg border border-white/20`}
                >
                  <div className="mb-6">
                    <Image
                      src={slide.image || "/placeholder.svg"}
                      alt={slide.title}
                      width={100}
                      height={100}
                      className="mx-auto"
                    />
                  </div>
                  <h2 className="text-2xl font-bold mb-2 text-amhara-blue">{slide.title}</h2>
                  <p className="text-muted-foreground mb-6">{slide.description}</p>
                </div>
              </motion.div>
            ))}

            {/* Slide indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    currentSlide === index ? "bg-amhara-blue w-6" : "bg-amhara-blue/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="space-y-4">
            <Button
              asChild
              className="w-full bg-gradient-to-r from-amhara-blue to-amhara-lightBlue hover:opacity-90 text-white h-12"
            >
              <Link href="/auth/login">
                Sign In
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-amhara-blue text-amhara-blue hover:bg-amhara-blue/10 h-12"
            >
              <Link href="/auth/register">
                Create Account
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <div className="text-center mt-4">
              <Button asChild variant="link" className="text-amhara-blue hover:text-amhara-lightBlue">
                <Link href="/home">
                  Continue as Guest
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="py-4 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} Amhara Bank. All rights reserved.</p>
      </div>
    </div>
  )
}
