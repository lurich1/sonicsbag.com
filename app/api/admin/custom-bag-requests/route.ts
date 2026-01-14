import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { apiConfig } from "@/lib/api"

// GET all custom bag requests - proxy to backend
export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("adminToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Backend doesn't require auth for GET, but we check admin token for frontend security
    const backendUrl = apiConfig.endpoints.customBagRequests
    console.log("Fetching custom bag requests from:", backendUrl)
    
    const response = await fetch(backendUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      const errorText = await response.text().catch(() => "Unknown error")
      console.error(`Backend returned ${response.status} for custom bag requests:`, errorText)
      return NextResponse.json([], { status: 200 }) // Return empty array instead of error
    }

    const requests = await response.json()
    const requestsArray = Array.isArray(requests) ? requests : []
    console.log(`Fetched ${requestsArray.length} custom bag requests from backend`)
    return NextResponse.json(requestsArray)
  } catch (error: any) {
    console.error("Error fetching custom bag requests from backend:", {
      message: error?.message,
      name: error?.name,
      stack: error?.stack,
    })
    // Return empty array so admin panel doesn't break
    return NextResponse.json([])
  }
}
