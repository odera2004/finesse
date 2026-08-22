"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import WhatsAppWidget from "@/components/widgets/whatsapp-widget"

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent hydration mismatch on initial render
  if (!mounted) {
    return <main>{children}</main>
  }

  const isAdmin = pathname?.startsWith("/admin")

  // For all /admin routes, render purely the admin dashboard shell
  if (isAdmin) {
    return <main>{children}</main>
  }

  // For public pages, render Header, Page Content, Footer, and WhatsApp Widget
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
      <WhatsAppWidget />
    </>
  )
}