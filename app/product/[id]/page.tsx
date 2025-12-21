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
    const response = await fetch(apiConfig.endpoints.product(id), {
      cache: "no-store", // Always fetch fresh data
      next: { revalidate: 0 }, // Don't cache
    })
    
    if (response.ok) {
      try {
        product = await response.json()
        if (!product || !product.id) {
          // Invalid product data
          console.error("Invalid product data received for ID:", id)
          notFound()
        }
      } catch (parseError) {
        console.error("Error parsing product JSON:", parseError)
        notFound()
      }
    } else {
      // Handle non-OK responses
      if (response.status === 404) {
        // Product not found - will show 404 page
        notFound()
      } else {
        // For other errors, log and show 404 (could show error page instead)
        const errorText = await response.text().catch(() => "Unknown error")
        console.error(`Error fetching product ${id}:`, response.status, errorText)
        notFound()
      }
    }
  } catch (error: any) {
    // Handle connection errors gracefully
    console.error("Error fetching product:", error)
    // Show 404 instead of 500 error
    notFound()
  }

  if (!product) {
    notFound()
  }

  // Helper function to fix localhost URLs to production URL
  const fixImageUrl = (url: string | null | undefined): string => {
    if (!url) return "/placeholder.svg"
    // Replace localhost URLs with production URL
    const productionUrl = apiConfig.baseUrl
    if (url.includes("localhost")) {
      return url.replace(/https?:\/\/localhost:\d+/, productionUrl)
    }
    return url
  }

  const mappedProduct = {
    id: String(product.id),
    name: product.name,
    price: product.price,
    images: product.imageUrl ? [fixImageUrl(product.imageUrl)] : ["/placeholder.svg"],
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
