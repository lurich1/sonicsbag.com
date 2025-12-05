import { Header } from "@/components/header"
import { ProductDetail } from "@/components/product-detail"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const products = [
  {
    id: "1",
    name: "SONCIS Premium Duffel Bag",
    price: 1,
    images: ["/product1.png", "/product1.png", "/product1.png"],
    category: "Duffels",
    description:
      "A modern duffel bag featuring a striking three-color horizontal block pattern with black, dark grey, and deep burgundy sections. The SONCIS brand name is prominently displayed in bold white letters. Features two top handles, an adjustable shoulder strap with padded section, and premium construction perfect for travel and sports.",
    details: ["Premium faux leather construction", "Three-color block design", "Adjustable padded shoulder strap", "Top carrying handles", "Silver zipper hardware"],
    sizes: ["One Size"],
  },
  {
    id: "2",
    name: "SONCIS Classic Backpack",
    price: 1,
    images: ["/product2.png", "/product2.png", "/product2.png"],
    category: "Backpacks",
    description:
      "A stylish and functional backpack designed for everyday adventures. Features modern design elements, comfortable straps, and spacious compartments. Perfect for school, work, travel, or casual outings.",
    details: ["Durable construction", "Comfortable padded straps", "Multiple compartments", "Modern design", "Versatile use"],
    sizes: ["One Size"],
  },
  {
    id: "3",
    name: "SONCIS Travel Duffel",
    price: 1,
    images: ["/product3.png", "/product3.png", "/product3.png"],
    category: "Duffels",
    description:
      "A spacious travel duffel bag perfect for weekend getaways and short trips. Features durable construction, comfortable straps, and plenty of room for your belongings. Ideal for gym, travel, or sports activities.",
    details: ["Spacious interior", "Durable construction", "Comfortable straps", "Multiple pockets", "Travel-ready design"],
    sizes: ["One Size"],
  },
  {
    id: "4",
    name: "SONCIS Modern Duffel",
    price: 1,
    images: ["/product4.png", "/product4.png", "/product4.png"],
    category: "Duffels",
    description:
      "A sophisticated modern duffel bag with premium materials and elegant design. Features a sleek aesthetic, comfortable carrying options, and premium construction. Perfect for the discerning traveler who values both style and functionality.",
    details: ["Premium materials", "Elegant design", "Comfortable carrying options", "Premium construction", "Stylish aesthetic"],
    sizes: ["One Size"],
  },
  {
    id: "5",
    name: "The YOBO Tote Bag",
    price: 1,
    images: ["/yobo.png", "/yobo.png", "/yobo.png"],
    category: "Totes",
    description:
      "A vibrant green tote bag with black accents and white text displaying 'THE YOBO BAG'. Features durable construction, black fabric handles, and a zippered side pocket. Perfect for everyday use, shopping, and casual outings.",
    details: ["Durable canvas/polyester construction", "Black fabric handles", "Zippered side pocket", "Black piping trim", "Spacious interior"],
    sizes: ["One Size"],
  },
  {
    id: "6",
    name: "SONCIS Office Bag",
    price: 1,
    images: ["/office bage.png", "/office bage.png", "/office bage.png"],
    category: "Office Bags",
    description:
      "A professional office bag designed for the modern professional. Features a sleek design, multiple compartments for organization, and comfortable carrying options. Perfect for work, business meetings, and professional settings.",
    details: ["Professional design", "Multiple compartments", "Comfortable carrying options", "Organized interior", "Business-ready"],
    sizes: ["One Size"],
  },
  {
    id: "7",
    name: "SONCIS Travel Bag",
    price: 1,
    images: ["/travelbag.png", "/travelbag.png", "/travelbag.png"],
    category: "Travel Bags",
    description:
      "A spacious and durable travel bag perfect for weekend getaways, short trips, and extended journeys. Features robust construction, comfortable carrying options, and plenty of room for all your travel essentials. Ideal for travelers who need reliability and style.",
    details: ["Spacious interior", "Durable construction", "Comfortable straps", "Multiple pockets", "Travel-ready design"],
    sizes: ["One Size"],
  },
  {
    id: "8",
    name: "SONCIS School Bag",
    price: 1,
    images: ["/schoolbag.png", "/schoolbag.png", "/schoolbag.png"],
    category: "Backpacks",
    description:
      "A functional and stylish school bag designed for students of all ages. Features multiple compartments for books, laptops, and school supplies. Comfortable padded straps and durable construction make it perfect for daily school use.",
    details: ["Multiple compartments", "Padded shoulder straps", "Laptop/tablet sleeve", "Durable construction", "Student-friendly design"],
    sizes: ["One Size"],
  },
]

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }))
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = products.find((p) => p.id === id)

  if (!product) {
    notFound()
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
      <ProductDetail product={product} />
    </div>
  )
}
