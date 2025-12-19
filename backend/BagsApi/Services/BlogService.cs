using BagsApi.Models;

namespace BagsApi.Services;

public class BlogService : IBlogService
{
    private readonly List<BlogPost> _posts = new();
    private int _nextId = 1;

    public Task<List<BlogPost>> GetAllAsync() =>
        Task.FromResult(_posts.OrderByDescending(p => p.CreatedAt).ToList());

    public Task<BlogPost?> GetByIdAsync(int id) =>
        Task.FromResult(_posts.FirstOrDefault(p => p.Id == id));

    public Task<BlogPost> CreateAsync(BlogPost post)
    {
        post.Id = _nextId++;
        post.CreatedAt = DateTime.UtcNow;
        _posts.Add(post);
        return Task.FromResult(post);
    }

    public Task<BlogPost?> UpdateAsync(int id, BlogPost updated)
    {
        var existing = _posts.FirstOrDefault(p => p.Id == id);
        if (existing is null) return Task.FromResult<BlogPost?>(null);

        existing.Title = updated.Title;
        existing.Content = updated.Content;
        existing.ImageUrl = updated.ImageUrl;
        existing.Category = updated.Category;

        return Task.FromResult<BlogPost?>(existing);
    }

    public Task<bool> DeleteAsync(int id)
    {
        var existing = _posts.FirstOrDefault(p => p.Id == id);
        if (existing is null) return Task.FromResult(false);
        _posts.Remove(existing);
        return Task.FromResult(true);
    }
}
