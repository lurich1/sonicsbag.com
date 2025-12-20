# Setup Checklist

Follow these steps to ensure the frontend and backend are properly connected.

## ✅ Backend Setup

- [ ] **Start the Backend API**

  ```bash
  cd backend/BagsApi
  dotnet restore
  dotnet run
  ```

  You should see:
  ```
  Now listening on: http://localhost:5000
  ```

- [ ] **Verify Backend is Running**

  Open in browser:
  - `http://localhost:5000` - Should show "BagsApi is running"
  - `http://localhost:5000/swagger` - Should show Swagger UI

- [ ] **Verify Database Connection**

  Check that the database connection string in `appsettings.json` is correct and the database tables exist.

## ✅ Frontend Setup

- [ ] **Set Environment Variable**

  Create or update `.env.local` in the root directory:
  ```env
  NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
  ```

- [ ] **Start the Frontend**

  ```bash
  npm install
  npm run dev
  ```

  The frontend should be running at `http://localhost:3000`

## ✅ Verify Integration

- [ ] **Test Products Page**

  Visit `http://localhost:3000/shop` - Should load products from the backend database.

  If you see "No products available yet", it means:
  - Backend is running but database is empty (add products via admin panel)
  - OR backend is not running (check backend terminal)

- [ ] **Test Admin Panel**

  1. Go to `http://localhost:3000/admin/login`
  2. Login with admin credentials
  3. Go to Products page
  4. Try uploading an image and creating a product
  5. Verify the product appears on the shop page

## 🔧 Troubleshooting

### Error: "ECONNREFUSED" or "fetch failed"

**Problem**: Backend API is not running or not accessible.

**Solution**:
1. Make sure the backend is running (`dotnet run` in `backend/BagsApi`)
2. Check that backend is listening on `http://localhost:5000`
3. Verify `NEXT_PUBLIC_API_BASE_URL` in `.env.local` matches the backend URL

### Error: Products not showing

**Problem**: Database is empty or backend can't connect to database.

**Solution**:
1. Check backend logs for database connection errors
2. Verify connection string in `appsettings.json`
3. Ensure database tables exist (run `database.sql`)
4. Add products via admin panel

### Error: Images not loading

**Problem**: Static files not being served or wrong base URL.

**Solution**:
1. Check that `wwwroot/uploads/` folder exists in backend
2. Verify `BaseUrl` in `appsettings.json` is correct
3. Ensure static files middleware is enabled in `Program.cs`

### CORS Errors

**Problem**: Backend not allowing requests from frontend origin.

**Solution**:
1. Check that frontend URL is in `AllowedOrigins` in `appsettings.json`
2. Verify CORS middleware is properly configured in `Program.cs`
3. Make sure `UseCors("AllowFrontend")` is called before `MapControllers()`

## 📝 Quick Start Commands

```bash
# Terminal 1: Start Backend
cd backend/BagsApi
dotnet run

# Terminal 2: Start Frontend
npm run dev
```

Then visit `http://localhost:3000` in your browser.
