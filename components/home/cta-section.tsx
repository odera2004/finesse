"use client"

import Link from "next/link"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

// Dynamically import LocationMap with SSR disabled to prevent Leaflet window errors
const LocationMap = dynamic(() => import("@/components/contact/location-map"), {
  ssr: false,
  loading: () => (
    <div className="h-[400px] w-full bg-[#F4F1EA] border border-[#E6E1D7] rounded-3xl animate-pulse flex items-center justify-center text-[#6B6862] text-sm font-sans">
      Loading Studio Map...
    </div>
  ),
})

export default function CTASection() {
  return (
    <section className="py-24 bg-[#FBF9F5] text-[#2B2A28] relative overflow-hidden border-t border-[#E6E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#55624C] font-semibold mb-3 block">
            VISIT OUR STUDIO
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2B2A28] mb-4">
            Our Location
          </h2>
          <p className="text-[#6B6862] text-base sm:text-lg font-sans leading-relaxed">
            Located in Parklands, Nairobi, Studio 39 provides a serene, high-end sanctuary offering our complete range of bespoke salon and grooming services.
          </p>
        </div>

        {/* Map Container Card */}
        <div className="mb-16 bg-[#F4F1EA] p-3 sm:p-4 rounded-3xl border border-[#E6E1D7] shadow-sm">
          <LocationMap />
        </div>

        {/* Call To Action Box */}
        <div className="bg-[#F4F1EA] rounded-3xl p-8 sm:p-12 border border-[#E6E1D7] text-center max-w-3xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#55624C] font-semibold block">
            RESERVE YOUR TIME
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl text-[#2B2A28]">
            Ready to Experience Studio 39?
          </h3>
          <p className="text-[#6B6862] text-base font-sans max-w-xl mx-auto leading-relaxed">
            Book your appointment today and let our expert stylists help you look and feel your absolute best.
          </p>
          <div className="pt-2">
            <Button
              asChild
              className="bg-[#2F392B] hover:bg-[#55624C] text-[#FBF9F5] rounded-full px-8 py-6 text-xs uppercase tracking-widest transition-all shadow-sm group inline-flex items-center space-x-2"
            >
              <Link href="/booking">
                <span>Book Your Appointment</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>
        </div>

      </div>
    </section>
  )
}