# Fixing Image 404 Errors - Comprehensive Guide

## Understanding the Error

You're seeing errors like:
```
Failed to load resource: the server responded with a status of 404
Image failed to load: https://sonicsbag.poultrycore.com/uploads/20251221183106-653ef7d1852e4483a401ecefeeaeacc8.jpg
```

This means the browser is trying to load images from `https://sonicsbag.poultrycore.com/uploads/...` but the server returns 404 (file not found).

## Root Causes

### 1. **Files Don't Exist on Production Server** (Most Common)
- Images were uploaded during development locally
- Database contains the image URLs, but files were never copied to production
- The `wwwroot/uploads/` folder on production is empty or doesn't exist

### 2. **Static Files Not Being Served by IIS/Plesk**
- Static file middleware is configured, but IIS intercepts requests
- `web.config` isn't correctly configured
- File permissions are wrong

### 3. **Wrong File Path Configuration**
- Files are saved to a different location than expected
- Static file middleware is looking in the wrong directory

## Step-by-Step Diagnosis & Fix

### Step 1: Verify Files Exist on Production Server

**Via Plesk File Manager:**
1. Log into Plesk
2. Navigate to your API deployment directory
3. Check if `wwwroot/uploads/` folder exists
4. Check if it contains the image files

**Expected structure:**
```
/api-deployment-directory/
  ├── BagsApi.dll
  ├── web.config
  ├── appsettings.json
  └── wwwroot/
      └── uploads/
          ├── 20251221183106-653ef7d1852e4483a401ecefeeaeacc8.jpg
          ├── 20251221183814-bc78493b01c742019a620ec3c9f39ea4.jpg
          └── ... (other image files)
```

**If files don't exist:**
- The images need to be re-uploaded via the admin panel
- OR files need to be manually copied from development to production

### Step 2: Verify Static File Configuration

**Check Program.cs:**
The static files middleware is configured at lines 97-112:
```csharp
var staticFilesOptions = new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(wwwrootPath),
    RequestPath = "", // Files accessible at /uploads/file.jpg
};
app.UseStaticFiles(staticFilesOptions);
```

**Check web.config:**
Ensure `web.config` includes MIME types for images (already updated in deployment-package/web.config)

### Step 3: Test Direct File Access

Try accessing an image directly in your browser:
```
https://sonicsbag.poultrycore.com/uploads/20251221183106-653ef7d1852e4483a401ecefeeaeacc8.jpg
```

**If 404:**
- File doesn't exist on server (most likely)
- OR static file serving isn't working

**If 200:**
- File exists but frontend isn't using correct URL

### Step 4: Check Upload Functionality

1. Go to admin panel: `https://sonicsbag.poultrycore.com/admin`
2. Try uploading a new image
3. Check if the upload succeeds
4. Check if the file appears in `wwwroot/uploads/` on the server
5. Check if you can access it directly via URL

### Step 5: Verify Folder Permissions (Plesk)

The `wwwroot/uploads/` folder needs write permissions:

1. Right-click `wwwroot/uploads/` folder in Plesk File Manager
2. Go to **Properties** → **Permissions**
3. Set **Full Control** for:
   - IIS App Pool user (usually `IIS AppPool\YourAppPoolName`)
   - `IUSR`
   - `IIS_IUSRS` group

### Step 6: Restart Application

After making any changes:
1. In Plesk, go to **Domains** → **Your Domain** → **Applications**
2. Restart your BagsApi application
3. Or restart the Application Pool

## Quick Fix: Re-upload Images

If files don't exist on production, the quickest solution is:

1. **Option A: Re-upload via Admin Panel**
   - Go to admin panel
   - Edit each product/blog post
   - Re-upload the images
   - This will save them to production server

2. **Option B: Copy Files from Development**
   - Copy entire `wwwroot/uploads/` folder from local development
   - Upload via Plesk File Manager to production
   - Ensure folder permissions are set correctly

## Testing the Fix

After applying fixes:

1. **Test Upload:**
   ```bash
   # Upload a test image via admin panel
   # Verify it appears in wwwroot/uploads/ on server
   ```

2. **Test Access:**
   ```bash
   # Try accessing directly:
   https://sonicsbag.poultrycore.com/uploads/TEST_FILENAME.jpg
   # Should return 200 OK, not 404
   ```

3. **Test Frontend:**
   - Refresh your frontend page
   - Check browser console - no more 404 errors
   - Images should display correctly

## Diagnostic Endpoint

I've added a diagnostic endpoint in `Program.cs` that checks if files exist:
```
GET /api/diagnostics/files?path=uploads/filename.jpg
```

This will help verify if files are accessible.

## Common Issues & Solutions

### Issue: "Files exist but still 404"
**Solution:** 
- Check `web.config` has correct MIME types
- Restart application pool
- Verify `RequestPath = ""` in Program.cs

### Issue: "Upload fails with permission error"
**Solution:**
- Set folder permissions (see Step 5)
- Ensure IIS App Pool user has Full Control

### Issue: "Files upload but wrong URL returned"
**Solution:**
- Check `BaseUrl` in `appsettings.Production.json`
- Should be: `"https://sonicsbag.poultrycore.com"`
- Restart application after changing config

### Issue: "Some images work, others don't"
**Solution:**
- Old images might be from development server
- Re-upload the broken images via admin panel
- Or copy missing files to production

## Prevention for Future

To prevent this in the future:

1. **Always upload images directly on production** after deployment
2. **Set up automated file sync** if using multiple environments
3. **Include wwwroot/uploads in deployment** (even if empty) to ensure folder structure exists
4. **Use a cloud storage service** (Azure Blob, AWS S3) instead of local filesystem

## Still Not Working?

If images still don't work after following all steps:

1. **Check Plesk Logs:**
   - Go to Plesk → Logs
   - Look for errors related to file access

2. **Check Application Logs:**
   - Check stdout logs: `logs/stdout` (if enabled)
   - Look for upload errors or file access errors

3. **Verify Deployment:**
   - Ensure `wwwroot/` folder is included in deployment
   - Ensure `web.config` is in deployment root
   - Ensure all DLLs are present

4. **Test with Simple File:**
   - Create a simple `test.txt` in `wwwroot/uploads/`
   - Try accessing: `https://sonicsbag.poultrycore.com/uploads/test.txt`
   - If this works, the issue is with image files specifically
   - If this doesn't work, static file serving isn't configured correctly
