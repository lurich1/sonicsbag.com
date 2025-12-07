import { NextRequest } from "next/server"
import { cookies } from "next/headers"

export function verifyAdminToken(request?: NextRequest): boolean {
  if (request) {
    const token = request.cookies.get("adminToken")?.value
    return !!token
  } else {
    // For server components
    const cookieStore = cookies()
    const token = cookieStore.get("adminToken")?.value
    return !!token
  }
}

export function getAdminToken(): string | null {
  if (typeof window !== "undefined") {
    return localStorage.getItem("adminToken")
  }
  return null
}

