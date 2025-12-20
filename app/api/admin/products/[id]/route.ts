import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { apiConfig } from "@/lib/api"

// GET single product - proxy to backend
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const response = await fetch(apiConfig.endpoints.product(id))
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 })
      }
      return NextResponse.json({ error: "Failed to fetch product" }, { status: response.status })
    }

    const product = await response.json()
    
    // Map backend format to frontend format
    const frontendProduct = {
      id: String(product.id),
      name: product.name,
      price: product.price,
      image: product.imageUrl,
      images: product.imageUrl ? [product.imageUrl] : [],
      category: product.category || "",
      description: product.description || "",
      details: [],
      sizes: [],
    }

    return NextResponse.json(frontendProduct)
  } catch (error) {
    console.error("Error fetching product:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

// PUT update product - proxy to backend with auth
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("adminToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    
    // Map frontend product format to backend format
    const backendProduct = {
      name: body.name,
      price: body.price,
      imageUrl: body.image || body.images?.[0] || null,
      category: body.category || null,
      description: body.description || null,
    }

    const response = await fetch(apiConfig.endpoints.product(id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(backendProduct),
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 })
      }
      const error = await response.json().catch(() => ({ error: "Failed to update product" }))
      return NextResponse.json(error, { status: response.status })
    }

    const updatedProduct = await response.json()
    
    // Map backend format to frontend format
    const frontendProduct = {
      id: String(updatedProduct.id),
      name: updatedProduct.name,
      price: updatedProduct.price,
      image: updatedProduct.imageUrl,
      images: updatedProduct.imageUrl ? [updatedProduct.imageUrl] : [],
      category: updatedProduct.category || "",
      description: updatedProduct.description || "",
      details: [],
      sizes: [],
    }

    return NextResponse.json(frontendProduct)
  } catch (error) {
    console.error("Error updating product:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

// DELETE product - proxy to backend with auth
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("adminToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    const response = await fetch(apiConfig.endpoints.product(id), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "Product not found" }, { status: 404 })
      }
      const error = await response.json().catch(() => ({ error: "Failed to delete product" }))
      return NextResponse.json(error, { status: response.status })
    }

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    console.error("Error deleting product:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}
