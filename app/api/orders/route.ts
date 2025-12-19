import { NextRequest, NextResponse } from "next/server"
import { readOrders, writeOrders } from "@/lib/data"

// POST create new order
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const orders = readOrders()

    const newOrder = {
      ...body,
      createdAt: new Date().toISOString(),
    }

    orders.push(newOrder)
    writeOrders(orders)

    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}

