# API Testing Guide - Frontend & Admin Integration

## ✅ Build Status

- ✅ API Release build: **SUCCESS**
- ✅ Published to: `backend/BagsApi/bin/Release/Publish/`
- ✅ Configuration files: Created and configured

## Quick Start - Test Full Integration

### Step 1: Start the Backend API

**Option A: Run in Production Mode**
```powershell
cd backend/BagsApi
.\run-production.ps1
```

**Option B: Manual Start**
```powershell
cd backend/BagsApi
$env:ASPNETCORE_ENVIRONMENT="Production"
dotnet run --configuration Release
```

You should see:
```
Now listening on: http://localhost:5000
Now listening on: https://localhost:5001
```

### Step 2: Start the Frontend

**In a new terminal:**
```powershell
cd C:\Users\CODEWITHFIIFI\sonicsbag.com
npm run dev
```

Or ensure `.env.local` has:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

### Step 3: Test Admin Panel

1. **Open browser:** `http://localhost:3000/admin/login`
2. **Login** with admin credentials
3. **Go to Products:** `http://localhost:3000/admin/products`
4. **Click "Add Product"**
5. **Fill in product details:**
   - Name: Test Product
   - Price: 100
   - Category: Backpacks
   - Description: Test description
6. **Upload an image:**
   - Click "Choose File" and select an image
   - Image should upload automatically
7. **Click "Save"**

### Step 4: Verify Product Appears

1. **Go to Shop:** `http://localhost:3000/shop`
2. **Verify product appears** with the uploaded image
3. **Click product** to see details

## Testing Checklist

### ✅ Backend API Tests

- [ ] API starts without errors
- [ ] Visit `http://localhost:5000` → Shows "BagsApi is running"
- [ ] Visit `http://localhost:5000/swagger` → Swagger UI loads
- [ ] `GET /api/products` → Returns products (may be empty)
- [ ] `POST /api/upload` → Uploads image and returns URL
- [ ] `POST /api/products` → Creates product successfully

### ✅ Frontend Integration Tests

- [ ] Frontend starts without errors
- [ ] Shop page loads: `http://localhost:3000/shop`
- [ ] Products display correctly (or shows "No products available")
- [ ] Admin login works: `http://localhost:3000/admin/login`
- [ ] Admin dashboard loads: `http://localhost:3000/admin`
- [ ] Products page loads: `http://localhost:3000/admin/products`

### ✅ Admin Panel Tests

- [ ] Can view existing products
- [ ] Can create new product
- [ ] Can upload image file
- [ ] Image upload returns correct URL
- [ ] Product saves successfully
- [ ] Product appears on shop page
- [ ] Can edit product
- [ ] Can delete product

### ✅ End-to-End Flow

1. [ ] Login to admin panel
2. [ ] Create new product with image
3. [ ] Verify product saved
4. [ ] Visit shop page
5. [ ] Verify product displays with image
6. [ ] Click product to see details
7. [ ] Add to cart works

## Troubleshooting

### API Not Starting

**Error:** Connection string not found
- **Fix:** Check `appsettings.json` has `BagsConn` connection string

**Error:** Database connection failed
- **Fix:** Verify database server is accessible
- **Fix:** Check connection string credentials

### Image Upload Fails (500 Error)

**Check:**
1. Is the API running?
2. Does `wwwroot/uploads/` folder exist?
3. Check backend terminal for error messages
4. Verify file size < 10MB
5. Verify file type is .jpg, .jpeg, .png, .gif, or .webp

**Fix:**
```powershell
cd backend/BagsApi
mkdir wwwroot
mkdir wwwroot\uploads
```

### Products Not Showing on Frontend

**Check:**
1. Is `NEXT_PUBLIC_API_BASE_URL` set correctly?
2. Is the API running?
3. Check browser console (F12) for errors
4. Test API directly: `http://localhost:5000/api/products`

**Fix:**
```env
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

### CORS Errors

**Error:** "Access to fetch blocked by CORS policy"

**Fix:** Ensure frontend URL is in `AllowedOrigins` in `appsettings.json`:
```json
{
  "AllowedOrigins": [
    "http://localhost:3000",
    "https://localhost:3000"
  ]
}
```

## Quick Test Commands

### Test API with PowerShell
```powershell
cd backend/BagsApi
.\test-api.ps1
```

### Manual API Tests

**Get all products:**
```powershell
Invoke-RestMethod -Uri "http://localhost:5000/api/products" -Method GET
```

**Create product:**
```powershell
$body = @{
    name = "Test Product"
    price = 50
    category = "Backpacks"
    description = "Test"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:5000/api/products" -Method POST -Body $body -ContentType "application/json"
```

## Production Deployment

When deploying to production:

1. **Update `appsettings.Production.json`** with production connection string
2. **Set `BaseUrl`** to production domain
3. **Add production frontend URL** to `AllowedOrigins`
4. **Deploy published files** from `bin/Release/Publish/`
5. **Create `wwwroot/uploads/`** folder on server
6. **Set permissions** for uploads folder
7. **Configure frontend** with `NEXT_PUBLIC_API_BASE_URL` pointing to production API

## Success Indicators

✅ All systems working correctly when:
- API starts without errors
- Swagger UI accessible
- Admin can login
- Admin can upload images
- Admin can create/edit/delete products
- Products appear on shop page
- Images load correctly
- No console errors in browser

