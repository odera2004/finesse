import type React from "react"
import type { Metadata } from "next"
import { Playfair_Display, Montserrat } from "next/font/google"
import "./globals.css"
import LayoutWrapper from "@/components/layout/layout-wrapper"
import GoogleAnalytics from "@/components/analytics/google-analytics"

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-playfair",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Finesse Parklands - Luxury Barber & Beauty Experience",
  description:
    "Premier luxury salon and barbershop in Parklands offering haircuts, styling, nail care, and massage services.",
  keywords: "barbershop, luxury salon, haircuts, manicure, pedicure, massage, parklands",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${playfair.variable} ${montserrat.variable} font-sans bg-[#ECE7DE] text-[#2C2B28]`}
      >
        <GoogleAnalytics />
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  )
}