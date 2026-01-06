import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, bagType, dimensions, color, material, specialFeatures, quantity, budget, timeline, additionalNotes } = body

    // Validate required fields
    if (!name || !email || !bagType) {
      return NextResponse.json(
        { error: "Name, email, and bag type are required" },
        { status: 400 }
      )
    }

    const adminEmail = "soncisworld@gmail.com"
    const resendApiKey = process.env.RESEND_API_KEY
    
    if (resendApiKey) {
      const resend = new Resend(resendApiKey)
      
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
              .message-box { background: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px; }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>New Custom Bag Request from SONCIS Website</h2>
              <div class="field">
                <span class="label">Name:</span> ${name}
              </div>
              <div class="field">
                <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
              </div>
              <div class="field">
                <span class="label">Phone:</span> ${phone ? `<a href="tel:${phone}">${phone}</a>` : "Not provided"}
              </div>
              <div class="field">
                <span class="label">Bag Type:</span> ${bagType}
              </div>
              <div class="field">
                <span class="label">Dimensions:</span> ${dimensions || "Not specified"}
              </div>
              <div class="field">
                <span class="label">Color:</span> ${color || "Not specified"}
              </div>
              <div class="field">
                <span class="label">Material:</span> ${material || "Not specified"}
              </div>
              <div class="field">
                <span class="label">Quantity:</span> ${quantity || "Not specified"}
              </div>
              <div class="field">
                <span class="label">Budget:</span> ${budget ? `₵${budget}` : "Not specified"}
              </div>
              <div class="field">
                <span class="label">Timeline:</span> ${timeline || "Not specified"}
              </div>
              ${specialFeatures ? `<div class="field"><span class="label">Special Features:</span> ${specialFeatures.replace(/\n/g, '<br>')}</div>` : ''}
              ${additionalNotes ? `<div class="field"><span class="label">Additional Notes:</span> ${additionalNotes.replace(/\n/g, '<br>')}</div>` : ''}
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
              <p style="font-size: 12px; color: #999;">
                Reply to: ${email}
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
              .message { background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0; }
            </style>
          </head>
          <body>
            <div class="container">
              <h2>Custom Bag Request Received - SONCIS</h2>
              <p>Dear ${name},</p>
              <p>Thank you for your custom bag request! We have received the following details:</p>
              <div class="message">
                <p><strong>Bag Type:</strong> ${bagType}</p>
                ${dimensions ? `<p><strong>Dimensions:</strong> ${dimensions}</p>` : ''}
                ${color ? `<p><strong>Color:</strong> ${color}</p>` : ''}
                ${material ? `<p><strong>Material:</strong> ${material}</p>` : ''}
                ${quantity ? `<p><strong>Quantity:</strong> ${quantity}</p>` : ''}
                ${budget ? `<p><strong>Budget:</strong> ₵${budget}</p>` : ''}
              </div>
              <p>Our team will review your request and contact you within 2-3 business days at <strong>${email}</strong>${phone ? ` or <strong>${phone}</strong>` : ''} to discuss your custom bag design and provide a quote.</p>
              <p>If you have any questions, please contact us at:</p>
              <ul>
                <li>Email: soncisworld@gmail.com</li>
                <li>Phone: 0552702318</li>
                <li>WhatsApp: <a href="https://wa.me/233552702318">0552702318</a></li>
              </ul>
              <p>Best regards,<br>The SONCIS Team</p>
            </div>
          </body>
        </html>
      `
      
      try {
        // Send email to admin
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
          to: adminEmail,
          replyTo: email,
          subject: `Custom Bag Request from ${name}`,
          html: adminEmailHtml,
        })
        
        // Send confirmation email to customer
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
          to: email,
          subject: "Custom Bag Request Received - SONCIS",
          html: customerEmailHtml,
        })
        
        console.log("Custom bag request emails sent successfully")
      } catch (resendError) {
        console.error("Resend error:", resendError)
      }
    } else {
      console.log("Custom Bag Request (Resend not configured):")
      console.log("To Admin:", adminEmail)
      console.log("To Customer:", email)
      console.log("Data:", body)
    }

    return NextResponse.json(
      { message: "Your custom bag request has been submitted successfully!" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing custom bag request:", error)
    return NextResponse.json(
      { error: "Failed to submit custom bag request. Please try again." },
      { status: 500 }
    )
  }
}
