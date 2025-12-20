# BagsApi Backend

ASP.NET Core Web API for the SONCIS Bags e-commerce platform.

## Prerequisites

- .NET 8.0 SDK or later
- SQL Server (or SQL Server Express)
- Visual Studio 2022 or VS Code with C# extension

## Setup

1. **Update Connection String**

   Edit `appsettings.json` and update the connection string:
   ```json
   {
     "ConnectionStrings": {
       "BagsConn": "Server=YOUR_SERVER;Database=YOUR_DATABASE;User Id=YOUR_USER;Password=YOUR_PASSWORD;MultipleActiveResultSets=true;Encrypt=True;TrustServerCertificate=True;"
     },
     "BaseUrl": "http://localhost:5000"
   }
   ```

2. **Create Database Tables**

   Run the SQL script `database.sql` in your SQL Server database to create the required tables:
   - Products
   - Orders
   - BlogPosts

3. **Run Entity Framework Migrations (Optional)**

   If you prefer using EF Migrations instead of the SQL script:
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

4. **Run the API**

   ```bash
   cd backend/BagsApi
   dotnet restore
   dotnet run
   ```

   The API will be available at:
   - HTTP: `http://localhost:5000`
   - HTTPS: `https://localhost:5001`
   - Swagger UI: `http://localhost:5000/swagger`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/{id}` - Update product (admin only)
- `DELETE /api/products/{id}` - Delete product (admin only)

### Orders
- `GET /api/orders` - Get all orders (admin only)
- `GET /api/orders/{id}` - Get order by ID (admin only)
- `POST /api/orders` - Create order
- `PUT /api/orders/{id}/status` - Update order status (admin only)

### Blog Posts
- `GET /api/blog` - Get all blog posts
- `GET /api/blog/{id}` - Get blog post by ID
- `POST /api/blog` - Create blog post (admin only)
- `PUT /api/blog/{id}` - Update blog post (admin only)
- `DELETE /api/blog/{id}` - Delete blog post (admin only)

### Upload
- `POST /api/upload` - Upload image file (admin only)

## Static Files

Uploaded images are stored in `wwwroot/uploads/` and served at `/uploads/{filename}`.

Make sure the `wwwroot` folder exists. It will be created automatically when you upload the first image.

## CORS

The API is configured to allow requests from:
- `http://localhost:3000`
- `https://localhost:3000`
- URLs specified in `appsettings.json` under `AllowedOrigins`

## Notes

- The API uses Entity Framework Core with SQL Server
- Images are uploaded to the server's `wwwroot/uploads/` directory
- Admin authentication is handled by the Next.js frontend (via cookies/tokens)
- Update the `BaseUrl` in `appsettings.json` to match your deployment URL for correct image URLs
