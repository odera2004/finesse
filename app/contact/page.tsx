import type { Metadata } from "next"
import ContactForm from "@/components/contact/contact-form"
import ContactInfo from "@/components/contact/contact-info"
import LocationMap from "@/components/contact/location-map"

export const metadata: Metadata = {
  title: "Contact Us - Studio 39 Salon",
  description: "Get in touch with Studio 39 Salon. Find our location, contact information, and business hours.",
}

export default function ContactPage() {
  return (
    <main className="bg-[#FBF9F5] text-[#2B2A28] min-h-screen py-12">
      {/* Header Banner */}
      <div className="container-custom text-center pt-8 pb-16 px-4">
        <span className="inline-block text-xs uppercase tracking-[0.25em] text-[#55624C] font-semibold mb-3">
          GET IN TOUCH
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#2B2A28] mb-4 tracking-tight leading-tight">
          Contact Us
        </h1>
        <p className="text-lg text-[#6B6862] max-w-xl mx-auto font-sans">
          We're here to answer any questions you may have about our services or to assist with your next booking.
        </p>
      </div>

      <div className="container-custom px-4 max-w-6xl mx-auto space-y-16">
        {/* Contact Info & Form Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div className="bg-[#F4F1EA] p-8 md:p-10 rounded-3xl border border-[#E6E1D7] shadow-sm">
            <ContactInfo />
          </div>
          <div className="bg-[#F4F1EA] p-8 md:p-10 rounded-3xl border border-[#E6E1D7] shadow-sm">
            <ContactForm />
          </div>
        </div>

        {/* Location Section */}
        <div className="bg-[#F4F1EA] p-8 md:p-10 rounded-3xl border border-[#E6E1D7] shadow-sm">
          <div className="text-center mb-8">
            <span className="text-xs uppercase tracking-widest text-[#55624C] font-semibold mb-2 block">
              VISIT OUR STUDIO
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2A28]">
              Find Us
            </h2>
          </div>
          <div className="rounded-2xl overflow-hidden border border-[#E6E1D7]">
            <LocationMap />
          </div>
        </div>
      </div>
    </main>
  )
}
