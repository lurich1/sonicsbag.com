import { Header } from "@/components/header"
import { ProductDetail } from "@/components/product-detail"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { query } from "@/lib/db"

interface DbProduct {
  id: number
  name: string
  price: number
  image?: string | null
  category?: string | null
  description?: string | null
}

export async function generateStaticParams() {
  const products = await query<Pick<DbProduct, "id">>("SELECT id FROM products")

  return products.map((product) => ({
    id: String(product.id),
  }))
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const rows = await query<DbProduct>("SELECT * FROM products WHERE id = ?", [id])
  const product = rows[0]

  if (!product) {
    notFound()
  }

  const mappedProduct = {
    id: String(product.id),
    name: product.name,
    price: product.price,
    images: [product.image || "/placeholder.svg"],
    category: product.category || "",
    description: product.description || "",
    details: [] as string[],
    sizes: ["One Size"],
    colors: undefined,
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
