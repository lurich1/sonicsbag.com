import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      )
    }

    // Email configuration
    const recipientEmail = "jquayson827@gmail.com"
    
    // Try to send email using Resend (if API key is configured)
    const resendApiKey = process.env.RESEND_API_KEY
    
    if (resendApiKey) {
      // Use Resend to send email
      const resend = new Resend(resendApiKey)
      
      const emailHtml = `
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
              <h2>New Contact Form Submission from SONCIS Website</h2>
              <div class="field">
                <span class="label">Name:</span> ${name}
              </div>
              <div class="field">
                <span class="label">Email:</span> <a href="mailto:${email}">${email}</a>
              </div>
              <div class="field">
                <span class="label">Subject:</span> ${subject}
              </div>
              <div class="field">
                <span class="label">Message:</span>
                <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
              </div>
              <hr style="margin: 20px 0; border: none; border-top: 1px solid #eee;">
              <p style="font-size: 12px; color: #999;">
                You can reply directly to this email to respond to ${name}.
              </p>
            </div>
          </body>
        </html>
      `
      
      try {
        await resend.emails.send({
          from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
          to: recipientEmail,
          replyTo: email,
          subject: `Contact Form: ${subject}`,
          html: emailHtml,
        })
        
        console.log("Email sent successfully via Resend")
      } catch (resendError) {
        console.error("Resend error:", resendError)
        // Fall through to logging
      }
    } else {
      // If Resend is not configured, log the submission
      // You can set up Resend later or use a different email service
      console.log("Contact Form Submission (Resend not configured):")
      console.log("To:", recipientEmail)
      console.log("From:", email)
      console.log("Name:", name)
      console.log("Subject:", subject)
      console.log("Message:", message)
      console.log("\nTo enable email sending, add RESEND_API_KEY to your environment variables")
    }

    return NextResponse.json(
      { message: "Your message has been sent successfully!" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error processing contact form:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    )
  }
}
