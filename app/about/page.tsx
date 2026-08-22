import type { Metadata } from "next"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About Us - Glow Unisex Salon",
  description: "Learn about Glow Unisex Salon's history, mission, and our team of expert stylists.",
}

export default function AboutPage() {
  return (
    <main className="bg-[#FBF9F5] text-[#2B2A28] min-h-screen py-12">
      {/* Hero Header matching Boty style */}
      <div className="container-custom text-center pt-8 pb-16 px-4">
        <span className="inline-block text-xs uppercase tracking-[0.25em] text-[#55624C] font-semibold mb-3">
          OUR STORY & MISSION
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#2B2A28] mb-4 tracking-tight leading-tight">
          About Glow Salon
        </h1>
        <p className="text-lg text-[#6B6862] max-w-xl mx-auto font-sans font-normal">
          Discover our story, our passion for natural beauty, and our commitment to an elevated salon experience.
        </p>
      </div>

      <div className="container-custom px-4 max-w-6xl mx-auto space-y-24">
        {/* Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-[#F4F1EA] p-8 md:p-12 rounded-3xl border border-[#E6E1D7]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#55624C] font-semibold mb-2 block">
              ESTABLISHED 2010
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2A28] mb-6">Our Journey</h2>
            <p className="text-[#6B6862] mb-4 leading-relaxed">
              Founded in 2010, Glow Salon has been at the forefront of beauty and style in Mumbai. Our journey began with a simple vision: to provide top-quality beauty services in a welcoming, serene, and luxurious environment.
            </p>
            <p className="text-[#6B6862] mb-6 leading-relaxed">
              Over the years, we've grown into a renowned beauty destination, driven by our dedication to organic care, precision styling, and a passionate team of skilled professionals.
            </p>
            <Button asChild className="bg-[#2F392B] hover:bg-[#55624C] text-[#FBF9F5] rounded-full px-8 py-6 text-sm tracking-wide">
              <Link href="/booking">Book an Appointment</Link>
            </Button>
          </div>
          <div className="relative h-[380px] sm:h-[450px] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop&crop=focalpoint&auto=format&q=80"
              alt="Glow Salon Interior"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* Mission Banner */}
        <div className="text-center py-12 px-6 bg-[#2F392B] text-[#FBF9F5] rounded-3xl">
          <span className="text-xs uppercase tracking-widest text-[#A8B69F] font-semibold mb-3 block">
            THE GLOW PHILOSOPHY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl mb-6 text-[#FBF9F5]">Our Mission</h2>
          <p className="text-lg text-[#D0C9BC] max-w-2xl mx-auto font-sans leading-relaxed">
            At Glow Salon, our mission is to enhance the natural beauty of every client, boost their confidence, and provide a relaxing and rejuvenating experience that leaves them feeling refreshed and radiant.
          </p>
        </div>

        {/* Team Section */}
        <div>
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-[#55624C] font-semibold mb-2 block">
              EXPERTISE & PASSION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2A28]">Meet Our Master Stylists</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Aria Sharma",
                role: "Senior Hair Stylist",
                img: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=400&h=400&fit=crop&crop=faces&auto=format&q=80"
              },
              {
                name: "Priya Mehta",
                role: "Color & Spa Specialist",
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces&auto=format&q=80"
              },
              {
                name: "Rohan Kapoor",
                role: "Creative Director",
                img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop&crop=faces&auto=format&q=80"
              },
            ].map((stylist, index) => (
              <div key={index} className="bg-[#F4F1EA] rounded-2xl p-6 text-center border border-[#E6E1D7]">
                <div className="relative w-36 h-36 rounded-full overflow-hidden mx-auto mb-5 border-2 border-[#E6E1D7]">
                  <Image
                    src={stylist.img}
                    alt={stylist.name}
                    fill
                    sizes="144px"
                    className="object-cover"
                  />
                </div>
                <h3 className="font-serif text-xl font-medium text-[#2B2A28] mb-1">{stylist.name}</h3>
                <p className="text-sm text-[#6B6862] mb-4 font-sans">{stylist.role}</p>
                <Link
                  href="/booking"
                  className="inline-block text-xs uppercase tracking-wider font-semibold text-[#55624C] hover:text-[#2F392B] transition-colors"
                >
                  Book with {stylist.name.split(" ")[0]} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-[#F4F1EA] py-16 px-6 rounded-3xl border border-[#E6E1D7]">
          <h2 className="font-serif text-3xl sm:text-4xl text-[#2B2A28] mb-4">
            Experience the Glow Difference
          </h2>
          <p className="text-base sm:text-lg text-[#6B6862] max-w-xl mx-auto mb-8 font-sans">
            We invite you to visit Glow Salon and experience our commitment to natural beauty, style, and exceptional service firsthand.
          </p>
          <Button asChild size="lg" className="bg-[#2F392B] hover:bg-[#55624C] text-[#FBF9F5] rounded-full px-8 py-6 text-sm tracking-wide">
            <Link href="/booking">Book Your Visit Today</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}