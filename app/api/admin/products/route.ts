import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { apiConfig } from "@/lib/api"

// GET all products - proxy to backend
export async function GET() {
  try {
    const response = await fetch(apiConfig.endpoints.products)
    if (!response.ok) {
      return NextResponse.json([], { status: response.status })
    }
    const products = await response.json()
    return NextResponse.json(Array.isArray(products) ? products : [])
  } catch (error) {
    console.error("Error fetching products from backend:", error)
    return NextResponse.json([])
  }
}

// POST create new product - proxy to backend with auth
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("adminToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    
    // Map frontend product format to backend format
    const backendProduct = {
      name: body.name,
      price: body.price,
      imageUrl: body.image || body.images?.[0] || null,
      category: body.category || null,
      description: body.description || null,
    }

    const response = await fetch(apiConfig.endpoints.products, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(backendProduct),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Failed to create product" }))
      return NextResponse.json(error, { status: response.status })
    }

    const createdProduct = await response.json()
    
    // Map backend format to frontend format
    const frontendProduct = {
      id: String(createdProduct.id),
      name: createdProduct.name,
      price: createdProduct.price,
      image: createdProduct.imageUrl,
      images: createdProduct.imageUrl ? [createdProduct.imageUrl] : [],
      category: createdProduct.category || "",
      description: createdProduct.description || "",
      details: [],
      sizes: [],
    }

    return NextResponse.json(frontendProduct, { status: 201 })
  } catch (error) {
    console.error("Error creating product:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}
