import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Clock } from "lucide-react"

interface ServiceProps {
  service: {
    id: string
    name: string
    description: string
    price: number
    duration: string
    image: string
  }
}

export default function ServiceCard({ service }: ServiceProps) {
  return (
    <div className="bg-[#1C1C1A] border border-[#2A2A28] rounded-2xl overflow-hidden shadow-lg hover:border-[#55624C]/60 transition-all duration-300 flex flex-col justify-between group">
      <div>
        <div className="relative h-52 w-full overflow-hidden bg-[#121212]">
          <Image
            src={service.image || "/placeholder.svg"}
            alt={service.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C1A] via-transparent to-transparent" />
        </div>

        <div className="p-6">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-serif text-lg text-[#FBF9F5] group-hover:text-[#55624C] transition-colors">
              {service.name}
            </h3>
            <span className="font-sans text-sm font-semibold text-[#FBF9F5] bg-[#2A2A28] px-2.5 py-1 rounded-md">
              KSh {service.price.toLocaleString()}
            </span>
          </div>
          
          <p className="text-xs text-[#A19D95] font-sans line-clamp-2 leading-relaxed mb-4">
            {service.description}
          </p>
        </div>
      </div>

      <div className="p-6 pt-0 space-y-4">
        <div className="flex items-center text-xs text-[#A19D95]">
          <Clock className="h-3.5 w-3.5 mr-1.5 text-[#55624C]" />
          <span>{service.duration}</span>
        </div>

        <Button
          asChild
          className="w-full bg-[#2A2A28] hover:bg-[#55624C] text-[#FBF9F5] rounded-xl text-xs uppercase tracking-widest font-semibold transition-colors py-5"
        >
          <Link href={`/booking?service=${encodeURIComponent(service.name)}`}>
            Book Appointment
          </Link>
        </Button>
      </div>
    </div>
  )
}