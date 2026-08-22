import { createClient } from "@supabase/supabase-js"

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL ||
  "https://xjpbhmfoepggmdmpgcla.supabase.co"

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqcGJobWZvZXBnZ21kbXBnY2xhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcyMTYzMjQsImV4cCI6MjEwMjc5MjMyNH0.GF4T5S8PakRli9VTxLKFJBL2pgftXE5AJrJj8is6G8w"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)