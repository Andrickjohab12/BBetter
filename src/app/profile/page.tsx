import { DashboardLayout } from "@/components/dashboard-layout"
import { ProfileInfo } from "@/components/profile-info"
import { ToastProvider } from "@/components/toast-notification"

export default function Profile() {
  return (
    <ToastProvider>
      <DashboardLayout>
        <div className="container px-4 py-6 md:py-10">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-purple-800">Your Profile</h1>
            <p className="text-gray-600">Manage your account and track your progress</p>
          </div>
          <ProfileInfo />
        </div>
      </DashboardLayout>
    </ToastProvider>
  )
}

