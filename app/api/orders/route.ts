import { NextRequest, NextResponse } from "next/server"
import { apiConfig } from "@/lib/api"

// POST create new order - proxy to backend
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Map frontend order format to backend format
    const backendOrder = {
      customerName: body.customerName || body.name || "",
      customerEmail: body.customerEmail || body.email || "",
      itemsJson: JSON.stringify(body.items || []),
      totalAmount: body.totalAmount || body.total || 0,
      status: "pending",
    }

    const response = await fetch(apiConfig.endpoints.orders, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(backendOrder),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Failed to create order" }))
      return NextResponse.json(error, { status: response.status })
    }

    const createdOrder = await response.json()
    
    // Map backend format to frontend format
    const frontendOrder = {
      id: String(createdOrder.id),
      customerName: createdOrder.customerName,
      customerEmail: createdOrder.customerEmail,
      items: JSON.parse(createdOrder.itemsJson),
      totalAmount: createdOrder.totalAmount,
      status: createdOrder.status,
      createdAt: createdOrder.createdAt,
    }

    return NextResponse.json(frontendOrder, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
