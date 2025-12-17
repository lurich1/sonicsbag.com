import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { query } from "@/lib/db"

// GET all products
export async function GET() {
  try {
    const products = await query<any>("SELECT * FROM products ORDER BY created_at DESC")
    return NextResponse.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
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
    const {
      name,
      description,
      price,
      image,
      category,
      stock,
    } = body

    const result = await query<any>(
      "INSERT INTO products (name, description, price, image, category, stock, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())",
      [name, description, price, image, category, stock]
    )

    const inserted = await query<any>("SELECT * FROM products WHERE id = LAST_INSERT_ID()")

    return NextResponse.json(inserted[0], { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}

