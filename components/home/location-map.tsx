"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Single location for Finesse Barbershop in Parklands, Nairobi
const parklandsPosition: [number, number] = [-1.2618, 36.8155]

export default function LocationMap() {
  const [customIcon, setCustomIcon] = useState<L.Icon | null>(null)

  useEffect(() => {
    const icon = new L.Icon({
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    })
    setCustomIcon(icon)
  }, [])

  if (!customIcon) {
    return (
      <div className="h-[400px] w-full bg-[#F4F1EA] rounded-2xl border border-[#E6E1D7] animate-pulse flex items-center justify-center text-[#6B6862] text-sm font-sans">
        Loading Map...
      </div>
    )
  }

  return (
    <div className="h-[400px] rounded-2xl overflow-hidden border border-[#E6E1D7] relative z-0">
      <MapContainer
        center={parklandsPosition}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <Marker position={parklandsPosition} icon={customIcon}>
          <Popup className="font-serif">
            <div className="text-center p-1">
              <span className="font-semibold text-[#2B2A28] block text-base">Finesse Barbershop</span>
              <span className="text-xs text-[#6B6862] font-sans block mb-2">Parklands, Nairobi</span>
              <a
                href="tel:+254743629445"
                className="text-xs text-[#55624C] font-sans font-medium hover:underline block mb-3"
              >
                +254 743 629445
              </a>
              <Button asChild size="sm" className="w-full bg-[#2F392B] text-[#FBF9F5] hover:bg-[#55624C] rounded-full text-xs">
                <Link href="/booking">Book Now</Link>
              </Button>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}