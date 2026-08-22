"use client"

import Link from "next/link"
import { MapPin, Phone, Mail, Clock, Scissors, Share2 } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#2B2A28] text-[#FBF9F5] pt-20 pb-10 border-t border-[#3D3A36]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Info */}
          <div>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-[#55624C] rounded-full flex items-center justify-center mr-3">
                <Scissors className="h-5 w-5 text-[#FBF9F5]" />
              </div>
              <span className="text-2xl font-serif font-bold text-[#FBF9F5] tracking-wide">
                Finesse
              </span>
            </div>
            <p className="text-[#A19D95] text-sm leading-relaxed mb-6 font-sans">
              Elevating men’s grooming with master craftsmanship, precision fading, and hot towel treatments in Parklands.
            </p>
            <div className="flex space-x-4">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[#A19D95] hover:text-[#55624C] transition-colors p-2 rounded-full border border-[#3D3A36]"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-[#A19D95] hover:text-[#55624C] transition-colors p-2 rounded-full border border-[#3D3A36]"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.891h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </a>

              {/* Share / TikTok */}
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-[#A19D95] hover:text-[#55624C] transition-colors p-2 rounded-full border border-[#3D3A36]"
              >
                <Share2 className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] font-semibold text-[#FBF9F5] mb-6 flex items-center">
              <span className="w-6 h-0.5 bg-[#55624C] mr-3"></span>
              Quick Links
            </h3>
            <ul className="space-y-3 font-sans text-sm">
              <li>
                <Link href="/services" className="text-[#A19D95] hover:text-[#FBF9F5] transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-[#A19D95] hover:text-[#FBF9F5] transition-colors">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-[#A19D95] hover:text-[#FBF9F5] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-[#A19D95] hover:text-[#FBF9F5] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/booking" className="text-[#55624C] hover:underline font-medium transition-colors">
                  Book Appointment
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] font-semibold text-[#FBF9F5] mb-6 flex items-center">
              <span className="w-6 h-0.5 bg-[#55624C] mr-3"></span>
              Find Us
            </h3>
            <ul className="space-y-4 font-sans text-sm">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-[#55624C] shrink-0 mt-0.5 mr-3" />
                <span className="text-[#A19D95]">
                  Parklands Road, Avenue Suites, Ground Floor, Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-[#55624C] shrink-0 mr-3" />
                <span className="text-[#A19D95]">+254 712 345 678</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-[#55624C] shrink-0 mr-3" />
                <span className="text-[#A19D95]">info@finessebarbers.co.ke</span>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] font-semibold text-[#FBF9F5] mb-6 flex items-center">
              <span className="w-6 h-0.5 bg-[#55624C] mr-3"></span>
              Working Hours
            </h3>
            <ul className="space-y-4 font-sans text-sm">
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-[#55624C] shrink-0 mt-0.5 mr-3" />
                <div>
                  <p className="text-[#A19D95]">Monday - Saturday:</p>
                  <p className="font-medium text-[#FBF9F5]">8:00 AM - 8:00 PM</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 text-[#55624C] shrink-0 mt-0.5 mr-3" />
                <div>
                  <p className="text-[#A19D95]">Sunday & Public Holidays:</p>
                  <p className="font-medium text-[#FBF9F5]">10:00 AM - 6:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

        </div>


        {/* Bottom Copyright */}
        <div className="text-center text-[#A19D95] text-xs font-sans">
          <p>&copy; {new Date().getFullYear()} Finesse Barbershop Parklands. All rights reserved.</p>
          <p className="mt-2 text-[#A19D95]/80">
            Crafted with precision in Nairobi, Kenya
          </p>
        </div>

      </div>
    </footer>
  )
}