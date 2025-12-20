# BagsApi Deployment Summary

## ✅ Ready for Plesk Deployment

### Package Location
```
backend/BagsApi/deployment-package/
```

### Package Contents
- ✅ All application DLLs and dependencies
- ✅ `BagsApi.dll` (main application)
- ✅ `web.config` (IIS/Plesk configuration)
- ✅ `appsettings.json` (Production configuration)
- ✅ `wwwroot/uploads/` folder (for image uploads)

## Quick Deployment Steps

### 1. Zip the Deployment Package
```powershell
cd backend/BagsApi
Compress-Archive -Path .\deployment-package\* -DestinationPath .\BagsApi-Plesk-Deployment.zip
```

### 2. Upload to Plesk
1. Log into Plesk
2. Go to File Manager
3. Navigate to your domain root (or create `/api` folder)
4. Upload `BagsApi-Plesk-Deployment.zip`
5. Extract the zip file

### 3. Configure Application in Plesk
1. Go to **Domains** → **Your Domain** → **Applications**
2. Click **Add Application**
3. Configure:
   - **Application Root:** `/` (or `/api` if you want subfolder)
   - **Application Type:** ASP.NET Core
   - **Runtime:** .NET 8.0
   - **Startup File:** `BagsApi.dll`
   - **Environment Variable:** `ASPNETCORE_ENVIRONMENT=Production`

### 4. Set Folder Permissions
1. Right-click `wwwroot/uploads/` folder
2. Set permissions: **Full Control** for IIS App Pool user
3. This allows image uploads to work

### 5. Verify Configuration
Check `appsettings.json` on server has:
- ✅ Correct database connection string
- ✅ `BaseUrl: https://sonicsbag.poultrycore.com`
- ✅ Frontend URLs in `AllowedOrigins`

### 6. Test the API
- Health: `https://sonicsbag.poultrycore.com/api`
- Swagger: `https://sonicsbag.poultrycore.com/swagger`
- Products: `https://sonicsbag.poultrycore.com/api/products`

## Frontend Configuration

Your frontend is already configured with:
```env
NEXT_PUBLIC_API_BASE_URL=https://sonicsbag.poultrycore.com
```

**If you deploy to `/api` subfolder, update to:**
```env
NEXT_PUBLIC_API_BASE_URL=https://sonicsbag.poultrycore.com/api
```

## Important URLs

After deployment, your API will be available at:

- **API Base:** `https://sonicsbag.poultrycore.com/api`
- **Swagger UI:** `https://sonicsbag.poultrycore.com/swagger`
- **Products:** `https://sonicsbag.poultrycore.com/api/products`
- **Upload:** `https://sonicsbag.poultrycore.com/api/upload`
- **Images:** `https://sonicsbag.poultrycore.com/uploads/filename.jpg`

## Database

✅ Database connection string is configured in `appsettings.json`
✅ Make sure database tables exist (run `database.sql` if not done)

## Troubleshooting

### API Returns 500 Error
- Check Plesk application logs
- Verify database connection
- Check `appsettings.json` is correct

### Images Not Uploading
- Verify `wwwroot/uploads/` folder exists
- Check folder has write permissions
- Review application logs

### CORS Errors
- Verify frontend URL in `AllowedOrigins`
- Restart application after config changes

## Files Ready for Deployment

All files are in: `backend/BagsApi/deployment-package/`

**Total files:** ~50+ DLLs and configuration files

**Key files:**
- `BagsApi.dll` - Main application
- `web.config` - IIS/Plesk configuration  
- `appsettings.json` - Production settings
- `BagsApi.runtimeconfig.json` - Runtime configuration

## Next Steps

1. ✅ Package is ready in `deployment-package/` folder
2. ⏭️ Zip the folder
3. ⏭️ Upload to Plesk
4. ⏭️ Configure application
5. ⏭️ Test endpoints
6. ⏭️ Verify admin panel works

See `PLESK_DEPLOYMENT.md` for detailed step-by-step instructions.
