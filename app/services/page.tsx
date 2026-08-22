"use client"

import { useState } from "react"
import Image from "next/image"
import { Clock, Scissors, Sparkles, LayoutGrid, Heart, ArrowUpRight } from "lucide-react"

const serviceCategories = [
  { id: "all", label: "All Services", icon: LayoutGrid },
  { id: "hair", label: "Haircut", icon: Scissors },
  { id: "massage", label: "Massage", icon: Heart },
  { id: "nails", label: "Nails (Mani/Pedi)", icon: Sparkles },
]

const servicesCatalog = [
  {
    id: "s1",
    name: "Executive Haircut",
    description: "Precision cutting, crisp razor lineup, wash, and custom styling finish.",
    price: "KSh 1,500",
    duration: "30 min",
    category: "hair",
    badge: "Popular",
    image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=800&h=600&fit=crop&auto=format&q=80",
  },
  {
    id: "s2",
    name: "Therapeutic Body Massage",
    description: "Deep tissue and relaxing pressure-point massage to release tension.",
    price: "KSh 3,500",
    duration: "60 min",
    category: "massage",
    badge: "Signature",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop&auto=format&q=80",
  },
  {
    id: "s3",
    name: "Classic Spa Manicure",
    description: "Nail shaping, cuticle care, hand scrub, and relaxing hand massage.",
    price: "KSh 1,500",
    duration: "40 min",
    category: "nails",
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=800&h=600&fit=crop&auto=format&q=80",
  },
  {
    id: "s4",
    name: "Deluxe Spa Pedicure",
    description: "Exfoliating foot soak, nail grooming, dead skin removal, and foot massage.",
    price: "KSh 2,000",
    duration: "45 min",
    category: "nails",
    image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=800&h=600&fit=crop&auto=format&q=80",
  },
  {
    id: "s5",
    name: "Head, Neck & Shoulder Massage",
    description: "Express hot towel tension relief massage designed for quick relaxation.",
    price: "KSh 2,000",
    duration: "30 min",
    category: "massage",
    image: "https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=800&h=600&fit=crop&auto=format&q=80",
  },
]

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredServices =
    activeTab === "all"
      ? servicesCatalog
      : servicesCatalog.filter((item) => item.category === activeTab)

  return (
    <main className="min-h-screen bg-[#ECE7DE] text-[#2C2B28] pt-28 pb-24 px-4 sm:px-6 lg:px-12 font-sans selection:bg-[#D5CEC2]">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Banner Section */}
        <section className="text-center space-y-4 max-w-2xl mx-auto pt-6">
          <span className="inline-block text-[11px] uppercase tracking-[0.35em] text-[#7A756C] font-semibold">
            SERVICES & MENU • PARKLANDS, NAIROBI
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1E1D1B] tracking-tight font-normal">
            Our Offerings
          </h1>
          <p className="text-sm sm:text-base text-[#6E6960] font-light leading-relaxed">
            Open Daily: 8:00 AM – 8:00 PM. Select your preferred service and book up to 1 day in advance.
          </p>
        </section>

        {/* Filter Navigation */}
        <div className="flex justify-center overflow-x-auto pb-2">
          <nav className="inline-flex items-center bg-[#E1DBD0]/80 backdrop-blur-md p-1.5 rounded-full border border-[#D5CEC2] shadow-inner space-x-1">
            {serviceCategories.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap ${
                    isActive
                      ? "bg-[#2C2B28] text-[#F3EFE6] shadow-md scale-105"
                      : "text-[#6E6960] hover:text-[#1E1D1B] hover:bg-[#D8D2C5]/50"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Services Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <article
              key={service.id}
              className="group bg-[#F3EFE6] rounded-[2.25rem] border border-[#E3DDD1] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Image Box */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#E8E3D8] p-3">
                  <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {service.badge && (
                      <div className="absolute top-3 left-3 bg-[#F3EFE6]/90 backdrop-blur-md text-[#2C2B28] text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm border border-[#E3DDD1]">
                        {service.badge}
                      </div>
                    )}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 sm:p-7 space-y-3">
                  <h3 className="font-serif text-2xl text-[#1E1D1B] font-normal tracking-wide group-hover:text-[#55624C] transition-colors">
                    {service.name}
                  </h3>

                  <p className="text-xs text-[#7A756C] font-light leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-[11px] text-[#7A756C] font-medium pt-1">
                    <Clock className="w-3.5 h-3.5 text-[#55624C]" />
                    <span>{service.duration}</span>
                  </div>
                </div>
              </div>

              {/* Price & Booking Button */}
              <div className="px-6 sm:px-7 pb-6 pt-2 flex items-center justify-between border-t border-[#E3DDD1]/60 mt-2">
                <div>
                  <span className="font-serif text-xl font-normal text-[#1E1D1B]">
                    {service.price}
                  </span>
                  <span className="block text-[10px] text-[#7A756C]">Pay at counter (M-Pesa/Cash)</span>
                </div>

                <a
                  href={`/booking?service=${service.id}`}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1E1D1B] hover:text-[#55624C] transition-colors group/btn"
                >
                  <span>Book Appointment</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </div>
            </article>
          ))}
        </section>
      </div>
    </main>
  )
}