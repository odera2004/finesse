import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

const services = [
  {
    image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=400&h=400&fit=crop&crop=focalpoint&auto=format&q=80",
    title: "Precision Cuts & Styling",
    description: "Bespoke haircuts, fade techniques, and sharp beard sculpting tailored to your facial structure.",
    link: "/services#hair",
  },
  {
    image: "https://images.unsplash.com/photo-1621607750233-795db0a5c655?w=400&h=400&fit=crop&crop=focalpoint&auto=format&q=80",
    title: "Beard Grooming & Shaves",
    description: "Traditional hot towel shaves, beard conditioning treatments, and sharp line detailing.",
    link: "/services#grooming",
  },
  {
    image: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=400&h=400&fit=crop&crop=focalpoint&auto=format&q=80",
    title: "Executive Manicures & Pedicures",
    description: "Hand and foot care routines designed to keep you refreshed and impeccably polished.",
    link: "/services#care",
  },
]

export default function ServicesOverview() {
  return (
    <section className="py-20 md:py-28 bg-[#FBF9F5] text-[#2B2A28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#55624C] font-semibold mb-3 block">
            OUR OFFERINGS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2B2A28] mb-4">
            Signature Grooming Services
          </h2>
          <p className="text-[#6B6862] text-base sm:text-lg font-sans leading-relaxed">
            Experience premium barbering and aesthetic treatments crafted for the refined individual at Finesse.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-[#F4F1EA] rounded-3xl border border-[#E6E1D7] p-8 text-center flex flex-col justify-between hover:-translate-y-1 hover:shadow-md transition-all duration-300 group"
            >
              <div>
                <div className="mx-auto w-20 h-20 rounded-full overflow-hidden mb-6 border-2 border-[#E6E1D7] relative">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3 text-[#2B2A28]">
                  {service.title}
                </h3>
                <p className="text-[#6B6862] text-sm leading-relaxed mb-6 font-sans">
                  {service.description}
                </p>
              </div>

              <div>
                <Link
                  href={service.link}
                  className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#55624C] font-semibold hover:text-[#2F392B] transition-colors group-hover:translate-x-0.5"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="text-center mt-14">
          <Button
            asChild
            className="bg-[#2F392B] hover:bg-[#55624C] text-[#FBF9F5] rounded-full px-8 py-6 text-xs uppercase tracking-widest transition-all shadow-sm"
          >
            <Link href="/services">View All Services</Link>
          </Button>
        </div>

      </div>
    </section>
  )
}