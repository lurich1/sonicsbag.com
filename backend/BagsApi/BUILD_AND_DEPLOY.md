# Build and Deploy Guide for BagsApi

## ✅ Build Status

The API has been successfully built in Release configuration.

## Build Commands

### Build Release Version
```bash
cd backend/BagsApi
dotnet build --configuration Release
```

### Publish Release Version (for deployment)
```bash
cd backend/BagsApi
dotnet publish --configuration Release --output ./bin/Release/Publish
```

The published files will be in: `backend/BagsApi/bin/Release/Publish/`

## Configuration Files

### Development (`appsettings.json`)
- Used when running locally
- Connection string: Update with your local database
- BaseUrl: Can be `http://localhost:5000`

### Production (`appsettings.Production.json`)
- Used when `ASPNETCORE_ENVIRONMENT=Production`
- Connection string: Already configured for production database
- BaseUrl: `https://sonicsbag.poultrycore.com`
- AllowedOrigins: Configured for frontend URLs

## Running the API

### Development Mode
```bash
cd backend/BagsApi
dotnet run
```

### Production Mode
```bash
cd backend/BagsApi
$env:ASPNETCORE_ENVIRONMENT="Production"
dotnet run --configuration Release
```

Or run the published version:
```bash
cd backend/BagsApi/bin/Release/Publish
dotnet BagsApi.dll
```

## Testing the API

1. **Start the API:**
   ```bash
   cd backend/BagsApi
   dotnet run --configuration Release
   ```

2. **Verify it's running:**
   - Visit: `http://localhost:5000` - Should show "BagsApi is running"
   - Visit: `http://localhost:5000/swagger` - Should show Swagger UI

3. **Test endpoints:**
   - `GET /api/products` - Should return products from database
   - `POST /api/upload` - Upload an image file
   - `POST /api/products` - Create a product

## Frontend Integration

### Environment Variables

**Frontend `.env.local` (for local testing with production API):**
```env
NEXT_PUBLIC_API_BASE_URL=https://sonicsbag.poultrycore.com
```

**Frontend on Vercel:**
- Set in Vercel Dashboard → Settings → Environment Variables:
  ```
  NEXT_PUBLIC_API_BASE_URL=https://sonicsbag.poultrycore.com
  ```

## Admin Panel Testing

1. **Start Frontend:**
   ```bash
   npm run dev
   ```

2. **Login to Admin:**
   - Go to: `http://localhost:3000/admin/login`
   - Use credentials from `.env.local`

3. **Test Product Creation:**
   - Go to: `http://localhost:3000/admin/products`
   - Click "Add Product"
   - Upload an image (should upload to production API)
   - Fill in product details
   - Save

4. **Verify Product Appears:**
   - Go to: `http://localhost:3000/shop`
   - Product should appear with image

## Production Deployment Checklist

- [x] Build succeeds in Release configuration
- [x] `appsettings.Production.json` configured
- [x] Database connection string correct
- [x] BaseUrl set to production domain
- [x] AllowedOrigins includes frontend URLs
- [ ] Database tables created (run `database.sql`)
- [ ] API deployed to production server
- [ ] `wwwroot/uploads/` folder exists on server
- [ ] Frontend environment variable configured
- [ ] Test upload functionality
- [ ] Test product creation via admin
- [ ] Test products display on shop page

## Troubleshooting

### API Not Starting
- Check database connection string
- Ensure SQL Server is accessible
- Check firewall/network settings

### Images Not Uploading
- Verify `wwwroot/uploads/` folder exists
- Check folder permissions
- Verify BaseUrl in appsettings is correct

### CORS Errors
- Check AllowedOrigins in appsettings
- Verify frontend URL is in the list
- Restart API after changing CORS settings

### Frontend Can't Connect
- Verify `NEXT_PUBLIC_API_BASE_URL` is set correctly
- Check if API is running
- Verify CORS is configured correctly
