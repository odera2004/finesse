"use client"

import type React from "react"
import { useState } from "react"
import { MessageCircle, X, Send, Sparkles, Clock, ShieldCheck } from "lucide-react"

export default function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  
  // Replace with your business phone number (International format without + or spaces)
  const phoneNumber = "254708486624"

  const presetMessages = [
    "Hi, I'd like to book an appointment.",
    "What are your opening hours today?",
    "Do you accept walk-ins?",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !message) return

    const whatsappMessage = encodeURIComponent(
      `*INQUIRY — FINESSE PARKLANDS*\n----------------------------------\n👤 *Name:* ${name}\n💬 *Message:* ${message}`
    )
    window.open(`https://wa.me/${phoneNumber}?text=${whatsappMessage}`, "_blank")

    setIsOpen(false)
    setName("")
    setMessage("")
  }

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-[#55624C] hover:bg-[#68775D] text-[#FBF9F5] p-4 rounded-full shadow-2xl hover:scale-105 transition-all duration-300 ring-4 ring-[#121212] group flex items-center justify-center"
        aria-label="Contact us on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#55624C] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-[#88997A]"></span>
        </span>
        {isOpen ? (
          <X className="h-6 w-6 transition-transform duration-300 rotate-90" />
        ) : (
          <MessageCircle className="h-6 w-6 transition-transform duration-300 group-hover:rotate-12" />
        )}
      </button>

      {/* WhatsApp Chat Popup */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 bg-[#121212] border border-[#2A2A28] rounded-3xl shadow-2xl w-80 md:w-96 overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-[#1C1C1A] border-b border-[#2A2A28] p-5 relative">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#55624C]/20 border border-[#55624C]/40 flex items-center justify-center text-[#55624C]">
                  <Sparkles className="w-5 h-5" />
                </div>
                <span className="bottom-0 right-0 absolute w-3 h-3 bg-emerald-500 border-2 border-[#1C1C1A] rounded-full"></span>
              </div>
              <div>
                <h3 className="font-serif text-base text-[#FBF9F5] font-semibold">
                  Finesse Parklands
                </h3>
                <p className="text-[11px] text-[#A19D95] flex items-center gap-1 font-sans">
                  <Clock className="w-3 h-3 text-[#55624C]" /> Replies in a few minutes
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <label htmlFor="widget-name" className="block text-[11px] font-semibold uppercase tracking-wider text-[#A19D95] mb-1.5">
                Your Name
              </label>
              <input
                type="text"
                id="widget-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="John Doe"
                className="w-full px-3.5 py-2.5 bg-[#1A1A18] border border-[#2A2A28] rounded-xl text-xs text-[#FBF9F5] placeholder:text-[#555] focus:outline-none focus:border-[#55624C]"
              />
            </div>

            <div>
              <label htmlFor="widget-message" className="block text-[11px] font-semibold uppercase tracking-wider text-[#A19D95] mb-1.5">
                Your Message
              </label>
              <textarea
                id="widget-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                required
                placeholder="How can we assist you today?"
                className="w-full px-3.5 py-2.5 bg-[#1A1A18] border border-[#2A2A28] rounded-xl text-xs text-[#FBF9F5] placeholder:text-[#555] focus:outline-none focus:border-[#55624C] resize-none"
              ></textarea>
            </div>

            {/* Quick Messages */}
            <div className="space-y-1.5">
              <span className="text-[10px] text-[#A19D95] font-medium uppercase tracking-wider">Quick Suggestions</span>
              <div className="flex flex-wrap gap-1.5">
                {presetMessages.map((msg, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setMessage(msg)}
                    className="text-[11px] bg-[#1A1A18] hover:bg-[#2A2A28] text-[#A19D95] hover:text-[#FBF9F5] border border-[#2A2A28] px-2.5 py-1 rounded-lg transition-all text-left"
                  >
                    {msg}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-[#55624C] hover:bg-[#68775D] text-[#FBF9F5] font-semibold text-xs uppercase tracking-widest py-3 px-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-2"
            >
              <span>Start Chat</span>
              <Send className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center justify-center gap-1 text-[10px] text-[#A19D95] pt-1">
              <ShieldCheck className="w-3 h-3 text-[#55624C]" />
              <span>Direct connection to official WhatsApp</span>
            </div>
          </form>
        </div>
      )}
    </>
  )
}