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
  Play,
  CheckCircle2,
  Star,
  Shield,
  CreditCard,
  PiggyBank,
  Calculator,
} from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

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

const features = [
  {
    icon: Shield,
    title: "Secure Banking",
    description: "State-of-the-art security measures to protect your financial information and transactions.",
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Access your accounts and manage your finances from anywhere in the world.",
  },
  {
    icon: TrendingUp,
    title: "Investment Opportunities",
    description: "Diverse investment options including shares, bonds, and mutual funds.",
  },
  {
    icon: CreditCard,
    title: "Digital Banking",
    description: "Modern digital banking solutions with mobile apps and online platforms.",
  },
  {
    icon: PiggyBank,
    title: "Savings Solutions",
    description: "Flexible savings accounts with competitive interest rates.",
  },
  {
    icon: Calculator,
    title: "Financial Planning",
    description: "Professional financial planning and advisory services.",
  },
]

const testimonials = [
  {
    name: "Abebe Kebede",
    location: "Addis Ababa, Ethiopia",
    rating: 5,
    comment: "Dashen Bank has been my trusted financial partner for over 10 years. Their diaspora services are exceptional.",
  },
  {
    name: "Sara Haile",
    location: "Washington DC, USA",
    rating: 5,
    comment: "The online banking platform is user-friendly and the customer service is outstanding. Highly recommended!",
  },
  {
    name: "Michael Tesfaye",
    location: "London, UK",
    rating: 5,
    comment: "Great investment opportunities and competitive rates. Dashen Bank truly understands the diaspora community.",
  },
]

const stats = [
  { number: "25+", label: "Years of Excellence" },
  { number: "100+", label: "Branches Nationwide" },
  { number: "1M+", label: "Happy Customers" },
  { number: "24/7", label: "Customer Support" },
]

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
          <div className="absolute inset-0 bg-gradient-to-b from-dashen-blue/5 via-dashen-lightBlue/5 to-background/20" />
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.2]" />

          {/* Colored circles */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-dashen-blue/20 blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-dashen-lightBlue/20 blur-3xl" />
          <div className="absolute top-1/3 right-1/3 w-72 h-72 rounded-full bg-dashen-gray/20 blur-3xl" />
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
                src="/images/dashen-logo.png"
                alt="Dashen Bank Logo"
                width={120}
                height={120}
                className="logo-glow relative z-10"
                priority
              />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-dashen-blue/10 text-dashen-blue border-dashen-blue/20">
              Welcome to Dashen Bank Diaspora Portal
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
              <span className="dashen-gradient-text">Dashen Bank</span>
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
                className="gap-2 bg-dashen-blue hover:bg-dashen-darkBlue text-white rounded-full px-8"
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
                className="border-dashen-lightBlue text-dashen-blue hover:bg-dashen-blue/10 rounded-full px-8"
              >
                <Link href="/events">View Upcoming Events</Link>
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-1">
            <div className="w-1.5 h-1.5 rounded-full bg-muted-foreground/50 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-dashen-blue/5 to-dashen-lightBlue/5">
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
                color: "blue",
              },
              {
                value: 120000,
                label: "Shareholders",
                icon: Users,
                suffix: "+",
                color: "lightBlue",
              },
              {
                value: 800,
                label: "Branches Nationwide",
                icon: Building,
                suffix: "+",
                color: "blue",
              },
              {
                value: 5.2,
                label: "Million Customers",
                icon: Globe,
                decimals: 1,
                suffix: "M+",
                color: "lightBlue",
              },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="relative overflow-hidden rounded-xl bg-white shadow-lg p-6 text-center group hover:shadow-xl transition-shadow"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-dashen-${stat.color}`} />
                <div
                  className={`inline-flex items-center justify-center p-3 rounded-full bg-dashen-${stat.color}/10 mb-4 group-hover:scale-110 transition-transform`}
                >
                  <stat.icon className={`h-8 w-8 text-dashen-${stat.color}`} />
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
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About Dashen Bank</h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Dashen Bank was established as a public company with over 120,000 shareholders, making it one of the
                  largest and most trusted financial institutions in Ethiopia.
                </p>
                <p>
                  We specialize in serving the Ethiopian diaspora community, providing innovative banking solutions,
                  investment opportunities, and comprehensive financial services tailored to meet the unique needs of
                  Ethiopians living abroad.
                </p>
                <p>
                  Our commitment to excellence, transparency, and customer satisfaction has made us the preferred choice
                  for diaspora banking and investment services.
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-dashen-blue/20 to-dashen-lightBlue/20 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="h-16 w-16 text-dashen-blue mx-auto mb-4" />
                    <p className="text-lg font-medium">Watch Our Story</p>
                    <p className="text-sm text-muted-foreground">Learn about Dashen Bank's journey</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-r from-dashen-blue/5 to-dashen-lightBlue/5">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose Dashen Bank?</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Discover the advantages of banking with Ethiopia's leading financial institution
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="h-full group hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="inline-flex items-center justify-center p-3 rounded-full bg-dashen-blue/10 mb-4 group-hover:scale-110 transition-transform">
                      <feature.icon className="h-8 w-8 text-dashen-blue" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Join Our Success Story</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Be part of Dashen Bank's success story. Join over 120,000 shareholders who are already benefiting from our
              growth and commitment to excellence.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-dashen-blue hover:bg-dashen-darkBlue text-white">
                <Link href="/auth/register">Open Your Account</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-dashen-lightBlue text-dashen-blue hover:bg-dashen-blue/10">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-dashen-blue/5 to-dashen-lightBlue/5">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">What Our Shareholders Say</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Hear from our diaspora community about their experience with Dashen Bank
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-dashen-blue/10 rounded-full flex items-center justify-center mr-4">
                        <span className="text-dashen-blue font-bold text-lg">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-dashen-blue">{testimonial.location}</p>
                      </div>
                    </div>
                    <div className="flex items-center mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <p className="text-muted-foreground">{testimonial.comment}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
