"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { formatCurrency } from "@/lib/utils"
import { TrendingUp } from "lucide-react"

// Mock data for investment growth
const mockInvestmentData = {
  monthly: [
    { date: "Jan 2023", value: 75000, growth: 0 },
    { date: "Feb 2023", value: 75750, growth: 1 },
    { date: "Mar 2023", value: 76500, growth: 1 },
    { date: "Apr 2023", value: 77250, growth: 1 },
    { date: "May 2023", value: 78750, growth: 1.9 },
    { date: "Jun 2023", value: 80325, growth: 2 },
    { date: "Jul 2023", value: 81935, growth: 2 },
    { date: "Aug 2023", value: 83575, growth: 2 },
    { date: "Sep 2023", value: 85250, growth: 2 },
    { date: "Oct 2023", value: 86950, growth: 2 },
    { date: "Nov 2023", value: 88700, growth: 2 },
    { date: "Dec 2023", value: 90475, growth: 2 },
    { date: "Jan 2024", value: 92285, growth: 2 },
    { date: "Feb 2024", value: 94130, growth: 2 },
    { date: "Mar 2024", value: 96015, growth: 2 },
  ],
  quarterly: [
    { date: "Q1 2023", value: 76500, growth: 2 },
    { date: "Q2 2023", value: 80325, growth: 5 },
    { date: "Q3 2023", value: 85250, growth: 6.1 },
    { date: "Q4 2023", value: 90475, growth: 6.1 },
    { date: "Q1 2024", value: 96015, growth: 6.1 },
  ],
  yearly: [
    { date: "2022", value: 73500, growth: 0 },
    { date: "2023", value: 90475, growth: 23.1 },
    { date: "2024 (YTD)", value: 96015, growth: 6.1 },
  ],
}

interface InvestmentGrowthChartProps {
  className?: string
}

export default function InvestmentGrowthChart({ className }: InvestmentGrowthChartProps) {
  const [timeframe, setTimeframe] = useState<"monthly" | "quarterly" | "yearly">("monthly")

  const data = mockInvestmentData[timeframe]
  const initialValue = data[0].value
  const currentValue = data[data.length - 1].value
  const totalGrowth = ((currentValue - initialValue) / initialValue) * 100

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md shadow-md p-3">
          <p className="font-medium">{label}</p>
          <p className="text-dashen-red font-medium">Value: {formatCurrency(payload[0].value)}</p>
          <p className="text-emerald-600 text-sm">Growth: +{payload[0].payload.growth}%</p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-dashen-red" />
              Investment Growth
            </CardTitle>
            <CardDescription>Track your investment value over time</CardDescription>
          </div>
          <Tabs value={timeframe} onValueChange={(v) => setTimeframe(v as any)} className="w-[250px]">
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="quarterly">Quarterly</TabsTrigger>
              <TabsTrigger value="yearly">Yearly</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4 grid grid-cols-2 gap-4">
          <div className="bg-gradient-to-r from-dashen-red/10 to-amhara-teal/10 p-4 rounded-lg">
            <p className="text-sm font-medium text-muted-foreground">Initial Value</p>
            <p className="text-2xl font-bold">{formatCurrency(initialValue)}</p>
          </div>
          <div className="bg-gradient-to-r from-amhara-teal/10 to-emerald-500/10 p-4 rounded-lg">
            <p className="text-sm font-medium text-muted-foreground">Current Value</p>
            <p className="text-2xl font-bold">{formatCurrency(currentValue)}</p>
            <p className="text-sm text-emerald-600">+{totalGrowth.toFixed(1)}% growth</p>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="date" tick={{ fontSize: 12 }} tickMargin={10} />
              <YAxis
                tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                tick={{ fontSize: 12 }}
                tickMargin={10}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                name="Investment Value"
                stroke="#025AA2"
                strokeWidth={2}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
