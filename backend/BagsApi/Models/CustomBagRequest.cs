namespace BagsApi.Models;

public class CustomBagRequest
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string BagType { get; set; } = string.Empty;
    public string Dimensions { get; set; } = string.Empty;
    public string Color { get; set; } = string.Empty;
    public string Material { get; set; } = string.Empty;
    public string SpecialFeatures { get; set; } = string.Empty;
    public string Quantity { get; set; } = string.Empty;
    public string Budget { get; set; } = string.Empty;
    public string Timeline { get; set; } = string.Empty;
    public string AdditionalNotes { get; set; } = string.Empty;
    public string Status { get; set; } = "pending";
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
