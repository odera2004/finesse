"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Lock, User } from "lucide-react"

export default function AdminLoginForm() {
  const router = useRouter()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // Universal Shop Dashboard Login Credentials
      if (username === "finesse" && password === "parklands2026") {
        document.cookie = "admin_authenticated=true; path=/; max-age=86400"
        router.push("/admin/dashboard")
        router.refresh()
      } else {
        setError("Invalid credentials. Enter front-desk credentials.")
      }
    } catch {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-[#F3EFE6] border border-[#E3DDD1] rounded-[2rem] p-8 shadow-sm max-w-md w-full mx-auto">
      <div className="text-center mb-6">
        <h2 className="font-serif text-2xl text-[#1E1D1B]">Finesse Parklands</h2>
        <p className="text-xs text-[#7A756C] mt-1">Universal Staff & Management Terminal</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-800 rounded-xl text-xs font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="username" className="text-xs font-medium text-[#7A756C] uppercase tracking-wider">
            Terminal User
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <User className="h-4 w-4 text-[#7A756C]" />
            </div>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="pl-10 bg-[#E8E3D8] border-[#D5CEC2] text-[#1E1D1B] rounded-xl focus-visible:ring-[#55624C]"
              placeholder="e.g. finesse"
              required
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password" className="text-xs font-medium text-[#7A756C] uppercase tracking-wider">
            Password
          </Label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
              <Lock className="h-4 w-4 text-[#7A756C]" />
            </div>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 bg-[#E8E3D8] border-[#D5CEC2] text-[#1E1D1B] rounded-xl focus-visible:ring-[#55624C]"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-[#7A756C] hover:text-[#1E1D1B]"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-[#55624C] hover:bg-[#2C2B28] text-[#F3EFE6] rounded-xl transition-colors py-3 text-xs uppercase tracking-wider font-medium"
          disabled={loading}
        >
          {loading ? "Authenticating..." : "Access Dashboard"}
        </Button>
      </form>
    </div>
  )
}