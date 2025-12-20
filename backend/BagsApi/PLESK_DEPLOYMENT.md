# Plesk Deployment Guide for BagsApi

## Prerequisites

- .NET 8.0 Runtime installed on Plesk server
- SQL Server database accessible from Plesk server
- Plesk hosting with ASP.NET Core support

## Step 1: Build and Publish the API

The API has been published to: `backend/BagsApi/publish/`

**Files to deploy:**
- All files in the `publish/` folder
- `appsettings.Production.json` (rename to `appsettings.json` on server)
- `web.config` (for IIS/Plesk)

## Step 2: Prepare Files for Upload

### Files Structure on Plesk:
```
/your-domain/api/
├── BagsApi.dll
├── web.config
├── appsettings.json (renamed from appsettings.Production.json)
├── wwwroot/
│   └── uploads/ (create this folder)
└── [all other DLLs and dependencies]
```

## Step 3: Upload to Plesk

1. **Create the application directory** on Plesk:
   - Go to Plesk → Domains → Your Domain
   - Create folder: `api` or `bagsapi`

2. **Upload all files** from `publish/` folder:
   - Use FTP, File Manager, or Plesk File Manager
   - Upload all files maintaining the folder structure

3. **Create uploads folder:**
   - Create `wwwroot/uploads/` folder
   - Set permissions: Read/Write for IIS App Pool user

4. **Rename configuration:**
   - Rename `appsettings.Production.json` to `appsettings.json`
   - Or keep both and ensure Production is used

## Step 4: Configure Plesk Application

1. **Go to Plesk → Domains → Your Domain → Applications**

2. **Add Application:**
   - Application Root: `/api` (or your folder)
   - Application Type: ASP.NET Core
   - Runtime: .NET 8.0
   - Startup File: `BagsApi.dll`

3. **Set Environment:**
   - Environment Variable: `ASPNETCORE_ENVIRONMENT=Production`

4. **Configure Binding:**
   - Domain: `sonicsbag.poultrycore.com`
   - Path: `/api` (optional, or root `/`)
   - Protocol: HTTPS

## Step 5: Update appsettings.json on Server

Edit `appsettings.json` on the server to ensure:

```json
{
  "ConnectionStrings": {
    "BagsConn": "Server=195.250.26.22;Database=poultry2_Prod;User Id=poultry2_ProdUser;Password=Techretainer@77;MultipleActiveResultSets=true;Encrypt=True;TrustServerCertificate=True;"
  },
  "BaseUrl": "https://sonicsbag.poultrycore.com",
  "AllowedOrigins": [
    "https://sonicsbag.poultrycore.com",
    "https://sonicsbag-com.vercel.app"
  ]
}
```

## Step 6: Configure IIS/Plesk Settings

1. **Application Pool:**
   - .NET CLR Version: No Managed Code
   - Managed Pipeline Mode: Integrated
   - Start Mode: AlwaysRunning (optional)

2. **Permissions:**
   - `wwwroot/uploads/` folder: Full Control for IIS App Pool user
   - Application folder: Read/Execute for IIS App Pool user

3. **URL Rewrite (if needed):**
   - Ensure `web.config` is in place
   - Plesk should handle ASP.NET Core routing automatically

## Step 7: Test the Deployment

1. **Test API Health:**
   ```
   https://sonicsbag.poultrycore.com/api
   ```
   Should return: "BagsApi is running"

2. **Test Swagger:**
   ```
   https://sonicsbag.poultrycore.com/api/swagger
   ```
   Should show Swagger UI

3. **Test Products Endpoint:**
   ```
   https://sonicsbag.poultrycore.com/api/api/products
   ```
   (Note: double `/api` if deployed to `/api` folder)

## Step 8: Configure Frontend

The frontend is already configured with:
```env
NEXT_PUBLIC_API_BASE_URL=https://sonicsbag.poultrycore.com
```

**If deployed to `/api` subfolder:**
```env
NEXT_PUBLIC_API_BASE_URL=https://sonicsbag.poultrycore.com/api
```

## Important Notes

### URL Structure

If you deploy to root (`/`):
- API: `https://sonicsbag.poultrycore.com/api/products`
- Swagger: `https://sonicsbag.poultrycore.com/swagger`

If you deploy to `/api` folder:
- API: `https://sonicsbag.poultrycore.com/api/api/products`
- Swagger: `https://sonicsbag.poultrycore.com/api/swagger`

**Recommendation:** Deploy to root (`/`) to avoid double `/api` in URLs.

### Database

Ensure:
- Database tables exist (run `database.sql` on SQL Server)
- Connection string is correct
- SQL Server allows connections from Plesk server IP

### Static Files

- `wwwroot/uploads/` must exist
- Folder must have write permissions
- Images will be served from: `https://sonicsbag.poultrycore.com/uploads/filename.jpg`

## Troubleshooting

### API Not Starting

1. Check Plesk logs: `logs/` folder
2. Check Application Pool is running
3. Verify .NET 8.0 Runtime is installed
4. Check `appsettings.json` connection string

### Images Not Uploading

1. Verify `wwwroot/uploads/` folder exists
2. Check folder permissions (IIS App Pool needs Write access)
3. Check disk space on server
4. Review application logs for errors

### CORS Errors

1. Verify frontend URL is in `AllowedOrigins`
2. Restart application after changing appsettings
3. Check browser console for specific CORS error

### 404 Errors

1. Check URL path (may need `/api` prefix)
2. Verify `web.config` is present
3. Check Application Pool configuration
4. Review IIS/Plesk logs

## Quick Deployment Checklist

- [ ] Build published to `publish/` folder
- [ ] All files uploaded to Plesk
- [ ] `wwwroot/uploads/` folder created with permissions
- [ ] `appsettings.json` configured with production settings
- [ ] Application Pool configured for .NET 8.0
- [ ] Environment variable `ASPNETCORE_ENVIRONMENT=Production` set
- [ ] Database connection tested
- [ ] API health endpoint works
- [ ] Swagger UI accessible
- [ ] Image upload tested
- [ ] Frontend configured with correct API URL

## Support

If issues persist:
1. Check Plesk application logs
2. Check Windows Event Viewer
3. Enable detailed error pages in `web.config`
4. Test database connection separately
5. Verify all dependencies are present
