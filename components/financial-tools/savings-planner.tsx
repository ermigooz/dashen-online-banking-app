"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { PiggyBank, Calculator } from "lucide-react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

// Mock data for savings projection chart
const initialProjectionData = [
  { year: "Start", contributions: 75000, totalAmount: 75000 },
  { year: "Year 1", contributions: 87504, totalAmount: 92504 },
  { year: "Year 2", contributions: 100008, totalAmount: 111754 },
  { year: "Year 3", contributions: 112512, totalAmount: 132930 },
  { year: "Year 4", contributions: 125016, totalAmount: 156223 },
  { year: "Year 5", contributions: 137520, totalAmount: 182000 },
]

interface SavingsPlannerProps {
  className?: string
  showHeader?: boolean
  height?: number
}

export default function SavingsPlanner({ className, showHeader = true, height = 300 }: SavingsPlannerProps) {
  const [initialInvestment, setInitialInvestment] = useState(75000)
  const [monthlyContribution, setMonthlyContribution] = useState(1042)
  const [annualReturn, setAnnualReturn] = useState(8)
  const [years, setYears] = useState(5)
  const [projectionData, setProjectionData] = useState(initialProjectionData)

  const calculateProjection = () => {
    const newData = [{ year: "Start", contributions: initialInvestment, totalAmount: initialInvestment }]

    let totalContributions = initialInvestment
    let currentAmount = initialInvestment

    for (let i = 1; i <= years; i++) {
      const yearlyContribution = monthlyContribution * 12
      totalContributions += yearlyContribution

      // Calculate compound interest
      currentAmount = (currentAmount + yearlyContribution) * (1 + annualReturn / 100)

      newData.push({
        year: `Year ${i}`,
        contributions: Math.round(totalContributions),
        totalAmount: Math.round(currentAmount),
      })
    }

    setProjectionData(newData)
  }

  return (
    <Card className={className}>
      {showHeader && (
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PiggyBank className="h-5 w-5 text-zemen-red" />
            Savings Planner
          </CardTitle>
          <CardDescription>Plan your savings to achieve your investment goals</CardDescription>
        </CardHeader>
      )}
      <CardContent>
        <div className="space-y-4 mb-6">
          <div className="space-y-2">
            <Label htmlFor="initial-investment">Initial Investment ($)</Label>
            <Input
              id="initial-investment"
              type="number"
              value={initialInvestment}
              onChange={(e) => setInitialInvestment(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthly-contribution">Monthly Contribution ($)</Label>
            <Input
              id="monthly-contribution"
              type="number"
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="annual-return">Annual Return (%)</Label>
              <span className="text-sm font-medium">{annualReturn}%</span>
            </div>
            <Slider
              id="annual-return"
              min={1}
              max={15}
              step={0.5}
              value={[annualReturn]}
              onValueChange={(value) => setAnnualReturn(value[0])}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="years">Investment Period (Years)</Label>
              <span className="text-sm font-medium">{years} years</span>
            </div>
            <Slider
              id="years"
              min={1}
              max={30}
              step={1}
              value={[years]}
              onValueChange={(value) => setYears(value[0])}
            />
          </div>

          <Button onClick={calculateProjection} className="w-full bg-zemen-red hover:bg-zemen-darkRed text-white">
            <Calculator className="h-4 w-4 mr-2" />
            Calculate Projection
          </Button>
        </div>

        <div className={`h-[${height}px] w-full`}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={projectionData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, ""]} />
              <Legend />
              <Bar dataKey="contributions" name="Total Contributions" fill="#D81B60" />
              <Bar dataKey="totalAmount" name="Projected Value" fill="#E91E63" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 text-sm">
          <p className="font-medium">
            Projected final amount:{" "}
            <span className="text-green-600">
              ${projectionData[projectionData.length - 1].totalAmount.toLocaleString()}
            </span>
          </p>
          <p className="text-muted-foreground">
            Total contributions: ${projectionData[projectionData.length - 1].contributions.toLocaleString()}
          </p>
          <p className="text-muted-foreground">
            Investment growth: $
            {(
              projectionData[projectionData.length - 1].totalAmount -
              projectionData[projectionData.length - 1].contributions
            ).toLocaleString()}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
