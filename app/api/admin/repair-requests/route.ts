import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { apiConfig } from "@/lib/api"

// GET all repair requests - proxy to backend
export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("adminToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const response = await fetch(apiConfig.endpoints.repairRequests, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      return NextResponse.json([], { status: response.status })
    }

    const requests = await response.json()
    return NextResponse.json(Array.isArray(requests) ? requests : [])
  } catch (error) {
    console.error("Error fetching repair requests from backend:", error)
    return NextResponse.json([])
  }
}
