# Production Setup Guide

## Issues Found

1. ✅ Product created successfully in production database
2. ❌ Image URL uses `localhost` instead of production URL
3. ❌ Frontend not configured to use production backend API

## Fix 1: Update Product Image URL

The product was created with:
```json
"imageUrl": "http://localhost:5000/uploads/20241220123456-abc123.jpg"
```

This needs to be:
```json
"imageUrl": "https://sonicsbag.poultrycore.com/uploads/20241220123456-abc123.jpg"
```

### Option A: Update via Swagger

1. Go to `https://sonicsbag.poultrycore.com/swagger`
2. Find `PUT /api/Products/{id}`
3. Use ID `1` (from your created product)
4. Update the request body:

```json
{
  "id": 1,
  "name": "bag toot",
  "price": 40,
  "imageUrl": "https://sonicsbag.poultrycore.com/uploads/20241220123456-abc123.jpg",
  "category": "bagcpack",
  "description": "hdklsks"
}
```

### Option B: Upload Image on Production First

1. Upload image via `/api/upload` on production
2. Get the production URL from response
3. Update product with that URL

## Fix 2: Configure Frontend for Production

The frontend needs to know where the production backend API is.

### If Frontend is on Vercel:

1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://sonicsbag.poultrycore.com
   ```
3. Redeploy the frontend

### If Frontend is Local Development:

Update `.env.local`:
```env
NEXT_PUBLIC_API_BASE_URL=https://sonicsbag.poultrycore.com
```

Then restart the dev server:
```bash
npm run dev
```

## Fix 3: Backend BaseUrl Configuration

Make sure `backend/BagsApi/appsettings.json` (or Production version) has:

```json
{
  "BaseUrl": "https://sonicsbag.poultrycore.com"
}
```

This ensures uploaded images get the correct production URLs.

## Verify Everything Works

1. ✅ Backend API: `https://sonicsbag.poultrycore.com/swagger`
2. ✅ Products endpoint returns your product: `GET /api/Products`
3. ✅ Frontend displays products (after setting NEXT_PUBLIC_API_BASE_URL)
4. ✅ Images load correctly (after updating imageUrl)

## Quick Checklist

- [ ] Update product imageUrl to use `https://sonicsbag.poultrycore.com/uploads/...`
- [ ] Set `NEXT_PUBLIC_API_BASE_URL=https://sonicsbag.poultrycore.com` in frontend
- [ ] Set `BaseUrl: https://sonicsbag.poultrycore.com` in backend appsettings
- [ ] Redeploy frontend (if on Vercel) or restart dev server
- [ ] Test: Visit shop page and verify product appears
