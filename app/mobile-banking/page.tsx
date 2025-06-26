"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Smartphone, 
  Download, 
  Shield, 
  CreditCard, 
  Send, 
  QrCode,
  Star,
  CheckCircle2,
  Apple,
  PlayCircle
} from "lucide-react"

export default function MobileBankingPage() {
  const [activeTab, setActiveTab] = useState("overview")

  const features = [
    {
      icon: CreditCard,
      title: "Account Management",
      description: "Check balances, view statements, and manage multiple accounts"
    },
    {
      icon: Send,
      title: "Money Transfer",
      description: "Send money instantly to any Dashen Bank account or mobile wallet"
    },
    {
      icon: QrCode,
      title: "QR Payments",
      description: "Pay merchants and bills by scanning QR codes"
    },
    {
      icon: Shield,
      title: "Secure Banking",
      description: "Biometric authentication and end-to-end encryption"
    }
  ]

  const appStats = [
    { label: "Downloads", value: "500K+", icon: Download },
    { label: "Rating", value: "4.8", icon: Star },
    { label: "Users", value: "300K+", icon: Smartphone },
    { label: "Transactions", value: "2M+", icon: CreditCard }
  ]

  return (
    <div className="container py-8 mt-16">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">Dashen Mobile Banking</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Bank on the go with our award-winning mobile app. Secure, fast, and feature-rich banking at your fingertips.
        </p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="grid w-full grid-cols-4 md:w-[800px] mx-auto">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="download">Download</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-3xl font-bold mb-6">Banking Made Simple</h2>
              <div className="space-y-4 text-lg">
                <p>
                  Experience the future of banking with Dashen Mobile. Our app brings all your banking needs 
                  into one secure, easy-to-use platform.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {appStats.map((stat, index) => (
                    <div key={index} className="bg-dashen-blue/5 p-4 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <stat.icon className="h-5 w-5 text-dashen-blue" />
                        <span className="text-sm font-medium">{stat.label}</span>
                      </div>
                      <div className="text-2xl font-bold text-dashen-blue">{stat.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-dashen-blue to-dashen-lightBlue p-8 rounded-2xl text-white">
                <div className="text-center">
                  <Smartphone className="h-24 w-24 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2">Dashen Mobile</h3>
                  <p className="text-blue-100 mb-6">Your bank in your pocket</p>
                  <div className="flex justify-center gap-4">
                    <Button variant="secondary" size="sm">
                      <Apple className="h-4 w-4 mr-2" />
                      App Store
                    </Button>
                    <Button variant="secondary" size="sm">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Play Store
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="features">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="bg-dashen-blue/10 p-3 rounded-full w-fit">
                      <feature.icon className="h-6 w-6 text-dashen-blue" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="mt-8">
            <CardHeader>
              <CardTitle>Complete Banking Suite</CardTitle>
              <CardDescription>
                Everything you need for modern banking, all in one app
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Account Services</h4>
                  <ul className="space-y-2">
                    {[
                      "Real-time balance updates",
                      "Transaction history",
                      "Account statements",
                      "Multiple account management",
                      "Spending analytics"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-semibold">Payment Services</h4>
                  <ul className="space-y-2">
                    {[
                      "Instant money transfers",
                      "Bill payments",
                      "Mobile top-ups",
                      "QR code payments",
                      "International remittance"
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  Advanced Security Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-1 rounded-full">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Biometric Authentication</h4>
                      <p className="text-sm text-muted-foreground">
                        Fingerprint and face recognition for secure access
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-1 rounded-full">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">256-bit Encryption</h4>
                      <p className="text-sm text-muted-foreground">
                        Bank-grade encryption for all data transmission
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-1 rounded-full">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Real-time Monitoring</h4>
                      <p className="text-sm text-muted-foreground">
                        24/7 fraud detection and prevention systems
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 p-1 rounded-full">
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">Secure PIN & OTP</h4>
                      <p className="text-sm text-muted-foreground">
                        Multi-factor authentication for transactions
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Security Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <Badge className="bg-blue-600">ISO 27001</Badge>
                    <span className="text-sm">Information Security Management</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Badge className="bg-green-600">PCI DSS</Badge>
                    <span className="text-sm">Payment Card Industry Compliance</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <Badge className="bg-purple-600">SOC 2</Badge>
                    <span className="text-sm">Service Organization Control</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-amber-50 rounded-lg">
                  <h4 className="font-medium text-amber-800 mb-2">Security Tips</h4>
                  <ul className="text-sm text-amber-700 space-y-1">
                    <li>• Never share your PIN or password</li>
                    <li>• Always log out after banking</li>
                    <li>• Use official app stores only</li>
                    <li>• Enable app notifications for transactions</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="download">
          <div className="text-center space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Download Dashen Mobile</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get started with mobile banking today. Available for iOS and Android devices.
              </p>
            </div>

            <div className="flex justify-center gap-6">
              <Button size="lg" className="bg-black hover:bg-gray-800 text-white">
                <Apple className="h-6 w-6 mr-3" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-lg font-semibold">App Store</div>
                </div>
              </Button>
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white">
                <PlayCircle className="h-6 w-6 mr-3" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-lg font-semibold">Google Play</div>
                </div>
              </Button>
            </div>

            <Card className="max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>System Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold mb-2">iOS</h4>
                    <ul className="text-sm space-y-1">
                      <li>• iOS 12.0 or later</li>
                      <li>• iPhone 6s or newer</li>
                      <li>• iPad (6th generation) or newer</li>
                      <li>• 50 MB storage space</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Android</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Android 7.0 (API level 24) or higher</li>
                      <li>• 2 GB RAM minimum</li>
                      <li>• 50 MB storage space</li>
                      <li>• Internet connection required</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}