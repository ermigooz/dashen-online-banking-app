"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import ProfileSidebar from "./profile-sidebar"
import PersonalInfoForm from "./personal-info-form"
import SecuritySettings from "./security-settings"
import NotificationPreferences from "./notification-preferences"
import LanguagePreferences from "./language-preferences"
import ProfileHeader from "./profile-header"
import { useAuth } from "@/components/auth-provider"
import { Loader2 } from "lucide-react"

export default function ProfileDashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("personal-info")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Show loading state while fetching profile data
  if (isLoading) {
    return (
      <div className="container mx-auto py-10 mt-16">
        <div className="flex flex-col justify-center items-center h-40">
          <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading profile data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 mt-16">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar - Mobile: Tabs, Desktop: Sidebar */}
        <div className="md:col-span-3 md:block hidden">
          <ProfileSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        <div className="md:hidden">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="personal-info">Personal</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="notifications">Alerts</TabsTrigger>
              <TabsTrigger value="language">Language</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Main Content */}
        <div className="md:col-span-9">
          <Card className="overflow-hidden">
            <ProfileHeader user={user} />

            {activeTab === "personal-info" && <PersonalInfoForm user={user} />}
            {activeTab === "security" && <SecuritySettings />}
            {activeTab === "notifications" && <NotificationPreferences />}
            {activeTab === "language" && <LanguagePreferences />}
          </Card>
        </div>
      </div>
    </div>
  )
}
