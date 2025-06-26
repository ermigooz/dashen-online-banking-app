"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Send, Clock, Shield, DollarSign, MapPin, Phone, User, CreditCard } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function RemittancePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("send")
  const { toast } = useToast()

  const handleSendMoney = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    toast({
      title: "Money Transfer Initiated",
      description: "Your transfer has been submitted and will be processed within 24 hours.",
    })
    
    setIsLoading(false)
  }

  const exchangeRates = [
    { from: "USD", to: "ETB", rate: 55.34, trend: "up" },
    { from: "EUR", to: "ETB", rate: 59.87, trend: "down" },
    { from: "GBP", to: "ETB", rate: 70.45, trend: "up" },
    { from: "CAD", to: "ETB", rate: 40.76, trend: "stable" },
  ]

  const recentTransfers = [
    { id: "1", recipient: "Almaz Tadesse", amount: "$500", status: "completed", date: "2024-01-15" },
    { id: "2", recipient: "Bekele Mekuria", amount: "$1,200", status: "processing", date: "2024-01-14" },
    { id: "3", recipient: "Hanan Ahmed", amount: "$800", status: "completed", date: "2024-01-12" },
  ]

  return (
    <div className="container py-8 mt-16">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold mb-2">Money Transfer & Remittance</h1>
        <p className="text-muted-foreground">Send money to Ethiopia quickly, securely, and at competitive rates</p>
      </motion.div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 md:w-[600px]">
          <TabsTrigger value="send">Send Money</TabsTrigger>
          <TabsTrigger value="rates">Exchange Rates</TabsTrigger>
          <TabsTrigger value="history">Transfer History</TabsTrigger>
        </TabsList>

        <TabsContent value="send">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="h-5 w-5 text-dashen-blue" />
                  Send Money to Ethiopia
                </CardTitle>
                <CardDescription>
                  Transfer money to family and friends in Ethiopia with competitive rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSendMoney} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="send-amount">Amount to Send</Label>
                      <Input
                        id="send-amount"
                        type="number"
                        placeholder="1000"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="send-currency">Currency</Label>
                      <Select defaultValue="usd">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="usd">USD</SelectItem>
                          <SelectItem value="eur">EUR</SelectItem>
                          <SelectItem value="gbp">GBP</SelectItem>
                          <SelectItem value="cad">CAD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipient-name">Recipient Name</Label>
                    <Input
                      id="recipient-name"
                      placeholder="Full name as on ID"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="recipient-phone">Recipient Phone</Label>
                    <Input
                      id="recipient-phone"
                      placeholder="+251 9XX XXX XXX"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="delivery-method">Delivery Method</Label>
                    <Select defaultValue="bank">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="cash">Cash Pickup</SelectItem>
                        <SelectItem value="mobile">Mobile Money</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-dashen-blue/5 p-4 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Exchange Rate (USD to ETB):</span>
                      <span className="font-bold">55.34</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Transfer Fee:</span>
                      <span className="font-bold">$5.00</span>
                    </div>
                    <div className="flex justify-between items-center border-t pt-2">
                      <span className="font-medium">Recipient Receives:</span>
                      <span className="font-bold text-dashen-blue">ETB 55,065</span>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-dashen-blue hover:bg-dashen-darkBlue"
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Send Money"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-600" />
                    Why Choose Dashen Remittance?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-dashen-blue mt-0.5" />
                    <div>
                      <h4 className="font-medium">Fast Transfers</h4>
                      <p className="text-sm text-muted-foreground">
                        Money delivered within 24 hours
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <DollarSign className="h-5 w-5 text-dashen-blue mt-0.5" />
                    <div>
                      <h4 className="font-medium">Competitive Rates</h4>
                      <p className="text-sm text-muted-foreground">
                        Best exchange rates with low fees
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-dashen-blue mt-0.5" />
                    <div>
                      <h4 className="font-medium">Secure & Licensed</h4>
                      <p className="text-sm text-muted-foreground">
                        Regulated by Ethiopian National Bank
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-dashen-blue mt-0.5" />
                    <div>
                      <h4 className="font-medium">Wide Network</h4>
                      <p className="text-sm text-muted-foreground">
                        800+ pickup locations across Ethiopia
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Transfer Limits</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Daily Limit:</span>
                      <span className="font-medium">$5,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Limit:</span>
                      <span className="font-medium">$50,000</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Annual Limit:</span>
                      <span className="font-medium">$200,000</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="rates">
          <Card>
            <CardHeader>
              <CardTitle>Current Exchange Rates</CardTitle>
              <CardDescription>
                Live exchange rates updated every 15 minutes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {exchangeRates.map((rate) => (
                  <Card key={`${rate.from}-${rate.to}`} className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{rate.from} → {rate.to}</span>
                      <Badge 
                        variant={rate.trend === "up" ? "default" : rate.trend === "down" ? "destructive" : "secondary"}
                      >
                        {rate.trend}
                      </Badge>
                    </div>
                    <div className="text-2xl font-bold text-dashen-blue">
                      {rate.rate.toFixed(2)}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      1 {rate.from} = {rate.rate} {rate.to}
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Recent Transfers</CardTitle>
              <CardDescription>
                Your recent money transfer history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransfers.map((transfer) => (
                  <div key={transfer.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="bg-dashen-blue/10 p-2 rounded-full">
                        <User className="h-5 w-5 text-dashen-blue" />
                      </div>
                      <div>
                        <p className="font-medium">{transfer.recipient}</p>
                        <p className="text-sm text-muted-foreground">{transfer.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{transfer.amount}</p>
                      <Badge 
                        variant={transfer.status === "completed" ? "default" : "secondary"}
                      >
                        {transfer.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}