"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabase"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Clock, Check, Sparkles, Calendar as CalendarIcon, User, Phone, Mail, AlertCircle } from "lucide-react"

const WHATSAPP_BUSINESS_NUMBER = "254708486624"

const serviceCategories = [
  {
    label: "Precision Cuts & Hair",
    options: [
      { value: "Executive Haircut — KSh 1,500", label: "Executive Haircut — KSh 1,500" },
      { value: "Beard Sculpt & Razor Finish — KSh 1,000", label: "Beard Sculpt & Razor Finish — KSh 1,000" },
      { value: "Signature Cut & Hot Towel Shave — KSh 2,200", label: "Signature Cut & Hot Towel Shave — KSh 2,200" },
      { value: "Scalp Detox & Hair Treatment — KSh 2,500", label: "Scalp Detox & Hair Treatment — KSh 2,500" },
    ],
  },
  {
    label: "Grooming & Treatments",
    options: [
      { value: "Deep Cleanse Charcoal Facial — KSh 3,000", label: "Deep Cleanse Charcoal Facial — KSh 3,000" },
      { value: "Express Hydration Therapy — KSh 2,000", label: "Express Hydration Therapy — KSh 2,000" },
      { value: "Luxury Hot Towel Straight Shave — KSh 1,200", label: "Luxury Hot Towel Straight Shave — KSh 1,200" },
    ],
  },
]

const timeSlots = [
  "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
  "06:00 PM", "06:30 PM", "07:00 PM"
]

export default function BookingForm() {
  const searchParams = useSearchParams()
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("")
  const [selectedService, setSelectedService] = useState<string>("")
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [whatsappConfirm, setWhatsappConfirm] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    const serviceParam = searchParams.get("service")
    if (serviceParam) {
      for (const category of serviceCategories) {
        const matchingService = category.options.find((option) =>
          option.label.toLowerCase().includes(serviceParam.toLowerCase())
        )
        if (matchingService) {
          setSelectedService(matchingService.value)
          break
        }
      }
    }
  }, [searchParams])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setErrorMsg("")

    if (!date || !selectedTimeSlot || !selectedService || !name || !phone) {
      setErrorMsg("Please complete all required fields.")
      setIsSubmitting(false)
      return
    }

    const formattedDateISO = date.toISOString().split("T")[0]
    const formattedDateReadable = date.toLocaleDateString("en-KE", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    })

    try {
      const { error } = await supabase.from("appointments").insert({
        client_name: name,
        client_phone: phone,
        client_email: email || null,
        service_name: selectedService,
        booking_date: formattedDateISO,
        booking_time: selectedTimeSlot,
        status: "pending",
      })

      if (error) throw error

      if (whatsappConfirm) {
        const message = `*NEW BOOKING REQUEST — FINESSE PARKLANDS*
----------------------------------------
👤 *Client Name:* ${name}
📞 *Phone:* ${phone}
📧 *Email:* ${email || "N/A"}

💈 *Service:* ${selectedService}
📅 *Date:* ${formattedDateReadable}
⏰ *Time Slot:* ${selectedTimeSlot}
----------------------------------------
_Hi, I have just booked on your portal and would like to confirm my appointment._`

        const whatsappUrl = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, "_blank")
      }

      setIsSuccess(true)
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to record booking. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="max-w-4xl mx-auto bg-[#121212] border border-[#2A2A28] text-[#FBF9F5] shadow-2xl rounded-3xl overflow-hidden my-12">
      <CardHeader className="bg-gradient-to-b from-[#1C1C1A] to-[#121212] border-b border-[#2A2A28] p-8 md:p-10 relative overflow-hidden">
        <div className="flex items-center space-x-2 text-[#55624C] mb-2">
          <Sparkles className="w-4 h-4" />
          <span className="text-xs uppercase tracking-[0.3em] font-medium">VIP Reservation</span>
        </div>
        <CardTitle className="font-serif text-3xl md:text-4xl tracking-tight text-[#FBF9F5]">
          Book Your Experience
        </CardTitle>
        <CardDescription className="text-[#A19D95] font-sans text-sm mt-1">
          Select your desired service, date, and time slot at Finesse Parklands.
        </CardDescription>
      </CardHeader>

      <CardContent className="p-8 md:p-10">
        {errorMsg && (
          <div className="mb-6 bg-red-900/30 border border-red-500/50 text-red-200 text-xs p-3 rounded-xl flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {isSuccess ? (
          <div className="text-center py-16 space-y-6">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#55624C]/20 text-[#55624C] ring-1 ring-[#55624C]/40 mx-auto">
              <Check className="h-10 w-10" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-serif text-[#FBF9F5]">Booking Received!</h3>
              <p className="text-[#A19D95] text-sm max-w-md mx-auto">
                Thank you, <span className="text-[#FBF9F5] font-semibold">{name}</span>. Your appointment has been recorded and added to our staff schedules.
              </p>
            </div>
            <Button
              onClick={() => {
                setIsSuccess(false)
                setName("")
                setPhone("")
                setEmail("")
              }}
              className="bg-[#2B2A28] hover:bg-[#55624C] text-[#FBF9F5] border border-[#3A3A38] rounded-full px-8 py-3 text-xs uppercase tracking-widest transition-all"
            >
              Make Another Reservation
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label htmlFor="name" className="text-[#A19D95] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <User className="w-3.5 h-3.5 text-[#55624C]" /> Full Name
                  </Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="border-[#2A2A28] bg-[#1A1A18] text-[#FBF9F5] placeholder:text-[#555] focus:border-[#55624C] focus:ring-[#55624C] h-12 rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-[#A19D95] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <Phone className="w-3.5 h-3.5 text-[#55624C]" /> Phone Number
                  </Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+254 7XX XXX XXX"
                    required
                    className="border-[#2A2A28] bg-[#1A1A18] text-[#FBF9F5] placeholder:text-[#555] focus:border-[#55624C] focus:ring-[#55624C] h-12 rounded-xl"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-[#A19D95] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <Mail className="w-3.5 h-3.5 text-[#55624C]" /> Email (Optional)
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@finesse.co.ke"
                    className="border-[#2A2A28] bg-[#1A1A18] text-[#FBF9F5] placeholder:text-[#555] focus:border-[#55624C] focus:ring-[#55624C] h-12 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="service" className="text-[#A19D95] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#55624C]" /> Select Service
                </Label>
                <Select value={selectedService} onValueChange={setSelectedService} required>
                  <SelectTrigger id="service" className="border-[#2A2A28] bg-[#1A1A18] text-[#FBF9F5] focus:border-[#55624C] h-12 rounded-xl text-sm">
                    <SelectValue placeholder="Choose a grooming package..." />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1C1C1A] border-[#2A2A28] text-[#FBF9F5] rounded-xl">
                    {serviceCategories.map((category) => (
                      <SelectGroup key={category.label}>
                        <SelectLabel className="px-3 py-2 text-xs uppercase tracking-widest text-[#55624C] font-semibold bg-[#121212]">
                          {category.label}
                        </SelectLabel>
                        {category.options.map((option) => (
                          <SelectItem key={option.value} value={option.value} className="text-[#FBF9F5] hover:bg-[#55624C]/20 cursor-pointer py-2.5">
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                <div>
                  <Label className="text-[#A19D95] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <CalendarIcon className="w-3.5 h-3.5 text-[#55624C]" /> Select Date
                  </Label>
                  <div className="border border-[#2A2A28] rounded-2xl bg-[#1A1A18] p-4 flex justify-center text-[#FBF9F5]">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(d) => {
                        const today = new Date()
                        today.setHours(0, 0, 0, 0)
                        return d < today
                      }}
                      className="rounded-md bg-[#121212] border-0 text-[#FBF9F5]"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-[#A19D95] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 mb-2">
                    <Clock className="w-3.5 h-3.5 text-[#55624C]" /> Select Preferred Time Slot
                  </Label>
                  <div className="grid grid-cols-2 gap-2.5 h-[310px] overflow-y-auto border border-[#2A2A28] rounded-2xl bg-[#1A1A18] p-3 pr-2 scrollbar-thin">
                    {timeSlots.map((slot) => {
                      const isSelected = selectedTimeSlot === slot
                      return (
                        <Button
                          key={slot}
                          type="button"
                          variant="outline"
                          className={`justify-start text-xs border h-11 transition-all rounded-xl ${
                            isSelected
                              ? "bg-[#55624C] text-[#FBF9F5] border-[#55624C]"
                              : "border-[#2A2A28] bg-[#121212] text-[#A19D95] hover:border-[#55624C] hover:text-[#FBF9F5]"
                          }`}
                          onClick={() => setSelectedTimeSlot(slot)}
                        >
                          <Clock className={`mr-2 h-3.5 w-3.5 ${isSelected ? "text-white" : "text-[#55624C]"}`} />
                          {slot}
                        </Button>
                      )
                    })}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <Checkbox
                  id="whatsapp"
                  checked={whatsappConfirm}
                  onCheckedChange={(checked) => setWhatsappConfirm(checked as boolean)}
                  className="border-[#2A2A28] data-[state=checked]:bg-[#55624C]"
                />
                <label htmlFor="whatsapp" className="text-xs text-[#A19D95] cursor-pointer hover:text-[#FBF9F5]">
                  Send instant notification via WhatsApp chat
                </label>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-[#55624C] hover:bg-[#68775D] text-[#FBF9F5] rounded-xl py-6 text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-lg"
              disabled={!date || !selectedTimeSlot || !selectedService || !name || !phone || isSubmitting}
            >
              {isSubmitting ? "Saving Booking..." : "Confirm & Send Booking"}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}