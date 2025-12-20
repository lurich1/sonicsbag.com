import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ShippingPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">Shipping Information</h1>
          
          <div className="space-y-6 text-foreground">
            <div>
              <h2 className="font-semibold text-xl mb-3">Free Shipping</h2>
              <p className="text-muted-foreground">
                We offer complimentary shipping on all orders over ₵200. Standard shipping typically takes 3-5 business days.
              </p>
            </div>
            
            <div>
              <h2 className="font-semibold text-xl mb-3">Standard Shipping</h2>
              <p className="text-muted-foreground">
                Standard shipping costs apply for orders under ₵200. Delivery typically takes 5-7 business days.
              </p>
            </div>
            
            <div>
              <h2 className="font-semibold text-xl mb-3">Express Shipping</h2>
              <p className="text-muted-foreground">
                Need it faster? Express shipping is available at checkout. Orders are typically delivered within 1-2 business days.
              </p>
            </div>
            
            <div>
              <h2 className="font-semibold text-xl mb-3">International Shipping</h2>
              <p className="text-muted-foreground">
                We currently ship within Ghana. For international shipping inquiries, please contact us.
              </p>
            </div>
          </div>
          
          <div className="mt-8">
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
