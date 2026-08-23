"use client"

import AdminHeader from "@/components/admin/admin-header"
import DashboardStats from "@/components/admin/dashboard-stats"

export default function PerformancePage() {
  return (
    <div className="space-y-6">
      <AdminHeader title="Financial Audit" subtitle="Revenue and performance metrics" />
      <DashboardStats isUnlocked={true} onUnlockClick={() => {}} />
    </div>
  )
}