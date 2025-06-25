// Mock data for profile-related API endpoints
export const mockData = {
  profile: {
    id: "user-1",
    name: "Abebe Kebede",
    email: "abebe@gmail.com",
    phone: "+251911234567",
    address: "Addis Ababa, Ethiopia",
    language: "english",
    date_format: "mm/dd/yyyy",
    currency: "etb",
    two_factor_enabled: false,
  },

  security: {
    two_factor_enabled: false,
    last_password_change: "2023-01-15T00:00:00Z",
    active_sessions: [
      {
        device: "Current Device",
        browser: "Chrome on Windows",
        location: "Addis Ababa, Ethiopia",
        last_active: "now",
        is_current: true,
      },
      {
        device: "iPhone 13",
        browser: "Safari on iOS",
        location: "Unknown",
        last_active: "2 days ago",
        is_current: false,
      },
    ],
  },

  notifications: {
    email_dividends: true,
    email_meetings: true,
    email_promotions: false,
    sms_dividends: true,
    sms_meetings: false,
    sms_promotions: false,
    reminder_days: 3,
  },

  language: {
    language: "english",
    date_format: "mm/dd/yyyy",
    currency: "etb",
  },
}

// Helper function to handle API responses with mock data fallback
export async function handleApiResponse(
  handler: () => Promise<Response>,
  mockDataKey: keyof typeof mockData,
): Promise<Response> {
  try {
    return await handler()
  } catch (error) {
    console.error(`API error, using mock ${mockDataKey} data:`, error)
    return new Response(JSON.stringify(mockData[mockDataKey]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    })
  }
}

// Helper function to get mock data for a specific key
export function getMockData(key: keyof typeof mockData) {
  return mockData[key]
}
