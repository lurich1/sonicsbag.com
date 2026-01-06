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
