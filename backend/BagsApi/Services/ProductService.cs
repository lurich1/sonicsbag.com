using BagsApi.Models;

namespace BagsApi.Services;

public class ProductService : IProductService
{
    private readonly List<Product> _products = new();
    private int _nextId = 1;

    public Task<List<Product>> GetAllAsync() =>
        Task.FromResult(_products.ToList());

    public Task<Product?> GetByIdAsync(int id) =>
        Task.FromResult(_products.FirstOrDefault(p => p.Id == id));

    public Task<Product> CreateAsync(Product product)
    {
        product.Id = _nextId++;
        _products.Add(product);
        return Task.FromResult(product);
    }

    public Task<Product?> UpdateAsync(int id, Product updated)
    {
        var existing = _products.FirstOrDefault(p => p.Id == id);
        if (existing is null) return Task.FromResult<Product?>(null);

        existing.Name = updated.Name;
        existing.Price = updated.Price;
        existing.ImageUrl = updated.ImageUrl;
        existing.Category = updated.Category;
        existing.Description = updated.Description;

        return Task.FromResult<Product?>(existing);
    }

    public Task<bool> DeleteAsync(int id)
    {
        var existing = _products.FirstOrDefault(p => p.Id == id);
        if (existing is null) return Task.FromResult(false);
        _products.Remove(existing);
        return Task.FromResult(true);
    }
}
