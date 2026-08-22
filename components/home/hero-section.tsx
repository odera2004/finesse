import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-[#FBF9F5]">
      {/* Background Image with Warm Soft Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=1920&h=1080&fit=crop&crop=focalpoint&auto=format&q=80"
          alt="Studio 39 Salon Interior in Parklands"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="max-w-2xl text-[#FBF9F5]">
          
          {/* Subheading Badge */}
          <span className="inline-block text-xs uppercase tracking-[0.3em] text-[#D0C9BC] font-semibold mb-4">
            HAIR & BEAUTY SANCTUARY • PARKLANDS, NAIROBI
          </span>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-normal mb-6 tracking-tight leading-[1.15]">
            Experience Bespoke Beauty at <span className="italic font-serif">Finesse</span>
          </h1>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl text-[#E6E1D7] mb-8 leading-relaxed font-sans font-light">
            Indulge in artisanal hair styling, precision cuts, and personalized aesthetic treatments tailored specifically for you.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 items-center">
            <Button
              asChild
              className="bg-[#2F392B] hover:bg-[#55624C] text-[#FBF9F5] rounded-full px-8 py-6 text-xs uppercase tracking-widest transition-all shadow-md group"
            >
              <Link href="/booking" className="flex items-center gap-2">
                <span>Book Your Appointment</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              className="border-[#E6E1D7] text-[#FBF9F5] hover:bg-white/10 hover:text-white rounded-full px-8 py-6 text-xs uppercase tracking-widest transition-all backdrop-blur-sm"
            >
              <Link href="/services">Explore Services</Link>
            </Button>
          </div>

          {/* Social Proof Bar */}
          <div className="mt-12 flex items-center gap-4 pt-6 border-t border-white/20">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#FBF9F5] overflow-hidden relative">
                  <Image
                    src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? "women" : "men"}/${i + 40}.jpg`}
                    alt={`Satisfied client ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div>
              <div className="flex text-[#D0C9BC] gap-1 text-sm mb-0.5">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} className="w-4 h-4 fill-current text-[#D0C9BC]" />
                ))}
              </div>
              <p className="text-xs text-[#E6E1D7] font-sans tracking-wide">
                Trusted by 5,000+ happy clients in Nairobi
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#FBF9F5] to-transparent z-10 pointer-events-none" />
    </section>
  )
}