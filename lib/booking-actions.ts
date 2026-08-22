"use server"

import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function recordWhatsAppBooking(formData: {
  clientName: string
  clientPhone: string
  serviceName: string
  priceKsh: number
  bookingTime: string
}) {
  // Save booking details to Supabase
  const { data, error } = await supabase.from("bookings").insert([
    {
      client_name: formData.clientName,
      client_phone: formData.clientPhone,
      service_name: formData.serviceName,
      price_ksh: formData.priceKsh,
      booking_time: formData.bookingTime,
      status: "pending",
    },
  ])

  if (error) {
    console.error("Error logging booking to Supabase:", error)
    return { success: false, error: error.message }
  }

  return { success: true }
}