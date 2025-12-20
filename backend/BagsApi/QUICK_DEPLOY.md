# Quick Plesk Deployment Guide

## ✅ Package Ready!

**Location:** `backend/BagsApi/BagsApi-Plesk-Deployment.zip`

**Size:** ~25-30 MB (compressed)

## 5-Minute Deployment

### Step 1: Upload to Plesk
1. Log into Plesk
2. Go to **File Manager**
3. Navigate to domain root: `sonicsbag.poultrycore.com`
4. Upload `BagsApi-Plesk-Deployment.zip`
5. Extract the zip file

### Step 2: Configure Application
1. Go to **Domains** → **sonicsbag.poultrycore.com** → **Applications**
2. Click **Add Application**
3. Settings:
   ```
   Application Root: /
   Application Type: ASP.NET Core
   Runtime: .NET 8.0
   Startup File: BagsApi.dll
   ```
4. Add Environment Variable:
   ```
   Name: ASPNETCORE_ENVIRONMENT
   Value: Production
   ```

### Step 3: Set Permissions
1. In File Manager, go to `wwwroot/uploads/`
2. Right-click → **Change Permissions**
3. Set: **Full Control** for IIS App Pool user

### Step 4: Test
Visit: `https://sonicsbag.poultrycore.com/api`

Should see: "BagsApi is running"

## Configuration Already Set

✅ Database connection: Configured  
✅ BaseUrl: `https://sonicsbag.poultrycore.com`  
✅ CORS: Frontend URLs allowed  
✅ Frontend: `NEXT_PUBLIC_API_BASE_URL=https://sonicsbag.poultrycore.com`

## After Deployment

1. **Test API:** `https://sonicsbag.poultrycore.com/swagger`
2. **Test Admin:** Login and upload an image
3. **Test Shop:** Verify products appear

## Files Included

- ✅ All DLLs and dependencies (119 files)
- ✅ `BagsApi.dll` - Main application
- ✅ `web.config` - IIS/Plesk config
- ✅ `appsettings.json` - Production config
- ✅ `wwwroot/uploads/` - Upload folder

## Need Help?

See `PLESK_DEPLOYMENT.md` for detailed instructions.
