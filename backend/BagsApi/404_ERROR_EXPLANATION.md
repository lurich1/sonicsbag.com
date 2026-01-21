# Understanding the 404 Image Errors

## The Error

You're seeing these errors in your browser console:
```
Failed to load resource: the server responded with a status of 404
Image failed to load: https://sonicsbag.poultrycore.com/uploads/20251221183106-653ef7d1852e4483a401ecefeeaeacc8.jpg
```

## What This Means

The browser is trying to load images from `https://sonicsbag.poultrycore.com/uploads/...` but the server is returning a 404 (Not Found) error. This means the image files don't exist at that location.

## Most Likely Cause

**The image files were uploaded during development (locally) and were never copied to the production server.**

Here's what probably happened:
1. Images were uploaded via the admin panel on your local development machine
2. The files were saved to `wwwroot/uploads/` on your local machine
3. The database was updated with the image URLs (e.g., `https://sonicsbag.poultrycore.com/uploads/filename.jpg`)
4. Only the database was deployed to production, not the image files
5. The production server's `wwwroot/uploads/` folder is empty or doesn't exist
6. When the frontend tries to load images, they don't exist, causing 404 errors

## How to Fix It

### Option 1: Re-upload Images via Admin Panel (Recommended)
1. Go to your admin panel: `https://sonicsbag.poultrycore.com/admin`
2. Edit each product/blog post that has a broken image
3. Re-upload the images
4. This will save them directly to the production server

### Option 2: Copy Files from Development to Production
1. Copy the entire `wwwroot/uploads/` folder from your local development
2. Upload it to the production server via Plesk File Manager
3. Ensure the folder is at: `/api-deployment-directory/wwwroot/uploads/`
4. Set proper folder permissions (see IMAGE_404_FIX.md)

### Option 3: Use Diagnostic Endpoint
I've added a diagnostic endpoint to help check file existence:
```
GET https://sonicsbag.poultrycore.com/api/diagnostics/files
```
This will show you:
- If the `wwwroot/uploads/` folder exists
- What files are in the folder
- The file paths being used

You can also check a specific file:
```
GET https://sonicsbag.poultrycore.com/api/diagnostics/files?path=uploads/filename.jpg
```

## What I've Fixed

1. **Updated web.config**: Added explicit MIME types for image files to ensure IIS serves them correctly
2. **Added diagnostic endpoint**: `/api/diagnostics/files` to help troubleshoot file issues
3. **Created comprehensive guide**: `IMAGE_404_FIX.md` with step-by-step troubleshooting

## Next Steps

1. **Check if files exist on production:**
   - Visit: `https://sonicsbag.poultrycore.com/api/diagnostics/files`
   - This will tell you if the `uploads/` folder exists and what files are in it

2. **If files don't exist:**
   - Re-upload images via admin panel (easiest)
   - OR copy files from development to production

3. **After uploading/copying files:**
   - Restart the application in Plesk
   - Refresh your frontend page
   - Images should now load correctly

## Prevention for Future

To prevent this in the future:
- Always upload images directly on production after deployment
- Consider using cloud storage (Azure Blob, AWS S3) instead of local filesystem
- Set up automated file sync between environments

For detailed troubleshooting steps, see `IMAGE_404_FIX.md`.
