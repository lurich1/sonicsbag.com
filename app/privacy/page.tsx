import { Header } from "@/components/header"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <Header />
      
      <section className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">Privacy Policy</h1>
          
          <div className="space-y-6 text-foreground">
            <div>
              <p className="text-muted-foreground mb-4">
                <strong>Last updated:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </div>
            
            <div>
              <h2 className="font-semibold text-xl mb-3">Information We Collect</h2>
              <p className="text-muted-foreground mb-2">
                We collect information that you provide directly to us, including:
              </p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground ml-4">
                <li>Name and contact information</li>
                <li>Payment and billing information</li>
                <li>Shipping address</li>
                <li>Order history</li>
              </ul>
            </div>
            
            <div>
              <h2 className="font-semibold text-xl mb-3">How We Use Your Information</h2>
              <p className="text-muted-foreground">
                We use the information we collect to process orders, communicate with you about your purchases, improve our services, and send you marketing communications (if you opt-in).
              </p>
            </div>
            
            <div>
              <h2 className="font-semibold text-xl mb-3">Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your personal information. However, no method of transmission over the internet is 100% secure.
              </p>
            </div>
            
            <div>
              <h2 className="font-semibold text-xl mb-3">Your Rights</h2>
              <p className="text-muted-foreground">
                You have the right to access, update, or delete your personal information at any time. Please contact us if you wish to exercise these rights.
              </p>
            </div>
            
            <div>
              <h2 className="font-semibold text-xl mb-3">Contact Us</h2>
              <p className="text-muted-foreground">
                If you have questions about this Privacy Policy, please <Link href="/contact" className="underline hover:text-foreground">contact us</Link>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
