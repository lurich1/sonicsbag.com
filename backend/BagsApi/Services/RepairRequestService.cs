using BagsApi.Models;
using BagsApi.Data;
using Microsoft.EntityFrameworkCore;

namespace BagsApi.Services;

public class RepairRequestService : IRepairRequestService
{
    private readonly BagsDbContext _context;

    public RepairRequestService(BagsDbContext context)
    {
        _context = context;
    }

    public async Task<List<RepairRequest>> GetAllAsync()
    {
        return await _context.RepairRequests
            .OrderByDescending(r => r.CreatedAt)
            .ToListAsync();
    }

    public async Task<RepairRequest?> GetByIdAsync(int id)
    {
        return await _context.RepairRequests.FindAsync(id);
    }

    public async Task<RepairRequest> CreateAsync(RepairRequest request)
    {
        request.CreatedAt = DateTime.UtcNow;
        _context.RepairRequests.Add(request);
        await _context.SaveChangesAsync();
        return request;
    }

    public async Task<RepairRequest?> UpdateStatusAsync(int id, string status)
    {
        var request = await _context.RepairRequests.FindAsync(id);
        if (request is null) return null;

        request.Status = status;
        await _context.SaveChangesAsync();
        return request;
    }
}
