import { sql } from "@/lib/db"

async function seedDatabase() {
  try {
    console.log("Starting database seeding...")

    // Pre-hashed password for "password123" (in a real app, you would hash this on the fly)
    const hashedPassword = "$2b$10$zPMYqbr5Xt5vPRX9qTNqFOkKvZf6IZ0kGVwzYA/b3JqOJ9ZZbZOuy"

    // Check if users already exist
    const existingUsers = await sql`SELECT COUNT(*) FROM users`

    if (Number.parseInt(existingUsers[0].count) > 0) {
      console.log("Users already exist in the database. Skipping user creation.")
    } else {
      // Insert demo users
      console.log("Inserting demo users...")

      // Insert Abebe Kebede
      const user1 = await sql`
        INSERT INTO users (email, password_hash)
        VALUES ('abebe@gmail.com', ${hashedPassword})
        RETURNING id
      `

      // Insert John Doe
      const user2 = await sql`
        INSERT INTO users (email, password_hash)
        VALUES ('john.doe@example.com', ${hashedPassword})
        RETURNING id
      `

      // Insert profiles
      console.log("Inserting profiles...")
      await sql`
        INSERT INTO profiles (id, full_name, email, phone, country, city, preferred_language)
        VALUES 
          (${user1[0].id}, 'Abebe Kebede', 'abebe@gmail.com', '+251911234567', 'Ethiopia', 'Addis Ababa', 'am'),
          (${user2[0].id}, 'John Doe', 'john.doe@example.com', '+1234567890', 'United States', 'New York', 'en')
      `

      // Insert shares
      console.log("Inserting shares...")
      await sql`
        INSERT INTO shares (shareholder_id, total_shares, share_value, purchase_date)
        VALUES 
          (${user1[0].id}, 1500, 75000.0, '2022-03-10T00:00:00Z'),
          (${user2[0].id}, 1000, 50000.0, '2022-01-15T00:00:00Z')
      `

      // Insert transactions
      console.log("Inserting transactions...")
      await sql`
        INSERT INTO transactions (shareholder_id, transaction_type, amount, shares_affected, transaction_date, status, description)
        VALUES 
          (${user1[0].id}, 'purchase', 75000.0, 1500, '2022-03-10T00:00:00Z', 'completed', 'Initial share purchase'),
          (${user1[0].id}, 'dividend', 3750.0, NULL, '2022-06-30T00:00:00Z', 'completed', 'Semi-annual dividend payment'),
          (${user2[0].id}, 'purchase', 50000.0, 1000, '2022-01-15T00:00:00Z', 'completed', 'Initial share purchase'),
          (${user2[0].id}, 'dividend', 2500.0, NULL, '2022-06-30T00:00:00Z', 'completed', 'Semi-annual dividend payment')
      `

      // Insert notifications
      console.log("Inserting notifications...")
      await sql`
        INSERT INTO notifications (shareholder_id, title, message, notification_type, is_read)
        VALUES 
          (${user1[0].id}, 'Dividend Payment', 'Your semi-annual dividend of $3,750 has been processed.', 'dividend', false),
          (${user1[0].id}, 'Annual Meeting', 'The annual shareholders meeting is scheduled for December 15th.', 'event', true),
          (${user2[0].id}, 'Dividend Payment', 'Your semi-annual dividend of $2,500 has been processed.', 'dividend', false)
      `
    }

    // Insert events (these don't depend on users)
    const existingEvents = await sql`SELECT COUNT(*) FROM events`

    if (Number.parseInt(existingEvents[0].count) > 0) {
      console.log("Events already exist in the database. Skipping event creation.")
    } else {
      console.log("Inserting events...")
      await sql`
        INSERT INTO events (title, description, event_type, start_date, end_date, location, virtual_link, is_public)
        VALUES 
          ('Annual Shareholders Meeting', 'Join us for the annual shareholders meeting to discuss performance and future plans.', 'meeting', '2023-12-15T09:00:00Z', '2023-12-15T12:00:00Z', 'Dashen Bank Headquarters, Addis Ababa', 'https://zoom.us/j/example', true),
          ('Diaspora Investment Webinar', 'Learn about new investment opportunities for diaspora shareholders.', 'webinar', '2023-11-20T15:00:00Z', '2023-11-20T16:30:00Z', NULL, 'https://zoom.us/j/example2', true),
          ('Q3 Financial Results Announcement', 'Presentation of the third quarter financial results for the fiscal year.', 'announcement', '2023-10-30T10:00:00Z', NULL, NULL, NULL, true)
      `
    }

    console.log("Database seeding completed successfully!")
    return { success: true }
  } catch (error) {
    console.error("Error seeding database:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : String(error),
    }
  }
}

// Execute the function if this script is run directly
if (require.main === module) {
  seedDatabase()
    .then((result) => {
      console.log("Result:", result)
      process.exit(result.success ? 0 : 1)
    })
    .catch((error) => {
      console.error("Unhandled error:", error)
      process.exit(1)
    })
}

export default seedDatabase
