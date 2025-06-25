import { NextResponse } from "next/server"
import { getAllExchangeRates, updateExchangeRate, initializeExchangeRatesTable } from "@/lib/exchange-rates"
import { logError } from "@/lib/error-handler"

// Initialize the table when the API is first accessed
let initialized = false

// GET /api/exchange-rates - Get all exchange rates
export async function GET(request: Request) {
  try {
    // Initialize the table if not already done
    if (!initialized) {
      await initializeExchangeRatesTable()
      initialized = true
    }

    const rates = await getAllExchangeRates()

    // If no rates returned (database not available), return empty response
    if (!rates || rates.length === 0) {
      return NextResponse.json({
        buying: [],
        selling: [],
        lastUpdated: new Date(),
        message: "Database not available - using fallback data"
      })
    }

    // Group rates by buying and selling
    const buyingRates = rates.map((rate) => ({
      currency: rate.currency,
      rate: Number(rate.buying_rate),
      change: Number(rate.change),
    }))

    const sellingRates = rates.map((rate) => ({
      currency: rate.currency,
      rate: Number(rate.selling_rate),
      change: Number(rate.change),
    }))

    return NextResponse.json({
      buying: buyingRates,
      selling: sellingRates,
      lastUpdated: rates.length > 0 ? rates[0].last_updated : new Date(),
    })
  } catch (error) {
    logError(error, "api/exchange-rates GET")
    return NextResponse.json({ error: "Failed to fetch exchange rates" }, { status: 500 })
  }
}

// POST /api/exchange-rates - Update exchange rates
export async function POST(request: Request) {
  try {
    // Check if user is authenticated and has admin privileges
    // This would be implemented with proper auth in a real app

    const body = await request.json()

    if (!body.currency || body.buyingRate === undefined || body.sellingRate === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await updateExchangeRate(body.currency, body.buyingRate, body.sellingRate)

    if (!result) {
      return NextResponse.json({ 
        error: "Failed to update exchange rate - database may not be available" 
      }, { status: 503 })
    }

    return NextResponse.json(result)
  } catch (error) {
    logError(error, "api/exchange-rates POST")
    return NextResponse.json({ error: "Failed to update exchange rate" }, { status: 500 })
  }
}
