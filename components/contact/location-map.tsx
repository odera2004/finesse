"use client"

import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

export default function LocationMap() {
  const [customIcon, setCustomIcon] = useState<L.Icon | null>(null)

  // Parklands, Nairobi coordinates
  const position: [number, number] = [-1.2618, 36.8155]

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
      <div className="h-[400px] w-full bg-[#F4F1EA] border border-[#E6E1D7] rounded-2xl animate-pulse flex items-center justify-center text-[#6B6862] text-sm font-sans">
        Loading Map...
      </div>
    )
  }

  return (
    <div className="rounded-2xl overflow-hidden border border-[#E6E1D7] h-[400px] relative z-0">
      <MapContainer
        center={position}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        <Marker position={position} icon={customIcon}>
          <Popup className="font-serif">
            <span className="font-semibold text-[#2B2A28]">Studio 39 Salon</span>
            <br />
            Parklands, Nairobi
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}