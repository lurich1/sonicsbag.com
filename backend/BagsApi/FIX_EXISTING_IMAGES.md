# How to Fix Existing Images on Plesk Server

## Problem
Images are returning 404 because they're in the wrong location:
- ❌ Wrong: `wwwroot/wwwroot/uploads/filename.jpg`
- ✅ Correct: `wwwroot/uploads/filename.jpg`

## Solution: Move Files to Correct Location

### Option 1: Using Plesk File Manager

1. **Log into Plesk File Manager**

2. **Navigate to your API deployment folder**

3. **Check if `wwwroot/wwwroot/uploads/` exists:**
   - If yes, files are in the wrong location
   - If no, files might not exist at all

4. **Move files to correct location:**
   - Go to `wwwroot/wwwroot/uploads/` folder
   - Select all image files (Ctrl+A)
   - Cut them (Ctrl+X)
   - Navigate to `wwwroot/uploads/` folder
   - Paste them (Ctrl+V)

5. **Delete the empty `wwwroot/wwwroot/` folder**

### Option 2: Using FTP/SSH

```bash
# Navigate to your API folder
cd /path/to/your/api

# Move files from wrong location to correct location
mv wwwroot/wwwroot/uploads/*.jpg wwwroot/uploads/
mv wwwroot/wwwroot/uploads/*.png wwwroot/uploads/
mv wwwroot/wwwroot/uploads/*.jpeg wwwroot/uploads/
mv wwwroot/wwwroot/uploads/*.gif wwwroot/uploads/
mv wwwroot/wwwroot/uploads/*.webp wwwroot/uploads/

# Remove the empty double wwwroot folder
rm -rf wwwroot/wwwroot/
```

### Option 3: Delete and Re-upload

1. **Delete all images from the wrong location:**
   - Delete `wwwroot/wwwroot/uploads/` folder entirely

2. **Re-upload images via admin panel:**
   - With the fixed code, new uploads will go to the correct location
   - `wwwroot/uploads/`

## Verify Correct Structure

After fixing, your folder structure should be:

```
your-api-folder/
├── BagsApi.dll
├── web.config
├── appsettings.json
├── wwwroot/
│   └── uploads/          ← Images here (correct)
│       ├── image1.jpg
│       ├── image2.png
│       └── ...
```

**NOT:**
```
your-api-folder/
├── wwwroot/
│   └── wwwroot/          ← This should NOT exist
│       └── uploads/
```

## After Moving Files

1. **Restart the application** in Plesk
2. **Test an image URL:**
   - `https://sonicsbag.poultrycore.com/uploads/filename.jpg`
   - Should return 200 OK (not 404)

3. **Upload a new test image:**
   - Should save to `wwwroot/uploads/` (correct location)
   - Should be accessible immediately

## Prevention

The code has been fixed to prevent this issue. After redeploying with the new code:
- New uploads will go to the correct location: `wwwroot/uploads/`
- Old files in `wwwroot/wwwroot/uploads/` need to be moved manually (see above)
