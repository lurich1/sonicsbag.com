using BagsApi.Models;

namespace BagsApi.Services;

public interface ICustomBagRequestService
{
    Task<List<CustomBagRequest>> GetAllAsync();
    Task<CustomBagRequest?> GetByIdAsync(int id);
    Task<CustomBagRequest> CreateAsync(CustomBagRequest request);
    Task<CustomBagRequest?> UpdateStatusAsync(int id, string status);
}
