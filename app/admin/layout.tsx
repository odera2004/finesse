// app/admin/layout.tsx
import type React from "react"
import AdminSidebar from "@/components/admin/admin-sidebar"
import { cookies } from "next/headers"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.has("admin_authenticated")

  // If user is not authenticated, render only the child (e.g. login form) without sidebar
  if (!isAuthenticated) {
    return <>{children}</>
  }

  // If authenticated, render full dashboard layout with sidebar
  return (
    <div className="flex h-screen bg-[#ECE7DE] text-[#1E1D1B]">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#FBF9F5] p-6">
          {children}
        </main>
      </div>
    </div>
  )
}