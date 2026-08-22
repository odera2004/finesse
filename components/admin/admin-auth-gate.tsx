"use client"

import { useState } from "react"
import { Lock, ShieldCheck } from "lucide-react"

interface AdminAuthGateProps {
  onUnlocked: () => void
}

export default function AdminAuthGate({ onUnlocked }: AdminAuthGateProps) {
  const [pin, setPin] = useState("")
  const [error, setError] = useState(false)

  // Manager Master PIN set to default "8888"
  const MASTER_PIN = "8888"

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault()
    if (pin === MASTER_PIN) {
      onUnlocked()
    } else {
      setError(true)
      setPin("")
    }
  }

  return (
    <div className="bg-[#F3EFE6] border border-[#E3DDD1] rounded-[2rem] p-8 max-w-md mx-auto text-center space-y-4">
      <div className="w-12 h-12 bg-[#2C2B28] text-[#F3EFE6] rounded-full flex items-center justify-center mx-auto">
        <Lock className="w-5 h-5" />
      </div>
      <div>
        <h3 className="font-serif text-2xl text-[#1E1D1B]">Owner / Manager Gate</h3>
        <p className="text-xs text-[#7A756C] mt-1">Enter Master PIN to view revenue and financial logs.</p>
      </div>

      <form onSubmit={handleVerify} className="space-y-4 pt-2">
        <input
          type="password"
          maxLength={4}
          value={pin}
          onChange={(e) => {
            setError(false)
            setPin(e.target.value)
          }}
          placeholder="••••"
          className="w-full text-center text-3xl tracking-[0.5em] py-3 rounded-2xl bg-[#E8E3D8] border border-[#D5CEC2] text-[#1E1D1B] focus:outline-none focus:ring-2 focus:ring-[#55624C]"
        />
        {error && <p className="text-xs text-red-600">Incorrect Master PIN</p>}
        <button
          type="submit"
          className="w-full py-3 bg-[#55624C] text-[#F3EFE6] rounded-2xl font-medium text-xs uppercase tracking-wider hover:bg-[#2C2B28] transition-colors"
        >
          Unlock Financials
        </button>
      </form>
    </div>
  )
}