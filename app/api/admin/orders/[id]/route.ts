import { NextRequest, NextResponse } from "next/server"
import { readOrders, writeOrders } from "@/lib/data"
import { cookies } from "next/headers"

// GET single order
export async function GET(
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
    const orders = readOrders()
    const order = orders.find((o: any) => o.id === id)

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch order" }, { status: 500 })
  }
}

// PUT update order status
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
    const orders = readOrders()

    const index = orders.findIndex((o: any) => o.id === id)
    if (index === -1) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 })
    }

    orders[index] = {
      ...orders[index],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    writeOrders(orders)
    return NextResponse.json(orders[index])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update order" }, { status: 500 })
  }
}

