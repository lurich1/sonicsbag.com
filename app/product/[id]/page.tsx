import { Header } from "@/components/header"
import { ProductDetail } from "@/components/product-detail"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { readProducts } from "@/lib/data"

export async function generateStaticParams() {
  const products = readProducts()

  return products.map((product: any) => ({
    id: String(product.id),
  }))
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const products = readProducts()
  const product = products.find((p: any) => p.id === id)

  if (!product) {
    notFound()
  }

  const mappedProduct = {
    id: String(product.id),
    name: product.name,
    price: product.price,
    images: product.images && product.images.length > 0 ? product.images : [product.image || "/placeholder.svg"],
    category: product.category || "",
    description: product.description || "",
    details: product.details || [],
    sizes: product.sizes || ["One Size"],
    colors: product.colors,
    hasCustomOptions: product.hasCustomOptions,
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
