# How to Upload Images and Create Products via Swagger

## Step-by-Step Guide

### Step 1: Upload the Image

1. Navigate to Swagger UI: `http://localhost:5000/swagger` (or your production URL)
2. Find the **`/api/upload`** endpoint (UploadController)
3. Click on **POST /api/upload**
4. Click **"Try it out"**
5. Click **"Choose File"** and select your image file
6. Click **"Execute"**
7. Copy the `url` from the response:

```json
{
  "url": "http://localhost:5000/uploads/20241220123456-abc123def456.jpg"
}
```

### Step 2: Create Product with Image URL

1. Find the **`/api/Products`** endpoint (ProductsController)
2. Click on **POST /api/Products**
3. Click **"Try it out"**
4. In the Request body, use this format:

```json
{
  "id": 0,
  "name": "My Product Name",
  "price": 40.00,
  "imageUrl": "http://localhost:5000/uploads/20241220123456-abc123def456.jpg",
  "category": "Backpacks",
  "description": "Product description here"
}
```

**Important Notes:**
- Replace the `imageUrl` with the actual URL from Step 1
- Use `http://localhost:5000/uploads/...` for local development
- Use your production domain for production (e.g., `https://sonicsbag.poultrycore.com/uploads/...`)
- Do NOT use local file paths like `C:\Users\...` - these won't work!

5. Click **"Execute"**

## Common Errors

### ❌ Error: Invalid escapable character
**Problem:** Using a local file path with backslashes
```json
"imageUrl": "C:\Users\...\image.png"  // ❌ WRONG
```

**Solution:** Upload the image first and use the returned URL
```json
"imageUrl": "http://localhost:5000/uploads/filename.jpg"  // ✅ CORRECT
```

### ❌ Error: The product field is required
**Problem:** Wrong JSON structure
**Solution:** Make sure you're sending the product object directly, not wrapped

## Quick Reference

**Upload Endpoint:** `POST /api/upload`
- Accepts: `multipart/form-data` with `file` field
- Returns: `{ "url": "..." }`

**Create Product Endpoint:** `POST /api/Products`
- Accepts: JSON with Product object
- Fields: `name`, `price`, `imageUrl`, `category`, `description`
- Returns: Created Product object with ID

