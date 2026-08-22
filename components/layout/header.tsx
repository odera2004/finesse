"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X, ArrowUpRight, ShieldCheck } from "lucide-react"

const leftNavItems = [
  { name: "Services", href: "/services" },
  { name: "Gallery", href: "/gallery" },
]

const rightNavItems = [
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const allNavItems = [...leftNavItems, ...rightNavItems]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-[#FBF9F5]/90 backdrop-blur-md border-b border-[#E6E1D7] py-3 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Mobile View / Standard Flex Row */}
        <div className="flex md:grid md:grid-cols-3 items-center justify-between">
          
          {/* Left Column: Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {leftNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm tracking-wide transition-colors font-sans ${
                    isActive
                      ? "text-[#2B2A28] font-semibold"
                      : "text-[#6B6862] hover:text-[#2B2A28]"
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* Center Column: Perfectly Centered Logo */}
          <div className="flex justify-start md:justify-center">
            <Link href="/" className="group flex flex-col items-center text-center">
              <span className="font-serif text-2xl md:text-3xl tracking-tight text-[#2B2A28] group-hover:opacity-80 transition-opacity">
                Finesse
              </span>
              <span className="text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-[#55624C] font-semibold -mt-1 whitespace-nowrap">
                PARKLANDS • NAIROBI
              </span>
            </Link>
          </div>

          {/* Right Column: Links, Staff Icon & Action Button */}
          <div className="hidden md:flex items-center justify-end space-x-6">
            {rightNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm tracking-wide transition-colors font-sans ${
                    isActive
                      ? "text-[#2B2A28] font-semibold"
                      : "text-[#6B6862] hover:text-[#2B2A28]"
                  }`}
                >
                  {item.name}
                </Link>
              )
            })}

            {/* Subtle Staff Terminal Entrance Button */}
            <Link
              href="/admin"
              title="Staff Terminal"
              className="p-2 text-[#6B6862] hover:text-[#2B2A28] hover:bg-[#E6E1D7]/50 rounded-full transition-all opacity-70 hover:opacity-100"
              aria-label="Staff Terminal Access"
            >
              <ShieldCheck className="w-4 h-4 text-[#55624C]" />
            </Link>

            <Button
              asChild
              className="bg-[#2F392B] hover:bg-[#55624C] text-[#FBF9F5] rounded-full px-6 py-2.5 text-xs uppercase tracking-widest transition-all shadow-sm group"
            >
              <Link href="/booking" className="flex items-center space-x-1">
                <span>Book Visit</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </Button>
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden text-[#2B2A28] p-2 rounded-full hover:bg-[#F4F1EA] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-[#F4F1EA] rounded-3xl p-6 border border-[#E6E1D7] shadow-xl transition-all">
            <div className="flex flex-col space-y-4">
              {allNavItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-lg font-serif px-3 py-2 rounded-xl transition-colors ${
                      isActive
                        ? "bg-[#2F392B] text-[#FBF9F5]"
                        : "text-[#2B2A28] hover:bg-[#E6E1D7]/50"
                    }`}
                  >
                    {item.name}
                  </Link>
                )
              })}

              <div className="pt-4 border-t border-[#E6E1D7] space-y-3">
                <Button
                  asChild
                  className="w-full bg-[#2F392B] hover:bg-[#55624C] text-[#FBF9F5] rounded-full py-6 text-sm uppercase tracking-widest"
                >
                  <Link href="/booking" onClick={() => setIsMobileMenuOpen(false)}>
                    Book An Appointment
                  </Link>
                </Button>

                {/* Mobile Staff Portal Direct Link */}
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 pt-2 text-xs text-[#6B6862] hover:text-[#2B2A28]"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#55624C]" />
                  <span>Staff Terminal Access</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}