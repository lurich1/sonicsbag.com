# Frontend-Backend Integration Guide

This guide explains how the Next.js frontend integrates with the .NET backend API.

## Architecture Overview

- **Frontend**: Next.js 16 (runs on `http://localhost:3000`)
- **Backend**: ASP.NET Core Web API (runs on `http://localhost:5000`)
- **Database**: SQL Server

## Setup Instructions

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend/BagsApi
   ```

2. Update `appsettings.json` with your database connection string:
   ```json
   {
     "ConnectionStrings": {
       "BagsConn": "Server=YOUR_SERVER;Database=YOUR_DATABASE;User Id=YOUR_USER;Password=YOUR_PASSWORD;MultipleActiveResultSets=true;Encrypt=True;TrustServerCertificate=True;"
     },
     "BaseUrl": "http://localhost:5000"
   }
   ```

3. Run the SQL script to create database tables:
   - Execute `database.sql` in your SQL Server database

4. Start the backend API:
   ```bash
   dotnet restore
   dotnet run
   ```

   The API will be available at `http://localhost:5000`
   Swagger UI: `http://localhost:5000/swagger`

### 2. Frontend Setup

1. Navigate to the root directory:
   ```bash
   cd ../..  # Back to project root
   ```

2. Create `.env.local` file (if it doesn't exist):
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
   ```

3. Install dependencies and run:
   ```bash
   npm install
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

## How It Works

### API Communication

The frontend communicates with the backend through Next.js API routes that act as proxies:

1. **Public Endpoints** (Products, Blog Posts):
   - Components directly fetch from backend: `fetch(apiConfig.endpoints.products)`
   - Examples: `ProductGrid`, `ProductPage`

2. **Admin Endpoints** (Protected):
   - Next.js API routes (`/api/admin/*`) handle authentication
   - They proxy requests to the backend API
   - Examples: `/app/api/admin/products/route.ts`

### Data Flow

```
Frontend Component
    ↓
Next.js API Route (for admin) OR Direct fetch (for public)
    ↓
.NET Backend API
    ↓
SQL Server Database
```

### Image Uploads

1. Admin uploads image via frontend form
2. Frontend sends file to `/api/admin/upload`
3. Next.js API route proxies to backend `/api/upload`
4. Backend saves file to `wwwroot/uploads/`
5. Backend returns public URL: `http://localhost:5000/uploads/filename.jpg`
6. Frontend uses this URL when creating/updating products

## Environment Variables

### Frontend (`.env.local`)

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

For production, update this to your backend URL:
```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com
```

### Backend (`appsettings.json`)

```json
{
  "BaseUrl": "http://localhost:5000",
  "AllowedOrigins": [
    "https://your-frontend-domain.com"
  ]
}
```

## Key Files

### Frontend
- `lib/api.ts` - API configuration and helper functions
- `app/api/admin/products/route.ts` - Product API proxy
- `app/api/admin/upload/route.ts` - Upload API proxy
- `components/product-grid.tsx` - Fetches products from backend
- `app/product/[id]/page.tsx` - Fetches single product from backend

### Backend
- `Controllers/ProductsController.cs` - Product endpoints
- `Controllers/UploadController.cs` - Image upload endpoint
- `Services/ProductService.cs` - Product business logic
- `Data/BagsDbContext.cs` - Database context

## Testing

1. **Start Backend**:
   ```bash
   cd backend/BagsApi
   dotnet run
   ```

2. **Start Frontend**:
   ```bash
   npm run dev
   ```

3. **Test Products**:
   - Visit `http://localhost:3000/shop` - should show products from database
   - Visit `http://localhost:3000/admin/products` - admin can manage products

4. **Test Image Upload**:
   - Go to admin products page
   - Create/edit a product
   - Upload an image
   - Image should be saved and URL returned

## Troubleshooting

### CORS Errors

If you see CORS errors, ensure:
- Backend `appsettings.json` includes your frontend URL in `AllowedOrigins`
- Backend CORS middleware is properly configured in `Program.cs`

### Images Not Loading

- Check that backend `BaseUrl` in `appsettings.json` is correct
- Verify `wwwroot/uploads/` directory exists on backend
- Ensure static files middleware is enabled in `Program.cs`

### Database Connection Issues

- Verify connection string in `appsettings.json`
- Ensure SQL Server is running
- Check that database and tables exist (run `database.sql`)

## Production Deployment

### Backend

1. Update `appsettings.Production.json`:
   ```json
   {
     "ConnectionStrings": {
       "BagsConn": "YOUR_PRODUCTION_CONNECTION_STRING"
     },
     "BaseUrl": "https://your-api-domain.com"
   }
   ```

2. Deploy to your hosting platform (Azure, AWS, etc.)

### Frontend

1. Update `.env.local` or environment variables:
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com
   ```

2. Deploy to Vercel, Netlify, etc.

## Notes

- The backend API doesn't currently implement authentication - it relies on the Next.js frontend to handle admin authentication via cookies/tokens
- For production, consider implementing proper JWT authentication in the backend
- Image uploads are stored on the backend server - consider using cloud storage (Azure Blob, S3) for production
