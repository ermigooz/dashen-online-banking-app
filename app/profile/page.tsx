import type { Metadata } from "next"
import ProfileDashboard from "@/components/profile/profile-dashboard"
import ProtectedRouteClient from "@/components/auth/protected-route-client"

export const metadata: Metadata = {
  title: "Profile | Dashen Bank Diaspora Hub",
  description: "Manage your profile settings and preferences",
}

export default function ProfilePage() {
  return (
    <ProtectedRouteClient>
      <ProfileDashboard />
    </ProtectedRouteClient>
  )
}
