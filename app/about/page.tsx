import { Header } from "@/components/header"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />

      <div className="container mx-auto px-4 sm:px-6 py-4">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>
      </div>

      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] flex items-center justify-center bg-secondary">
        <div className="relative z-10 text-center px-4">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-4 tracking-tight">
            About SONCIS
          </h1>
          <p className="text-lg sm:text-xl text-foreground max-w-2xl mx-auto">
            Where quality craftsmanship meets meaningful impact
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">Our Story</h2>
            <div className="space-y-4 text-foreground leading-relaxed">
              <p>
                Welcome to SONCIS — where quality craftsmanship meets meaningful impact.
              </p>
              <p>
                SONCIS began as a solution to support Once a Child, a nonprofit dedicated to helping children in underserved communities. What started as a small idea to fund educational support has grown into a bold African bag brand known for durability, creativity, and purpose.
              </p>
              <p>
                Today, we craft high-quality, customizable, and eco-friendly bags for school, travel, work, lifestyle, and brands. From our signature Yobo Bag to school bags, duffel bags, cosmetic pouches, and corporate-branded designs, every SONCIS product is made by skilled hands in our in-house workshop with attention to detail and long-lasting quality.
              </p>
            </div>
          </div>
          <div className="relative aspect-[4/5] bg-secondary overflow-hidden rounded-lg">
            <Image src="/abot.jpg" alt="SONCIS craftsmanship and workshop" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-secondary py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-8 text-center">More Than a Bag Shop</h2>
            <div className="space-y-6 text-foreground leading-relaxed text-center">
              <p className="text-lg">
                But SONCIS is more than a bag shop — we are a social enterprise.
              </p>
              <p>
                Every purchase you make supports our community programs, including the SONCIS Reward Program, which celebrates students for academic excellence, leadership, discipline, and personal growth. This is our way of continuing the mission that started with Once a Child.
              </p>
              <p className="text-lg font-medium text-foreground">
                When you buy from SONCIS, you're not just choosing a bag — you're choosing to make an impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">Thank You</h2>
          <p className="text-foreground mb-8 text-base sm:text-lg leading-relaxed">
            Thank you for being part of our story and helping us empower the next generation, one bag at a time.
          </p>
          <p className="text-xl sm:text-2xl font-serif font-semibold mb-8 text-foreground">
            SONCIS — Crafted with purpose. Designed for impact. Made for you.
          </p>
          <Button asChild size="lg" className="h-12 px-8">
            <Link href="/shop">Explore Collection</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
