import { processPDFDirectory } from "../lib/pdf-extractor"
import fs from "fs"

// Get directory path from command line arguments
const directoryPath = process.argv[2]

if (!directoryPath) {
  console.error("Please provide a directory path containing PDF files")
  process.exit(1)
}

// Check if directory exists
if (!fs.existsSync(directoryPath) || !fs.statSync(directoryPath).isDirectory()) {
  console.error(`Directory not found: ${directoryPath}`)
  process.exit(1)
}

// Process PDFs
console.log(`Processing PDFs in directory: ${directoryPath}`)

processPDFDirectory(directoryPath)
  .then((entryCount) => {
    console.log(`Successfully imported ${entryCount} knowledge entries`)
    process.exit(0)
  })
  .catch((error) => {
    console.error("Error processing PDFs:", error)
    process.exit(1)
  })
