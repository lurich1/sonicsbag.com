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

    // Get the content type from the original request (includes boundary)
    const contentType = request.headers.get("content-type")
    if (!contentType || !contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "Invalid content type" }, { status: 400 })
    }

    // Check if backend URL is configured
    const backendUrl = apiConfig.endpoints.upload
    if (!backendUrl || backendUrl.includes("localhost")) {
      console.error("Backend API URL not configured. NEXT_PUBLIC_API_BASE_URL:", process.env.NEXT_PUBLIC_API_BASE_URL)
      return NextResponse.json({ 
        error: "Backend API not configured. Please set NEXT_PUBLIC_API_BASE_URL environment variable.",
        details: "Expected: https://sonicsbag.poultrycore.com"
      }, { status: 500 })
    }

    // Forward the request body directly to the backend
    const body = await request.arrayBuffer()

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": contentType,
      },
      body: body,
    })

    if (!response.ok) {
      const errorText = await response.text()
      let error
      try {
        error = JSON.parse(errorText)
      } catch {
        error = { error: errorText || "Failed to upload file" }
      }
      console.error("Backend upload error:", error)
      return NextResponse.json(error, { status: response.status })
    }

    const result = await response.json()
    return NextResponse.json(result)
  } catch (error: any) {
    console.error("Upload error:", error)
    return NextResponse.json({ 
      error: "Failed to upload file", 
      message: error.message 
    }, { status: 500 })
  }
}
