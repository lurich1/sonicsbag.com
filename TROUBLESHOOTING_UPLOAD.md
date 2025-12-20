# Troubleshooting Image Upload

If you're getting a 500 error when uploading images, follow these steps:

## 1. Check Backend API is Running

Make sure the backend API is running:
```bash
cd backend/BagsApi
dotnet run
```

You should see:
```
Now listening on: http://localhost:5000
```

## 2. Verify Environment Variable

Make sure your `.env.local` file has:
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

## 3. Check Backend Logs

When you try to upload, check the backend terminal for error messages. Common issues:

- **Directory permissions**: The backend needs write permissions to create `wwwroot/uploads/`
- **Missing wwwroot folder**: The backend should create this automatically, but verify it exists

## 4. Check Browser Console

Open browser DevTools (F12) and check:
- Network tab: Look at the `/api/admin/upload` request
  - Check the response status and error message
  - Check if the request is reaching the backend

## 5. Verify File Size and Type

The backend only accepts:
- File types: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`
- Max file size: 10MB

## 6. Common Fixes

### Fix 1: Create wwwroot folder manually
```bash
cd backend/BagsApi
mkdir wwwroot
mkdir wwwroot\uploads
```

### Fix 2: Check Backend Logs for Specific Errors
Look for errors like:
- "Access to the path is denied" → Permission issue
- "Directory not found" → Create wwwroot/uploads manually
- Connection errors → Backend not running

### Fix 3: Verify CORS is Working
The backend should allow requests from `http://localhost:3000`. Check `appsettings.json`:
```json
{
  "AllowedOrigins": [
    "http://localhost:3000"
  ]
}
```

## Still Having Issues?

1. Check the backend terminal output when you try to upload
2. Check the browser console (F12) for detailed error messages
3. Verify the backend API is accessible: Visit `http://localhost:5000/swagger`
