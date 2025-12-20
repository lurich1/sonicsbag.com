import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ProductGrid } from "@/components/product-grid"

export default function NewArrivalsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="mb-8 sm:mb-12">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-4">New Arrivals</h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Discover our latest collection of premium bags
          </p>
        </div>
        
        <ProductGrid />
      </section>
    </div>
  )
}
