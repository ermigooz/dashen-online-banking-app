import { sql } from "@/lib/neon-db"

async function seedEvents() {
  try {
    // First, check if we already have events
    const existingEvents = await sql`SELECT COUNT(*) FROM events`

    if (Number.parseInt(existingEvents[0].count) > 0) {
      console.log("Events table already has data. Skipping seed.")
      return
    }

    // Sample events data
    const events = [
      {
        title: "Annual Shareholder Meeting",
        description:
          "Join us for our annual shareholder meeting where we will discuss company performance, future plans, and answer your questions.",
        event_type: "Meeting",
        location: "Dashen Bank Headquarters, Addis Ababa",
        start_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        end_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000 + 3 * 60 * 60 * 1000), // 3 hours after start
        is_public: true,
        virtual_link: "https://zoom.us/j/example",
      },
      {
        title: "Q2 Earnings Call",
        description: "Quarterly earnings call to discuss financial results for Q2 2023.",
        event_type: "Financial",
        location: null,
        start_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 days from now
        end_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000 + 1 * 60 * 60 * 1000), // 1 hour after start
        is_public: true,
        virtual_link: "https://zoom.us/j/earnings",
      },
      {
        title: "Investor Workshop",
        description:
          "A workshop for new investors to learn about our company structure, investment opportunities, and shareholder benefits.",
        event_type: "Workshop",
        location: "Financial District Conference Center, San Francisco",
        start_date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), // 21 days from now
        end_date: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000), // 4 hours after start
        is_public: true,
        virtual_link: null,
      },
    ]

    // Insert events
    for (const event of events) {
      await sql`
        INSERT INTO events (
          title, description, event_type, location, 
          start_date, end_date, is_public, virtual_link
        ) VALUES (
          ${event.title}, ${event.description}, ${event.event_type}, ${event.location}, 
          ${event.start_date}, ${event.end_date}, ${event.is_public}, ${event.virtual_link}
        )
      `
    }

    console.log("Successfully seeded events table")
  } catch (error) {
    console.error("Error seeding events:", error)
  }
}

// Execute the seed function
seedEvents()
