"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { formatCurrency } from "@/lib/utils"
import { PieChartIcon } from "lucide-react"

// Mock data for performance breakdown
const mockPerformanceData = [
  { name: "Share Value Growth", value: 15000, color: "#D81B60" },
  { name: "Dividends", value: 5475, color: "#E91E63" },
  { name: "Bonus Shares", value: 2040, color: "#B71C5A" },
]

interface PerformanceBreakdownChartProps {
  className?: string
  showHeader?: boolean
  height?: number
}

export default function PerformanceBreakdownChart({
  className,
  showHeader = true,
  height = 300,
}: PerformanceBreakdownChartProps) {
  const totalPerformance = mockPerformanceData.reduce((sum, item) => sum + item.value, 0)

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-background border rounded-md shadow-md p-3">
          <p className="font-medium" style={{ color: data.color }}>
            {data.name}
          </p>
          <p className="text-foreground font-medium">{formatCurrency(data.value)}</p>
          <p className="text-muted-foreground text-sm">
            {((data.value / totalPerformance) * 100).toFixed(1)}% of total
          </p>
        </div>
      )
    }
    return null
  }

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
        fontWeight="bold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }

  return (
    <Card className={className}>
      {showHeader && (
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChartIcon className="h-5 w-5 text-dashen-red" />
            Performance Breakdown
          </CardTitle>
          <CardDescription>Analysis of your investment returns</CardDescription>
        </CardHeader>
      )}
      <CardContent>
        <div className="mb-4 p-4 rounded-lg bg-gradient-to-r from-dashen-red/10 to-dashen-lightRed/10">
          <p className="text-sm font-medium text-muted-foreground">Total Performance Gain</p>
          <p className="text-2xl font-bold">{formatCurrency(totalPerformance)}</p>
          <p className="text-sm text-emerald-600">
            +{((totalPerformance / 75000) * 100).toFixed(1)}% on initial investment
          </p>
        </div>

        <div className={`h-[${height}px]`}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockPerformanceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {mockPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend
                layout="vertical"
                verticalAlign="middle"
                align="right"
                formatter={(value, entry, index) => {
                  return (
                    <span className="text-sm font-medium">
                      {value}: {formatCurrency(mockPerformanceData[index].value)}
                    </span>
                  )
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
