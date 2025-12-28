import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ReturnsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">Returns & Exchanges</h1>
          
          <div className="space-y-6 text-foreground">
            <div>
              <h2 className="font-semibold text-xl mb-3">30-Day Return Policy</h2>
              <p className="text-muted-foreground">
                We want you to be completely satisfied with your purchase. You can return any unworn, unused items in their original packaging within 30 days of purchase for a full refund or exchange.
              </p>
            </div>
            
            <div>
              <h2 className="font-semibold text-xl mb-3">How to Return</h2>
              <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                <li>Contact us at soncisworld@gmail.com or through our contact page</li>
                <li>We'll provide you with a return authorization and shipping instructions</li>
                <li>Package the item securely in its original packaging</li>
                <li>Ship the item back to us</li>
                <li>Once received, we'll process your refund or exchange</li>
              </ol>
            </div>
            
            <div>
              <h2 className="font-semibold text-xl mb-3">Exchanges</h2>
              <p className="text-muted-foreground">
                Need a different size or color? We're happy to help with exchanges. Please contact us within 30 days of purchase.
              </p>
            </div>
            
            <div>
              <h2 className="font-semibold text-xl mb-3">Conditions</h2>
              <p className="text-muted-foreground">
                Items must be in original condition with tags attached. Custom-made items may have different return policies.
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <Button asChild>
              <Link href="/contact">Start a Return</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
