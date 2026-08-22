"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { CalendarDays, Users, Settings, Home, LogOut, Menu, X, BarChart3, Package, Shield } from "lucide-react"
import { logout } from "@/lib/auth-actions"
import { Button } from "@/components/ui/button"

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) setMobileOpen(false)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleLogout = async () => {
    await logout()
    router.push("/")
    router.refresh()
  }

  const menuItems = [
    { path: "/admin/dashboard", name: "Dashboard", icon: <Home className="h-4 w-4" /> },
    { path: "/admin/calendar", name: "Calendar", icon: <CalendarDays className="h-4 w-4" /> },
    { path: "/admin/staff", name: "Staff & Shifts", icon: <Users className="h-4 w-4" /> },
    { path: "/admin/inventory", name: "Inventory", icon: <Package className="h-4 w-4" /> },
    { path: "/admin/performance", name: "Financial Audit", icon: <BarChart3 className="h-4 w-4" /> },
  ]

  const sidebarContent = (
    <>
      <div className={`flex items-center ${collapsed ? "justify-center" : "justify-between"} px-5 py-6 border-b border-[#E3DDD1]`}>
        <div className={`flex items-center ${collapsed ? "justify-center" : ""}`}>
          <div className="w-8 h-8 bg-[#2C2B28] rounded-full flex items-center justify-center text-[#F3EFE6] font-serif text-sm font-bold">
            FP
          </div>
          {!collapsed && (
            <div className="ml-3">
              <h1 className="text-base font-serif font-medium text-[#1E1D1B] leading-tight">Finesse</h1>
              <p className="text-[10px] text-[#7A756C] uppercase tracking-wider">Parklands Terminal</p>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1.5 px-3">
          {menuItems.map((item) => {
            const isActive = pathname === item.path
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`flex items-center px-3.5 py-2.5 text-xs rounded-xl font-medium transition-all ${
                    isActive
                      ? "bg-[#55624C] text-[#F3EFE6] shadow-sm"
                      : "text-[#7A756C] hover:text-[#1E1D1B] hover:bg-[#E8E3D8]"
                  }`}
                  onClick={() => isMobile && setMobileOpen(false)}
                >
                  <span className="mr-3">{item.icon}</span>
                  {!collapsed && <span>{item.name}</span>}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className="border-t border-[#E3DDD1] p-4 space-y-2">
        <Button
          variant="outline"
          className="w-full justify-center border-[#D5CEC2] text-[#1E1D1B] hover:bg-[#E8E3D8] rounded-xl text-xs"
          onClick={handleLogout}
        >
          <LogOut className={`h-4 w-4 ${collapsed ? "" : "mr-2"}`} />
          {!collapsed && <span>Exit Terminal</span>}
        </Button>
      </div>
    </>
  )

  return (
    <>
      {!isMobile && (
        <aside className={`bg-[#ECE7DE] border-r border-[#E3DDD1] transition-all duration-300 flex flex-col ${collapsed ? "w-16" : "w-60"}`}>
          {sidebarContent}
        </aside>
      )}

      {isMobile && (
        <>
          <button onClick={() => setMobileOpen(true)} className="fixed top-4 left-4 z-40 bg-[#2C2B28] p-2 rounded-xl text-[#F3EFE6]">
            <Menu className="h-5 w-5" />
          </button>
          {mobileOpen && <div className="fixed inset-0 bg-black/40 z-40" onClick={() => setMobileOpen(false)} />}
          <aside className={`fixed inset-y-0 left-0 z-50 w-60 bg-[#ECE7DE] transform transition-transform ${mobileOpen ? "translate-x-0" : "-translate-x-full"} flex flex-col`}>
            {sidebarContent}
          </aside>
        </>
      )}
    </>
  )
}