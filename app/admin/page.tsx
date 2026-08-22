// app/admin/page.tsx
import { redirect } from "next/navigation"
import { cookies } from "next/headers"
import AdminLoginForm from "@/components/admin/admin-login-form"

export default async function AdminPage() {
  const cookieStore = await cookies()
  const isAuthenticated = cookieStore.get("admin_authenticated")?.value === "true"

  if (isAuthenticated) {
    redirect("/admin/dashboard")
  }

  return (
    <main className="min-h-screen bg-[#ECE7DE] text-[#1E1D1B] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#F3EFE6] p-8 rounded-[2rem] border border-[#E3DDD1] shadow-sm">
        <div className="text-center mb-8">
          <span className="text-xs uppercase tracking-[0.25em] text-[#55624C] font-semibold mb-2 block">
            STAFF PORTAL
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#1E1D1B] mb-2">
            Admin Panel
          </h1>
          <p className="text-sm text-[#7A756C] font-sans">
            Salon & Grooming Management
          </p>
        </div>

        <AdminLoginForm />

        <div className="mt-8 text-center text-[#7A756C] text-xs font-sans space-y-1 border-t border-[#E3DDD1] pt-6">
          <p className="font-medium text-[#1E1D1B]">Authorized personnel only.</p>
          <p>For access issues, contact your system administrator.</p>
        </div>
      </div>
    </main>
  )
}