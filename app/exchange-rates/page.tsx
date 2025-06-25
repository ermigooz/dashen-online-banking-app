"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { RefreshCw, DollarSign, TrendingUp, TrendingDown, Globe } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ExchangeRateItem {
  currency: string
  rate: number
  change: number
}

interface ExchangeRatesData {
  buying: ExchangeRateItem[]
  selling: ExchangeRateItem[]
  lastUpdated: string
}

export default function ExchangeRatesPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [exchangeRates, setExchangeRates] = useState<ExchangeRatesData | null>(null)
  const [lastUpdated, setLastUpdated] = useState(new Date())
  const { toast } = useToast()

  const fetchExchangeRates = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/exchange-rates")

      if (!response.ok) {
        throw new Error(`Failed to fetch exchange rates: ${response.status}`)
      }

      const data = await response.json()
      setExchangeRates(data)
      setLastUpdated(new Date(data.lastUpdated))
    } catch (err) {
      console.error("Error fetching exchange rates:", err)
      setError("Failed to load exchange rates. Please try again later.")

      toast({
        title: "Error",
        description: "Failed to load exchange rates. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchExchangeRates()
  }, [])

  const refreshRates = () => {
    fetchExchangeRates()
  }

  return (
    <div className="container py-8 px-4 md:px-6 lg:py-12">
      <h1 className="text-3xl font-bold mb-6">Daily Exchange Rates</h1>
      <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
        Official exchange rates provided by Dashen Bank for international transactions
      </p>
      <div className="flex justify-end mb-6">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Last updated: {lastUpdated.toLocaleString()}</span>
          <button
            onClick={refreshRates}
            className="inline-flex items-center justify-center rounded-md p-1 hover:bg-accent hover:text-accent-foreground"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            <span className="sr-only">Refresh rates</span>
          </button>
        </div>
      </div>

      {error && <div className="bg-destructive/10 text-destructive p-4 rounded-md mb-6">{error}</div>}

      <div className="grid gap-6">
        <Card className="overflow-hidden">
          <CardHeader className="bg-muted/50 pb-4">
            <CardTitle>Daily Exchange Rates</CardTitle>
            <CardDescription>
              Official exchange rates provided by Dashen Bank for international transactions
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Tabs defaultValue="buying" className="w-full">
              <div className="border-b px-6 py-3">
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="buying">Buying Rate</TabsTrigger>
                  <TabsTrigger value="selling">Selling Rate</TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="buying" className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/30">
                        <th className="text-left p-4 font-medium">Currency</th>
                        <th className="text-right p-4 font-medium">Rate (ETB)</th>
                        <th className="text-right p-4 font-medium">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading
                        ? Array(7)
                            .fill(0)
                            .map((_, i) => (
                              <tr key={i} className="border-b">
                                <td className="p-4">
                                  <Skeleton className="h-5 w-16" />
                                </td>
                                <td className="p-4 text-right">
                                  <Skeleton className="h-5 w-20 ml-auto" />
                                </td>
                                <td className="p-4 text-right">
                                  <Skeleton className="h-5 w-16 ml-auto" />
                                </td>
                              </tr>
                            ))
                        : exchangeRates?.buying.map((item) => (
                            <tr key={item.currency} className="border-b hover:bg-muted/50 transition-colors">
                              <td className="p-4 font-medium">{item.currency}</td>
                              <td className="p-4 text-right tabular-nums">{Number(item.rate).toFixed(4)}</td>
                              <td className="p-4 text-right">
                                <div
                                  className={`inline-flex items-center gap-1 ${item.change >= 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  {item.change >= 0 ? (
                                    <TrendingUp className="h-4 w-4" />
                                  ) : (
                                    <TrendingDown className="h-4 w-4" />
                                  )}
                                  <span className="tabular-nums">{Math.abs(item.change).toFixed(2)}%</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>

              <TabsContent value="selling" className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/30">
                        <th className="text-left p-4 font-medium">Currency</th>
                        <th className="text-right p-4 font-medium">Rate (ETB)</th>
                        <th className="text-right p-4 font-medium">Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading
                        ? Array(7)
                            .fill(0)
                            .map((_, i) => (
                              <tr key={i} className="border-b">
                                <td className="p-4">
                                  <Skeleton className="h-5 w-16" />
                                </td>
                                <td className="p-4 text-right">
                                  <Skeleton className="h-5 w-20 ml-auto" />
                                </td>
                                <td className="p-4 text-right">
                                  <Skeleton className="h-5 w-16 ml-auto" />
                                </td>
                              </tr>
                            ))
                        : exchangeRates?.selling.map((item) => (
                            <tr key={item.currency} className="border-b hover:bg-muted/50 transition-colors">
                              <td className="p-4 font-medium">{item.currency}</td>
                              <td className="p-4 text-right tabular-nums">{Number(item.rate).toFixed(4)}</td>
                              <td className="p-4 text-right">
                                <div
                                  className={`inline-flex items-center gap-1 ${item.change >= 0 ? "text-green-600" : "text-red-600"}`}
                                >
                                  {item.change >= 0 ? (
                                    <TrendingUp className="h-4 w-4" />
                                  ) : (
                                    <TrendingDown className="h-4 w-4" />
                                  )}
                                  <span className="tabular-nums">{Math.abs(item.change).toFixed(2)}%</span>
                                </div>
                              </td>
                            </tr>
                          ))}
                    </tbody>
                  </table>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5 text-dashen-red" />
                Exchange Rate Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>
                  Exchange rates are subject to change without prior notice based on international market fluctuations.
                </p>
                <p>
                  For large transactions or special rates, please contact your nearest Dashen Bank branch or call our
                  customer service.
                </p>
                <p className="text-sm text-muted-foreground">
                  Note: These rates are indicative only and may vary at the time of transaction.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-dashen-red" />
                International Banking Services
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p>Dashen Bank offers comprehensive international banking services including:</p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Foreign currency accounts</li>
                  <li>International money transfers</li>
                  <li>Remittance services</li>
                  <li>Foreign exchange</li>
                  <li>Import/Export financing</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-4">
                  For more information, visit your nearest branch or contact our international banking department.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
