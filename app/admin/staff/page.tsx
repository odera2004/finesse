import AdminHeader from "@/components/admin/admin-header"
import StaffManager from "@/components/admin/staff-manager"

export default function StaffPage() {
  return (
    <div className="space-y-6">
      <AdminHeader title="Staff & Shifts" subtitle="Manage team schedules and active staff" />
      <StaffManager />
    </div>
  )
}