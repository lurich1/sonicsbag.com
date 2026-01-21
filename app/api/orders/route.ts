import { NextRequest, NextResponse } from "next/server"
import { apiConfig } from "@/lib/api"
import { Resend } from "resend"

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

    // Send email notifications
    const adminEmail = "soncisworld@gmail.com"
    const customerEmail = frontendOrder.customerEmail
    const resendApiKey = process.env.RESEND_API_KEY
    
    if (resendApiKey && customerEmail) {
      const resend = new Resend(resendApiKey)
      
      // Parse items for email display
      const items = frontendOrder.items || []
      const itemsHtml = items.map((item: any) => `
        <tr>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name || 'Item'}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.quantity || 1}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₵${(item.price || 0).toLocaleString()}</td>
          <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₵${((item.price || 0) * (item.quantity || 1)).toLocaleString()}</td>
        </tr>
      `).join('')
      
      // Email to admin
      const adminEmailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              h2 { color: #6A0DAD; }
              .field { margin: 15px 0; }
              .label { font-weight: bold; color: #555; }
              table { width: 100%; border-collapse: collapse; margin: 15px 0; }
              th { background: #f5f5f5; padding: 10px; text-align: left; border-bottom: 2px solid #ddd; }
              td { padding: 8px; border-bottom: 1px solid #eee; }
              .total { font-size: 18px; font-weight: bold; color: #6A0DAD; }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>New Order #${frontendOrder.id} - Soncis Bags Website</h2>
              <div class="field">
                <span class="label">Order ID:</span> ${frontendOrder.id}
              </div>
              <div class="field">
                <span class="label">Customer Name:</span> ${frontendOrder.customerName}
              </div>
              <div class="field">
                <span class="label">Customer Email:</span> <a href="mailto:${customerEmail}">${customerEmail}</a>
              </div>
              <div class="field">
                <span class="label">Order Date:</span> ${new Date(frontendOrder.createdAt).toLocaleString()}
              </div>
              <div class="field">
                <span class="label">Status:</span> ${frontendOrder.status}
              </div>
              <h3 style="margin-top: 20px;">Order Items:</h3>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th style="text-align: right;">Unit Price</th>
                    <th style="text-align: right;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
              <div style="text-align: right; margin-top: 15px;">
                <span class="total">Total Amount: ₵${frontendOrder.totalAmount.toLocaleString()}</span>
              </div>
              ${body.shipping ? `
                <h3 style="margin-top: 20px;">Shipping Address:</h3>
                <div class="field">
                  ${body.shipping.address ? `<p>${body.shipping.address}</p>` : ''}
                  ${body.shipping.city ? `<p>${body.shipping.city}</p>` : ''}
                  ${body.shipping.state ? `<p>${body.shipping.state}</p>` : ''}
                  ${body.shipping.zipCode ? `<p>${body.shipping.zipCode}</p>` : ''}
                  ${body.shipping.country ? `<p>${body.shipping.country}</p>` : ''}
                  ${body.shipping.phone ? `<p>Phone: ${body.shipping.phone}</p>` : ''}
                </div>
              ` : ''}
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
              <p style="font-size: 12px; color: #999;">
                Reply to: ${customerEmail}
              </p>
            </div>
          </body>
        </html>
      `
      
      // Email to customer
      const customerEmailHtml = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              h2 { color: #6A0DAD; }
              table { width: 100%; border-collapse: collapse; margin: 15px 0; }
              th { background: #f5f5f5; padding: 10px; text-align: left; border-bottom: 2px solid #ddd; }
              td { padding: 8px; border-bottom: 1px solid #eee; }
              .total { font-size: 18px; font-weight: bold; color: #6A0DAD; }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Order Confirmation - Soncis Bags</h2>
              <p>Dear ${frontendOrder.customerName},</p>
              <p>Thank you for your order! Your order has been received and is being processed.</p>
              <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p><strong>Order ID:</strong> #${frontendOrder.id}</p>
                <p><strong>Order Date:</strong> ${new Date(frontendOrder.createdAt).toLocaleString()}</p>
                <p><strong>Status:</strong> ${frontendOrder.status}</p>
              </div>
              <h3>Order Items:</h3>
              <table>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th style="text-align: right;">Unit Price</th>
                    <th style="text-align: right;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsHtml}
                </tbody>
              </table>
              <div style="text-align: right; margin-top: 15px;">
                <span class="total">Total Amount: ₵${frontendOrder.totalAmount.toLocaleString()}</span>
              </div>
              <p>We will send you another email once your order has been shipped.</p>
              <p>If you have any questions about your order, please contact us at:</p>
              <ul>
                <li>Email: soncisworld@gmail.com</li>
                <li>Phone: 0552702318</li>
                <li>WhatsApp: <a href="https://wa.me/233552702318">0552702318</a></li>
              </ul>
              <p>Best regards,<br>The Soncis Bags Team</p>
            </div>
          </body>
        </html>
      `
      
      try {
        // Send email to admin
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
          to: adminEmail,
          replyTo: customerEmail,
          subject: `New Order #${frontendOrder.id} from ${frontendOrder.customerName}`,
          html: adminEmailHtml,
        })
        
        // Send confirmation email to customer
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
          to: customerEmail,
          subject: `Order Confirmation #${frontendOrder.id} - Soncis Bags`,
          html: customerEmailHtml,
        })
        
        console.log("Order emails sent successfully")
      } catch (resendError) {
        console.error("Resend error:", resendError)
      }
    }

    return NextResponse.json(frontendOrder, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 })
  }
}
