import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ProductGrid } from "@/components/product-grid"
import { HeroBanner } from "@/components/hero-banner"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />

      <HeroBanner />

      {/* Featured Products */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-semibold">New Arrivals</h2>
          <Button variant="ghost" asChild className="text-sm sm:text-base">
            <Link href="/shop">View All</Link>
          </Button>
        </div>
        <ProductGrid />
      </section>

      {/* Footer */}
      <footer className="border-t border-border mt-16 sm:mt-24">
        <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h3 className="font-serif text-xl font-semibold mb-4">SONCIS</h3>
              <p className="text-sm text-muted-foreground">Premium bags for every adventure and occasion.</p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Shop</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/shop">All Products</Link>
                </li>
                <li>
                  <Link href="/collections">Collections</Link>
                </li>
                <li>
                  <Link href="/new">New Arrivals</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Link href="/shipping">Shipping</Link>
                </li>
                <li>
                  <Link href="/returns">Returns</Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/privacy">Privacy</Link>
                </li>
                <li>
                  <Link href="/terms">Terms</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-6 sm:mt-8 pt-6 sm:pt-8 text-center text-xs sm:text-sm text-muted-foreground">
            <p>&copy; 2025 SONCIS. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
