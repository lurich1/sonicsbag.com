using BagsApi.Models;
using BagsApi.Data;
using Microsoft.EntityFrameworkCore;

namespace BagsApi.Services;

public class CustomBagRequestService : ICustomBagRequestService
{
    private readonly BagsDbContext _context;

    public CustomBagRequestService(BagsDbContext context)
    {
        _context = context;
    }

    public async Task<List<CustomBagRequest>> GetAllAsync()
    {
        return await _context.CustomBagRequests
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();
    }

    public async Task<CustomBagRequest?> GetByIdAsync(int id)
    {
        return await _context.CustomBagRequests.FindAsync(id);
    }

    public async Task<CustomBagRequest> CreateAsync(CustomBagRequest request)
    {
        request.CreatedAt = DateTime.UtcNow;
        _context.CustomBagRequests.Add(request);
        await _context.SaveChangesAsync();
        return request;
    }

    public async Task<CustomBagRequest?> UpdateStatusAsync(int id, string status)
    {
        var request = await _context.CustomBagRequests.FindAsync(id);
        if (request is null) return null;

        request.Status = status;
        await _context.SaveChangesAsync();
        return request;
    }
}
