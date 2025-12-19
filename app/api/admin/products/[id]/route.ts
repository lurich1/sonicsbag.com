import { NextRequest, NextResponse } from "next/server"
import { readProducts, writeProducts } from "@/lib/data"
import { cookies } from "next/headers"

// GET single product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const products = readProducts()
    const product = products.find((p: any) => p.id === id)

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

// PUT update product
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
    const products = readProducts()

    const index = products.findIndex((p: any) => p.id === id)
    if (index === -1) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    products[index] = {
      ...products[index],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    writeProducts(products)
    return NextResponse.json(products[index])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

// DELETE product
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
    const products = readProducts()

    const filtered = products.filter((p: any) => p.id !== id)
    if (filtered.length === products.length) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    writeProducts(filtered)
    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}

