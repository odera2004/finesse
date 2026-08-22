"use client"

import { useState } from "react"
import DashboardStats from "@/components/admin/dashboard-stats"
import UpcomingAppointments from "@/components/admin/upcoming-appointments"
import RecentActivities from "@/components/admin/recent-activities"

export default function DashboardClientWrapper() {
  const [isUnlocked, setIsUnlocked] = useState(false)

  const handleUnlockClick = () => {
    const pin = prompt("Enter Master Manager PIN:")
    if (pin === "8888") {
      setIsUnlocked(true)
    } else if (pin !== null) {
      alert("Invalid Master PIN. Authorization denied.")
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <DashboardStats isUnlocked={isUnlocked} onUnlockClick={handleUnlockClick} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <UpcomingAppointments />
        </div>
        <div>
          <RecentActivities />
        </div>
      </div>
    </div>
  )
}