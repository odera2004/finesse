import type { Metadata } from "next"
import HeroSection from "@/components/home/hero-section"
import ServicesOverview from "@/components/home/services-overview"
import WhyChooseUsSection from "@/components/home/why-choose-us-section"
import TestimonialsSection from "@/components/home/testimonials-section"
import InstagramSection from "@/components/home/instagram-section"
import CTASection from "@/components/home/cta-section"

export const metadata: Metadata = {
  title: "Glow Unisex Salon - Beauty for All",
  description:
    "Premier unisex salon in India offering haircuts, styling, nail care, beauty treatments, and makeup services for men and women.",
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <ServicesOverview />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <InstagramSection />
      <CTASection />
    </>
  )
}

