import { neon } from "@neondatabase/serverless"

// Create a SQL client for Neon PostgreSQL
const sql = neon(process.env.NEON_DATABASE_URL)

async function seedDatabase() {
  try {
    console.log("Starting database seeding...")

    // Create tables if they don't exist
    console.log("Ensuring tables exist...")

    try {
      // Create notifications table
      await sql`
      CREATE TABLE IF NOT EXISTS notifications (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        shareholder_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        title VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        notification_type VARCHAR(50) NOT NULL,
        related_entity_id UUID,
        is_read BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `

      // Create event_registrations table
      await sql`
      CREATE TABLE IF NOT EXISTS event_registrations (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        event_id UUID NOT NULL REFERENCES events(id) ON DELETE CASCADE,
        shareholder_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        registration_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(event_id, shareholder_id)
      )
    `
    } catch (error) {
      console.log("Some tables might already exist, continuing...", error)
    }

    // First, check if users already exist
    const existingUsers = await sql`SELECT id FROM users`

    let user1Id, user2Id, user3Id

    if (existingUsers.length > 0) {
      console.log("Users already exist in the database. Updating existing records...")

      // Get existing user IDs
      const users = await sql`
      SELECT id, email FROM users 
      WHERE email IN ('john.doe@example.com', 'jane.smith@example.com', 'abebe@gmail.com')
    `

      // Map users by email for easy lookup
      const userMap = users.reduce((acc, user) => {
        acc[user.email] = user.id
        return acc
      }, {})

      user1Id = userMap["john.doe@example.com"]
      user2Id = userMap["jane.smith@example.com"]
      user3Id = userMap["abebe@gmail.com"]

      // Pre-hashed password for "password123"
      const hashedPassword = "$2b$10$zPMYqbr5Xt5vPRX9qTNqFOkKvZf6IZ0kGVwzYA/b3JqOJ9ZZbZOuy"

      // Update existing users instead of inserting new ones
      console.log("Updating users...")
      await sql`
      UPDATE users 
      SET password_hash = ${hashedPassword}, updated_at = CURRENT_TIMESTAMP
      WHERE email IN ('john.doe@example.com', 'jane.smith@example.com', 'abebe@gmail.com')
    `

      console.log("Updating profiles...")
      await sql`
      UPDATE profiles
      SET 
        full_name = CASE 
          WHEN email = 'john.doe@example.com' THEN 'John Doe'
          WHEN email = 'jane.smith@example.com' THEN 'Jane Smith'
          WHEN email = 'abebe@gmail.com' THEN 'Abebe Kebede'
        END,
        phone = CASE 
          WHEN email = 'john.doe@example.com' THEN '+1234567890'
          WHEN email = 'jane.smith@example.com' THEN '+1987654321'
          WHEN email = 'abebe@gmail.com' THEN '+251911234567'
        END,
        country = CASE 
          WHEN email = 'john.doe@example.com' THEN 'United States'
          WHEN email = 'jane.smith@example.com' THEN 'Canada'
          WHEN email = 'abebe@gmail.com' THEN 'Ethiopia'
        END,
        city = CASE 
          WHEN email = 'john.doe@example.com' THEN 'New York'
          WHEN email = 'jane.smith@example.com' THEN 'Toronto'
          WHEN email = 'abebe@gmail.com' THEN 'Addis Ababa'
        END,
        preferred_language = CASE 
          WHEN email = 'john.doe@example.com' THEN 'en'
          WHEN email = 'jane.smith@example.com' THEN 'en'
          WHEN email = 'abebe@gmail.com' THEN 'am'
        END,
        updated_at = CURRENT_TIMESTAMP
      WHERE email IN ('john.doe@example.com', 'jane.smith@example.com', 'abebe@gmail.com')
    `
    } else {
      console.log("No existing users found. Creating new records...")

      // Pre-hashed password for "password123"
      const hashedPassword = "$2b$10$zPMYqbr5Xt5vPRX9qTNqFOkKvZf6IZ0kGVwzYA/b3JqOJ9ZZbZOuy"

      // Generate random UUIDs for users
      console.log("Inserting users with generated UUIDs...")
      const user1 = await sql`
      INSERT INTO users (email, password_hash)
      VALUES ('john.doe@example.com', ${hashedPassword})
      RETURNING id
    `

      const user2 = await sql`
      INSERT INTO users (email, password_hash)
      VALUES ('jane.smith@example.com', ${hashedPassword})
      RETURNING id
    `

      const user3 = await sql`
      INSERT INTO users (email, password_hash)
      VALUES ('abebe@gmail.com', ${hashedPassword})
      RETURNING id
    `

      user1Id = user1[0].id
      user2Id = user2[0].id
      user3Id = user3[0].id

      console.log("Inserting profiles...")
      await sql`
      INSERT INTO profiles (id, full_name, email, phone, country, city, preferred_language)
      VALUES 
        (${user1Id}, 'John Doe', 'john.doe@example.com', '+1234567890', 'United States', 'New York', 'en'),
        (${user2Id}, 'Jane Smith', 'jane.smith@example.com', '+1987654321', 'Canada', 'Toronto', 'en'),
        (${user3Id}, 'Abebe Kebede', 'abebe@gmail.com', '+251911234567', 'Ethiopia', 'Addis Ababa', 'am')
    `
    }

    // Clear and insert shares
    console.log("Clearing and inserting shares...")
    if (user1Id && user2Id && user3Id) {
      await sql`DELETE FROM shares`
      await sql`
      INSERT INTO shares (shareholder_id, total_shares, share_value, purchase_date)
      VALUES 
        (${user1Id}, 1000, 50000.0, '2022-01-15T00:00:00Z'),
        (${user2Id}, 750, 37500.0, '2022-02-20T00:00:00Z'),
        (${user3Id}, 1500, 75000.0, '2022-03-10T00:00:00Z')
    `

      console.log("Clearing and inserting transactions...")
      await sql`DELETE FROM transactions`
      await sql`
      INSERT INTO transactions (shareholder_id, transaction_type, amount, shares_affected, transaction_date, status, description)
      VALUES 
        (${user1Id}, 'purchase', 50000.0, 1000, '2022-01-15T00:00:00Z', 'completed', 'Initial share purchase'),
        (${user1Id}, 'dividend', 2500.0, NULL, '2022-06-30T00:00:00Z', 'completed', 'Semi-annual dividend payment'),
        (${user2Id}, 'purchase', 37500.0, 750, '2022-02-20T00:00:00Z', 'completed', 'Initial share purchase'),
        (${user2Id}, 'dividend', 1875.0, NULL, '2022-06-30T00:00:00Z', 'completed', 'Semi-annual dividend payment'),
        (${user3Id}, 'purchase', 75000.0, 1500, '2022-03-10T00:00:00Z', 'completed', 'Initial share purchase'),
        (${user3Id}, 'dividend', 3750.0, NULL, '2022-06-30T00:00:00Z', 'completed', 'Semi-annual dividend payment')
    `

      // Clear and insert sample notifications
      console.log("Clearing and inserting notifications...")
      await sql`DELETE FROM notifications`
      await sql`
      INSERT INTO notifications (shareholder_id, title, message, notification_type, is_read)
      VALUES 
        (${user1Id}, 'Dividend Payment', 'Your semi-annual dividend of $2,500 has been processed.', 'dividend', false),
        (${user1Id}, 'Annual Meeting', 'The annual shareholders meeting is scheduled for December 15th.', 'event', true),
        (${user2Id}, 'Dividend Payment', 'Your semi-annual dividend of $1,875 has been processed.', 'dividend', false),
        (${user3Id}, 'Dividend Payment', 'Your semi-annual dividend of $3,750 has been processed.', 'dividend', false),
        (${user3Id}, 'Share Certificate', 'Your share certificate is now available for download.', 'transaction', true)
    `
    }

    // These tables don't have foreign key constraints to users, so we can safely clear and reinsert
    console.log("Clearing and inserting events...")
    await sql`DELETE FROM events`
    await sql`
    INSERT INTO events (title, description, event_type, start_date, end_date, location, virtual_link, is_public)
    VALUES 
      ('Annual Shareholders Meeting', 'Join us for the annual shareholders meeting to discuss performance and future plans.', 'meeting', '2023-12-15T09:00:00Z', '2023-12-15T12:00:00Z', 'Dashen Bank Headquarters, Addis Ababa', 'https://zoom.us/j/example', true),
      ('Diaspora Investment Webinar', 'Learn about new investment opportunities for diaspora shareholders.', 'webinar', '2023-11-20T15:00:00Z', '2023-11-20T16:30:00Z', NULL, 'https://zoom.us/j/example2', true),
      ('Q3 Financial Results Announcement', 'Presentation of the third quarter financial results for the fiscal year.', 'announcement', '2023-10-30T10:00:00Z', NULL, NULL, NULL, true)
  `

    console.log("Clearing and inserting FAQs...")
    await sql`DELETE FROM faqs`
    await sql`
    INSERT INTO faqs (question, answer, category, language, is_published)
    VALUES 
      ('How do I purchase additional shares?', 'To purchase additional shares, you can contact our investment department at investments@dashenbank.com or visit any of our branches with your identification and shareholder number.', 'Investments', 'en', true),
      ('When are dividends distributed?', 'Dividends are typically distributed semi-annually, at the end of June and December, following approval by the board of directors.', 'Dividends', 'en', true),
      ('How can I update my contact information?', 'You can update your contact information by logging into your account on the Diaspora Hub and navigating to the Profile Settings page.', 'Account Management', 'en', true),
      ('What is the minimum number of shares I can purchase?', 'The minimum number of shares for initial purchase is 10 shares. For additional purchases, there is no minimum requirement.', 'Investments', 'en', true),
      ('How can I attend shareholder meetings if I live abroad?', 'Shareholder meetings are typically broadcast online via secure video conferencing. You will receive an invitation with login details prior to the meeting.', 'Meetings', 'en', true)
  `

    console.log("Database seeding completed successfully!")
    return { success: true, message: "Database seeded successfully" }
  } catch (error) {
    console.error("Error seeding database:", error)
    return { success: false, message: error instanceof Error ? error.message : "Unknown error" }
  }
}

// Execute the function
seedDatabase()
  .then((result) => {
    console.log(result)
  })
  .catch((error) => {
    console.error("Failed to seed database:", error)
  })
