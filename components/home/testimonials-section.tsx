"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Amina Hassan",
    role: "Regular Client",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=faces&auto=format&q=80",
    quote:
      "Finesse is hands-down the best grooming experience in Parklands. The attention to detail and atmosphere make every visit worthwhile.",
    rating: 5,
  },
  {
    id: 2,
    name: "David Ochieng",
    role: "Weekly Member",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=faces&auto=format&q=80",
    quote:
      "Sharpest fade in Nairobi. The team takes time to consult on what suits your face structure best. Always leave feeling refreshed.",
    rating: 5,
  },
  {
    id: 3,
    name: "Karan Patel",
    role: "Regular Client",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=faces&auto=format&q=80",
    quote:
      "Top-tier hot towel shaves and beard detailing. The appointment system is seamless and they are always punctual.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sarah Shah",
    role: "First-time Client",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=faces&auto=format&q=80",
    quote:
      "Brought my brother here for a haircut before a family wedding. Exceptional service, clean studio, and great complimentary refreshments.",
    rating: 5,
  },
]

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (autoplay) {
      interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
      }, 5000)
    }

    return () => clearInterval(interval)
  }, [autoplay])

  const handlePrev = () => {
    setAutoplay(false)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const handleNext = () => {
    setAutoplay(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  return (
    <section className="py-20 md:py-28 bg-[#FBF9F5] text-[#2B2A28] border-t border-[#E6E1D7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-[#55624C] font-semibold mb-3 block">
            CLIENT EXPERIENCES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#2B2A28] mb-4">
            Words From Our Clients
          </h2>
          <p className="text-[#6B6862] text-base font-sans leading-relaxed">
            Discover why gentlemen across Parklands and Nairobi trust Finesse for their daily grooming routines.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden rounded-3xl bg-[#F4F1EA] border border-[#E6E1D7] p-8 md:p-12 shadow-sm">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0">
                  <div className="flex flex-col items-center text-center">
                    
                    {/* Avatar */}
                    <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-[#E6E1D7]">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </div>

                    {/* Rating */}
                    <div className="flex text-[#55624C] mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4"
                          fill={i < testimonial.rating ? "currentColor" : "none"}
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <div className="relative max-w-xl mx-auto mb-6">
                      <Quote className="w-8 h-8 text-[#55624C]/20 absolute -top-4 -left-6 rotate-180" />
                      <p className="text-[#2B2A28] font-serif text-lg md:text-xl italic leading-relaxed relative z-10">
                        "{testimonial.quote}"
                      </p>
                    </div>

                    {/* Client Info */}
                    <div>
                      <h3 className="font-serif font-semibold text-base text-[#2B2A28]">
                        {testimonial.name}
                      </h3>
                      <p className="text-xs uppercase tracking-wider text-[#6B6862] font-sans mt-0.5">
                        {testimonial.role} • Parklands
                      </p>
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-3 md:-translate-x-6 bg-[#FBF9F5] rounded-full p-3 shadow-md hover:bg-[#2F392B] hover:text-[#FBF9F5] transition-colors border border-[#E6E1D7] text-[#2F392B]"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-3 md:translate-x-6 bg-[#FBF9F5] rounded-full p-3 shadow-md hover:bg-[#2F392B] hover:text-[#FBF9F5] transition-colors border border-[#E6E1D7] text-[#2F392B]"
            aria-label="Next testimonial"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setAutoplay(false)
                  setCurrentIndex(index)
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex ? "w-8 bg-[#2F392B]" : "w-2 bg-[#E6E1D7]"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}