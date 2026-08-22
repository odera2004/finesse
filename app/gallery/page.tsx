"use client"

import { useState } from "react"
import Image from "next/image"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Sparkles, Scissors, User, LayoutGrid, Eye } from "lucide-react"

const galleryCategories = [
  { id: "all", label: "All Craft", icon: LayoutGrid },
  { id: "hair", label: "Cuts & Styling", icon: Scissors },
  { id: "beard", label: "Beard & Shave", icon: User },
  { id: "treatments", label: "Facials & Spa", icon: Sparkles },
]

const galleryItems = [
  {
    id: 1,
    title: "Executive Precision Fade",
    subtitle: "Custom razor detail & hot towel finish",
    category: "hair",
    src: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=900&h=900&fit=crop&auto=format&q=80",
    badge: "Popular",
  },
  {
    id: 2,
    title: "Beard Sculpting",
    subtitle: "Organic botanical oil conditioning treatment",
    category: "beard",
    src: "https://images.unsplash.com/photo-1461799821556-055545cf32dc?w=900&h=900&fit=crop&auto=format&q=80",
    badge: "Signature",
  },
  {
    id: 3,
    title: "Luxury Lounge Interior",
    subtitle: "Bespoke leather seating & relaxing ambience",
    category: "interior",
    src: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=900&h=900&fit=crop&auto=format&q=80",
  },
  {
    id: 4,
    title: "Charcoal Detox Facial",
    subtitle: "Deep pore cleanse & soothing face massage",
    category: "treatments",
    src: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&h=900&fit=crop&auto=format&q=80",
    badge: "New",
  },
  {
    id: 5,
    title: "Hot Towel Shave",
    subtitle: "Straight razor lineup & essential oils",
    category: "beard",
    src: "https://images.unsplash.com/photo-1621607750233-795db0a5c655?w=900&h=900&fit=crop&auto=format&q=80",
  },
  {
    id: 6,
    title: "Scalp Revitalizing Spa",
    subtitle: "Exfoliating treatment & head massage",
    category: "treatments",
    src: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=900&h=900&fit=crop&auto=format&q=80",
  },
]

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredItems =
    activeTab === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeTab)

  return (
    <main className="min-h-screen bg-[#ECE7DE] text-[#2C2B28] pt-28 pb-24 px-4 sm:px-6 lg:px-12 font-sans selection:bg-[#D5CEC2]">
      {/* Container */}
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Banner Section */}
        <section className="text-center space-y-4 max-w-2xl mx-auto pt-6">
          <span className="inline-block text-[11px] uppercase tracking-[0.35em] text-[#7A756C] font-semibold">
            VISUAL PORTFOLIO • PARKLANDS, NAIROBI
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1E1D1B] tracking-tight font-normal">
            Our Craftsmanship
          </h1>
          <p className="text-sm sm:text-base text-[#6E6960] font-light leading-relaxed">
            Browse through our curated collection of artisanal cuts, beard sculpting, and signature grooming at Finesse.
          </p>
        </section>

        {/* Filter Bar */}
        <div className="flex justify-center">
          <nav className="inline-flex items-center bg-[#E1DBD0]/80 backdrop-blur-md p-1.5 rounded-full border border-[#D5CEC2] shadow-inner space-x-1">
            {galleryCategories.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-medium transition-all duration-300 ${
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

        {/* Unified Card Gallery Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item) => (
            <Dialog key={item.id}>
              <DialogTrigger asChild>
                <article className="group bg-[#F3EFE6] rounded-[2.25rem] border border-[#E3DDD1] overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer flex flex-col">
                  {/* Image Container with Soft Sand Background */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E8E3D8] p-3">
                    <div className="relative w-full h-full rounded-[1.75rem] overflow-hidden">
                      <Image
                        src={item.src}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      {/* Pill Badge */}
                      {item.badge && (
                        <div className="absolute top-3 left-3 bg-[#F3EFE6]/90 backdrop-blur-md text-[#2C2B28] text-[10px] font-semibold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm border border-[#E3DDD1]">
                          {item.badge}
                        </div>
                      )}

                      {/* Hover Action Circle */}
                      <div className="absolute inset-0 bg-[#1E1D1B]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#F3EFE6] text-[#1E1D1B] flex items-center justify-center shadow-lg transition-transform duration-300 scale-75 group-hover:scale-100">
                          <Eye className="w-5 h-5" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Content Footer */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="font-serif text-2xl text-[#1E1D1B] font-normal tracking-wide group-hover:text-[#55624C] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#7A756C] mt-1.5 font-light leading-relaxed">
                        {item.subtitle}
                      </p>
                    </div>
                  </div>
                </article>
              </DialogTrigger>

              {/* Lightbox Modal */}
              <DialogContent className="max-w-4xl bg-[#F3EFE6] border-[#E3DDD1] p-6 rounded-[2.5rem] shadow-2xl">
                <div className="relative aspect-[16/10] w-full rounded-[1.75rem] overflow-hidden bg-[#E8E3D8]">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center pt-2">
                  <h3 className="font-serif text-3xl text-[#1E1D1B]">{item.title}</h3>
                  <p className="text-sm text-[#7A756C] mt-1">{item.subtitle}</p>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </section>
      </div>
    </main>
  )
}