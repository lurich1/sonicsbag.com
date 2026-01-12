using Microsoft.EntityFrameworkCore;
using BagsApi.Models;

namespace BagsApi.Data;

public class BagsDbContext : DbContext
{
    public BagsDbContext(DbContextOptions<BagsDbContext> options) : base(options)
    {
    }

    public DbSet<Product> Products { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<BlogPost> BlogPosts { get; set; }
    public DbSet<RepairRequest> RepairRequests { get; set; }
    public DbSet<CustomBagRequest> CustomBagRequests { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Product configuration
        modelBuilder.Entity<Product>(entity =>
        {
            entity.ToTable("Products");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Price).HasColumnType("decimal(18,2)");
            entity.Property(e => e.ImageUrl).HasMaxLength(500);
            entity.Property(e => e.Category).HasMaxLength(100);
        });

        // Order configuration
        modelBuilder.Entity<Order>(entity =>
        {
            entity.ToTable("Orders");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.CustomerName).IsRequired().HasMaxLength(255);
            entity.Property(e => e.CustomerEmail).IsRequired().HasMaxLength(255);
            entity.Property(e => e.ItemsJson).IsRequired();
            entity.Property(e => e.TotalAmount).HasColumnType("decimal(18,2)");
            entity.Property(e => e.Status).IsRequired().HasMaxLength(50).HasDefaultValue("pending");
            entity.Property(e => e.CreatedAt).IsRequired();
        });

        // BlogPost configuration
        modelBuilder.Entity<BlogPost>(entity =>
        {
            entity.ToTable("BlogPosts");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Title).IsRequired().HasMaxLength(500);
            entity.Property(e => e.ImageUrl).HasMaxLength(500);
            entity.Property(e => e.Category).HasMaxLength(100);
            entity.Property(e => e.CreatedAt).IsRequired();
        });

        // RepairRequest configuration
        modelBuilder.Entity<RepairRequest>(entity =>
        {
            entity.ToTable("RepairRequests");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Phone).HasMaxLength(50);
            entity.Property(e => e.BagBrand).HasMaxLength(100);
            entity.Property(e => e.BagType).HasMaxLength(100);
            entity.Property(e => e.IssueDescription).IsRequired();
            entity.Property(e => e.DamageLocation).HasMaxLength(100);
            entity.Property(e => e.Urgency).HasMaxLength(50);
            entity.Property(e => e.Status).IsRequired().HasMaxLength(50).HasDefaultValue("pending");
            entity.Property(e => e.CreatedAt).IsRequired();
        });

        // CustomBagRequest configuration
        modelBuilder.Entity<CustomBagRequest>(entity =>
        {
            entity.ToTable("CustomBagRequests");
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Email).IsRequired().HasMaxLength(255);
            entity.Property(e => e.Phone).HasMaxLength(50);
            entity.Property(e => e.BagType).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Dimensions).HasMaxLength(100);
            entity.Property(e => e.Color).HasMaxLength(100);
            entity.Property(e => e.Material).HasMaxLength(100);
            entity.Property(e => e.Quantity).HasMaxLength(50);
            entity.Property(e => e.Budget).HasMaxLength(100);
            entity.Property(e => e.Timeline).HasMaxLength(100);
            entity.Property(e => e.Status).IsRequired().HasMaxLength(50).HasDefaultValue("pending");
            entity.Property(e => e.CreatedAt).IsRequired();
        });
    }
}

