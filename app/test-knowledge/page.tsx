"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TestKnowledgePage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async () => {
    if (!query.trim()) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/knowledge-base/search?q=${encodeURIComponent(query)}`)
      if (response.ok) {
        const data = await response.json()
        setResults(data || [])
      } else {
        throw new Error("Failed to search knowledge base")
      }
    } catch (error) {
      console.error("Error searching knowledge base:", error)
      alert("Error searching knowledge base")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Test Knowledge Base</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Search Knowledge Base</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter a search query..."
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isLoading}>
              {isLoading ? "Searching..." : "Search"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Search Results</h2>

      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((entry) => (
            <Card key={entry.id}>
              <CardHeader>
                <CardTitle>{entry.topic}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-2">{entry.content}</p>
                <p className="text-sm text-gray-600">
                  <span className="font-semibold">Keywords:</span>{" "}
                  {Array.isArray(entry.keywords) ? entry.keywords.join(", ") : entry.keywords}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center py-8 text-gray-500">
          {isLoading ? "Searching..." : "No results found. Try a different query."}
        </p>
      )}
    </div>
  )
}
