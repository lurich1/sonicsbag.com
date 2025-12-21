# Correct Folder Structure for Plesk Deployment

## ✅ CORRECT Structure (What Should Be on Plesk)

```
your-api-folder/
├── BagsApi.dll
├── web.config
├── appsettings.json
├── wwwroot/                    ← This folder
│   └── uploads/                ← Images go here
│       └── (uploaded images)
└── (other DLLs and files)
```

## ❌ WRONG Structure (What's Currently Happening)

```
your-api-folder/
├── BagsApi.dll
├── web.config
├── appsettings.json
├── wwwroot/
│   └── wwwroot/                ← WRONG! Double wwwroot
│       └── uploads/
│           └── (uploaded images)
```

## What to Upload to Plesk

**Upload the entire `deployment-package` folder contents to Plesk.**

The `deployment-package` folder should contain:
- ✅ `wwwroot/uploads/` folder (correct location)
- ✅ All DLLs
- ✅ `web.config`
- ✅ `appsettings.json`

## After Uploading to Plesk

1. **Verify folder structure:**
   - Check that `wwwroot/uploads/` exists (NOT `wwwroot/wwwroot/uploads/`)

2. **If you see `wwwroot/wwwroot/uploads/`:**
   - This means files were uploaded with the old buggy code
   - Delete the inner `wwwroot` folder
   - Move files from `wwwroot/wwwroot/uploads/` to `wwwroot/uploads/`
   - Or just delete `wwwroot/wwwroot/` entirely

3. **Set permissions:**
   - Right-click `wwwroot/uploads/` folder
   - Give **Full Control** to IIS App Pool user

4. **Restart the application** in Plesk

## Expected File Paths

**When uploading an image:**
- File should be saved to: `wwwroot/uploads/filename.jpg`
- File should be accessible at: `https://sonicsbag.poultrycore.com/uploads/filename.jpg`

**NOT:**
- ❌ `wwwroot/wwwroot/uploads/filename.jpg` (wrong location)
- ❌ `https://sonicsbag.poultrycore.com/wwwroot/uploads/filename.jpg` (wrong URL)
