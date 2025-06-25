export default function AboutLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-primary-50 to-white p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-3xl font-bold text-primary mb-4">Loading...</h1>
        <div className="animate-pulse">
          <div className="h-2 w-32 bg-primary rounded mx-auto"></div>
        </div>
      </div>
    </div>
  )
}
