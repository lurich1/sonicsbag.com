import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"
import { apiConfig } from "@/lib/api"

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

    // Save to backend database (optional - continue even if it fails)
    // Use Promise.race to prevent backend timeout from blocking email
    const backendSavePromise = (async () => {
      try {
        const backendRequest = {
          name,
          email,
          phone: phone || "",
          bagBrand: bagBrand || "",
          bagType: bagType || "",
          issueDescription,
          damageLocation: damageLocation || "",
          urgency: urgency || "",
          photos: photos || "",
          additionalNotes: additionalNotes || "",
          status: "pending",
        }

        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 30000) // 30 second timeout (increased from 5)

        const backendUrl = apiConfig.endpoints.repairRequests
        console.log("Attempting to save repair request to backend:", backendUrl)
        
        const backendResponse = await fetch(backendUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(backendRequest),
          signal: controller.signal,
        })

        clearTimeout(timeoutId)

        if (backendResponse.ok) {
          const savedRequest = await backendResponse.json()
          console.log("✅ Repair request saved to backend successfully:", savedRequest)
          return savedRequest
        } else {
          const errorText = await backendResponse.text().catch(() => "Unknown error")
          console.error(`❌ Failed to save repair request to backend. Status: ${backendResponse.status}, Error:`, errorText)
          console.error("Backend URL:", backendUrl)
          console.error("Request payload:", JSON.stringify(backendRequest, null, 2))
        }
      } catch (backendError: any) {
        if (backendError.name !== 'AbortError') {
          console.error("❌ Error saving repair request to backend (continuing with email):", {
            name: backendError?.name,
            message: backendError?.message,
            stack: backendError?.stack,
          })
          console.error("Backend URL:", apiConfig.endpoints.repairRequests)
        } else {
          console.warn("⏱️ Backend save timed out after 30 seconds (continuing with email)")
        }
      }
      return null
    })()

    // Don't wait for backend save - proceed with email immediately
    backendSavePromise.catch(() => {}) // Silently catch any unhandled errors

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
              <h2>New Repair Request from Soncis Bags Website</h2>
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
              <h2>Repair Request Received - Soncis Bags</h2>
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
              <p>Best regards,<br>The Soncis Bags Team</p>
            </div>
          </body>
        </html>
      `
      
      try {
        // Send email to admin
        const adminEmailResult = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
          to: adminEmail,
          replyTo: email,
          subject: `Repair Request from ${name}`,
          html: adminEmailHtml,
        })
        
        if (adminEmailResult.error) {
          console.error("Failed to send admin email:", adminEmailResult.error)
        } else {
          console.log("Admin email sent successfully:", adminEmailResult.data?.id)
        }
        
        // Send confirmation email to customer
        const customerEmailResult = await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
          to: email,
          subject: "Repair Request Received - Soncis Bags",
          html: customerEmailHtml,
        })
        
        if (customerEmailResult.error) {
          console.error("Failed to send customer email:", customerEmailResult.error)
        } else {
          console.log("Customer email sent successfully:", customerEmailResult.data?.id)
        }
        
        if (!adminEmailResult.error && !customerEmailResult.error) {
          console.log("Repair request emails sent successfully")
        } else {
          console.error("Some emails failed to send. Check logs above for details.")
        }
      } catch (resendError: any) {
        console.error("Resend API error:", {
          message: resendError?.message,
          name: resendError?.name,
          stack: resendError?.stack,
        })
      }
    } else {
      console.error("⚠️ RESEND_API_KEY not configured! Emails will not be sent.")
      console.log("Repair Request (Resend not configured):")
      console.log("To Admin:", adminEmail)
      console.log("To Customer:", email)
      console.log("Data:", JSON.stringify(body, null, 2))
      console.log("Please add RESEND_API_KEY to your environment variables to enable email sending.")
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
