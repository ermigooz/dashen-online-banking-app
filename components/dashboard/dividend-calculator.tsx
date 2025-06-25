"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { formatCurrency } from "@/lib/utils"
import { Calculator } from "lucide-react"
import { motion } from "framer-motion"

interface Share {
  id: string
  shareholder_id: string
  total_shares: number
  share_value: number
  purchase_date: string
}

interface DividendCalculatorProps {
  shares: Share[]
}

export default function DividendCalculator({ shares }: DividendCalculatorProps) {
  const totalShares = shares?.reduce((sum, share) => sum + share.total_shares, 0) || 0
  const totalValue = shares?.reduce((sum, share) => sum + Number(share.share_value), 0) || 0

  const [dividendRate, setDividendRate] = useState(5) // Default 5%
  const [years, setYears] = useState(1)

  // Calculate estimated dividends
  const annualDividend = (totalValue * dividendRate) / 100
  const totalDividend = annualDividend * years

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-md border-t-4 border-t-dashen-red">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-dashen-red" />
            <span>Dividend Calculator</span>
          </CardTitle>
          <CardDescription>Estimate your potential dividend earnings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="dividend-rate">Dividend Rate (%)</Label>
                <span className="text-sm font-medium">{dividendRate}%</span>
              </div>
              <Slider
                id="dividend-rate"
                min={1}
                max={15}
                step={0.5}
                value={[dividendRate]}
                onValueChange={(value) => setDividendRate(value[0])}
                className="py-2"
              />
              <p className="text-xs text-muted-foreground">The annual dividend rate as a percentage of share value</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="years">Time Period (Years)</Label>
              <Input
                id="years"
                type="number"
                min={1}
                max={30}
                value={years}
                onChange={(e) => setYears(Number.parseInt(e.target.value) || 1)}
                className="transition-all duration-200 focus:ring-2 focus:ring-dashen-red/50"
              />
            </div>

            <div className="border rounded-lg p-4 bg-gradient-to-r from-dashen-red/5 to-dashen-lightRed/5 space-y-3">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Your Total Shares</p>
                <p className="text-lg font-medium">{totalShares.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Current Share Value</p>
                <p className="text-lg font-medium">{formatCurrency(totalValue)}</p>
              </div>
              <div className="pt-2 border-t">
                <p className="text-sm font-medium text-muted-foreground">Estimated Annual Dividend</p>
                <p className="text-xl font-bold text-dashen-red">{formatCurrency(annualDividend)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Estimated Dividend ({years} {years === 1 ? "year" : "years"})
                </p>
                <p className="text-xl font-bold text-dashen-red">{formatCurrency(totalDividend)}</p>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="text-xs text-muted-foreground">
          Note: This is an estimate based on current share value and the selected dividend rate. Actual dividends may
          vary based on bank performance and board decisions.
        </CardFooter>
      </Card>
    </motion.div>
  )
}
