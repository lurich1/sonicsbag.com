import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { apiConfig } from "@/lib/api"

// PUT update repair request status
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const cookieStore = await cookies()
    const token = cookieStore.get("adminToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { status } = body

    const response = await fetch(`${apiConfig.endpoints.repairRequest(id)}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Failed to update status" }))
      return NextResponse.json(error, { status: response.status })
    }

    const updated = await response.json()
    return NextResponse.json(updated)
  } catch (error) {
    console.error("Error updating repair request status:", error)
    return NextResponse.json({ error: "Failed to update status" }, { status: 500 })
  }
}
