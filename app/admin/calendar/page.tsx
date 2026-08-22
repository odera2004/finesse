import AdminHeader from "@/components/admin/admin-header"
import UpcomingAppointments from "@/components/admin/upcoming-appointments"

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <AdminHeader title="Calendar & Bookings" subtitle="Manage client appointments" />
      <UpcomingAppointments />
    </div>
  )
}