import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, bagBrand, bagType, issueDescription, damageLocation, urgency, photos, additionalNotes } = body

    // Validate required fields
    if (!name || !email || !phone || !issueDescription) {
      return NextResponse.json(
        { error: "Name, email, phone, and issue description are required" },
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
              <h2>New Repair Request from SONCIS Website</h2>
              <div class="field">
                <span class="label">Name:</span> ${name}
              </div>
              <div class="field">
                <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
              </div>
              <div class="field">
                <span class="label">Phone:</span> <a href="tel:${phone}">${phone}</a>
              </div>
              <div class="field">
                <span class="label">Bag Brand:</span> ${bagBrand || "Not specified"}
              </div>
              <div class="field">
                <span class="label">Bag Type:</span> ${bagType || "Not specified"}
              </div>
              <div class="field">
                <span class="label">Damage Location:</span> ${damageLocation || "Not specified"}
              </div>
              <div class="field">
                <span class="label">Urgency:</span> ${urgency || "Not specified"}
              </div>
              <div class="field">
                <span class="label">Issue Description:</span>
                <div class="message-box">${issueDescription.replace(/\n/g, '<br>')}</div>
              </div>
              ${photos ? `<div class="field"><span class="label">Photo Links:</span> ${photos}</div>` : ''}
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
              <h2>Repair Request Received - SONCIS</h2>
              <p>Dear ${name},</p>
              <p>Thank you for your repair request! We have received the following details:</p>
              <div class="message">
                <p><strong>Bag Type:</strong> ${bagType || "Not specified"}</p>
                <p><strong>Issue:</strong> ${issueDescription}</p>
                <p><strong>Damage Location:</strong> ${damageLocation || "Not specified"}</p>
              </div>
              <p>Our team will review your request and contact you within 1-2 business days at <strong>${email}</strong> or <strong>${phone}</strong> to discuss the repair process and provide a quote.</p>
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
          subject: `Repair Request from ${name}`,
          html: adminEmailHtml,
        })
        
        // Send confirmation email to customer
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
          to: email,
          subject: "Repair Request Received - SONCIS",
          html: customerEmailHtml,
        })
        
        console.log("Repair request emails sent successfully")
      } catch (resendError) {
        console.error("Resend error:", resendError)
      }
    } else {
      console.log("Repair Request (Resend not configured):")
      console.log("To Admin:", adminEmail)
      console.log("To Customer:", email)
      console.log("Data:", body)
    }

    return NextResponse.json(
      { message: "Your repair request has been submitted successfully!" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing repair request:", error)
    return NextResponse.json(
      { error: "Failed to submit repair request. Please try again." },
      { status: 500 }
    )
  }
}
