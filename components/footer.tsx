import Link from "next/link"
import { ExternalLink } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t bg-background py-6">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} Zemen Bank. All rights reserved.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="https://www.zemenbank.com/about"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-zemen-red hover:underline"
          >
            Learn More About Us <ExternalLink className="h-3 w-3" />
          </Link>
        </div>
      </div>
    </footer>
  )
}
