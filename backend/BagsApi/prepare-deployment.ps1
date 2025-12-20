# Prepare Deployment Package for Plesk
# This script prepares all files needed for Plesk deployment

Write-Host "Preparing BagsApi for Plesk Deployment..." -ForegroundColor Green
Write-Host ""

$publishPath = ".\publish"
$deploymentPath = ".\deployment-package"

# Clean previous deployment package
if (Test-Path $deploymentPath) {
    Write-Host "Cleaning previous deployment package..." -ForegroundColor Yellow
    Remove-Item $deploymentPath -Recurse -Force
}

# Create deployment package folder
New-Item -ItemType Directory -Path $deploymentPath -Force | Out-Null

# Copy published files
Write-Host "Copying published files..." -ForegroundColor Yellow
Copy-Item "$publishPath\*" -Destination $deploymentPath -Recurse -Force

# Copy appsettings.Production.json as appsettings.json
Write-Host "Copying production configuration..." -ForegroundColor Yellow
Copy-Item ".\appsettings.Production.json" -Destination "$deploymentPath\appsettings.json" -Force

# Ensure web.config exists
if (-not (Test-Path "$deploymentPath\web.config")) {
    Write-Host "Creating web.config..." -ForegroundColor Yellow
    Copy-Item ".\bin\Release\Publish\web.config" -Destination "$deploymentPath\web.config" -Force
}

# Create wwwroot/uploads folder structure
Write-Host "Creating uploads folder structure..." -ForegroundColor Yellow
$uploadsPath = "$deploymentPath\wwwroot\uploads"
New-Item -ItemType Directory -Path $uploadsPath -Force | Out-Null

# Create .gitkeep file in uploads folder
New-Item -ItemType File -Path "$uploadsPath\.gitkeep" -Force | Out-Null

# Create README for deployment
$readmeContent = @"
# BagsApi Deployment Package

## Contents
- All application DLLs and dependencies
- web.config (IIS/Plesk configuration)
- appsettings.json (Production configuration)
- wwwroot/uploads/ (Image upload folder)

## Deployment Instructions

1. Upload all files to your Plesk server
2. Ensure wwwroot/uploads/ folder has write permissions
3. Configure Application Pool for .NET 8.0
4. Set ASPNETCORE_ENVIRONMENT=Production
5. Test: https://sonicsbag.poultrycore.com/api

See PLESK_DEPLOYMENT.md for detailed instructions.
"@

Set-Content -Path "$deploymentPath\README.txt" -Value $readmeContent

Write-Host ""
Write-Host "✅ Deployment package prepared!" -ForegroundColor Green
Write-Host ""
Write-Host "Location: $((Resolve-Path $deploymentPath).Path)" -ForegroundColor Cyan
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Zip the 'deployment-package' folder" -ForegroundColor White
Write-Host "2. Upload to Plesk server" -ForegroundColor White
Write-Host "3. Extract and configure according to PLESK_DEPLOYMENT.md" -ForegroundColor White
Write-Host ""
