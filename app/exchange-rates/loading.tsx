import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container py-8 px-4 md:px-6 lg:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-5 w-72" />
        </div>
        <Skeleton className="h-6 w-40" />
      </div>

      <div className="grid gap-6">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-6 pb-4">
            <Skeleton className="h-7 w-48 mb-2" />
            <Skeleton className="h-5 w-72" />
          </div>
          <div className="p-0">
            <div className="border-b px-6 py-3">
              <Skeleton className="h-10 w-full max-w-md" />
            </div>

            <div className="overflow-x-auto">
              <div className="p-4">
                <div className="grid gap-4">
                  {Array(7)
                    .fill(0)
                    .map((_, i) => (
                      <div key={i} className="flex justify-between items-center border-b pb-4">
                        <Skeleton className="h-6 w-16" />
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-20" />
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <Skeleton className="h-7 w-48 mb-6" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>

          <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
            <div className="p-6">
              <Skeleton className="h-7 w-48 mb-6" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <div className="space-y-2 pl-5 mt-2">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-4 w-3/4" />
                    ))}
                </div>
                <Skeleton className="h-4 w-full mt-2" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
