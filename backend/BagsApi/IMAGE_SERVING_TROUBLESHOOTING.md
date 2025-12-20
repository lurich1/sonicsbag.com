# Image Serving Troubleshooting Guide

## Issue: Images returning 404 errors

When you see errors like:
```
GET https://sonicsbag.poultrycore.com/uploads/20251220175122-7e2f77781d4045e382d3fc3c106e6c4c.jpg 404 (Not Found)
```

This means the image file cannot be found at that URL.

## Possible Causes & Solutions

### 1. Backend API Not Deployed

**Check:** Is the backend API running on `https://sonicsbag.poultrycore.com`?

**Solution:** 
- Deploy the backend API to Plesk following `PLESK_DEPLOYMENT.md`
- Ensure the API is accessible at `https://sonicsbag.poultrycore.com/api`
- Test: `https://sonicsbag.poultrycore.com/api` should return "BagsApi is running"

### 2. Static Files Not Configured in IIS/Plesk

**Check:** Are static files being served correctly?

**Solution:**
- The `Program.cs` already has `app.UseStaticFiles()` configured
- In Plesk, ensure the application is configured correctly:
  - Application Root: `/` (or `/api` if deployed in subfolder)
  - Make sure `wwwroot` folder is included in deployment

### 3. Uploads Folder Doesn't Exist or Missing Permissions

**Check:** Does the `wwwroot/uploads/` folder exist on the server?

**Solution:**
1. Log into Plesk File Manager
2. Navigate to where the API is deployed
3. Check if `wwwroot/uploads/` folder exists
4. If it doesn't exist, create it:
   - Create `wwwroot` folder if missing
   - Inside `wwwroot`, create `uploads` folder
5. Set folder permissions:
   - Right-click `wwwroot/uploads/` → Properties → Permissions
   - Give **Full Control** to IIS App Pool user (usually `IIS AppPool\YourAppPoolName`)
   - Also give **Modify** permissions to `IUSR` user

### 4. Files Not Actually Uploaded

**Check:** Was the upload successful?

**Solution:**
1. Check backend API logs after uploading
2. Verify the upload endpoint returned a URL successfully
3. Check if the file actually exists in `wwwroot/uploads/` on the server

### 5. Wrong Base URL Configuration

**Check:** Is `BaseUrl` in `appsettings.json` correct?

**Current setting in `appsettings.Production.json`:**
```json
"BaseUrl": "https://sonicsbag.poultrycore.com"
```

**Solution:**
- If API is deployed at root: `https://sonicsbag.poultrycore.com`
- If API is deployed in `/api` subfolder: `https://sonicsbag.poultrycore.com/api`
- Update `appsettings.json` accordingly and restart the application

## Quick Diagnostic Steps

### Step 1: Test API Health
```bash
curl https://sonicsbag.poultrycore.com/api
# Should return: "BagsApi is running"
```

### Step 2: Test Upload Endpoint
```bash
curl -X POST https://sonicsbag.poultrycore.com/api/upload \
  -F "file=@test-image.jpg" \
  -H "Authorization: Bearer YOUR_TOKEN"
# Should return: {"url": "https://sonicsbag.poultrycore.com/uploads/..."}
```

### Step 3: Test Image Access
```bash
curl -I https://sonicsbag.poultrycore.com/uploads/TEST_FILENAME.jpg
# Should return: 200 OK (not 404)
```

### Step 4: Check File System
1. SSH or use Plesk File Manager
2. Navigate to API deployment directory
3. Check: `wwwroot/uploads/` exists
4. Check: Files are in the folder
5. Check: Folder has write permissions

## Common Plesk Issues

### Issue: Application deployed but files in wrong location

**Solution:** Ensure all files from `deployment-package/` are uploaded, including:
- `BagsApi.dll`
- `wwwroot/` folder (with `uploads/` subfolder)
- `appsettings.json`
- All DLLs

### Issue: IIS serving static files but not from wwwroot

**Solution:** The `UseStaticFiles()` middleware should handle this. If not working:
1. Check `web.config` is present
2. Verify application pool is running
3. Check IIS logs for errors

### Issue: 404 for /uploads/ but API works

**Solution:** This suggests static files middleware isn't working:
1. Verify `Program.cs` has `app.UseStaticFiles()` before `app.UseRouting()`
2. Check that `wwwroot` folder is in the deployment
3. Try accessing `https://sonicsbag.poultrycore.com/wwwroot/uploads/...` (if this works, the path configuration is wrong)

## Verification Checklist

- [ ] Backend API is deployed and accessible
- [ ] `wwwroot/uploads/` folder exists on server
- [ ] Folder has proper write permissions
- [ ] `BaseUrl` in `appsettings.json` matches deployment URL
- [ ] Upload endpoint successfully saves files
- [ ] Files appear in `wwwroot/uploads/` after upload
- [ ] Static files middleware is enabled (`UseStaticFiles()`)
- [ ] Application is restarted after configuration changes

## Still Not Working?

If images still don't work after checking all above:

1. **Check Plesk Application Logs:**
   - Go to Plesk → Domains → Your Domain → Logs
   - Look for errors related to file access or static files

2. **Check Backend API Logs:**
   - Check application logs for upload errors
   - Verify file path is correct

3. **Test Locally First:**
   - Upload an image in development
   - Verify it's saved to `wwwroot/uploads/`
   - Verify it's accessible at `http://localhost:5000/uploads/filename.jpg`

4. **Contact Support:**
   - Share Plesk application logs
   - Share backend API logs
   - Share the exact error message and URL
