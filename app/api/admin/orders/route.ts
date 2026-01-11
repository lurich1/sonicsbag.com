import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { apiConfig } from "@/lib/api"

// GET all orders - fetch from backend
export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("adminToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Fetch from backend API
    const response = await fetch(apiConfig.endpoints.orders)
    
    if (!response.ok) {
      return NextResponse.json([], { status: response.status })
    }

    const orders = await response.json()
    const ordersArray = Array.isArray(orders) ? orders : []
    
    // Map backend format to frontend format
    const mappedOrders = ordersArray.map((order: any) => ({
      id: String(order.id),
      date: order.createdAt,
      createdAt: order.createdAt,
      total: order.totalAmount,
      totalAmount: order.totalAmount,
      status: order.status,
      shipping: {
        name: order.customerName,
        email: order.customerEmail,
      },
      items: typeof order.itemsJson === 'string' ? JSON.parse(order.itemsJson) : order.itemsJson || [],
      customerName: order.customerName,
      customerEmail: order.customerEmail,
    }))
    
    // Sort by date, newest first
    mappedOrders.sort((a: any, b: any) => {
      const dateA = new Date(a.date || a.createdAt || 0).getTime()
      const dateB = new Date(b.date || b.createdAt || 0).getTime()
      return dateB - dateA
    })
    
    return NextResponse.json(mappedOrders)
  } catch (error) {
    console.error("Error fetching orders from backend:", error)
    return NextResponse.json([])
  }
}

