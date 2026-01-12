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

-- RepairRequests Table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[RepairRequests]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[RepairRequests] (
        [Id] INT IDENTITY(1,1) PRIMARY KEY,
        [Name] NVARCHAR(255) NOT NULL,
        [Email] NVARCHAR(255) NOT NULL,
        [Phone] NVARCHAR(50) NULL,
        [BagBrand] NVARCHAR(100) NULL,
        [BagType] NVARCHAR(100) NULL,
        [IssueDescription] NVARCHAR(MAX) NOT NULL,
        [DamageLocation] NVARCHAR(100) NULL,
        [Urgency] NVARCHAR(50) NULL,
        [Photos] NVARCHAR(MAX) NULL,
        [AdditionalNotes] NVARCHAR(MAX) NULL,
        [Status] NVARCHAR(50) NOT NULL DEFAULT 'pending',
        [CreatedAt] DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
END
GO

-- CustomBagRequests Table
IF NOT EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[CustomBagRequests]') AND type in (N'U'))
BEGIN
    CREATE TABLE [dbo].[CustomBagRequests] (
        [Id] INT IDENTITY(1,1) PRIMARY KEY,
        [Name] NVARCHAR(255) NOT NULL,
        [Email] NVARCHAR(255) NOT NULL,
        [Phone] NVARCHAR(50) NULL,
        [BagType] NVARCHAR(100) NOT NULL,
        [Dimensions] NVARCHAR(100) NULL,
        [Color] NVARCHAR(100) NULL,
        [Material] NVARCHAR(100) NULL,
        [SpecialFeatures] NVARCHAR(MAX) NULL,
        [Quantity] NVARCHAR(50) NULL,
        [Budget] NVARCHAR(100) NULL,
        [Timeline] NVARCHAR(100) NULL,
        [AdditionalNotes] NVARCHAR(MAX) NULL,
        [Status] NVARCHAR(50) NOT NULL DEFAULT 'pending',
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

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_RepairRequests_CreatedAt' AND object_id = OBJECT_ID('RepairRequests'))
BEGIN
    CREATE INDEX IX_RepairRequests_CreatedAt ON RepairRequests(CreatedAt DESC);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_RepairRequests_Status' AND object_id = OBJECT_ID('RepairRequests'))
BEGIN
    CREATE INDEX IX_RepairRequests_Status ON RepairRequests(Status);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_CustomBagRequests_CreatedAt' AND object_id = OBJECT_ID('CustomBagRequests'))
BEGIN
    CREATE INDEX IX_CustomBagRequests_CreatedAt ON CustomBagRequests(CreatedAt DESC);
END
GO

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_CustomBagRequests_Status' AND object_id = OBJECT_ID('CustomBagRequests'))
BEGIN
    CREATE INDEX IX_CustomBagRequests_Status ON CustomBagRequests(Status);
END
GO

PRINT 'Database schema created successfully!';
GO
