import fs from "fs"
import path from "path"
import { PDFDocument } from "pdf-lib"
import { addKnowledgeEntry } from "./knowledge-base"

/**
 * Extract text from a PDF file
 */
export async function extractTextFromPDF(filePath: string): Promise<string[]> {
  try {
    const pdfBytes = fs.readFileSync(filePath)
    const pdfDoc = await PDFDocument.load(pdfBytes)
    const pages = pdfDoc.getPages()

    // This is a simplified approach - in production you'd want to use a more robust PDF text extraction library
    // like pdf.js or a dedicated PDF parsing service
    const pageTexts: string[] = []

    for (let i = 0; i < pages.length; i++) {
      const page = pages[i]
      // Note: pdf-lib doesn't have built-in text extraction
      // In a real implementation, you'd use pdf.js or another library with text extraction
      // This is just a placeholder
      pageTexts.push(`Content from page ${i + 1}`)
    }

    return pageTexts
  } catch (error) {
    console.error("Error extracting text from PDF:", error)
    throw new Error("Failed to extract text from PDF")
  }
}

/**
 * Process extracted text into knowledge entries
 * This is a simplified approach - in production you'd want to use NLP to better segment and categorize content
 */
export function processTextIntoEntries(text: string): { topic: string; content: string; keywords: string[] }[] {
  // Split text into sections (this is a simplified approach)
  const sections = text.split(/(?=\n\s*[A-Z][A-Za-z\s]+\n)/)

  return sections
    .map((section) => {
      // Extract the first line as the topic
      const lines = section.trim().split("\n")
      const topic = lines[0].trim()

      // The rest is the content
      const content = lines.slice(1).join(" ").trim()

      // Extract potential keywords (simplified approach)
      const keywords = extractKeywords(topic, content)

      return { topic, content, keywords }
    })
    .filter((entry) => entry.topic && entry.content) // Filter out empty entries
}

/**
 * Extract potential keywords from topic and content
 */
function extractKeywords(topic: string, content: string): string[] {
  // Simple keyword extraction - in production use NLP techniques
  const combined = `${topic} ${content}`.toLowerCase()

  // Remove common words and extract potential keywords
  const words = combined
    .split(/\s+/)
    .filter((word) => word.length > 3) // Only words longer than 3 characters
    .filter((word) => !commonWords.includes(word)) // Remove common words

  // Get unique words
  const uniqueWords = Array.from(new Set(words))

  // Return top keywords (limit to 10)
  return uniqueWords.slice(0, 10)
}

// Common words to exclude from keywords
const commonWords = [
  "the",
  "and",
  "that",
  "have",
  "for",
  "not",
  "with",
  "you",
  "this",
  "but",
  "his",
  "from",
  "they",
  "will",
  "would",
  "there",
  "their",
  "what",
  "about",
  "which",
  "when",
  "make",
  "like",
  "time",
  "just",
  "know",
  "take",
  "person",
  "into",
  "year",
  "your",
  "good",
  "some",
  "could",
  "them",
  "than",
  "then",
  "look",
  "only",
  "come",
  "over",
  "think",
  "also",
  "back",
  "after",
  "work",
  "first",
  "well",
  "even",
  "want",
  "because",
  "these",
  "give",
  "most",
]

/**
 * Process a directory of PDFs into knowledge entries
 */
export async function processPDFDirectory(directoryPath: string): Promise<number> {
  try {
    const files = fs.readdirSync(directoryPath)
    const pdfFiles = files.filter((file) => path.extname(file).toLowerCase() === ".pdf")

    let entryCount = 0

    for (const pdfFile of pdfFiles) {
      const filePath = path.join(directoryPath, pdfFile)
      const pageTexts = await extractTextFromPDF(filePath)

      for (const pageText of pageTexts) {
        const entries = processTextIntoEntries(pageText)

        for (const entry of entries) {
          addKnowledgeEntry(entry)
          entryCount++
        }
      }
    }

    return entryCount
  } catch (error) {
    console.error("Error processing PDF directory:", error)
    throw new Error("Failed to process PDF directory")
  }
}
