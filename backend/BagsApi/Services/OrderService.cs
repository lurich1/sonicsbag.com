using BagsApi.Models;

namespace BagsApi.Services;

public class OrderService : IOrderService
{
    private readonly List<Order> _orders = new();
    private int _nextId = 1;

    public Task<List<Order>> GetAllAsync() =>
        Task.FromResult(_orders.OrderByDescending(o => o.CreatedAt).ToList());

    public Task<Order?> GetByIdAsync(int id) =>
        Task.FromResult(_orders.FirstOrDefault(o => o.Id == id));

    public Task<Order> CreateAsync(Order order)
    {
        order.Id = _nextId++;
        order.CreatedAt = DateTime.UtcNow;
        _orders.Add(order);
        return Task.FromResult(order);
    }

    public Task<Order?> UpdateStatusAsync(int id, string status)
    {
        var existing = _orders.FirstOrDefault(o => o.Id == id);
        if (existing is null) return Task.FromResult<Order?>(null);

        existing.Status = status;
        return Task.FromResult<Order?>(existing);
    }
}
