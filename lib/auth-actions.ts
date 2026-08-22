"use server"

import { cookies } from "next/headers"

export async function logout() {
  const cookieStore = await cookies()
  cookieStore.set("admin_authenticated", "", {
    path: "/",
    expires: new Date(0),
    maxAge: 0,
  })
}