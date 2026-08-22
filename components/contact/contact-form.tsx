"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Check } from "lucide-react"

export default function ContactForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
        setName("")
        setEmail("")
        setPhone("")
        setMessage("")
      }, 3000)
    }, 1500)
  }

  return (
    <div>
      <h2 className="font-serif text-2xl sm:text-3xl text-[#2B2A28] mb-6 flex items-center gap-3">
        <span className="w-6 h-0.5 bg-[#55624C] inline-block"></span>
        Send Us a Message
      </h2>

      {isSuccess ? (
        <div className="text-center py-10 space-y-4">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#55624C]/10 text-[#55624C]">
            <Check className="h-8 w-8" />
          </div>
          <h3 className="font-serif text-2xl text-[#2B2A28]">Message Sent</h3>
          <p className="text-sm text-[#6B6862] max-w-sm mx-auto font-sans">
            Thank you for reaching out. A member of our team will get back to you shortly.
          </p>
          <Button
            onClick={() => setIsSuccess(false)}
            className="bg-[#2F392B] hover:bg-[#55624C] text-[#FBF9F5] rounded-full px-8 py-2.5 text-xs uppercase tracking-widest mt-2"
          >
            Send Another Message
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs uppercase tracking-wider text-[#55624C] font-semibold">
              Full Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Elena Rostova"
              required
              className="bg-[#FBF9F5] border-[#E6E1D7] text-[#2B2A28] placeholder:text-[#A8A49C] focus:border-[#55624C] focus:ring-[#55624C] rounded-2xl h-12 px-4"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-xs uppercase tracking-wider text-[#55624C] font-semibold">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="elena@example.com"
                required
                className="bg-[#FBF9F5] border-[#E6E1D7] text-[#2B2A28] placeholder:text-[#A8A49C] focus:border-[#55624C] focus:ring-[#55624C] rounded-2xl h-12 px-4"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="text-xs uppercase tracking-wider text-[#55624C] font-semibold">
                Phone Number
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                required
                className="bg-[#FBF9F5] border-[#E6E1D7] text-[#2B2A28] placeholder:text-[#A8A49C] focus:border-[#55624C] focus:ring-[#55624C] rounded-2xl h-12 px-4"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-xs uppercase tracking-wider text-[#55624C] font-semibold">
              Message
            </Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us about the services you're interested in or any special requests..."
              rows={4}
              required
              className="bg-[#FBF9F5] border-[#E6E1D7] text-[#2B2A28] placeholder:text-[#A8A49C] focus:border-[#55624C] focus:ring-[#55624C] rounded-2xl p-4 resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-[#2F392B] hover:bg-[#55624C] text-[#FBF9F5] rounded-full py-6 text-xs uppercase tracking-widest font-medium transition-colors shadow-sm"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      )}
    </div>
  )
}