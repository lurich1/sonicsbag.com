# Fix Image 404 Errors on Plesk - Step by Step Guide

## Current Issue
Images are returning 404: `https://sonicsbag.poultrycore.com/uploads/filename.jpg`

## Root Cause
The `wwwroot/uploads` folder either:
1. Doesn't exist on the server
2. Files aren't being uploaded correctly
3. Static files aren't being served by IIS

## Step-by-Step Fix

### Step 1: Verify Backend API is Running
1. Visit: `https://sonicsbag.poultrycore.com/api`
2. Should see: "BagsApi is running"
3. If not, the API isn't deployed or running

### Step 2: Check wwwroot Folder Exists
1. Log into Plesk File Manager
2. Navigate to where your API is deployed
3. Check if `wwwroot` folder exists
4. Check if `wwwroot/uploads` folder exists

**If missing:**
- Create `wwwroot` folder
- Create `wwwroot/uploads` folder inside it
- Set permissions: **Full Control** for IIS App Pool user

### Step 3: Verify Files Are Actually Uploaded
1. Upload a new image via admin panel
2. Check Plesk File Manager immediately after
3. Look in `wwwroot/uploads/` folder
4. **Is the file there?**
   - ✅ **YES**: Files are uploading, but not being served (go to Step 4)
   - ❌ **NO**: Upload is failing (check Step 5)

### Step 4: Fix Static Files Serving (If files exist but 404)

**Option A: Update web.config**
1. In Plesk File Manager, open `web.config`
2. Ensure it has this content:
```xml
<?xml version="1.0" encoding="utf-8"?>
<configuration>
  <location path="." inheritInChildApplications="false">
    <system.webServer>
      <handlers>
        <add name="aspNetCore" path="*" verb="*" modules="AspNetCoreModuleV2" resourceType="Unspecified" />
      </handlers>
      <aspNetCore processPath="dotnet" arguments=".\BagsApi.dll" stdoutLogEnabled="false" stdoutLogFile=".\logs\stdout" hostingModel="inprocess" />
      <staticContent>
        <mimeMap fileExtension=".jpg" mimeType="image/jpeg" />
        <mimeMap fileExtension=".jpeg" mimeType="image/jpeg" />
        <mimeMap fileExtension=".png" mimeType="image/png" />
        <mimeMap fileExtension=".gif" mimeType="image/gif" />
        <mimeMap fileExtension=".webp" mimeType="image/webp" />
      </staticContent>
    </system.webServer>
  </location>
</configuration>
```

**Option B: Check Application Pool**
1. In Plesk, go to **Domains** → **Your Domain** → **Applications**
2. Find your BagsApi application
3. Check Application Pool is running
4. Restart the application pool

### Step 5: Fix Upload Issues (If files aren't being saved)

**Check Permissions:**
1. Right-click `wwwroot/uploads/` folder
2. Properties → Permissions
3. Give **Full Control** to:
   - IIS App Pool user (usually `IIS AppPool\YourAppPoolName`)
   - `IUSR` user
   - `IIS_IUSRS` group

**Check Application Logs:**
1. In Plesk, go to **Logs**
2. Check for errors related to file uploads
3. Look for permission denied errors

### Step 6: Test Direct File Access
1. Upload a test image: `test-image.jpg`
2. Try accessing directly: `https://sonicsbag.poultrycore.com/uploads/test-image.jpg`
3. **If 404:**
   - File might be in wrong location
   - Check if file exists in `wwwroot/uploads/`
   - Check file name matches exactly

### Step 7: Verify Deployment Package
Ensure your deployment includes:
- ✅ `BagsApi.dll`
- ✅ `web.config`
- ✅ `appsettings.json`
- ✅ `wwwroot/uploads/` folder (even if empty)

## Quick Diagnostic Commands (If you have SSH access)

```bash
# Check if wwwroot exists
ls -la wwwroot/

# Check if uploads folder exists
ls -la wwwroot/uploads/

# Check permissions
ls -la wwwroot/uploads/ | head -5

# Check if files are there
ls -la wwwroot/uploads/*.jpg
```

## Common Issues & Solutions

### Issue: "Files upload but return 404"
**Solution:** Static files middleware isn't working. Check:
- `web.config` is correct
- Application is restarted
- `wwwroot` folder is in deployment

### Issue: "Upload fails with permission error"
**Solution:** Set folder permissions:
- Full Control for IIS App Pool user
- Modify for IUSR

### Issue: "Files saved but in wrong location"
**Solution:** Check UploadController path logic. Files should be in:
- `wwwroot/uploads/filename.jpg` (correct)
- NOT `wwwroot/wwwroot/uploads/filename.jpg` (wrong)

## After Fixing

1. **Restart the application** in Plesk
2. **Upload a new test image**
3. **Check it appears** in `wwwroot/uploads/`
4. **Test the URL** directly in browser
5. **Verify it displays** on the frontend

## Still Not Working?

1. Check Plesk application logs for errors
2. Verify the API is actually running (`/api` endpoint)
3. Test upload endpoint directly via Swagger: `https://sonicsbag.poultrycore.com/swagger`
4. Check if files are being saved to a different location than expected
