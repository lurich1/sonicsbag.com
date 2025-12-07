"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, FileText, ShoppingCart, TrendingUp, Database } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    products: 0,
    blogPosts: 0,
    orders: 0,
    totalRevenue: 0,
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [productsRes, blogRes, ordersRes] = await Promise.all([
        fetch("/api/admin/products").catch(() => ({ ok: false, json: async () => [] })),
        fetch("/api/admin/blog").catch(() => ({ ok: false, json: async () => [] })),
        fetch("/api/admin/orders").catch(() => ({ ok: false, json: async () => [] })),
      ])

      const productsData = await productsRes.json()
      const blogPostsData = await blogRes.json()
      const ordersData = await ordersRes.json()
      
      const products = Array.isArray(productsData) ? productsData : []
      const blogPosts = Array.isArray(blogPostsData) ? blogPostsData : []
      const orders = Array.isArray(ordersData) ? ordersData : []

      const totalRevenue = Array.isArray(orders) 
        ? orders.reduce((sum: number, order: any) => sum + (order.total || 0), 0)
        : 0

      setStats({
        products: products.length || 0,
        blogPosts: blogPosts.length || 0,
        orders: orders.length || 0,
        totalRevenue,
      })
    } catch (error) {
      console.error("Error fetching stats:", error)
      // Set default values on error
      setStats({
        products: 0,
        blogPosts: 0,
        orders: 0,
        totalRevenue: 0,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleMigrate = async () => {
    if (!confirm("This will migrate existing products and blog posts to the database. Continue?")) {
      return
    }

    try {
      const token = localStorage.getItem("adminToken")
      const response = await fetch("/api/admin/migrate", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "Migration successful",
          description: `Migrated ${data.products} products and ${data.blogPosts} blog posts`,
        })
        fetchStats()
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      toast({
        title: "Migration failed",
        description: "Failed to migrate data",
        variant: "destructive",
      })
    }
  }

  if (isLoading) {
    return <div className="text-muted-foreground">Loading dashboard...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">Manage your store, blog, and orders</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.products}</div>
            <Link href="/admin/products">
              <Button variant="link" className="p-0 h-auto">
                Manage products →
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blog Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.blogPosts}</div>
            <Link href="/admin/blog">
              <Button variant="link" className="p-0 h-auto">
                Manage blog →
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.orders}</div>
            <Link href="/admin/orders">
              <Button variant="link" className="p-0 h-auto">
                View orders →
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₵{stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Migrate existing products and blog posts to the database</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={handleMigrate} variant="outline">
            <Database className="mr-2 h-4 w-4" />
            Migrate Existing Data
          </Button>
          <p className="text-sm text-muted-foreground mt-2">
            This will copy all existing products and blog posts from the code to the database files.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}

