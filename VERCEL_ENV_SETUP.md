# Vercel Environment Variables Setup

## ⚠️ Critical: Fix HTTP 405 Error

The error you're seeing (`HTTP ERROR 405` on `/api/admin/upload`) is because the **backend API URL is not configured** in Vercel.

## Quick Fix

### Step 1: Add Environment Variable in Vercel

1. Go to [Vercel Dashboard](https://vercel.com)
2. Select your project: `sonicsbag-com`
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
5. Add:
   ```
   Name: NEXT_PUBLIC_API_BASE_URL
   Value: https://sonicsbag.poultrycore.com
   ```
6. Select **Production**, **Preview**, and **Development** environments
7. Click **Save**

### Step 2: Redeploy

After adding the environment variable:
1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. Or push a new commit to trigger redeployment

## Verify It's Working

After redeployment:

1. **Test Upload:**
   - Go to: `https://sonicsbag-com.vercel.app/admin/products`
   - Try uploading an image
   - Should now work!

2. **Check Browser Console:**
   - Open DevTools (F12)
   - Check Network tab
   - Upload request should go to: `https://sonicsbag.poultrycore.com/api/upload`

## Current Issue

**What's happening:**
- Frontend tries to upload: `/api/admin/upload` (Next.js route)
- Next.js route tries to proxy to backend
- But `NEXT_PUBLIC_API_BASE_URL` is not set
- So it defaults to `http://localhost:5000`
- Vercel can't reach localhost → Error

**After fix:**
- `NEXT_PUBLIC_API_BASE_URL=https://sonicsbag.poultrycore.com`
- Next.js route proxies to: `https://sonicsbag.poultrycore.com/api/upload`
- Backend API handles the upload
- Returns image URL
- Product created successfully ✅

## All Required Environment Variables

Make sure these are set in Vercel:

```env
# Backend API URL (REQUIRED)
NEXT_PUBLIC_API_BASE_URL=https://sonicsbag.poultrycore.com

# Admin Credentials
ADMIN_EMAIL=your-admin@email.com
ADMIN_PASSWORD=your-secure-password

# Paystack Keys
PAYSTACK_SECRET_KEY=sk_live_...
PAYSTACK_PUBLIC_KEY=pk_live_...
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_live_...
```

## Testing Locally

For local development, create `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

This allows you to test with local backend API.

## After Setting Environment Variable

1. ✅ Redeploy on Vercel
2. ✅ Test admin upload
3. ✅ Verify products appear on shop page
4. ✅ Check images load correctly

The 405 error should be resolved once `NEXT_PUBLIC_API_BASE_URL` is set correctly!
