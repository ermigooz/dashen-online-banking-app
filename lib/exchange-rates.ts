import { sql, safeSql } from "@/lib/neon-db"

export interface ExchangeRate {
  id: string
  currency: string
  buying_rate: number
  selling_rate: number
  change: number
  last_updated: Date
}

// Get all current exchange rates
export async function getAllExchangeRates(): Promise<ExchangeRate[]> {
  if (!sql) {
    console.warn("Database not available - returning empty exchange rates")
    return []
  }

  try {
    const result = await sql`
      SELECT * FROM exchange_rates
      ORDER BY currency ASC
    `
    return result
  } catch (error) {
    console.error("Error fetching exchange rates:", error)
    return []
  }
}

// Get exchange rate by currency
export async function getExchangeRateByCurrency(currency: string): Promise<ExchangeRate | null> {
  if (!sql) {
    console.warn("Database not available - cannot fetch exchange rate")
    return null
  }

  try {
    const result = await sql`
      SELECT * FROM exchange_rates
      WHERE currency = ${currency}
    `
    return result.length > 0 ? result[0] : null
  } catch (error) {
    console.error(`Error fetching exchange rate for ${currency}:`, error)
    return null
  }
}

// Update exchange rate
export async function updateExchangeRate(
  currency: string,
  buyingRate: number,
  sellingRate: number,
): Promise<ExchangeRate | null> {
  if (!sql) {
    console.warn("Database not available - cannot update exchange rate")
    return null
  }

  try {
    // Calculate change based on previous rate
    const previousRate = await getExchangeRateByCurrency(currency)
    const change = previousRate ? ((buyingRate - previousRate.buying_rate) / previousRate.buying_rate) * 100 : 0

    const result = await sql`
      UPDATE exchange_rates
      SET 
        buying_rate = ${buyingRate},
        selling_rate = ${sellingRate},
        change = ${change},
        last_updated = NOW()
      WHERE currency = ${currency}
      RETURNING *
    `

    if (result.length === 0) {
      // If no rows were updated, insert a new record
      const insertResult = await sql`
        INSERT INTO exchange_rates (currency, buying_rate, selling_rate, change, last_updated)
        VALUES (${currency}, ${buyingRate}, ${sellingRate}, ${change}, NOW())
        RETURNING *
      `
      return insertResult[0]
    }

    return result[0]
  } catch (error) {
    console.error(`Error updating exchange rate for ${currency}:`, error)
    return null
  }
}

// Initialize exchange rates table
export async function initializeExchangeRatesTable(): Promise<boolean> {
  if (!sql) {
    console.warn("Database not available - cannot initialize exchange rates table")
    return false
  }

  try {
    // Create the table if it doesn't exist
    await sql`
      CREATE TABLE IF NOT EXISTS exchange_rates (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        currency VARCHAR(10) NOT NULL UNIQUE,
        buying_rate DECIMAL(10, 4) NOT NULL,
        selling_rate DECIMAL(10, 4) NOT NULL,
        change DECIMAL(10, 2) NOT NULL,
        last_updated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Check if we have data, if not, seed with initial values
    const existingRates = await sql`SELECT COUNT(*) FROM exchange_rates`

    if (Number.parseInt(existingRates[0].count) === 0) {
      // Seed with initial exchange rates
      const initialRates = [
        { currency: "USD", buying_rate: 55.3421, selling_rate: 56.4532, change: 0.12 },
        { currency: "EUR", buying_rate: 59.8765, selling_rate: 61.2345, change: -0.23 },
        { currency: "GBP", buying_rate: 70.4532, selling_rate: 71.8765, change: 0.34 },
        { currency: "CAD", buying_rate: 40.7654, selling_rate: 41.5432, change: 0.05 },
        { currency: "AUD", buying_rate: 36.5432, selling_rate: 37.2345, change: -0.15 },
        { currency: "SAR", buying_rate: 14.7654, selling_rate: 15.1234, change: 0.02 },
        { currency: "AED", buying_rate: 15.0876, selling_rate: 15.4321, change: -0.08 },
      ]

      for (const rate of initialRates) {
        await sql`
          INSERT INTO exchange_rates (currency, buying_rate, selling_rate, change)
          VALUES (${rate.currency}, ${rate.buying_rate}, ${rate.selling_rate}, ${rate.change})
        `
      }
    }

    return true
  } catch (error) {
    console.error("Error initializing exchange rates table:", error)
    return false
  }
}
