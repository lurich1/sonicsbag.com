import { NextRequest, NextResponse } from "next/server"
import { query } from "@/lib/db"

// POST create new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      customerName,
      customerEmail,
      items,
      totalAmount,
      status,
      address,
      phone,
    } = body

    await query<any>(
      "INSERT INTO orders (customer_name, customer_email, items_json, total_amount, status, address, phone, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, NOW())",
      [
        customerName,
        customerEmail,
        JSON.stringify(items ?? []),
        totalAmount,
        status ?? "pending",
        address,
        phone,
      ]
    )

    const inserted = await query<any>("SELECT * FROM orders WHERE id = LAST_INSERT_ID()")

    return NextResponse.json(inserted[0], { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

