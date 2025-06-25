export default function NotificationsLoading() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="p-4 border rounded-lg animate-pulse">
          <div className="flex items-start gap-4">
            <div className="bg-muted h-10 w-10 rounded-md"></div>
            <div className="flex-1">
              <div className="h-5 bg-muted rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-muted rounded w-full mb-4"></div>
              <div className="h-8 bg-muted rounded w-24"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
