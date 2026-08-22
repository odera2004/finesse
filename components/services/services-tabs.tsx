"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ServiceCard from "@/components/services/service-card"
import { UserIcon as Male, UserIcon as Female, Users } from "lucide-react"

// Updated catalog with KSh pricing
const services = {
  men: [
    {
      id: "m1",
      name: "Executive Haircut",
      description: "Precision cutting and razor finishing tailored to your style.",
      price: 1500,
      duration: "30 min",
      image: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?w=500&h=350&fit=crop&crop=focalpoint&auto=format&q=80",
    },
    {
      id: "m2",
      name: "Beard Sculpting",
      description: "Expert beard shaping, line-up, and nourishing oils.",
      price: 1000,
      duration: "20 min",
      image: "https://images.unsplash.com/photo-1461799821556-055545cf32dc?w=500&h=350&fit=crop&crop=focalpoint&auto=format&q=80",
    },
    {
      id: "m3",
      name: "Grey Blending & Color",
      description: "Natural-looking gray coverage and full hair coloring.",
      price: 2500,
      duration: "60 min",
      image: "https://images.unsplash.com/photo-1737042126375-10c79e59c55c?w=500&h=350&fit=crop&crop=focalpoint&auto=format&q=80",
    },
    {
      id: "m4",
      name: "Charcoal Deep Cleanse",
      description: "Deep cleansing facial treatment formulated for men's skin.",
      price: 3000,
      duration: "45 min",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=500&h=350&fit=crop&crop=focalpoint&auto=format&q=80",
    },
  ],
  women: [
    {
      id: "w1",
      name: "Women's Precision Cut",
      description: "Custom cut, wash, and luxury blowout treatment.",
      price: 2500,
      duration: "45 min",
      image: "https://images.unsplash.com/photo-1620331311520-246422fd82f9?w=500&h=350&fit=crop&crop=focalpoint&auto=format&q=80",
    },
    {
      id: "w2",
      name: "Full Balayage & Styling",
      description: "Professional highlighting and custom toning treatments.",
      price: 5000,
      duration: "90 min",
      image: "https://images.unsplash.com/photo-1492106087820-71f1a00d2b11?w=500&h=350&fit=crop&crop=focalpoint&auto=format&q=80",
    },
    {
      id: "w3",
      name: "Bridal Styling Package",
      description: "Complete bridal consultation and makeup session.",
      price: 8000,
      duration: "120 min",
      image: "https://images.unsplash.com/photo-1594140700520-8afea3283e2c?w=500&h=350&fit=crop&crop=focalpoint&auto=format&q=80",
    },
    {
      id: "w4",
      name: "Deluxe Pedicure",
      description: "Nail shaping, cuticle care, and massage.",
      price: 2000,
      duration: "60 min",
      image: "https://images.unsplash.com/photo-1610992015732-2449b76344bc?w=500&h=350&fit=crop&crop=focalpoint&auto=format&q=80",
    },
  ],
  unisex: [
    {
      id: "u1",
      name: "Scalp Detox & Spa",
      description: "Deep restorative treatment for hair growth and scalp repair.",
      price: 2500,
      duration: "60 min",
      image: "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=500&h=350&fit=crop&crop=focalpoint&auto=format&q=80",
    },
    {
      id: "u2",
      name: "Eyebrow Threading",
      description: "Clean brow shaping with organic cotton threading.",
      price: 500,
      duration: "15 min",
      image: "https://images.unsplash.com/photo-1535637603896-07c179d71103?w=500&h=350&fit=crop&crop=focalpoint&auto=format&q=80",
    },
    {
      id: "u3",
      name: "Hydrating Express Facial",
      description: "Quick glow-boosting facial session.",
      price: 2000,
      duration: "45 min",
      image: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=500&h=350&fit=crop&crop=focalpoint&auto=format&q=80",
    },
    {
      id: "u4",
      name: "Hot Towel Head Massage",
      description: "Therapeutic scalp pressure-point massage.",
      price: 1200,
      duration: "30 min",
      image: "https://images.unsplash.com/photo-1519415387722-a1c3bbef716c?w=500&h=350&fit=crop&crop=focalpoint&auto=format&q=80",
    },
  ],
}

export default function ServicesTabs() {
  const [activeTab, setActiveTab] = useState("all")

  const getFilteredServices = () => {
    if (activeTab === "all") {
      return [...services.men, ...services.women, ...services.unisex]
    }
    return services[activeTab as keyof typeof services] || []
  }

  return (
    <div className="bg-[#121212] py-12 px-4 sm:px-6 lg:px-8">
      <Tabs defaultValue="all" onValueChange={setActiveTab} className="w-full max-w-7xl mx-auto">
        <div className="flex justify-center mb-10">
          <TabsList className="bg-[#1C1C1A] border border-[#2A2A28] p-1.5 rounded-full">
            <TabsTrigger 
              value="all" 
              className="flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold text-[#A19D95] data-[state=active]:bg-[#55624C] data-[state=active]:text-[#FBF9F5] transition-all"
            >
              <Users className="h-3.5 w-3.5" />
              <span>All</span>
            </TabsTrigger>
            <TabsTrigger 
              value="men" 
              className="flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold text-[#A19D95] data-[state=active]:bg-[#55624C] data-[state=active]:text-[#FBF9F5] transition-all"
            >
              <Male className="h-3.5 w-3.5" />
              <span>Men</span>
            </TabsTrigger>
            <TabsTrigger 
              value="women" 
              className="flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold text-[#A19D95] data-[state=active]:bg-[#55624C] data-[state=active]:text-[#FBF9F5] transition-all"
            >
              <Female className="h-3.5 w-3.5" />
              <span>Women</span>
            </TabsTrigger>
            <TabsTrigger 
              value="unisex" 
              className="flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold text-[#A19D95] data-[state=active]:bg-[#55624C] data-[state=active]:text-[#FBF9F5] transition-all"
            >
              <Users className="h-3.5 w-3.5" />
              <span>Unisex</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getFilteredServices().map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}