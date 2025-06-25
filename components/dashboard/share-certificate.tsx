"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileDown, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import { formatCurrency } from "@/lib/utils"
import { useToast } from "@/hooks/use-toast"

interface Profile {
  id: string
  full_name: string
  email: string
  phone: string
  country: string
  city: string
  preferred_language: string
}

interface Share {
  id: string
  shareholder_id: string
  total_shares: number
  share_value: number
  purchase_date: string
}

interface ShareCertificateProps {
  profile: Profile
  shares: Share[]
}

export default function ShareCertificate({ profile, shares }: ShareCertificateProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const { toast } = useToast()

  // Calculate total shares and value
  const totalShares = shares?.reduce((sum, share) => sum + share.total_shares, 0) || 0
  const totalValue = shares?.reduce((sum, share) => sum + Number(share.share_value), 0) || 0

  const generateCertificate = async () => {
    setIsGenerating(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000))

      toast({
        title: "Certificate Generated",
        description: "Your share certificate has been generated and downloaded.",
      })

      // Create a fake download
      const a = document.createElement("a")
      a.href = "#"
      a.download = `dashen-bank-share-certificate-${profile.id}.pdf`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error generating certificate:", error)
      toast({
        title: "Generation Failed",
        description: "Failed to generate certificate. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.3 }}>
      <Card className="h-full overflow-hidden transition-all duration-200 hover:shadow-md border-t-4 border-t-dashen-red">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileDown className="h-5 w-5 text-dashen-red" />
            Share Certificate
          </CardTitle>
          <CardDescription>Generate and download your official share certificate</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Shareholder Name</p>
                <p className="font-medium">{profile?.full_name || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Certificate Number</p>
                <p className="font-medium">DASHEN-{profile?.id.substring(0, 8).toUpperCase() || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Shares</p>
                <p className="font-medium">{totalShares.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Value</p>
                <p className="font-medium">{formatCurrency(totalValue)}</p>
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-gradient-to-r from-dashen-red/5 to-dashen-lightRed/5">
              <p className="text-sm text-muted-foreground">
                Your share certificate is an official document that confirms your ownership of shares in Dashen Bank. You
                can download it for your records or for official purposes.
              </p>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            onClick={generateCertificate}
            disabled={isGenerating || totalShares === 0}
            className="w-full bg-dashen-red hover:bg-dashen-darkRed"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <FileDown className="mr-2 h-4 w-4" />
                Download Certificate
              </>
            )}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
