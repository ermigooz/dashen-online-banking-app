"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import InvestmentGrowthChart from "@/components/dashboard/investment-growth-chart"
import PerformanceBreakdownChart from "@/components/dashboard/performance-breakdown-chart"
import ProtectedRouteClient from "@/components/auth/protected-route-client"
import { motion } from "framer-motion"

function PerformanceContent() {
  const [view, setView] = useState("overview")

  return (
    <div className="container py-8 mt-16">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <h1 className="text-3xl font-bold mb-2">Investment Performance</h1>
        <p className="text-muted-foreground mb-6">Track and analyze your investment performance over time</p>
      </motion.div>

      <Tabs defaultValue="overview" onValueChange={setView} className="space-y-6">
        <TabsList className="grid grid-cols-2 md:w-[400px]">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
            <InvestmentGrowthChart />
            <PerformanceBreakdownChart />
          </div>
        </TabsContent>

        <TabsContent value="detailed">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Performance Analysis</CardTitle>
              <CardDescription>Comprehensive breakdown of your investment performance metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <p className="text-muted-foreground">
                  This section will provide detailed performance metrics, including:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Year-over-year growth comparisons</li>
                  <li>Dividend yield analysis</li>
                  <li>Performance against market benchmarks</li>
                  <li>Risk assessment metrics</li>
                  <li>Projected future performance scenarios</li>
                </ul>
                <div className="p-4 bg-muted rounded-lg text-center">
                  <p className="text-muted-foreground">Detailed metrics coming soon</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default function PerformancePage() {
  return (
    <ProtectedRouteClient>
      <PerformanceContent />
    </ProtectedRouteClient>
  )
}
