import { ProductCard } from "./product-card"
import { readProducts } from "@/lib/data"

export async function ProductGrid() {
  const products = readProducts()

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
            image: product.image || product.images?.[0] || "/placeholder.svg",
            category: product.category || "",
          }}
        />
      ))}
    </div>
  )
}
