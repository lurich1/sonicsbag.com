# How to Set Up Email Receiving for Contact Form

Currently, the contact form is set up to send emails to **jquayson827@gmail.com** using Resend email service.

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
1. Go to your contact page: `/contact`
2. Fill out and submit the form
3. Check your email inbox: **jquayson827@gmail.com**
4. You should receive the contact form submission

## Current Status

✅ Contact form API route created
✅ Resend package installed
⏳ **Waiting for RESEND_API_KEY to be added to environment variables**

Once you add the API key and redeploy, emails will start working!
