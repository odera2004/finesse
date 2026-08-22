// app/admin/dashboard/page.tsx
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import AdminHeader from "@/components/admin/admin-header"
import DashboardClientWrapper from "@/components/admin/dashboard-client-wrapper"

export default async function DashboardPage() {
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.get("admin_authenticated")?.value === "true"

  if (!isAuthenticated) {
    redirect("/admin")
  }

  const name = cookieStore.get("admin_name")?.value || "Manager"

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 bg-[#ECE7DE] text-[#1E1D1B] min-h-screen">
      <AdminHeader title="Dashboard" subtitle={`Welcome back, ${name}`} />
      <DashboardClientWrapper />
    </div>
  )
}