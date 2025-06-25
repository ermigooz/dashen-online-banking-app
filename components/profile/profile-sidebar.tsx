"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Shield, Bell, Globe, LayoutDashboard } from "lucide-react"
import Link from "next/link"

interface ProfileSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export default function ProfileSidebar({ activeTab, setActiveTab }: ProfileSidebarProps) {
  const menuItems = [
    {
      id: "personal-info",
      label: "Personal Information",
      icon: <User className="mr-2 h-4 w-4" />,
    },
    {
      id: "security",
      label: "Security Settings",
      icon: <Shield className="mr-2 h-4 w-4" />,
    },
    {
      id: "notifications",
      label: "Notification Preferences",
      icon: <Bell className="mr-2 h-4 w-4" />,
    },
    {
      id: "language",
      label: "Language Preferences",
      icon: <Globe className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <Card className="p-4">
      <div className="space-y-1">
        <Link href="/dashboard">
          <Button variant="ghost" className="w-full justify-start mb-4">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="pt-2">
          <h3 className="font-medium text-sm text-muted-foreground mb-2 px-4">Profile Settings</h3>
        </div>

        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant={activeTab === item.id ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => setActiveTab(item.id)}
          >
            {item.icon}
            {item.label}
          </Button>
        ))}
      </div>
    </Card>
  )
}
