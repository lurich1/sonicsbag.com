import { ProductCard } from "./product-card"
import { apiConfig } from "@/lib/api"

export async function ProductGrid() {
  let products: any[] = []

  try {
    // Add timeout to prevent hanging if backend is not running
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    const response = await fetch(apiConfig.endpoints.products, {
      cache: "no-store", // Always fetch fresh data
      signal: controller.signal,
    })
    
    clearTimeout(timeoutId)
    
    if (response.ok) {
      products = await response.json()
    }
  } catch (error: any) {
    // Silently handle connection errors (backend not running is expected during development)
    if (error.name === 'AbortError' || error.code === 'ECONNREFUSED' || error.cause?.code === 'ECONNREFUSED') {
      // Backend is not running, this is expected - just show empty state
    } else {
      console.error("Error fetching products:", error)
    }
  }

  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No products available yet. Please check back soon.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {products.map((product: any) => (
        <ProductCard
          key={product.id}
          product={{
            id: String(product.id),
            name: product.name,
            price: product.price,
            image: product.imageUrl || "/placeholder.svg",
            category: product.category || "",
          }}
        />
      ))}
    </div>
  )
}
