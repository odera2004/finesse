"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Check, Clock, Calendar, ChevronRight, MessageCircle, UserCheck } from "lucide-react"
import Link from "next/link"

interface Appointment {
  id: string
  client_name: string
  client_phone: string
  service_name: string
  staff_name: string
  booking_date: string
  booking_time: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
}

export default function UpcomingAppointments() {
  const [appointmentList, setAppointmentList] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAppointments()
  }, [])

  async function fetchAppointments() {
    setLoading(true)
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .order("booking_date", { ascending: true })

    if (data && !error) {
      setAppointmentList(data as Appointment[])
    }
    setLoading(false)
  }

  async function handleStatusChange(id: string, newStatus: string) {
    setAppointmentList((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: newStatus as any } : app))
    )
    await supabase.from("appointments").update({ status: newStatus }).eq("id", id)
  }

  async function handleAssignStaff(id: string, staffName: string) {
    setAppointmentList((prev) =>
      prev.map((app) => (app.id === id ? { ...app, staff_name: staffName } : app))
    )
    await supabase.from("appointments").update({ staff_name: staffName }).eq("id", id)
  }

  const handleSendWhatsApp = (phone: string, name: string, service: string, date: string, time: string) => {
    const cleanPhone = phone.replace("+", "").replace(/\s+/g, "")
    const message = encodeURIComponent(
      `Hello ${name}, this is Finesse Parklands confirming your appointment for ${service} on ${date} at ${time}.`
    )
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, "_blank")
  }

  return (
    <Card className="bg-[#F3EFE6] border-[#E3DDD1] rounded-[2rem] shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-[#E3DDD1]/60">
        <CardTitle className="font-serif text-2xl font-normal text-[#1E1D1B]">
          Upcoming Bookings
        </CardTitle>
        <Button asChild variant="ghost" className="text-xs text-[#7A756C] hover:text-[#1E1D1B]">
          <Link href="/admin/calendar" className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            <span>Calendar View</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </Button>
      </CardHeader>

      <CardContent className="pt-4">
        {loading ? (
          <div className="py-8 text-center text-xs text-[#7A756C]">Loading bookings...</div>
        ) : appointmentList.length === 0 ? (
          <div className="py-8 text-center text-xs text-[#7A756C]">No bookings found.</div>
        ) : (
          <div className="space-y-3">
            {appointmentList.map((app) => (
              <div
                key={app.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-[#E8E3D8]/60 rounded-2xl border border-[#E3DDD1] gap-3"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-serif text-base text-[#1E1D1B] font-medium">{app.client_name}</h4>
                    <Badge
                      className={`text-[10px] px-2 py-0.5 rounded-full ${
                        app.status === "confirmed"
                          ? "bg-[#55624C] text-[#F3EFE6]"
                          : "bg-[#D8D2C5] text-[#2C2B28]"
                      }`}
                    >
                      {app.status}
                    </Badge>
                  </div>

                  <p className="text-xs text-[#1E1D1B] font-medium">
                    {app.service_name}
                  </p>

                  <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#7A756C] pt-1">
                    <span className="flex items-center gap-1 font-medium text-[#55624C]">
                      <Calendar className="h-3 w-3" />
                      {app.booking_date} @ {app.booking_time}
                    </span>

                    <span className="flex items-center gap-1">
                      <UserCheck className="h-3 w-3" />
                      Staff: <span className="text-[#1E1D1B]">{app.staff_name || "Unassigned"}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end border-t sm:border-t-0 border-[#D5CEC2] pt-2 sm:pt-0">
                  {/* Quick Assign Staff Input */}
                  {app.staff_name === "Unassigned" && (
                    <select
                      onChange={(e) => handleAssignStaff(app.id, e.target.value)}
                      className="text-xs bg-[#F3EFE6] border border-[#D5CEC2] rounded-lg px-2 py-1 text-[#1E1D1B]"
                    >
                      <option value="">Assign Staff...</option>
                      <option value="Maina Barber">Maina Barber</option>
                      <option value="Grace Beauty">Grace Beauty</option>
                    </select>
                  )}

                  {app.status === "pending" && (
                    <Button
                      size="sm"
                      className="bg-[#55624C] hover:bg-[#2C2B28] text-[#F3EFE6] text-xs h-8 rounded-xl"
                      onClick={() => handleStatusChange(app.id, "confirmed")}
                    >
                      <Check className="h-3.5 w-3.5 mr-1" /> Confirm
                    </Button>
                  )}

                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 text-[#1E1D1B] hover:bg-[#D5CEC2]"
                    onClick={() => handleSendWhatsApp(app.client_phone, app.client_name, app.service_name, app.booking_date, app.booking_time)}
                  >
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}