namespace BagsApi.Models;

public class RepairRequest
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string BagBrand { get; set; } = string.Empty;
    public string BagType { get; set; } = string.Empty;
    public string IssueDescription { get; set; } = string.Empty;
    public string DamageLocation { get; set; } = string.Empty;
    public string Urgency { get; set; } = string.Empty;
    public string Photos { get; set; } = string.Empty;
    public string AdditionalNotes { get; set; } = string.Empty;
    public string Status { get; set; } = "pending";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
