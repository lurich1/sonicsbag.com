import { ProductCard } from "./product-card"
import { query } from "@/lib/db"

interface Product {
  id: number
  name: string
  price: number
  image?: string | null
  category?: string | null
}

export async function ProductGrid() {
  const products = await query<Product>(
    "SELECT id, name, price, image, category FROM products ORDER BY created_at DESC"
  )

  if (!products.length) {
    return (
      <div className="text-sm text-muted-foreground">
        No products available yet. Please check back soon.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={{
            id: String(product.id),
            name: product.name,
            price: product.price,
            image: product.image || "/placeholder.svg",
            category: product.category || "",
          }}
        />
      ))}
    </div>
  )
}
