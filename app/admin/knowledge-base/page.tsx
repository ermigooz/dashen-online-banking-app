"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export default function KnowledgeBasePage() {
  const [knowledgeEntries, setKnowledgeEntries] = useState([])
  const [newEntry, setNewEntry] = useState({
    topic: "",
    content: "",
    keywords: "",
  })
  const [editingId, setEditingId] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load knowledge entries
  useEffect(() => {
    async function fetchEntries() {
      setIsLoading(true)
      try {
        const response = await fetch("/api/knowledge-base")
        if (response.ok) {
          const data = await response.json()
          setKnowledgeEntries(data || [])
        } else {
          console.error("Failed to fetch knowledge entries")
        }
      } catch (error) {
        console.error("Error fetching knowledge entries:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchEntries()
  }, [])

  const handleAddEntry = async () => {
    if (!newEntry.topic || !newEntry.content || !newEntry.keywords) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch("/api/knowledge-base", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      })

      if (response.ok) {
        const addedEntry = await response.json()
        setKnowledgeEntries([addedEntry, ...knowledgeEntries])
        setNewEntry({ topic: "", content: "", keywords: "" })

        toast({
          title: "Success",
          description: "Knowledge entry added successfully",
        })
      } else {
        throw new Error("Failed to add knowledge entry")
      }
    } catch (error) {
      console.error("Error adding knowledge entry:", error)
      toast({
        title: "Error",
        description: "Failed to add knowledge entry",
        variant: "destructive",
      })
    }
  }

  const handleEditEntry = (id) => {
    const entry = knowledgeEntries.find((e) => e.id === id)
    if (entry) {
      setNewEntry({
        topic: entry.topic,
        content: entry.content,
        keywords: Array.isArray(entry.keywords) ? entry.keywords.join(", ") : entry.keywords,
      })
      setEditingId(id)
    }
  }

  const handleUpdateEntry = async () => {
    if (!editingId) return

    if (!newEntry.topic || !newEntry.content || !newEntry.keywords) {
      toast({
        title: "Validation Error",
        description: "Please fill in all fields",
        variant: "destructive",
      })
      return
    }

    try {
      const response = await fetch(`/api/knowledge-base/${editingId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      })

      if (response.ok) {
        const updatedEntry = await response.json()
        setKnowledgeEntries(knowledgeEntries.map((entry) => (entry.id === editingId ? updatedEntry : entry)))

        setNewEntry({ topic: "", content: "", keywords: "" })
        setEditingId(null)

        toast({
          title: "Success",
          description: "Knowledge entry updated successfully",
        })
      } else {
        throw new Error("Failed to update knowledge entry")
      }
    } catch (error) {
      console.error("Error updating knowledge entry:", error)
      toast({
        title: "Error",
        description: "Failed to update knowledge entry",
        variant: "destructive",
      })
    }
  }

  const handleDeleteEntry = async (id) => {
    if (!confirm("Are you sure you want to delete this knowledge entry?")) {
      return
    }

    try {
      const response = await fetch(`/api/knowledge-base/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        setKnowledgeEntries(knowledgeEntries.filter((entry) => entry.id !== id))

        toast({
          title: "Success",
          description: "Knowledge entry deleted successfully",
        })
      } else {
        throw new Error("Failed to delete knowledge entry")
      }
    } catch (error) {
      console.error("Error deleting knowledge entry:", error)
      toast({
        title: "Error",
        description: "Failed to delete knowledge entry",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Knowledge Base Management</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingId ? "Edit Entry" : "Add New Knowledge Entry"}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Topic</label>
            <Input
              value={newEntry.topic}
              onChange={(e) => setNewEntry({ ...newEntry, topic: e.target.value })}
              placeholder="e.g., Account Opening"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <Textarea
              value={newEntry.content}
              onChange={(e) => setNewEntry({ ...newEntry, content: e.target.value })}
              placeholder="Detailed information about this topic"
              rows={4}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Keywords (comma separated)</label>
            <Input
              value={newEntry.keywords}
              onChange={(e) => setNewEntry({ ...newEntry, keywords: e.target.value })}
              placeholder="e.g., account, opening, requirements"
            />
          </div>

          {editingId ? (
            <div className="flex space-x-2">
              <Button onClick={handleUpdateEntry}>Update Entry</Button>
              <Button
                variant="outline"
                onClick={() => {
                  setNewEntry({ topic: "", content: "", keywords: "" })
                  setEditingId(null)
                }}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button onClick={handleAddEntry}>Add Entry</Button>
          )}
        </CardContent>
      </Card>

      <h2 className="text-2xl font-bold mb-4">Current Knowledge Base ({knowledgeEntries.length} entries)</h2>

      {isLoading ? (
        <div className="text-center py-8">Loading knowledge entries...</div>
      ) : (
        <div className="space-y-4">
          {knowledgeEntries.map((entry) => (
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

                <div className="flex space-x-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => handleEditEntry(entry.id)}>
                    Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteEntry(entry.id)}>
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}

          {knowledgeEntries.length === 0 && !isLoading && (
            <p className="text-center py-8 text-gray-500">No knowledge entries found</p>
          )}
        </div>
      )}
    </div>
  )
}
