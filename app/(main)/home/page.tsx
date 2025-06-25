"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, ExternalLink } from "lucide-react"

// Animated counter component
const Counter = ({
  end,
  duration = 2,
  decimals = 0,
  suffix = "",
}: { end: number; duration?: number; decimals?: number; suffix?: string }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number | null = null
    let animationFrame: number

    const startAnimation = (timestamp: number) => {
      startTime = startTime || timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const currentCount = progress * end
      setCount(currentCount)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(startAnimation)
      }
    }

    animationFrame = requestAnimationFrame(startAnimation)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return (
    <span className="inline-block">
      {count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
      {suffix}
    </span>
  )
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <section className="relative flex-1 flex flex-col items-center justify-center text-center px-4 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Background elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-amhara-blue/5 via-amhara-lightBlue/5 to-background/20" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.2]" />

          {/* Colored circles */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-amhara-blue/20 blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-amhara-lightBlue/20 blur-3xl" />
          <div className="absolute top-1/3 right-1/3 w-72 h-72 rounded-full bg-amhara-darkBlue/20 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full opacity-70"
                style={{
                  animation: "pulse 3s ease-in-out infinite",
                  boxShadow: "0 0 20px 10px rgba(0, 84, 166, 0.5)",
                }}
              />
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dashen_logo-dMRcp6Y7guFgX2H5GUbZN2waKXfVpI.png"
                alt="Dashen Bank Logo"
                width={120}
                height={120}
                className="logo-glow relative z-10"
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="dashen-gradient-text">Dashen Bank</span>
            <br />
            <span>Diaspora Hub</span>
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Empowering the diaspora community with innovative banking solutions and investment opportunities
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="gap-2 bg-dashen-red hover:bg-dashen-red/90 text-white rounded-full px-8">
              <Link href="/auth/login">
                Login to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-amhara-lightBlue text-dashen-red hover:bg-dashen-red/10 rounded-full px-8"
            >
              <Link href="/events">View Upcoming Events</Link>
            </Button>
            <Button
              asChild
              variant="secondary"
              size="lg"
              className="gap-2 bg-amhara-lightBlue hover:bg-amhara-lightBlue/90 text-white rounded-full px-8"
            >
              <a href="https://dashenbank.com/about" target="_blank" rel="noopener noreferrer">
                Learn More About Us
                <ExternalLink className="h-4 w-4 ml-1" />
              </a>
            </Button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Rest of the landing page content... */}
      {/* This would be the same as the existing landing page */}
    </div>
  )
}
