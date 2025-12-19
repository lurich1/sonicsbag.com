import { NextRequest, NextResponse } from "next/server"
import { readOrders } from "@/lib/data"
import { cookies } from "next/headers"

// GET all orders
export async function GET() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("adminToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orders = readOrders()
    // Ensure orders is an array
    const ordersArray = Array.isArray(orders) ? orders : []
    // Sort by date, newest first
    ordersArray.sort((a: any, b: any) => {
      const dateA = new Date(a.date || a.createdAt || 0).getTime()
      const dateB = new Date(b.date || b.createdAt || 0).getTime()
      return dateB - dateA
    })
    return NextResponse.json(ordersArray)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 })
  }
}

