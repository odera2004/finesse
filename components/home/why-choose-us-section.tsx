import Image from "next/image"
import Link from "next/link"
import { Scissors, Award, Sparkles, ArrowRight } from "lucide-react"

const features = [
  {
    icon: <Scissors className="h-6 w-6 text-[#55624C]" />,
    title: "Master Barbers",
    description: "Our certified barbers bring years of craft, precision fading, and personalized styling to every consultation.",
    image:
      "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=600&h=400&fit=crop&crop=focalpoint&auto=format&q=80",
  },
  {
    icon: <Award className="h-6 w-6 text-[#55624C]" />,
    title: "Premium Products",
    description: "We use only top-tier pomades, beard oils, and skin treatments tailored for African and varied hair textures.",
    image:
      "https://images.unsplash.com/photo-1621607750233-795db0a5c655?w=600&h=400&fit=crop&crop=focalpoint&auto=format&q=80",
  },
  {
    icon: <Sparkles className="h-6 w-6 text-[#55624C]" />,
    title: "The Finesse Atmosphere",
    description: "Enjoy complimentary drinks, comfortable leather seating, and a refined sanctuary in Parklands, Nairobi.",
    image:
      "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=600&h=400&fit=crop&crop=focalpoint&auto=format&q=80",
  },
]

export default function WhyChooseUsSection() {
  return (
    <section className="py-20 md:py-28 bg-[#F4F1EA] text-[#2B2A28] border-t border-[#E6E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#55624C] font-semibold mb-3 block">
            THE DIFFERENCE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2B2A28] mb-4">
            Why Choose Finesse?
          </h2>
          <p className="text-[#6B6862] text-base sm:text-lg font-sans leading-relaxed">
            Where tradition meets modern luxury in Parklands. Experience grooming designed around your personal style.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-[#FBF9F5] rounded-3xl border border-[#E6E1D7] overflow-hidden group hover:-translate-y-1 hover:shadow-md transition-all duration-300"
            >
              <div className="relative h-52 w-full overflow-hidden">
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2A28]/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center">
                    <div className="p-2.5 bg-[#FBF9F5] border border-[#E6E1D7] rounded-2xl mr-3 shadow-sm">
                      {feature.icon}
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-[#FBF9F5]">
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

        {/* Footer Link */}
        <div className="mt-14 text-center">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#55624C] font-semibold hover:text-[#2F392B] transition-colors group"
          >
            <span>Learn More About Finesse</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  )
}