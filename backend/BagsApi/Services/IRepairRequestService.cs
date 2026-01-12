using BagsApi.Models;

namespace BagsApi.Services;

public interface IRepairRequestService
{
    Task<List<RepairRequest>> GetAllAsync();
    Task<RepairRequest?> GetByIdAsync(int id);
    Task<RepairRequest> CreateAsync(RepairRequest request);
    Task<RepairRequest?> UpdateStatusAsync(int id, string status);
}
