"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, Calendar, Calculator, TrendingUp, DollarSign } from "lucide-react"
import { motion } from "framer-motion"
import ShareCertificate from "@/components/dashboard/share-certificate"
import DividendCalculator from "@/components/dashboard/dividend-calculator"
import InvestmentGrowthChart from "@/components/dashboard/investment-growth-chart"
import PerformanceBreakdownChart from "@/components/dashboard/performance-breakdown-chart"
import { formatCurrency } from "@/lib/utils"
import ProtectedRouteClient from "@/components/auth/protected-route-client"

// Mock data
const mockProfile = {
  id: "user-1",
  full_name: "Abebe Kebede",
  email: "abebe@gmail.com",
  phone: "+251911234567",
  country: "Ethiopia",
  city: "Addis Ababa",
  preferred_language: "am",
}

const mockShares = [
  {
    id: "share-1",
    shareholder_id: "user-1",
    total_shares: 1500,
    share_value: 75000,
    purchase_date: "2022-03-10T00:00:00Z",
  },
]

const mockTransactions = [
  {
    id: "tx-1",
    shareholder_id: "user-1",
    transaction_type: "purchase",
    amount: 75000,
    shares_affected: 1500,
    transaction_date: "2022-03-10T00:00:00Z",
    status: "completed",
    description: "Initial share purchase",
  },
  {
    id: "tx-2",
    shareholder_id: "user-1",
    transaction_type: "dividend",
    amount: 3750,
    shares_affected: null,
    transaction_date: "2022-06-30T00:00:00Z",
    status: "completed",
    description: "Semi-annual dividend payment",
  },
]

function DashboardContent() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("overview")
  const [profile, setProfile] = useState(mockProfile)
  const [shares, setShares] = useState(mockShares)
  const [transactions, setTransactions] = useState(mockTransactions)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    console.log("Dashboard content loading, user:", user)

    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [user])

  // Show loading state while fetching dashboard data
  if (isLoading) {
    return (
      <div className="container py-8 mt-16">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-5 bg-muted rounded w-1/3 animate-pulse"></div>
                <div className="h-4 w-4 bg-muted rounded-full animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-1/2 mb-2 animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-2/3 animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  // Calculate totals
  const totalShares = shares?.reduce((sum, share) => sum + share.total_shares, 0) || 0
  const totalValue = shares?.reduce((sum, share) => sum + Number(share.share_value), 0) || 0
  const totalDividends =
    transactions?.filter((tx) => tx.transaction_type === "dividend").reduce((sum, tx) => sum + Number(tx.amount), 0) ||
    0

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  }

  return (
    <div className="container py-8 mt-16">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name || profile.full_name}</h1>
        <p className="text-muted-foreground mb-6">
          Here's an overview of your Zemen Bank shareholding and recent activity
        </p>
      </motion.div>

      {/* Rest of the dashboard content remains the same */}
      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-4 md:w-[500px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="shares">Shares</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
          >
            <motion.div variants={item}>
              <Card className="overflow-hidden border-t-4 border-t-zemen-red">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Shares</CardTitle>
                  <BarChart3 className="h-4 w-4 text-zemen-red" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{totalShares.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+20% from last year</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-t-4 border-t-amhara-teal">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Share Value</CardTitle>
                  <Calculator className="h-4 w-4 text-amhara-teal" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(totalValue)}</div>
                  <p className="text-xs text-muted-foreground">+15% from last year</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-t-4 border-t-amhara-yellow">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Dividends</CardTitle>
                  <TrendingUp className="h-4 w-4 text-amhara-yellow" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formatCurrency(totalDividends)}</div>
                  <p className="text-xs text-muted-foreground">Last payment: Jun 30, 2022</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={item}>
              <Card className="border-t-4 border-t-amhara-teal">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
                  <Calendar className="h-4 w-4 text-amhara-teal" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2</div>
                  <p className="text-xs text-muted-foreground">Next event in 15 days</p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>

          <motion.div variants={container} initial="hidden" animate="show" className="grid gap-6 md:grid-cols-2 mt-6">
            <motion.div variants={item}>
              <ShareCertificate profile={profile} shares={shares} />
            </motion.div>
            <motion.div variants={item}>
              <DividendCalculator shares={shares} />
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.6 }}
            className="mt-8"
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <Button variant="outline" size="sm" asChild>
                  <Link href="#" onClick={() => setActiveTab("transactions")}>
                    View All
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.slice(0, 3).map((transaction) => (
                    <div
                      key={transaction.id}
                      className="flex items-center gap-4 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div
                        className={`p-2 rounded-full ${
                          transaction.transaction_type === "purchase" ? "bg-zemen-red/10" : "bg-amhara-teal/10"
                        }`}
                      >
                        {transaction.transaction_type === "purchase" ? (
                          <TrendingUp
                            className={`h-5 w-5 ${
                              transaction.transaction_type === "purchase" ? "text-zemen-red" : "text-amhara-teal"
                            }`}
                          />
                        ) : (
                          <DollarSign
                            className={`h-5 w-5 ${
                              transaction.transaction_type === "purchase" ? "text-zemen-red" : "text-amhara-teal"
                            }`}
                          />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{transaction.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(transaction.transaction_date).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {transaction.transaction_type === "purchase" ? "-" : "+"}
                          {formatCurrency(transaction.amount)}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">{transaction.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="shares">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Your Shareholding</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <div className="bg-gradient-to-r from-zemen-red/10 to-amhara-teal/10 p-4 rounded-lg">
                      <p className="text-sm font-medium text-muted-foreground">Total Shares</p>
                      <p className="text-2xl font-bold">{totalShares.toLocaleString()}</p>
                    </div>
                    <div className="bg-gradient-to-r from-amhara-teal/10 to-amhara-yellow/10 p-4 rounded-lg">
                      <p className="text-sm font-medium text-muted-foreground">Share Value</p>
                      <p className="text-2xl font-bold">{formatCurrency(totalValue)}</p>
                    </div>
                    <div className="bg-gradient-to-r from-amhara-yellow/10 to-zemen-red/10 p-4 rounded-lg">
                      <p className="text-sm font-medium text-muted-foreground">Purchase Date</p>
                      <p className="text-2xl font-bold">{new Date(shares[0]?.purchase_date).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="border rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-4 py-3 text-left text-sm font-medium">Share ID</th>
                          <th className="px-4 py-3 text-left text-sm font-medium">Quantity</th>
                          <th className="px-4 py-3 text-left text-sm font-medium">Value</th>
                          <th className="px-4 py-3 text-left text-sm font-medium">Purchase Date</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {shares.map((share) => (
                          <tr key={share.id}>
                            <td className="px-4 py-3 text-sm">{share.id}</td>
                            <td className="px-4 py-3 text-sm">{share.total_shares.toLocaleString()}</td>
                            <td className="px-4 py-3 text-sm">{formatCurrency(share.share_value)}</td>
                            <td className="px-4 py-3 text-sm">{new Date(share.purchase_date).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* New Performance Tab */}
        <TabsContent value="performance">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="grid gap-6 md:grid-cols-1 lg:grid-cols-2"
          >
            <InvestmentGrowthChart />
            <PerformanceBreakdownChart />
          </motion.div>
        </TabsContent>

        <TabsContent value="transactions">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-medium">Date</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Type</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Amount</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Status</th>
                        <th className="px-4 py-3 text-left text-sm font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {transactions.map((tx) => (
                        <tr key={tx.id}>
                          <td className="px-4 py-3 text-sm">{new Date(tx.transaction_date).toLocaleDateString()}</td>
                          <td className="px-4 py-3 text-sm capitalize">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                tx.transaction_type === "purchase"
                                  ? "bg-zemen-red/10 text-zemen-red"
                                  : "bg-amhara-teal/10 text-amhara-teal"
                              }`}
                            >
                              {tx.transaction_type}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">{formatCurrency(tx.amount)}</td>
                          <td className="px-4 py-3 text-sm capitalize">
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                tx.status === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {tx.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">{tx.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <ProtectedRouteClient>
      <DashboardContent />
    </ProtectedRouteClient>
  )
}
