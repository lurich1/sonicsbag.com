import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { query } from "@/lib/db"

// GET single product
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const products = await query<any>("SELECT * FROM products WHERE id = ?", [id])
    const product = products[0]

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

    const {
      name,
      description,
      price,
      image,
      category,
      stock,
    } = body

    const result = await query<any>(
      "UPDATE products SET name = ?, description = ?, price = ?, image = ?, category = ?, stock = ?, updated_at = NOW() WHERE id = ?",
      [name, description, price, image, category, stock, id]
    )

    if (!result || (Array.isArray(result) && result.length === 0)) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    const updated = await query<any>("SELECT * FROM products WHERE id = ?", [id])
    return NextResponse.json(updated[0])
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

    const result = await query<any>("DELETE FROM products WHERE id = ?", [id])

    return NextResponse.json({ message: "Product deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}

