-- SQL Server Database Schema for BagsApi
-- Run this script to create the database tables

USE [YourDatabaseName]; -- Replace with your actual database name
GO

-- Products Table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Products]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Products] (
        [Id] INT IDENTITY(1,1) PRIMARY KEY,
        [Name] NVARCHAR(255) NOT NULL,
        [Price] DECIMAL(18,2) NOT NULL,
        [ImageUrl] NVARCHAR(500) NULL,
        [Category] NVARCHAR(100) NULL,
        [Description] NVARCHAR(MAX) NULL
    );
END
GO

-- Orders Table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Orders]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[Orders] (
        [Id] INT IDENTITY(1,1) PRIMARY KEY,
        [CustomerName] NVARCHAR(255) NOT NULL,
        [CustomerEmail] NVARCHAR(255) NOT NULL,
        [ItemsJson] NVARCHAR(MAX) NOT NULL,
        [TotalAmount] DECIMAL(18,2) NOT NULL,
        [Status] NVARCHAR(50) NOT NULL DEFAULT 'pending',
        [CreatedAt] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
END
GO

-- BlogPosts Table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[BlogPosts]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[BlogPosts] (
        [Id] INT IDENTITY(1,1) PRIMARY KEY,
        [Title] NVARCHAR(500) NOT NULL,
        [Content] NVARCHAR(MAX) NULL,
        [ImageUrl] NVARCHAR(500) NULL,
        [Category] NVARCHAR(100) NULL,
        [CreatedAt] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
END
GO

-- Create indexes for better performance
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Products_Category' AND object_id = OBJECT_ID('Products'))
BEGIN
    CREATE INDEX IX_Products_Category ON Products(Category);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Orders_CreatedAt' AND object_id = OBJECT_ID('Orders'))
BEGIN
    CREATE INDEX IX_Orders_CreatedAt ON Orders(CreatedAt DESC);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Orders_Status' AND object_id = OBJECT_ID('Orders'))
BEGIN
    CREATE INDEX IX_Orders_Status ON Orders(Status);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_BlogPosts_CreatedAt' AND object_id = OBJECT_ID('BlogPosts'))
BEGIN
    CREATE INDEX IX_BlogPosts_CreatedAt ON BlogPosts(CreatedAt DESC);
END
GO

PRINT 'Database schema created successfully!';
GO
