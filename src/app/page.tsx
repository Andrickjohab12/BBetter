import { DashboardLayout } from "@/components/dashboard-layout"
import { ActivitySections } from "@/components/activity-sections"
import { ToastProvider } from "@/components/toast-notification"

export default function Home() {
  return (
    <ToastProvider>
      <DashboardLayout>
        <div className="container px-4 py-6 md:py-10">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-purple-800">Welcome to BBetter</h1>
            <p className="text-gray-600">Balance your day with meaningful activities</p>
          </div>
          <ActivitySections />
        </div>
      </DashboardLayout>
    </ToastProvider>
  )
}

