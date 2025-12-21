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
  let errorMessage: string | null = null
  
  try {
    // Add timeout to prevent hanging if backend is not running
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 10000) // 10 second timeout

    const response = await fetch(apiConfig.endpoints.product(id), {
      cache: "no-store", // Always fetch fresh data
      signal: controller.signal,
    })
    
    clearTimeout(timeoutId)
    
    if (response.ok) {
      try {
        product = await response.json()
      } catch (parseError) {
        console.error("Error parsing product JSON:", parseError)
        errorMessage = "Invalid response from server"
      }
    } else {
      // Handle non-OK responses
      if (response.status === 404) {
        // Product not found - will show 404 page
        notFound()
      } else {
        const errorText = await response.text().catch(() => "Unknown error")
        console.error(`Error fetching product ${id}:`, response.status, errorText)
        errorMessage = `Server error: ${response.status}`
      }
    }
  } catch (error: any) {
    // Handle connection errors gracefully
    if (error.name === 'AbortError') {
      errorMessage = "Request timed out"
      console.error("Product fetch timed out for ID:", id)
    } else if (error.code === 'ECONNREFUSED' || error.cause?.code === 'ECONNREFUSED') {
      errorMessage = "Cannot connect to server"
      console.error("Cannot connect to backend API for product:", id)
    } else {
      errorMessage = "Failed to fetch product"
      console.error("Error fetching product:", error)
    }
  }

  if (!product) {
    // If we have an error message and it's not a 404, we could show an error page
    // But for now, just show 404 for any missing product
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
