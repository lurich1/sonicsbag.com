# Test API Script
# This script tests if the API is working correctly

Write-Host "Testing BagsApi..." -ForegroundColor Green
Write-Host ""

# Test 1: Check if API is running
Write-Host "1. Testing API Health..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000" -Method GET -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "   ✅ API is running" -ForegroundColor Green
    }
} catch {
    Write-Host "   ❌ API is not running on http://localhost:5000" -ForegroundColor Red
    Write-Host "   Start the API with: dotnet run --configuration Release" -ForegroundColor Yellow
}

# Test 2: Check Swagger
Write-Host ""
Write-Host "2. Testing Swagger UI..." -ForegroundColor Yellow
try {
    $response = Invoke-WebRequest -Uri "http://localhost:5000/swagger" -Method GET -TimeoutSec 5
    if ($response.StatusCode -eq 200) {
        Write-Host "   ✅ Swagger UI is accessible" -ForegroundColor Green
    }
} catch {
    Write-Host "   ❌ Swagger UI not accessible" -ForegroundColor Red
}

# Test 3: Check Products endpoint
Write-Host ""
Write-Host "3. Testing Products endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/products" -Method GET -TimeoutSec 5
    Write-Host "   ✅ Products endpoint working" -ForegroundColor Green
    Write-Host "   Found $($response.Count) products" -ForegroundColor Cyan
} catch {
    Write-Host "   ❌ Products endpoint failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "Testing complete!" -ForegroundColor Green

