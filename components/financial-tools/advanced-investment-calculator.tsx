"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Calculator, TrendingUp, Download, Share2 } from "lucide-react"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { formatCurrency } from "@/lib/utils"

interface AdvancedInvestmentCalculatorProps {
  className?: string
}

export default function AdvancedInvestmentCalculator({ className }: AdvancedInvestmentCalculatorProps) {
  // Investment parameters
  const [initialInvestment, setInitialInvestment] = useState(75000)
  const [monthlyContribution, setMonthlyContribution] = useState(1000)
  const [investmentPeriod, setInvestmentPeriod] = useState(10)
  const [expectedReturn, setExpectedReturn] = useState(8)
  const [inflationRate, setInflationRate] = useState(3)
  const [reinvestDividends, setReinvestDividends] = useState(true)
  const [taxRate, setTaxRate] = useState(15)
  const [riskLevel, setRiskLevel] = useState("moderate")

  // Calculation results
  const [projectionData, setProjectionData] = useState<any[]>([])
  const [summaryData, setSummaryData] = useState({
    futureValue: 0,
    totalContributions: 0,
    totalGrowth: 0,
    inflationAdjustedValue: 0,
    annualizedReturn: 0,
  })

  // Scenario comparison
  const [scenarioType, setScenarioType] = useState("default")

  const calculateProjection = () => {
    // Reset data
    const newProjectionData: any[] = []

    // Initial values
    let currentValue = initialInvestment
    let totalContributions = initialInvestment
    const yearlyContribution = monthlyContribution * 12

    // Adjust return rate based on risk level
    let adjustedReturn = expectedReturn
    if (riskLevel === "conservative") adjustedReturn = expectedReturn * 0.8
    if (riskLevel === "aggressive") adjustedReturn = expectedReturn * 1.2

    // Calculate for each year
    for (let year = 0; year <= investmentPeriod; year++) {
      // Calculate values for this year
      const yearlyReturn = currentValue * (adjustedReturn / 100)
      const taxableAmount = reinvestDividends ? 0 : yearlyReturn
      const taxPaid = taxableAmount * (taxRate / 100)

      // Add to projection data
      newProjectionData.push({
        year: year === 0 ? "Start" : `Year ${year}`,
        investmentValue: Math.round(currentValue),
        contributions: Math.round(totalContributions),
        returns: year === 0 ? 0 : Math.round(yearlyReturn - taxPaid),
        inflationAdjustedValue: Math.round(currentValue / Math.pow(1 + inflationRate / 100, year)),
      })

      // Update for next year
      if (year < investmentPeriod) {
        currentValue = currentValue + yearlyReturn - taxPaid + yearlyContribution
        totalContributions += yearlyContribution
      }
    }

    // Calculate summary data
    const finalYear = newProjectionData[newProjectionData.length - 1]
    const initialYear = newProjectionData[0]
    const totalYears = investmentPeriod

    const annualizedReturn =
      (Math.pow(finalYear.investmentValue / initialYear.investmentValue, 1 / totalYears) - 1) * 100

    setSummaryData({
      futureValue: finalYear.investmentValue,
      totalContributions: finalYear.contributions,
      totalGrowth: finalYear.investmentValue - finalYear.contributions,
      inflationAdjustedValue: finalYear.inflationAdjustedValue,
      annualizedReturn: annualizedReturn,
    })

    setProjectionData(newProjectionData)
  }

  // Generate comparison data based on scenario
  const generateComparisonData = () => {
    if (projectionData.length === 0) return []

    // Create a copy of the original data
    const baseData = [...projectionData]

    // Generate comparison data based on selected scenario
    let comparisonData: any[] = []

    switch (scenarioType) {
      case "higher-return":
        // Calculate with 2% higher return
        comparisonData = calculateScenario(expectedReturn + 2)
        break
      case "lower-return":
        // Calculate with 2% lower return
        comparisonData = calculateScenario(expectedReturn - 2)
        break
      case "higher-contribution":
        // Calculate with 20% higher monthly contribution
        comparisonData = calculateScenario(expectedReturn, monthlyContribution * 1.2)
        break
      default:
        comparisonData = baseData
    }

    return comparisonData
  }

  // Helper function to calculate scenario data
  const calculateScenario = (returnRate: number, contribution = monthlyContribution) => {
    const scenarioData: any[] = []

    // Initial values
    let currentValue = initialInvestment
    let totalContributions = initialInvestment
    const yearlyContribution = contribution * 12

    // Adjust return rate based on risk level
    let adjustedReturn = returnRate
    if (riskLevel === "conservative") adjustedReturn = returnRate * 0.8
    if (riskLevel === "aggressive") adjustedReturn = returnRate * 1.2

    // Calculate for each year
    for (let year = 0; year <= investmentPeriod; year++) {
      // Calculate values for this year
      const yearlyReturn = currentValue * (adjustedReturn / 100)
      const taxableAmount = reinvestDividends ? 0 : yearlyReturn
      const taxPaid = taxableAmount * (taxRate / 100)

      // Add to scenario data
      scenarioData.push({
        year: year === 0 ? "Start" : `Year ${year}`,
        investmentValue: Math.round(currentValue),
        contributions: Math.round(totalContributions),
        returns: year === 0 ? 0 : Math.round(yearlyReturn - taxPaid),
        inflationAdjustedValue: Math.round(currentValue / Math.pow(1 + inflationRate / 100, year)),
      })

      // Update for next year
      if (year < investmentPeriod) {
        currentValue = currentValue + yearlyReturn - taxPaid + yearlyContribution
        totalContributions += yearlyContribution
      }
    }

    return scenarioData
  }

  // Custom tooltip for the chart
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border rounded-md shadow-md">
          <p className="font-bold">{label}</p>
          <p className="text-zemen-red">Value: {formatCurrency(payload[0].value)}</p>
          {payload.length > 1 && <p className="text-zemen-lightRed">Comparison: {formatCurrency(payload[1].value)}</p>}
          {payload[0].payload.inflationAdjustedValue && (
            <p className="text-gray-600">
              Inflation Adjusted: {formatCurrency(payload[0].payload.inflationAdjustedValue)}
            </p>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5 text-zemen-red" />
          Advanced Investment Calculator
        </CardTitle>
        <CardDescription>Plan your investment strategy with detailed projections and scenario analysis</CardDescription>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="parameters" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3 bg-zemen-red/10">
            <TabsTrigger value="parameters" className="data-[state=active]:bg-zemen-red data-[state=active]:text-white">
              Parameters
            </TabsTrigger>
            <TabsTrigger
              value="projections"
              className="data-[state=active]:bg-zemen-red data-[state=active]:text-white"
            >
              Projections
            </TabsTrigger>
            <TabsTrigger value="comparison" className="data-[state=active]:bg-zemen-red data-[state=active]:text-white">
              Scenario Analysis
            </TabsTrigger>
          </TabsList>

          <TabsContent value="parameters" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="initial-investment">Initial Investment (ETB)</Label>
                <Input
                  id="initial-investment"
                  type="number"
                  value={initialInvestment}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthly-contribution">Monthly Contribution (ETB)</Label>
                <Input
                  id="monthly-contribution"
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="investment-period">Investment Period (Years)</Label>
                <span className="text-sm font-medium">{investmentPeriod} years</span>
              </div>
              <Slider
                id="investment-period"
                min={1}
                max={30}
                step={1}
                value={[investmentPeriod]}
                onValueChange={(value) => setInvestmentPeriod(value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="expected-return">Expected Annual Return (%)</Label>
                <span className="text-sm font-medium">{expectedReturn}%</span>
              </div>
              <Slider
                id="expected-return"
                min={1}
                max={20}
                step={0.5}
                value={[expectedReturn]}
                onValueChange={(value) => setExpectedReturn(value[0])}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="inflation-rate">Inflation Rate (%)</Label>
                <span className="text-sm font-medium">{inflationRate}%</span>
              </div>
              <Slider
                id="inflation-rate"
                min={0}
                max={10}
                step={0.5}
                value={[inflationRate]}
                onValueChange={(value) => setInflationRate(value[0])}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="risk-level">Risk Level</Label>
                <Select value={riskLevel} onValueChange={setRiskLevel}>
                  <SelectTrigger id="risk-level">
                    <SelectValue placeholder="Select risk level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="conservative">Conservative</SelectItem>
                    <SelectItem value="moderate">Moderate</SelectItem>
                    <SelectItem value="aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                <Input
                  id="tax-rate"
                  type="number"
                  value={taxRate}
                  onChange={(e) => setTaxRate(Number(e.target.value))}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Switch id="reinvest-dividends" checked={reinvestDividends} onCheckedChange={setReinvestDividends} />
              <Label htmlFor="reinvest-dividends">Reinvest Dividends</Label>
            </div>

            <Button onClick={calculateProjection} className="w-full bg-zemen-red hover:bg-zemen-darkRed text-white">
              <Calculator className="h-4 w-4 mr-2" />
              Calculate Projection
            </Button>
          </TabsContent>

          <TabsContent value="projections">
            {projectionData.length > 0 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-zemen-red/10 p-4 rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground">Future Value</p>
                    <p className="text-2xl font-bold">{formatCurrency(summaryData.futureValue)}</p>
                  </div>

                  <div className="bg-zemen-lightRed/10 p-4 rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground">Total Contributions</p>
                    <p className="text-2xl font-bold">{formatCurrency(summaryData.totalContributions)}</p>
                  </div>

                  <div className="bg-zemen-red/10 p-4 rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground">Investment Growth</p>
                    <p className="text-2xl font-bold">{formatCurrency(summaryData.totalGrowth)}</p>
                  </div>

                  <div className="bg-zemen-lightRed/10 p-4 rounded-lg">
                    <p className="text-sm font-medium text-muted-foreground">Inflation Adjusted Value</p>
                    <p className="text-2xl font-bold">{formatCurrency(summaryData.inflationAdjustedValue)}</p>
                  </div>
                </div>

                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={projectionData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="investmentValue"
                        name="Investment Value"
                        stroke="#D81B60"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="inflationAdjustedValue"
                        name="Inflation Adjusted"
                        stroke="#B71C5A"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 3 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="contributions"
                        name="Total Contributions"
                        stroke="#E91E63"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Investment Summary</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    With an initial investment of {formatCurrency(initialInvestment)} and monthly contributions of{" "}
                    {formatCurrency(monthlyContribution)}, your investment could grow to{" "}
                    {formatCurrency(summaryData.futureValue)} over {investmentPeriod} years.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    This represents a total growth of {formatCurrency(summaryData.totalGrowth)} on your contributions,
                    with an annualized return of {summaryData.annualizedReturn.toFixed(2)}%.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Projection Data</h3>
                <p className="text-muted-foreground mt-2">
                  Set your investment parameters and click "Calculate Projection" to see your investment growth.
                </p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="comparison">
            {projectionData.length > 0 ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="scenario-type">Compare With Scenario</Label>
                  <Select value={scenarioType} onValueChange={setScenarioType}>
                    <SelectTrigger id="scenario-type">
                      <SelectValue placeholder="Select scenario" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="default">Base Scenario</SelectItem>
                      <SelectItem value="higher-return">Higher Return (+2%)</SelectItem>
                      <SelectItem value="lower-return">Lower Return (-2%)</SelectItem>
                      <SelectItem value="higher-contribution">Higher Contribution (+20%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="h-[400px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" allowDuplicatedCategory={false} type="category" />
                      <YAxis />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Line
                        data={projectionData}
                        type="monotone"
                        dataKey="investmentValue"
                        name="Base Scenario"
                        stroke="#D81B60"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      {scenarioType !== "default" && (
                        <Line
                          data={generateComparisonData()}
                          type="monotone"
                          dataKey="investmentValue"
                          name={
                            scenarioType === "higher-return"
                              ? "Higher Return"
                              : scenarioType === "lower-return"
                                ? "Lower Return"
                                : "Higher Contribution"
                          }
                          stroke="#E91E63"
                          strokeWidth={2}
                          dot={{ r: 3 }}
                          activeDot={{ r: 5 }}
                        />
                      )}
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="bg-muted p-4 rounded-lg">
                  <h3 className="font-medium mb-2">Scenario Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    This chart compares your base investment scenario with alternative scenarios to help you understand
                    how different factors might affect your investment outcomes.
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <TrendingUp className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Comparison Data</h3>
                <p className="text-muted-foreground mt-2">
                  Calculate a projection first to compare different investment scenarios.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>

      {projectionData.length > 0 && (
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" className="text-zemen-red border-zemen-red hover:bg-zemen-red/10">
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" className="text-zemen-red border-zemen-red hover:bg-zemen-red/10">
            <Share2 className="h-4 w-4 mr-2" />
            Share Results
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}
