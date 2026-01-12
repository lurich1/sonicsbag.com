using BagsApi.Models;
using BagsApi.Services;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Net.Mail;

namespace BagsApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RepairRequestController : ControllerBase
{
    private readonly IRepairRequestService _service;
    private readonly IConfiguration _configuration;
    private readonly ILogger<RepairRequestController> _logger;

    public RepairRequestController(
        IRepairRequestService service,
        IConfiguration configuration,
        ILogger<RepairRequestController> logger)
    {
        _service = service;
        _configuration = configuration;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<RepairRequest>>> GetAll()
    {
        var requests = await _service.GetAllAsync();
        return Ok(requests);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<RepairRequest>> Get(int id)
    {
        var request = await _service.GetByIdAsync(id);
        if (request is null) return NotFound();
        return Ok(request);
    }

    [HttpPost]
    public async Task<ActionResult<RepairRequest>> Create(RepairRequest request)
    {
        var created = await _service.CreateAsync(request);
        
        // Send email notifications
        await SendRepairRequestEmails(created);
        
        return CreatedAtAction(nameof(Get), new { id = created.Id }, created);
    }

    public record UpdateStatusRequest(string Status);

    [HttpPut("{id:int}/status")]
    public async Task<ActionResult<RepairRequest>> UpdateStatus(int id, [FromBody] UpdateStatusRequest request)
    {
        var updated = await _service.UpdateStatusAsync(id, request.Status);
        if (updated is null) return NotFound();
        return Ok(updated);
    }

    private async Task SendRepairRequestEmails(RepairRequest request)
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
                Subject = $"Repair Request from {request.Name}",
                Body = $@"
New Repair Request from SONCIS Website

Name: {request.Name}
Email: {request.Email}
Phone: {request.Phone}
Bag Brand: {request.BagBrand}
Bag Type: {request.BagType}
Damage Location: {request.DamageLocation}
Urgency: {request.Urgency}

Issue Description:
{request.IssueDescription}

{(string.IsNullOrEmpty(request.Photos) ? "" : $"Photo Links: {request.Photos}\n")}
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
                Subject = "Repair Request Received - SONCIS",
                Body = $@"
Dear {request.Name},

Thank you for your repair request! We have received the following details:

Bag Type: {request.BagType}
Issue: {request.IssueDescription}
Damage Location: {request.DamageLocation}

Our team will review your request and contact you within 1-2 business days at {request.Email} or {request.Phone} to discuss the repair process and provide a quote.

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
            
            _logger.LogInformation("Repair request emails sent successfully for request ID: {RequestId}", request.Id);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error sending repair request emails for request ID: {RequestId}", request.Id);
            // Don't throw - email failure shouldn't prevent request creation
        }
    }
}
