# Run Production API Script
# Sets environment to Production and runs the API

Write-Host "Starting BagsApi in Production mode..." -ForegroundColor Green
Write-Host ""

# Set production environment
$env:ASPNETCORE_ENVIRONMENT = "Production"

# Run the API
Write-Host "Starting API..." -ForegroundColor Yellow
Write-Host "API will be available at:" -ForegroundColor Cyan
Write-Host "  - http://localhost:5000" -ForegroundColor Cyan
Write-Host "  - https://localhost:5001" -ForegroundColor Cyan
Write-Host "  - http://localhost:5000/swagger" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop" -ForegroundColor Yellow
Write-Host ""

dotnet run --configuration Release

