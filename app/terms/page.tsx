import { Header } from "@/components/header"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">Terms of Service</h1>
          
          <div className="space-y-6 text-foreground">
            <div>
              <p className="text-muted-foreground mb-4">
                <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            
            <div>
              <h2 className="font-semibold text-xl mb-3">Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using SONCIS website, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </div>
            
            <div>
              <h2 className="font-semibold text-xl mb-3">Use License</h2>
              <p className="text-muted-foreground">
                Permission is granted to temporarily access the materials on SONCIS website for personal, non-commercial transitory viewing only.
              </p>
            </div>
            
            <div>
              <h2 className="font-semibold text-xl mb-3">Product Information</h2>
              <p className="text-muted-foreground">
                We strive to provide accurate product descriptions and images. However, we do not warrant that product descriptions or other content on this site is accurate, complete, reliable, current, or error-free.
              </p>
            </div>
            
            <div>
              <h2 className="font-semibold text-xl mb-3">Pricing</h2>
              <p className="text-muted-foreground">
                All prices are in Ghanaian Cedis (₵) and are subject to change without notice. We reserve the right to correct any pricing errors.
              </p>
            </div>
            
            <div>
              <h2 className="font-semibold text-xl mb-3">Orders</h2>
              <p className="text-muted-foreground">
                We reserve the right to refuse or cancel any order for any reason, including if the product is unavailable, there is an error in the product description or price, or if the order appears fraudulent.
              </p>
            </div>
            
            <div>
              <h2 className="font-semibold text-xl mb-3">Limitation of Liability</h2>
              <p className="text-muted-foreground">
                In no event shall SONCIS or its suppliers be liable for any damages arising out of the use or inability to use the materials on our website.
              </p>
            </div>
            
            <div>
              <h2 className="font-semibold text-xl mb-3">Contact Information</h2>
              <p className="text-muted-foreground">
                If you have any questions about these Terms of Service, please <Link href="/contact" className="underline hover:text-foreground">contact us</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
