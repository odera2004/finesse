import { MapPin, Phone, Mail, Clock, Share2, Globe } from "lucide-react"

export default function ContactInfo() {
  return (
    <div className="bg-[#F4F1EA] rounded-3xl p-8 sm:p-10 border border-[#E6E1D7] space-y-8">
      <div>
        <span className="text-xs uppercase tracking-[0.25em] text-[#55624C] font-semibold mb-2 block">
          GET IN TOUCH
        </span>
        <h2 className="font-serif text-3xl text-[#2B2A28]">
          Contact Finesse
        </h2>
        <p className="text-[#6B6862] text-sm font-sans mt-2 leading-relaxed">
          Reach out to book an appointment or enquire about our bespoke grooming services in Parklands.
        </p>
      </div>

      <div className="space-y-6">
        {/* Address */}
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-[#FBF9F5] rounded-2xl border border-[#E6E1D7] text-[#55624C] shrink-0">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium text-[#2B2A28]">Location</h3>
            <p className="text-[#6B6862] text-sm font-sans">
              Parklands, Nairobi, Kenya
            </p>
          </div>
        </div>

        {/* Phone */}
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-[#FBF9F5] rounded-2xl border border-[#E6E1D7] text-[#55624C] shrink-0">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium text-[#2B2A28]">Phone</h3>
            <a
              href="tel:+254743629445"
              className="text-[#6B6862] text-sm font-sans hover:text-[#2F392B] transition-colors block"
            >
              +254 743 629445
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-[#FBF9F5] rounded-2xl border border-[#E6E1D7] text-[#55624C] shrink-0">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium text-[#2B2A28]">Email</h3>
            <a
              href="mailto:info@finessebarbershop.co.ke"
              className="text-[#6B6862] text-sm font-sans hover:text-[#2F392B] transition-colors block"
            >
              info@finessebarbershop.co.ke
            </a>
          </div>
        </div>

        {/* Working Hours */}
        <div className="flex items-start space-x-4">
          <div className="p-3 bg-[#FBF9F5] rounded-2xl border border-[#E6E1D7] text-[#55624C] shrink-0">
            <Clock className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium text-[#2B2A28]">Opening Hours</h3>
            <p className="text-[#6B6862] text-sm font-sans">
              Mon - Sat: 8:00 AM - 8:00 PM
            </p>
            <p className="text-[#6B6862] text-sm font-sans">
              Sunday: 9:00 AM - 6:00 PM
            </p>
          </div>
        </div>
      </div>

      {/* Social Links */}
      <div className="pt-6 border-t border-[#E6E1D7]">
        <h4 className="text-xs uppercase tracking-widest text-[#55624C] font-semibold mb-4">
          Follow Finesse
        </h4>
        <div className="flex space-x-3">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="p-3 bg-[#FBF9F5] rounded-full border border-[#E6E1D7] text-[#2F392B] hover:bg-[#2F392B] hover:text-[#FBF9F5] transition-colors"
          >
            
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Social Page"
            className="p-3 bg-[#FBF9F5] rounded-full border border-[#E6E1D7] text-[#2F392B] hover:bg-[#2F392B] hover:text-[#FBF9F5] transition-colors"
          >
            <Globe className="w-4 h-4" />
          </a>
          <a
            href="#"
            aria-label="Share"
            className="p-3 bg-[#FBF9F5] rounded-full border border-[#E6E1D7] text-[#2F392B] hover:bg-[#2F392B] hover:text-[#FBF9F5] transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  )
}