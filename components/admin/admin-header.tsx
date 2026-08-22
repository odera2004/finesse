"use client"

import type React from "react"

interface AdminHeaderProps {
  title: string
  subtitle?: string
  actions?: React.ReactNode
}

export default function AdminHeader({ title, subtitle, actions }: AdminHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#E3DDD1] pb-6">
      <div>
        <h1 className="font-serif text-3xl font-normal text-[#1E1D1B] tracking-tight">{title}</h1>
        {subtitle && <p className="mt-1 text-xs text-[#7A756C] font-light">{subtitle}</p>}
      </div>
      {actions && <div className="mt-4 sm:mt-0">{actions}</div>}
    </div>
  )
}