"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, TrendingUp, PiggyBank } from "lucide-react"
import { motion } from "framer-motion"

// Import components
import InvestmentGrowthChart from "@/components/financial-tools/investment-growth-chart"
import PerformanceBreakdownChart from "@/components/financial-tools/performance-breakdown-chart"
import SavingsPlanner from "@/components/financial-tools/savings-planner"
import AdvancedInvestmentCalculator from "@/components/financial-tools/advanced-investment-calculator"

export default function FinancialToolsPage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

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

  if (loading || isLoading) {
    return (
      <div className="container py-8 mt-16">
        <h1 className="text-3xl font-bold mb-6">Financial Tools</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-5 bg-muted rounded w-1/3 animate-pulse"></div>
                <div className="h-4 w-4 bg-muted rounded-full animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-muted rounded w-1/2 mb-2 animate-pulse"></div>
                <div className="h-4 bg-muted rounded w-2/3 mb-4 animate-pulse"></div>
                <div className="h-10 bg-muted rounded w-full animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 mt-16">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-3xl font-bold mb-6">Financial Tools</h1>
      </motion.div>

      {!user ? (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="bg-dashen-red/10 p-2 rounded-md">
                    <Calculator className="h-5 w-5 text-dashen-red" />
                  </div>
                </div>
                <CardTitle className="mt-4">Investment Calculator</CardTitle>
                <CardDescription>Plan your investment strategy with detailed projections</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Calculate potential returns and analyze different investment scenarios with our advanced tools.
                  </p>
                  <Button className="w-full bg-dashen-red hover:bg-dashen-darkRed text-white" asChild>
                    <Link href="/auth/login?callbackUrl=/financial-tools">Login to Access</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="bg-dashen-red/10 p-2 rounded-md">
                    <TrendingUp className="h-5 w-5 text-dashen-red" />
                  </div>
                </div>
                <CardTitle className="mt-4">Investment Growth</CardTitle>
                <CardDescription>Track the growth of your investment over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Visualize how your investment has grown and project future growth based on historical performance.
                  </p>
                  <Button className="w-full bg-dashen-red hover:bg-dashen-darkRed text-white" asChild>
                    <Link href="/auth/login?callbackUrl=/financial-tools">Login to Access</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={item}>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="bg-dashen-red/10 p-2 rounded-md">
                    <PiggyBank className="h-5 w-5 text-dashen-red" />
                  </div>
                </div>
                <CardTitle className="mt-4">Savings Planner</CardTitle>
                <CardDescription>Plan your savings to achieve your investment goals</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Set investment goals and create a savings plan to achieve them within your desired timeframe.
                  </p>
                  <Button className="w-full bg-dashen-red hover:bg-dashen-darkRed text-white" asChild>
                    <Link href="/auth/login?callbackUrl=/financial-tools">Login to Access</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      ) : (
        <Tabs defaultValue="investment-calculator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 md:w-[800px] bg-dashen-red/10">
            <TabsTrigger
              value="investment-calculator"
              className="data-[state=active]:bg-dashen-red data-[state=active]:text-white"
            >
              Investment Calculator
            </TabsTrigger>
            <TabsTrigger
              value="investment-growth"
              className="data-[state=active]:bg-dashen-red data-[state=active]:text-white"
            >
              Investment Growth
            </TabsTrigger>
            <TabsTrigger
              value="performance"
              className="data-[state=active]:bg-dashen-red data-[state=active]:text-white"
            >
              Performance
            </TabsTrigger>
            <TabsTrigger
              value="savings-planner"
              className="data-[state=active]:bg-dashen-red data-[state=active]:text-white"
            >
              Savings Planner
            </TabsTrigger>
          </TabsList>

          <TabsContent value="investment-calculator">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <AdvancedInvestmentCalculator />
            </motion.div>
          </TabsContent>

          <TabsContent value="investment-growth">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <InvestmentGrowthChart showHeader={false} height={400} />
            </motion.div>
          </TabsContent>

          <TabsContent value="performance">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <PerformanceBreakdownChart showHeader={false} height={400} />
            </motion.div>
          </TabsContent>

          <TabsContent value="savings-planner">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <SavingsPlanner showHeader={false} height={400} />
            </motion.div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
