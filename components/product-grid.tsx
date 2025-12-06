import { ProductCard } from "./product-card"

const products = [
  {
    id: "1",
    name: "SONCIS Premium Duffel Bag",
    price: 1,
    image: "/product1.png",
    category: "Duffels",
  },
  {
    id: "2",
    name: "SONCIS Classic Backpack",
    price: 1,
    image: "/product2.png",
    category: "Backpacks",
  },
  {
    id: "3",
    name: "SONCIS Travel Duffel",
    price: 1,
    image: "/product3.png",
    category: "Duffels",
  },
  {
    id: "4",
    name: "SONCIS Modern Duffel",
    price: 1,
    image: "/product4.png",
    category: "Duffels",
  },
  {
    id: "5",
    name: "The YOBO Tote Bag",
    price: 1,
    image: "/yobo.png",
    category: "Totes",
  },
  {
    id: "6",
    name: "SONCIS Office Bag",
    price: 1,
    image: "/office bage.png",
    category: "Office Bags",
  },
  {
    id: "7",
    name: "SONCIS Travel Bag",
    price: 1,
    image: "/travelbag.png",
    category: "Travel Bags",
  },
  {
    id: "8",
    name: "SONCIS School Bag",
    price: 1,
    image: "/schoolbag.png",
    category: "Backpacks",
  },
  {
    id: "9",
    name: "SONCIS Zipper Repair Kit",
    price: 1,
    image: "/zip1.png",
    category: "Repair Kits",
  },
]

export function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
