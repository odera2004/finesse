"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Clock, UserPlus } from "lucide-react"

interface StaffMember {
  id: string
  full_name: string
  role: string
  pin_code: string
  status?: "clocked_in" | "clocked_out"
  attendance_id?: string
  clock_in_time?: string
}

export default function StaffManager() {
  const [staffList, setStaffList] = useState<StaffMember[]>([])
  const [selectedPin, setSelectedPin] = useState("")
  const [activeStaffId, setActiveStaffId] = useState<string>("")
  const [pinError, setPinError] = useState(false)
  const [showRegisterForm, setShowRegisterForm] = useState(false)
  const [formError, setFormError] = useState("")

  const [fullName, setFullName] = useState("")
  const [role, setRole] = useState("")
  const [pinCode, setPinCode] = useState("")

  useEffect(() => {
    fetchStaffAndAttendance()
  }, [])

  async function fetchStaffAndAttendance() {
    try {
      const { data: staffData, error: staffErr } = await supabase.from("staff_members").select("*")

      if (staffErr) {
        setFormError(staffErr.message)
        return
      }

      const todayStart = new Date()
      todayStart.setHours(0, 0, 0, 0)

      const { data: attendanceData } = await supabase
        .from("staff_attendance")
        .select("*")
        .gte("clock_in_time", todayStart.toISOString())
        .is("clock_out_time", null)

      if (staffData) {
        const merged = staffData.map((staff) => {
          const activeShift = attendanceData?.find((a) => a.staff_id === staff.id)
          return {
            ...staff,
            status: activeShift ? "clocked_in" : "clocked_out",
            attendance_id: activeShift?.id,
            clock_in_time: activeShift
              ? new Date(activeShift.clock_in_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : undefined,
          }
        })
        setStaffList(merged)
      }
    } catch (err: any) {
      setFormError(err.message || "Failed to fetch staff data")
    }
  }

  async function handleRegisterAndClockIn(e: React.FormEvent) {
    e.preventDefault()
    setFormError("")

    if (!fullName || !role || pinCode.length !== 4) {
      setFormError("Enter full name, role, and a 4-digit PIN.")
      return
    }

    try {
      const { data: newStaff, error: staffError } = await supabase
        .from("staff_members")
        .insert({ full_name: fullName, role, pin_code: pinCode })
        .select()
        .single()

      if (staffError) {
        setFormError(staffError.message)
        return
      }

      if (newStaff) {
        await supabase.from("staff_attendance").insert({
          staff_id: newStaff.id,
          status: "clocked_in",
        })

        setFullName("")
        setRole("")
        setPinCode("")
        setShowRegisterForm(false)
        fetchStaffAndAttendance()
      }
    } catch (err: any) {
      setFormError(err.message || "Registration failed")
    }
  }

  async function handleToggleShift(member: StaffMember) {
    if (selectedPin !== member.pin_code) {
      setPinError(true)
      return
    }

    try {
      if (member.status === "clocked_out") {
        await supabase.from("staff_attendance").insert({
          staff_id: member.id,
          status: "clocked_in",
        })
      } else if (member.attendance_id) {
        await supabase
          .from("staff_attendance")
          .update({
            clock_out_time: new Date().toISOString(),
            status: "clocked_out",
          })
          .eq("id", member.attendance_id)
      }

      setSelectedPin("")
      setActiveStaffId("")
      setPinError(false)
      fetchStaffAndAttendance()
    } catch (err) {
      console.error("Shift update failed:", err)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-serif text-2xl text-[#1E1D1B]">Staff & Attendance Logs</h2>
          <p className="text-xs text-[#7A756C]">Clock-in/out terminal and active shifts.</p>
        </div>
        <Button
          onClick={() => setShowRegisterForm(!showRegisterForm)}
          className="bg-[#55624C] text-[#F3EFE6] hover:bg-[#2C2B28] rounded-xl text-xs flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" /> First Time Clock-In
        </Button>
      </div>

      {showRegisterForm && (
        <Card className="bg-[#F3EFE6] border-[#E3DDD1] rounded-[1.75rem] p-5 shadow-sm">
          <h3 className="font-serif text-sm text-[#1E1D1B] mb-3">First Time Setup & Clock In</h3>
          <form onSubmit={handleRegisterAndClockIn} className="space-y-3">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Input
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-[#FBF9F5] border-[#E3DDD1] text-xs"
              />
              <Input
                placeholder="Role (e.g. Master Barber)"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="bg-[#FBF9F5] border-[#E3DDD1] text-xs"
              />
              <Input
                type="password"
                maxLength={4}
                placeholder="Create 4-Digit PIN"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                className="bg-[#FBF9F5] border-[#E3DDD1] text-xs"
              />
            </div>
            {formError && <p className="text-xs text-red-600 font-medium">{formError}</p>}
            <Button type="submit" className="bg-[#55624C] hover:bg-[#2C2B28] text-[#F3EFE6] rounded-xl text-xs w-full sm:w-auto">
              Clock In Now
            </Button>
          </form>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {staffList.map((member) => (
          <Card key={member.id} className="bg-[#F3EFE6] border-[#E3DDD1] rounded-[1.75rem] p-5 shadow-sm">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-serif text-lg text-[#1E1D1B] font-medium">{member.full_name}</h3>
                <p className="text-xs text-[#7A756C]">{member.role}</p>
              </div>
              <span
                className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${
                  member.status === "clocked_in" ? "bg-[#55624C] text-[#F3EFE6]" : "bg-[#D8D2C5] text-[#2C2B28]"
                }`}
              >
                {member.status === "clocked_in" ? "Active Shift" : "Off Duty"}
              </span>
            </div>

            {member.status === "clocked_in" && (
              <div className="flex items-center gap-1.5 text-xs text-[#55624C] mb-4">
                <Clock className="w-3.5 h-3.5" />
                <span>Clocked in at {member.clock_in_time}</span>
              </div>
            )}

            {activeStaffId === member.id ? (
              <div className="space-y-2 mt-3 pt-3 border-t border-[#E3DDD1]">
                <Input
                  type="password"
                  maxLength={4}
                  placeholder="Enter PIN"
                  value={selectedPin}
                  onChange={(e) => {
                    setPinError(false)
                    setSelectedPin(e.target.value)
                  }}
                  className="text-center text-lg bg-[#E8E3D8] border-[#D5CEC2] rounded-xl text-[#1E1D1B]"
                />
                {pinError && <p className="text-[10px] text-red-600 text-center">Incorrect PIN Code</p>}
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleToggleShift(member)}
                    className="w-full bg-[#55624C] text-[#F3EFE6] hover:bg-[#2C2B28] rounded-xl text-xs"
                  >
                    Confirm {member.status === "clocked_in" ? "Clock Out" : "Clock In"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setActiveStaffId("")
                      setSelectedPin("")
                      setPinError(false)
                    }}
                    className="border-[#D5CEC2] rounded-xl text-xs"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button
                onClick={() => setActiveStaffId(member.id)}
                variant="outline"
                className="w-full mt-2 border-[#D5CEC2] text-[#1E1D1B] hover:bg-[#E8E3D8] rounded-xl text-xs"
              >
                {member.status === "clocked_in" ? "Clock Out" : "Clock In"}
              </Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}