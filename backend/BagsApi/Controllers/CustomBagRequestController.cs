using BagsApi.Models;
using BagsApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;

namespace BagsApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CustomBagRequestController : ControllerBase
{
    private readonly ICustomBagRequestService _service;
    private readonly IConfiguration _configuration;
    private readonly ILogger<CustomBagRequestController> _logger;

    public CustomBagRequestController(
        ICustomBagRequestService service,
        IConfiguration configuration,
        ILogger<CustomBagRequestController> logger)
    {
        _service = service;
        _configuration = configuration;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<CustomBagRequest>>> GetAll()
    {
        var requests = await _service.GetAllAsync();
        return Ok(requests);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<CustomBagRequest>> Get(int id)
    {
        var request = await _service.GetByIdAsync(id);
        if (request is null) return NotFound();
        return Ok(request);
    }

    [HttpPost]
    public async Task<ActionResult<CustomBagRequest>> Create(CustomBagRequest request)
    {
        var created = await _service.CreateAsync(request);
        
        // Send email notifications
        await SendCustomBagRequestEmails(created);
        
        return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
    }

    public record UpdateStatusRequest(string Status);

    [HttpPut("{id:int}/status")]
    public async Task<ActionResult<CustomBagRequest>> UpdateStatus(int id, [FromBody] UpdateStatusRequest request)
    {
        var updated = await _service.UpdateStatusAsync(id, request.Status);
        if (updated is null) return NotFound();
        return Ok(updated);
    }

    private async Task SendCustomBagRequestEmails(CustomBagRequest request)
    {
        try
        {
            var adminEmail = _configuration["AdminEmail"] ?? "soncisworld@gmail.com";
            var smtpHost = _configuration["Smtp:Host"];
            var smtpPort = int.Parse(_configuration["Smtp:Port"] ?? "587");
            var smtpUser = _configuration["Smtp:Username"];
            var smtpPassword = _configuration["Smtp:Password"];
            var smtpFrom = _configuration["Smtp:From"] ?? "noreply@sonicsbag.com";

            if (string.IsNullOrEmpty(smtpHost) || string.IsNullOrEmpty(smtpUser) || string.IsNullOrEmpty(smtpPassword))
            {
                _logger.LogWarning("SMTP configuration not found. Emails will not be sent.");
                return;
            }

            using var client = new SmtpClient(smtpHost, smtpPort)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(smtpUser, smtpPassword)
            };

            // Email to admin
            var adminMail = new MailMessage
            {
                From = new MailAddress(smtpFrom, "SONCIS Website"),
                Subject = $"Custom Bag Request from {request.Name}",
                Body = $@"
New Custom Bag Request from SONCIS Website

Name: {request.Name}
Email: {request.Email}
Phone: {request.Phone}
Bag Type: {request.BagType}
Dimensions: {request.Dimensions}
Color: {request.Color}
Material: {request.Material}
Quantity: {request.Quantity}
Budget: {request.Budget}
Timeline: {request.Timeline}

{(string.IsNullOrEmpty(request.SpecialFeatures) ? "" : $"Special Features: {request.SpecialFeatures}\n")}
{(string.IsNullOrEmpty(request.AdditionalNotes) ? "" : $"Additional Notes: {request.AdditionalNotes}\n")}

Reply to: {request.Email}
",
                IsBodyHtml = false
            };
            adminMail.To.Add(adminEmail);
            adminMail.ReplyToList.Add(new MailAddress(request.Email, request.Name));

            // Email to customer
            var customerMail = new MailMessage
            {
                From = new MailAddress(smtpFrom, "SONCIS"),
                Subject = "Custom Bag Request Received - SONCIS",
                Body = $@"
Dear {request.Name},

Thank you for your custom bag request! We have received the following details:

Bag Type: {request.BagType}
{(string.IsNullOrEmpty(request.Dimensions) ? "" : $"Dimensions: {request.Dimensions}\n")}
{(string.IsNullOrEmpty(request.Color) ? "" : $"Color: {request.Color}\n")}
{(string.IsNullOrEmpty(request.Material) ? "" : $"Material: {request.Material}\n")}
{(string.IsNullOrEmpty(request.Quantity) ? "" : $"Quantity: {request.Quantity}\n")}
{(string.IsNullOrEmpty(request.Budget) ? "" : $"Budget: ₵{request.Budget}\n")}

Our team will review your request and contact you within 2-3 business days at {request.Email}{(string.IsNullOrEmpty(request.Phone) ? "" : $" or {request.Phone}")} to discuss your custom bag design and provide a quote.

If you have any questions, please contact us at:
- Email: soncisworld@gmail.com
- Phone: 0552702318
- WhatsApp: https://wa.me/233552702318

Best regards,
The SONCIS Team
",
                IsBodyHtml = false
            };
            customerMail.To.Add(request.Email);

            await client.SendMailAsync(adminMail);
            await client.SendMailAsync(customerMail);
            
            _logger.LogInformation("Custom bag request emails sent successfully for request ID: {RequestId}", request.Id);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending custom bag request emails for request ID: {RequestId}", request.Id);
            // Don't throw - email failure shouldn't prevent request creation
        }
    }
}
