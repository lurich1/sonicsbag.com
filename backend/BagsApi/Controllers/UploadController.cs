using Microsoft.AspNetCore.Mvc;

namespace BagsApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UploadController : ControllerBase
{
    private readonly IWebHostEnvironment _environment;
    private readonly IConfiguration _configuration;

    public UploadController(IWebHostEnvironment environment, IConfiguration configuration)
    {
        _environment = environment;
        _configuration = configuration;
    }

    [HttpPost]
    public async Task<IActionResult> UploadImage(IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest(new { error = "No file uploaded" });
        }

        // Validate file type
        var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
        var fileExtension = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!allowedExtensions.Contains(fileExtension))
        {
            return BadRequest(new { error = "Invalid file type. Only images are allowed." });
        }

        // Validate file size (max 10MB)
        const long maxFileSize = 10 * 1024 * 1024; // 10MB
        if (file.Length > maxFileSize)
        {
            return BadRequest(new { error = "File size exceeds 10MB limit." });
        }

        try
        {
            // Create uploads directory if it doesn't exist
            // WebRootPath already points to wwwroot folder, so just add "uploads"
            var uploadsFolder = _environment.WebRootPath != null 
                ? Path.Combine(_environment.WebRootPath, "uploads")
                : Path.Combine(_environment.ContentRootPath, "wwwroot", "uploads");
                
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            // Generate unique filename
            var fileName = $"{DateTime.UtcNow:yyyyMMddHHmmss}-{Guid.NewGuid():N}{fileExtension}";
            var filePath = Path.Combine(uploadsFolder, fileName);

            // Log the actual path for debugging
            Console.WriteLine($"[Upload] WebRootPath: {_environment.WebRootPath}");
            Console.WriteLine($"[Upload] ContentRootPath: {_environment.ContentRootPath}");
            Console.WriteLine($"[Upload] Saving to: {filePath}");
            Console.WriteLine($"[Upload] File exists after save: {File.Exists(filePath)}");

            // Save file
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
            
            // Verify file was saved
            if (!File.Exists(filePath))
            {
                return StatusCode(500, new { error = "File was not saved successfully", path = filePath });
            }

            // Return public URL
            var baseUrl = _configuration["BaseUrl"];
            if (string.IsNullOrEmpty(baseUrl))
            {
                baseUrl = $"{Request.Scheme}://{Request.Host}";
            }
            var publicUrl = $"{baseUrl}/uploads/{fileName}";

            return Ok(new { url = publicUrl });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { error = "Failed to upload file", message = ex.Message });
        }
    }
}
