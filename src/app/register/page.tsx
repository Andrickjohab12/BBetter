import { DashboardLayout } from "@/components/dashboard-layout"
import { RegisterForm } from "@/components/register-form"
import { ToastProvider } from "@/components/toast-notification"

export default function Register() {
  return (
    <ToastProvider>
      <DashboardLayout>
        <div className="container flex items-center justify-center px-4 py-10">
          <div className="w-full max-w-md">
            <h1 className="mb-6 text-center text-3xl font-bold text-purple-800">Join BBetter</h1>
            <RegisterForm />
          </div>
        </div>
      </DashboardLayout>
    </ToastProvider>
  )
}

