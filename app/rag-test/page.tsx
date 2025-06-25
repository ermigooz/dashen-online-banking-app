"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { searchKnowledge, type KnowledgeEntry } from "@/lib/knowledge-base"

export default function RagTestPage() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<KnowledgeEntry[]>([])
  const [isSearching, setIsSearching] = useState(false)

  const handleSearch = () => {
    if (!query.trim()) return

    setIsSearching(true)

    // Use the searchKnowledge function to find relevant entries
    const relevantEntries = searchKnowledge(query)
    setResults(relevantEntries)

    setIsSearching(false)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">RAG System Test</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Test Knowledge Retrieval</CardTitle>
          <CardDescription>Enter a query to see what knowledge entries would be retrieved</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-2">
            <Input
              placeholder="Enter a query..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
            <Button onClick={handleSearch} disabled={isSearching}>
              {isSearching ? "Searching..." : "Search"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Retrieved Knowledge</h2>
      {results.length > 0 ? (
        <div className="space-y-4">
          {results.map((entry, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{entry.topic}</CardTitle>
                <CardDescription>Keywords: {entry.keywords.join(", ")}</CardDescription>
              </CardHeader>
              <CardContent>
                <p>{entry.content}</p>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-gray-500">Last updated: {entry.lastUpdated}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-8">
            <p className="text-center text-gray-500">
              {query ? "No relevant knowledge found for this query" : "Enter a query to see results"}
            </p>
          </CardContent>
        </Card>
      )}

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="font-bold mb-2">How This Works:</h3>
        <ol className="list-decimal pl-5 space-y-2">
          <li>When a user asks a question, the system searches the knowledge base for relevant information</li>
          <li>The most relevant entries are retrieved based on keyword and content matching</li>
          <li>These entries are added to the AI's context, helping it provide more accurate answers</li>
          <li>The AI combines its general knowledge with this specific information to generate a response</li>
        </ol>
      </div>
    </div>
  )
}
