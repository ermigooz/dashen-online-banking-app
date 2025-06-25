import { initializeExchangeRatesTable } from "../lib/exchange-rates"

async function main() {
  console.log("Initializing exchange rates table...")

  try {
    const result = await initializeExchangeRatesTable()

    if (result) {
      console.log("Exchange rates table initialized successfully!")
    } else {
      console.error("Failed to initialize exchange rates table")
      process.exit(1)
    }
  } catch (error) {
    console.error("Error:", error)
    process.exit(1)
  }
}

main()
