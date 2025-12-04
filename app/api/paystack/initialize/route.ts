import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, amount, metadata } = body

    // Validate inputs
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    if (!amount || amount <= 0) {
      return NextResponse.json({ error: "Valid amount is required" }, { status: 400 })
    }

    // Convert amount from Ghana Cedi to pesewas (Paystack uses pesewas as the smallest currency unit for GHS)
    // 1 GHS = 100 pesewas, so multiply by 100
    const amountInPesewas = Math.round(Number(amount) * 100)

    if (amountInPesewas <= 0) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 })
    }

    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        amount: amountInPesewas,
        currency: "GHS",
        metadata,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return NextResponse.json({ error: data.message || "Payment initialization failed" }, { status: 400 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Paystack initialization error:", error)
    return NextResponse.json({ error: "Failed to initialize payment" }, { status: 500 })
  }
}

