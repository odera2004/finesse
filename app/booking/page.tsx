import { Suspense } from "react"
import BookingForm from "@/components/booking/booking-form"

export default function BookingPage() {
  return (
    <main className="min-h-screen bg-[#0A0A0A] py-12 px-4">
      <Suspense
        fallback={
          <div className="max-w-4xl mx-auto bg-[#121212] border border-[#2A2A28] rounded-3xl p-12 text-center text-[#A19D95]">
            Loading reservation portal...
          </div>
        }
      >
        <BookingForm />
      </Suspense>
    </main>
  )
}