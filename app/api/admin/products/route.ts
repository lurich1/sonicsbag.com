import { NextRequest, NextResponse } from "next/server"
import { readProducts, writeProducts } from "@/lib/data"
import { cookies } from "next/headers"

// GET all products
export async function GET() {
  try {
    const products = readProducts()
    // Always return an array, even if empty
    return NextResponse.json(Array.isArray(products) ? products : [])
  } catch (error) {
    console.error("Error fetching products:", error)
    // Return empty array instead of error to prevent crashes
    return NextResponse.json([])
  }
}

// POST create new product
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("adminToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const products = readProducts()

    const newProduct = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
    }

    products.push(newProduct)
    writeProducts(products)

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}

