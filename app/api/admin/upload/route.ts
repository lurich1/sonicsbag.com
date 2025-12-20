import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { apiConfig } from "@/lib/api"

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("adminToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    // Forward the file to the backend API
    const backendFormData = new FormData()
    backendFormData.append("file", file)

    const response = await fetch(apiConfig.endpoints.upload, {
      method: "POST",
      body: backendFormData,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Failed to upload file" }))
      return NextResponse.json(error, { status: response.status })
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
  }
}
