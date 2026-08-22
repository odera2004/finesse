import Image from "next/image"
import Link from "next/link"
import { Users, Award, Sparkles, ArrowRight } from "lucide-react"

const features = [
  {
    icon: <Users className="h-5 w-5 text-[#55624C]" />,
    title: "Master Artisans",
    description:
      "Our team of internationally trained stylists brings years of creative mastery, precision, and passion to every session.",
    image:
      "https://images.unsplash.com/photo-1562322140-8baeececf3df?w=800&h=600&fit=crop&crop=focalpoint&auto=format&q=80",
  },
  {
    icon: <Award className="h-5 w-5 text-[#55624C]" />,
    title: "Organic Luxury Products",
    description:
      "We formulate our routines using only premium, high-grade, cruelty-free products to ensure optimal hair and skin health.",
    image:
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&h=600&fit=crop&crop=focalpoint&auto=format&q=80",
  },
  {
    icon: <Sparkles className="h-5 w-5 text-[#55624C]" />,
    title: "Bespoke Care",
    description:
      "Experience a personalized consultation and tailored beauty treatment designed specifically around your lifestyle and needs.",
    image:
      "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=800&h=600&fit=crop&crop=focalpoint&auto=format&q=80",
  },
]

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 md:py-28 bg-[#FBF9F5] text-[#2B2A28]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#55624C] font-semibold mb-3 block">
            THE FINESSE DIFFERENCE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2B2A28] mb-4">
            Why Choose FINESSE?
          </h2>
          <p className="text-[#6B6862] text-base sm:text-lg font-sans leading-relaxed">
            Experience the difference with our commitment to artistic excellence, luxury organic care, and uncompromised personal service in Parklands.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#F4F1EA] rounded-3xl border border-[#E6E1D7] overflow-hidden group hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2F392B]/80 via-[#2F392B]/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-[#FBF9F5]/90 backdrop-blur-sm rounded-full shadow-sm shrink-0">
                      {feature.icon}
                    </div>
                    <h3 className="font-serif text-xl font-semibold text-[#FBF9F5]">
                      {feature.title}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-[#6B6862] text-sm leading-relaxed font-sans">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Link */}
        <div className="mt-14 text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#55624C] font-semibold hover:text-[#2F392B] transition-colors group"
          >
            <span>Learn More About Our Heritage</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  )
}