var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// In-memory services for products, orders, blog
builder.Services.AddSingleton<BagsApi.Services.IProductService, BagsApi.Services.ProductService>();
builder.Services.AddSingleton<BagsApi.Services.IOrderService, BagsApi.Services.OrderService>();
builder.Services.AddSingleton<BagsApi.Services.IBlogService, BagsApi.Services.BlogService>();

// Allow Next.js frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy
            .WithOrigins("http://localhost:3000", "https://localhost:3000")
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();

// Always enable Swagger (UI at /swagger)
app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

app.UseAuthorization();

// Simple root endpoint so / returns 200 instead of 404
app.MapGet("/", () => Results.Ok("BagsApi is running"));

app.MapControllers();

app.Run();
