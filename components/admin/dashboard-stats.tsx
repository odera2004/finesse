"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card } from "@/components/ui/card"
import { CalendarDays, UserCheck, Banknote, CheckSquare, Lock } from "lucide-react"

interface DashboardStatsProps {
  isUnlocked: boolean
  onUnlockClick: () => void
}

export default function DashboardStats({ isUnlocked, onUnlockClick }: DashboardStatsProps) {
  const [activeStaffCount, setActiveStaffCount] = useState(0)
  const [totalStaffCount, setTotalStaffCount] = useState(0)
  const [todayAppointmentsCount, setTodayAppointmentsCount] = useState(0)
  const [completedCount, setCompletedCount] = useState(0)
  const [totalRevenue, setTotalRevenue] = useState(0)
  const [fulfillmentRate, setFulfillmentRate] = useState(0)

  useEffect(() => {
    async function fetchDashboardMetrics() {
      try {
        // Today's date string ISO (YYYY-MM-DD)
        const todayStr = new Date().toISOString().split("T")[0]

        // 1. ACTIVE STAFF (Reset after 24 hours)
        // Strictly fetch staff clocked in within the last 24 hours who haven't clocked out
        const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

        const { count: totalStaff } = await supabase
          .from("staff_members")
          .select("*", { count: "exact", head: true })

        const { count: activeStaff } = await supabase
          .from("staff_attendance")
          .select("*", { count: "exact", head: true })
          .gte("clock_in_time", twentyFourHoursAgo)
          .is("clock_out_time", null)

        if (totalStaff !== null) setTotalStaffCount(totalStaff)
        if (activeStaff !== null) setActiveStaffCount(activeStaff)

        // 2. LIVE APPOINTMENTS & REVENUE METRICS FROM SUPABASE
        const { data: appointments, error: appErr } = await supabase
          .from("appointments")
          .select("service_name, status")
          .eq("booking_date", todayStr)

        if (!appErr && appointments) {
          const totalToday = appointments.length
          setTodayAppointmentsCount(totalToday)

          // Filter completed appointments
          const completedApps = appointments.filter((a) => a.status === "completed")
          const completedNum = completedApps.length
          setCompletedCount(completedNum)

          // Calculate fulfillment rate percentage
          const rate = totalToday > 0 ? Math.round((completedNum / totalToday) * 100) : 0
          setFulfillmentRate(rate)

          // Calculate revenue from completed appointments (extract KSh numerical value from string)
          const sumRevenue = completedApps.reduce((sum, app) => {
            const priceMatch = app.service_name?.match(/KSh\s*([\d,]+)/i)
            if (priceMatch && priceMatch[1]) {
              const numericPrice = parseInt(priceMatch[1].replace(/,/g, ""), 10)
              return sum + numericPrice
            }
            return sum
          }, 0)

          setTotalRevenue(sumRevenue)
        }
      } catch (err) {
        console.error("Failed to load dashboard metrics:", err)
      }
    }

    fetchDashboardMetrics()
  }, [])

  const formattedRevenue = new Intl.NumberFormat("en-KE", {
    style: "currency",
    currency: "KES",
    maximumFractionDigits: 0,
  }).format(totalRevenue).replace("KES", "KSh")

  const stats = [
    {
      title: "Today's Appointments",
      value: todayAppointmentsCount.toString(),
      change: "Booked online",
      icon: <CalendarDays className="h-5 w-5 text-[#55624C]" />,
    },
    {
      title: "Active Staff",
      value: `${activeStaffCount} / ${totalStaffCount}`,
      change: "Clocked in (24h window)",
      icon: <UserCheck className="h-5 w-5 text-[#55624C]" />,
    },
    {
      title: "Today's Revenue",
      value: isUnlocked ? formattedRevenue : "••••••••",
      change: isUnlocked ? "Earned from completed work" : "Manager Auth Required",
      icon: <Banknote className="h-5 w-5 text-[#55624C]" />,
      isProtected: true,
    },
    {
      title: "Completed Today",
      value: completedCount.toString(),
      change: `${fulfillmentRate}% fulfillment rate`,
      icon: <CheckSquare className="h-5 w-5 text-[#55624C]" />,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="p-5 bg-[#F3EFE6] border-[#E3DDD1] rounded-[1.75rem] shadow-sm relative overflow-hidden"
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[11px] font-medium text-[#7A756C] uppercase tracking-wider">{stat.title}</p>
              <p className="mt-2 text-2xl font-serif text-[#1E1D1B] font-medium">{stat.value}</p>
              <p className="mt-1 text-xs text-[#7A756C]">{stat.change}</p>
            </div>
            <div className="p-2.5 bg-[#E8E3D8] rounded-2xl">{stat.icon}</div>
          </div>

          {stat.isProtected && !isUnlocked && (
            <button
              onClick={onUnlockClick}
              className="mt-3 w-full py-1.5 bg-[#E8E3D8] hover:bg-[#D5CEC2] text-[#1E1D1B] rounded-xl text-[10px] uppercase font-medium tracking-wider flex items-center justify-center gap-1 transition-colors"
            >
              <Lock className="w-3 h-3" /> Unlock Revenue
            </button>
          )}
        </Card>
      ))}
    </div>
  )
}