"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"
import { useState } from "react"

interface ProfileHeaderProps {
  user: {
    name: string
    email: string
  }
}

export default function ProfileHeader({ user }: ProfileHeaderProps) {
  const [isUploading, setIsUploading] = useState(false)

  // Get initials for avatar fallback
  const getInitials = (name: string) => {
    if (!name) return "U"
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
  }

  const handleImageUpload = () => {
    // This would be implemented with actual file upload functionality
    setIsUploading(true)
    setTimeout(() => setIsUploading(false), 1500)
  }

  return (
    <div className="relative bg-gradient-to-r from-amhara-blue to-amhara-teal p-6 text-white">
      <div className="flex flex-col md:flex-row items-center gap-4">
        <div className="relative group">
          <Avatar className="h-24 w-24 border-4 border-white">
            <AvatarImage src="/placeholder.svg?height=96&width=96" />
            <AvatarFallback className="text-xl">{getInitials(user?.name || "")}</AvatarFallback>
          </Avatar>
          <Button
            size="icon"
            variant="secondary"
            className="absolute bottom-0 right-0 h-8 w-8 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleImageUpload}
            disabled={isUploading}
          >
            <Camera className="h-4 w-4" />
          </Button>
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold">{user?.name || "User"}</h2>
          <p className="text-blue-100">{user?.email || "No email available"}</p>
          <p className="text-sm text-blue-100 mt-1">Shareholder</p>
        </div>
      </div>
    </div>
  )
}
