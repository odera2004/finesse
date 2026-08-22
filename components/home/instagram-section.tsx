import { Camera, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

const instagramPosts = [
  "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=500&h=500&fit=crop&crop=focalpoint&auto=format&q=80",
  "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=500&h=500&fit=crop&crop=focalpoint&auto=format&q=80",
  "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=500&h=500&fit=crop&crop=focalpoint&auto=format&q=80",
  "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?w=500&h=500&fit=crop&crop=focalpoint&auto=format&q=80",
]

export default function InstagramSection() {
  return (
    <section className="py-20 md:py-28 bg-[#FBF9F5] text-[#2B2A28] border-t border-[#E6E1D7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase tracking-[0.25em] text-[#55624C] font-semibold mb-3 block">
            OUR COMMUNITY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2B2A28] mb-4">
            Follow Finesse on Instagram
          </h2>
          <p className="text-[#6B6862] text-base font-sans leading-relaxed mb-6">
            Explore daily grooming inspiration, precision cuts, and behind-the-scenes content from our Parklands studio.
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4F1EA] border border-[#E6E1D7] text-[#2F392B] font-serif text-sm font-medium">
            <Camera className="w-4 h-4 text-[#55624C]" />
            <span>@finesse.nairobi</span>
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {instagramPosts.map((post, index) => (
            <div
              key={index}
              className="relative aspect-square overflow-hidden rounded-2xl bg-[#F4F1EA] border border-[#E6E1D7] group cursor-pointer"
            >
              <Image
                src={post}
                alt={`Finesse Instagram post ${index + 1}`}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#2F392B]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ExternalLink className="w-6 h-6 text-[#FBF9F5]" />
              </div>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="text-center">
          <Button
            asChild
            className="bg-[#2F392B] hover:bg-[#55624C] text-[#FBF9F5] rounded-full px-8 py-6 text-xs uppercase tracking-widest transition-all shadow-sm"
          >
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              Join Us On Instagram
            </a>
          </Button>
        </div>

      </div>
    </section>
  )
}