# How to Set Up Email Receiving for Contact, Custom Bag, and Repair Forms

Currently, all forms (Contact, Custom Bag, and Repair) are set up to send emails to **soncisworld@gmail.com** using Resend email service.

## Quick Setup (5 minutes)

### Step 1: Create a Resend Account
1. Go to https://resend.com
2. Sign up for a free account (100 emails/day free)
3. Verify your email address

### Step 2: Get Your API Key
1. After logging in, go to **API Keys** in the dashboard
2. Click **Create API Key**
3. Give it a name (e.g., "Sonics Bag Contact Form")
4. Copy the API key (starts with `re_...`)

### Step 3: Add API Key to Vercel
1. Go to your Vercel dashboard: https://vercel.com/dashboard
2. Select your **sonicsbag.com** project
3. Go to **Settings** → **Environment Variables**
4. Add a new variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Paste your API key from Step 2
5. Click **Save**
6. **Important**: Redeploy your site for the changes to take effect

### Step 4: Verify Your Domain (Optional but Recommended)
1. In Resend dashboard, go to **Domains**
2. Add your domain (e.g., `sonicsbag.com`)
3. Follow the DNS verification steps
4. Once verified, update `RESEND_FROM_EMAIL` in Vercel to use your domain:
   - **Name**: `RESEND_FROM_EMAIL`
   - **Value**: `contact@sonicsbag.com` (or `noreply@sonicsbag.com`)

## Alternative: Use Gmail SMTP (More Complex)

If you prefer not to use Resend, you can use Gmail SMTP with Nodemailer:
1. Enable "Less secure app access" or create an App Password in your Google Account
2. Install nodemailer: `npm install nodemailer`
3. Update `app/api/contact/route.ts` to use nodemailer instead

## Testing

After setting up:
1. Test the contact form: Go to `/contact`, fill out and submit
2. Test the custom bag form: Go to `/custom-bag`, fill out and submit
3. Test the repair form: Go to `/repair`, fill out and submit
4. Check your email inbox: **soncisworld@gmail.com**
5. You should receive emails for all form submissions

## Troubleshooting

If emails are not being sent:

1. **Check Environment Variables**: Make sure `RESEND_API_KEY` is set in your Vercel project settings
2. **Check Logs**: Look at your Vercel deployment logs for error messages
3. **Verify API Key**: Make sure your Resend API key is valid and active
4. **Check Resend Dashboard**: Verify your Resend account is active and not suspended
5. **Domain Verification**: If using a custom domain, make sure it's verified in Resend

## Current Status

✅ Contact form API route created
✅ Custom Bag form API route created
✅ Repair form API route created
✅ Resend package installed
✅ Improved error handling and logging
⏳ **Waiting for RESEND_API_KEY to be added to environment variables**

Once you add the API key and redeploy, emails will start working for all forms!

## What Was Fixed

- ✅ Improved error handling in custom-bag and repair routes
- ✅ Better logging to identify email sending issues
- ✅ Clear error messages when RESEND_API_KEY is missing
- ✅ Individual email result checking (admin vs customer emails)
