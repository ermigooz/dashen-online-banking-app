"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RefreshCw, Save, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ExchangeRate {
  currency: string
  buying_rate: number
  selling_rate: number
  change: number
  last_updated: string
}

export default function AdminExchangeRatesPage() {
  const [rates, setRates] = useState<ExchangeRate[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [newCurrency, setNewCurrency] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    fetchRates()
  }, [])

  const fetchRates = async () => {
    setLoading(true)
    try {
      const response = await fetch("/api/exchange-rates/admin")
      if (!response.ok) {
        throw new Error("Failed to fetch rates")
      }
      const data = await response.json()
      setRates(data)
    } catch (error) {
      console.error("Error fetching rates:", error)
      toast({
        title: "Error",
        description: "Failed to load exchange rates",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRateChange = (index: number, field: "buying_rate" | "selling_rate", value: string) => {
    const newRates = [...rates]
    newRates[index][field] = Number.parseFloat(value) || 0
    setRates(newRates)
  }

  const saveRate = async (currency: string, buyingRate: number, sellingRate: number) => {
    setSaving(true)
    try {
      const response = await fetch("/api/exchange-rates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currency,
          buyingRate,
          sellingRate,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update rate")
      }

      toast({
        title: "Success",
        description: `Exchange rate for ${currency} updated successfully`,
      })

      // Refresh rates
      fetchRates()
    } catch (error) {
      console.error("Error updating rate:", error)
      toast({
        title: "Error",
        description: "Failed to update exchange rate",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  const addNewCurrency = () => {
    if (!newCurrency) {
      toast({
        title: "Error",
        description: "Please enter a currency code",
        variant: "destructive",
      })
      return
    }

    // Check if currency already exists
    if (rates.some((rate) => rate.currency === newCurrency.toUpperCase())) {
      toast({
        title: "Error",
        description: "This currency already exists",
        variant: "destructive",
      })
      return
    }

    // Add new currency to the list
    setRates([
      ...rates,
      {
        currency: newCurrency.toUpperCase(),
        buying_rate: 0,
        selling_rate: 0,
        change: 0,
        last_updated: new Date().toISOString(),
      },
    ])

    setNewCurrency("")
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Manage Exchange Rates</h1>
        <Button onClick={fetchRates} variant="outline" disabled={loading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          Refresh
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Currency</CardTitle>
          <CardDescription>Add a new currency to the exchange rates list</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <Label htmlFor="newCurrency">Currency Code</Label>
              <Input
                id="newCurrency"
                value={newCurrency}
                onChange={(e) => setNewCurrency(e.target.value.toUpperCase())}
                placeholder="e.g. JPY"
                maxLength={3}
              />
            </div>
            <div className="flex items-end">
              <Button onClick={addNewCurrency}>
                <Plus className="mr-2 h-4 w-4" />
                Add Currency
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Current Exchange Rates</CardTitle>
          <CardDescription>Update the buying and selling rates for each currency</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4 text-muted-foreground" />
              <p className="text-muted-foreground">Loading exchange rates...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {rates.map((rate, index) => (
                <div key={rate.currency} className="border p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold">{rate.currency}</h3>
                    <span className="text-sm text-muted-foreground">
                      Last updated: {new Date(rate.last_updated).toLocaleString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor={`buying-${rate.currency}`}>Buying Rate (ETB)</Label>
                      <Input
                        id={`buying-${rate.currency}`}
                        type="number"
                        step="0.0001"
                        value={rate.buying_rate}
                        onChange={(e) => handleRateChange(index, "buying_rate", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor={`selling-${rate.currency}`}>Selling Rate (ETB)</Label>
                      <Input
                        id={`selling-${rate.currency}`}
                        type="number"
                        step="0.0001"
                        value={rate.selling_rate}
                        onChange={(e) => handleRateChange(index, "selling_rate", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      onClick={() => saveRate(rate.currency, rate.buying_rate, rate.selling_rate)}
                      disabled={saving}
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Save Changes
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
