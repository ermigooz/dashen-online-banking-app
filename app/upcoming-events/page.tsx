import UpcomingEvents from "@/components/events/upcoming-events"

export const metadata = {
  title: "Upcoming Events",
  description: "View all upcoming shareholder events",
}

export default function UpcomingEventsPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <UpcomingEvents />
    </div>
  )
}
