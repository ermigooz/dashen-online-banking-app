import { NextResponse } from "next/server"
import { getAllExchangeRates } from "@/lib/exchange-rates"
import { logError } from "@/lib/error-handler"

// GET /api/exchange-rates/admin - Get all exchange rates for admin
export async function GET(request: Request) {
  try {
    // In a real app, we would check if the user is authenticated and has admin privileges

    const rates = await getAllExchangeRates()
    
    // If no rates returned (database not available), return empty response
    if (!rates || rates.length === 0) {
      return NextResponse.json([], { 
        status: 200,
        headers: {
          'X-Database-Status': 'unavailable'
        }
      })
    }

    return NextResponse.json(rates)
  } catch (error) {
    logError(error, "api/exchange-rates/admin GET")
    return NextResponse.json({ error: "Failed to fetch exchange rates" }, { status: 500 })
  }
}
