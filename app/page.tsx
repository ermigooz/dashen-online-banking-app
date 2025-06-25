"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  BarChart3,
  Calendar,
  HelpCircle,
  Users,
  Building,
  Globe,
  TrendingUp,
  Landmark,
  DollarSign,
} from "lucide-react"

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
          <div className="absolute inset-0 bg-gradient-to-b from-zemen-red/5 via-zemen-lightRed/5 to-background/20" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.2]" />

          {/* Colored circles */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-zemen-red/20 blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-zemen-lightRed/20 blur-3xl" />
          <div className="absolute top-1/3 right-1/3 w-72 h-72 rounded-full bg-zemen-gray/20 blur-3xl" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="relative w-32 h-32 flex items-center justify-center">
              <div
                className="absolute inset-0 rounded-full opacity-70"
                style={{
                  animation: "pulse 3s ease-in-out infinite",
                  boxShadow: "0 0 20px 10px rgba(216, 27, 96, 0.5)",
                }}
              />
              <Image
                src="/images/zemen-logo.png"
                alt="Zemen Bank Logo"
                width={120}
                height={120}
                className="logo-glow relative z-10"
                priority
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
            <span className="zemen-gradient-text">Zemen Bank</span>
            <br />
            <span>Diaspora Hub</span>
          </h1>

          <p className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Empowering the diaspora community with innovative banking solutions and investment opportunities
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button
              asChild
              size="lg"
              className="gap-2 bg-zemen-red hover:bg-zemen-darkRed text-white rounded-full px-8"
            >
              <Link href="/auth/login">
                Login to Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-zemen-lightRed text-zemen-red hover:bg-zemen-red/10 rounded-full px-8"
            >
              <Link href="/events">View Upcoming Events</Link>
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

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-zemen-red/5 to-zemen-lightRed/5">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Growth Journey</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Since our establishment, we've achieved remarkable milestones together
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                value: 5.2,
                label: "Billion Birr Capital",
                icon: Landmark,
                decimals: 1,
                suffix: "B",
                color: "red",
              },
              {
                value: 120000,
                label: "Shareholders",
                icon: Users,
                suffix: "+",
                color: "lightRed",
              },
              {
                value: 85,
                label: "Branches Nationwide",
                icon: Building,
                suffix: "+",
                color: "red",
              },
              {
                value: 2.8,
                label: "Million Customers",
                icon: Globe,
                decimals: 1,
                suffix: "M+",
                color: "lightRed",
              },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="relative overflow-hidden rounded-xl bg-white shadow-lg p-6 text-center group hover:shadow-xl transition-shadow"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-zemen-${stat.color}`} />
                <div
                  className={`inline-flex items-center justify-center p-3 rounded-full bg-zemen-${stat.color}/10 mb-4 group-hover:scale-110 transition-transform`}
                >
                  <stat.icon className={`h-8 w-8 text-zemen-${stat.color}`} />
                </div>
                <h3 className="text-4xl font-bold mb-2">
                  <Counter end={stat.value} decimals={stat.decimals || 0} suffix={stat.suffix} />
                </h3>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About Zemen Bank</h2>
              <div className="space-y-4 text-lg">
                <p>
                  Zemen Bank was established as a public company with over 120,000 shareholders, making it one of the
                  leading banks in Ethiopia's financial sector.
                </p>
                <p>
                  With a vision to be the premier provider of financial services in Ethiopia, we're committed to
                  delivering innovative banking solutions that meet the evolving needs of our customers.
                </p>
                <p>
                  Our core values of integrity, excellence, innovation, and customer focus guide our operations as we
                  expand our services across Ethiopia and to the diaspora community worldwide.
                </p>
              </div>
              <div className="mt-8">
                <Button asChild className="gap-2 bg-zemen-red hover:bg-zemen-darkRed text-white">
                  <Link href="/about">
                    Learn More About Us
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-video w-full">
                  <iframe
                    src="https://www.youtube.com/embed/qagP_K-3GC4?si=SHwTMaEAnOoyINav"
                    title="Zemen Bank Video"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full rounded-2xl"
                  ></iframe>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-zemen-lightRed/30 rounded-full blur-md" />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-zemen-red/20 rounded-full blur-md" />
              <div className="absolute top-1/2 -right-4 transform -translate-y-1/2 w-8 h-40 bg-zemen-red/20 rounded-full blur-md" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-white to-zemen-red/5">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Diaspora Services</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Specialized banking solutions designed for Ethiopians living abroad
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: BarChart3,
                title: "Shareholder Dashboard",
                description:
                  "Access your shareholding details, track dividends, and monitor your investment growth in real-time.",
                color: "red",
                link: "/dashboard",
              },
              {
                icon: TrendingUp,
                title: "Investment Opportunities",
                description:
                  "Explore exclusive investment opportunities in Ethiopia's growing economy with competitive returns.",
                color: "lightRed",
                link: "/financial-tools",
              },
              {
                icon: Calendar,
                title: "Events & Webinars",
                description:
                  "Stay connected with virtual events, webinars, and annual shareholder meetings from anywhere in the world.",
                color: "red",
                link: "/events",
              },
              {
                icon: Globe,
                title: "Foreign Currency Accounts",
                description: "Open and manage foreign currency accounts with competitive exchange rates and low fees.",
                color: "lightRed",
                link: "/diaspora-account",
              },
              {
                icon: HelpCircle,
                title: "Dedicated Support",
                description:
                  "Get personalized assistance from our diaspora banking specialists through multiple channels.",
                color: "red",
                link: "/faq",
              },
              {
                icon: DollarSign,
                title: "Daily Exchange Rates",
                description:
                  "Stay updated with the latest currency exchange rates to make informed decisions for your remittances and investments.",
                color: "lightRed",
                link: "/exchange-rates",
              },
            ].map((service, index) => (
              <div
                key={service.title}
                className="zemen-card-border group bg-white p-6 hover:shadow-lg transition-all duration-300 rounded-lg hover:translate-y-[-5px]"
              >
                <div
                  className={`bg-zemen-${service.color}/10 w-14 h-14 rounded-lg flex items-center justify-center mb-5 group-hover:bg-zemen-${service.color}/20 transition-all duration-300`}
                >
                  <service.icon className={`h-7 w-7 text-zemen-${service.color}`} />
                </div>
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-5 min-h-[80px]">{service.description}</p>
                <Button
                  asChild
                  variant="outline"
                  className={`w-full border-zemen-${service.color} text-zemen-${service.color} hover:bg-zemen-${service.color}/10 group-hover:border-zemen-${service.color}/80 transition-all duration-300`}
                >
                  <Link href={service.link} className="flex items-center justify-center">
                    Explore
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-zemen-red/20 to-zemen-lightRed/20">
        <div className="container">
          <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden">
            {/* Animated background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 left-0 w-full h-1 gradient-animation" />
              <div className="absolute bottom-0 left-0 w-full h-1 gradient-animation" />
              <div className="absolute top-0 left-0 h-full w-1 gradient-animation" />
              <div className="absolute top-0 right-0 h-full w-1 gradient-animation" />
            </div>

            <h2 className="text-3xl font-bold mb-4 relative z-10">Join Our Growing Community</h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto relative z-10">
              Be part of Zemen Bank's success story. Join over 120,000 shareholders who are already benefiting from our
              growth and innovation.
            </p>
            <div className="flex flex-wrap justify-center gap-4 relative z-10">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-zemen-red to-zemen-lightRed text-white hover:opacity-90 rounded-full px-8"
              >
                <Link href="/auth/login">Open an Account</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-zemen-red text-zemen-red hover:bg-zemen-red/10 rounded-full px-8"
              >
                <Link href="/faq">Contact Support</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">What Our Shareholders Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from our community of diaspora shareholders
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                quote:
                  "Zemen Bank has made it incredibly easy to manage my shares and track dividends from abroad. The online platform is intuitive and secure.",
                name: "Yohannes Abebe",
                location: "Washington DC, USA",
                avatar: "/placeholder.svg?height=80&width=80",
              },
              {
                quote:
                  "As a diaspora investor, I appreciate the transparency and regular updates from Zemen Bank. The investment opportunities have provided excellent returns.",
                name: "Sara Mengistu",
                location: "Toronto, Canada",
                avatar: "/placeholder.svg?height=80&width=80",
              },
              {
                quote:
                  "The virtual shareholder meetings and webinars make me feel connected to my investment despite living thousands of miles away. Excellent service!",
                name: "Dawit Haile",
                location: "London, UK",
                avatar: "/placeholder.svg?height=80&width=80",
              },
            ].map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col h-full">
                  <div className="mb-4 text-zemen-red">
                    <svg width="45" height="36" className="fill-current opacity-20">
                      <path d="M13.415.43c-2.523 0-4.75.428-6.683 1.284-1.933.855-3.55 2.056-4.85 3.603C.58 6.864.03 8.516.03 10.273c0 1.66.436 3.18 1.307 4.552.87 1.37 2.04 2.493 3.507 3.367 1.467.874 3.16 1.53 5.08 1.967 1.918.437 3.98.655 6.182.655 1.933 0 3.638-.218 5.118-.655 1.48-.437 2.766-1.093 3.86-1.967 1.092-.874 1.933-1.996 2.523-3.367.59-1.37.886-2.89.886-4.552 0-1.757-.55-3.41-1.65-4.957-1.1-1.547-2.717-2.747-4.85-3.603C19.85.858 16.997.43 13.415.43zm21.998 0c-2.523 0-4.75.428-6.683 1.284-1.933.855-3.55 2.056-4.85 3.603-1.3 1.547-1.95 3.2-1.95 4.957 0 1.66.436 3.18 1.307 4.552.87 1.37 2.04 2.493 3.507 3.367 1.467.874 3.16 1.53 5.08 1.967 1.918.437 3.98.655 6.182.655 1.933 0 3.638-.218 5.118-.655 1.48-.437 2.766-1.093 3.86-1.967 1.092-.874 1.933-1.996 2.523-3.367.59-1.37.886-2.89.886-4.552 0-1.757-.55-3.41-1.65-4.957-1.1-1.547-2.717-2.747-4.85-3.603C37.848.858 34.996.43 31.413.43z"></path>
                    </svg>
                  </div>
                  <p className="flex-1 text-lg mb-6 italic text-gray-700">{testimonial.quote}</p>
                  <div className="flex items-center mt-auto">
                    <div className="mr-4">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
