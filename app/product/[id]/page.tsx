import { Header } from "@/components/header"
import { ProductDetail } from "@/components/product-detail"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { apiConfig } from "@/lib/api"

export async function generateStaticParams() {
  try {
    const response = await fetch(apiConfig.endpoints.products, {
      next: { revalidate: 60 }, // Revalidate every minute
    })
    
    if (!response.ok) {
      return []
    }
    
    const products = await response.json()
    return products.map((product: any) => ({
      id: String(product.id),
    }))
  } catch (error) {
    console.error("Error fetching products for static params:", error)
    return []
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  let product: any = null
  
  try {
    // Add timeout to prevent hanging if backend is not running
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    const response = await fetch(apiConfig.endpoints.product(id), {
      cache: "no-store", // Always fetch fresh data
      signal: controller.signal,
    })
    
    clearTimeout(timeoutId)
    
    if (response.ok) {
      product = await response.json()
    }
  } catch (error: any) {
    // Handle connection errors gracefully
    if (error.name === 'AbortError' || error.code === 'ECONNREFUSED' || error.cause?.code === 'ECONNREFUSED') {
      // Backend is not running
    } else {
      console.error("Error fetching product:", error)
    }
  }

  if (!product) {
    notFound()
  }

  const mappedProduct = {
    id: String(product.id),
    name: product.name,
    price: product.price,
    images: product.imageUrl ? [product.imageUrl] : ["/placeholder.svg"],
    category: product.category || "",
    description: product.description || "",
    details: [],
    sizes: ["One Size"],
    colors: [],
    hasCustomOptions: false,
  }

  return (
    <div className="min-h-screen">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <Button variant="ghost" asChild>
          <Link href="/shop">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Link>
        </Button>
      </div>
      <ProductDetail product={mappedProduct} />
    </div>
  )
}
