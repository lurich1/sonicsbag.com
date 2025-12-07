import { NextResponse } from "next/server"
import { readProducts, writeProducts, readBlogPosts, writeBlogPosts } from "@/lib/data"
import { cookies } from "next/headers"

// This route migrates existing hardcoded data to the JSON files
export async function POST() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("adminToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const existingProducts = readProducts()
    const existingBlogPosts = readBlogPosts()

    // Only migrate if files are empty
    if (existingProducts.length === 0) {
      // Import the hardcoded products from the product page
      const hardcodedProducts = [
        {
          id: "1",
          name: "SONCIS Premium Duffel Bag",
          price: 1,
          images: ["/product1.png", "/product1.png", "/product1.png"],
          image: "/product1.png",
          category: "Duffels",
          description:
            "A modern duffel bag featuring a striking three-color horizontal block pattern with black, dark grey, and deep burgundy sections. The SONCIS brand name is prominently displayed in bold white letters. Features two top handles, an adjustable shoulder strap with padded section, and premium construction perfect for travel and sports.",
          details: ["Premium faux leather construction", "Three-color block design", "Adjustable padded shoulder strap", "Top carrying handles", "Silver zipper hardware"],
          sizes: ["One Size"],
          hasCustomOptions: false,
        },
        {
          id: "2",
          name: "SONCIS Classic Backpack",
          price: 1,
          images: ["/product2.png", "/product2.png", "/product2.png"],
          image: "/product2.png",
          category: "Backpacks",
          description:
            "A stylish and functional backpack designed for everyday adventures. Features modern design elements, comfortable straps, and spacious compartments. Perfect for school, work, travel, or casual outings.",
          details: ["Durable construction", "Comfortable padded straps", "Multiple compartments", "Modern design", "Versatile use"],
          sizes: ["One Size"],
          hasCustomOptions: false,
        },
        {
          id: "3",
          name: "SONCIS Travel Duffel",
          price: 1,
          images: ["/product3.png", "/product3.png", "/product3.png"],
          image: "/product3.png",
          category: "Duffels",
          description:
            "A spacious travel duffel bag perfect for weekend getaways and short trips. Features durable construction, comfortable straps, and plenty of room for your belongings. Ideal for gym, travel, or sports activities.",
          details: ["Spacious interior", "Durable construction", "Comfortable straps", "Multiple pockets", "Travel-ready design"],
          sizes: ["One Size"],
          hasCustomOptions: false,
        },
        {
          id: "4",
          name: "SONCIS Modern Duffel",
          price: 1,
          images: ["/product4.png", "/product4.png", "/product4.png"],
          image: "/product4.png",
          category: "Duffels",
          description:
            "A sophisticated modern duffel bag with premium materials and elegant design. Features a sleek aesthetic, comfortable carrying options, and premium construction. Perfect for the discerning traveler who values both style and functionality.",
          details: ["Premium materials", "Elegant design", "Comfortable carrying options", "Premium construction", "Stylish aesthetic"],
          sizes: ["One Size"],
          hasCustomOptions: false,
        },
        {
          id: "5",
          name: "The YOBO Tote Bag",
          price: 1,
          images: ["/yobo.png", "/yobo.png", "/yobo.png"],
          image: "/yobo.png",
          category: "Totes",
          description:
            "A vibrant tote bag with black accents and white text displaying 'THE YOBO BAG'. Features durable construction, black fabric handles, and a zippered side pocket. Perfect for everyday use, shopping, and casual outings. Available in multiple sizes and colors to match your style.",
          details: ["Durable canvas/polyester construction", "Black fabric handles", "Zippered side pocket", "Black piping trim", "Spacious interior", "Customizable colors"],
          sizes: [
            { name: "Large", dimensions: "18 x 18 x 11 inches" },
            { name: "Medium", dimensions: "14.5 x 18 x 11 inches" },
            { name: "Small", dimensions: "12 x 15 x 10 inches" },
          ],
          colors: ["Green", "Black", "Navy Blue", "Red", "Purple", "Brown", "Gray", "Pink", "Yellow", "Orange"],
          hasCustomOptions: true,
        },
        {
          id: "6",
          name: "SONCIS Office Bag",
          price: 1,
          images: ["/office bage.png", "/office bage.png", "/office bage.png"],
          image: "/office bage.png",
          category: "Office Bags",
          description:
            "A professional office bag designed for the modern professional. Features a sleek design, multiple compartments for organization, and comfortable carrying options. Perfect for work, business meetings, and professional settings.",
          details: ["Professional design", "Multiple compartments", "Comfortable carrying options", "Organized interior", "Business-ready"],
          sizes: ["One Size"],
          hasCustomOptions: false,
        },
        {
          id: "7",
          name: "SONCIS Travel Bag",
          price: 1,
          images: ["/travelbag.png", "/travelbag.png", "/travelbag.png"],
          image: "/travelbag.png",
          category: "Travel Bags",
          description:
            "A spacious and durable travel bag perfect for weekend getaways, short trips, and extended journeys. Features robust construction, comfortable carrying options, and plenty of room for all your travel essentials. Ideal for travelers who need reliability and style.",
          details: ["Spacious interior", "Durable construction", "Comfortable straps", "Multiple pockets", "Travel-ready design"],
          sizes: ["One Size"],
          hasCustomOptions: false,
        },
        {
          id: "8",
          name: "SONCIS School Bag",
          price: 1,
          images: ["/schoolbag.png", "/schoolbag.png", "/schoolbag.png"],
          image: "/schoolbag.png",
          category: "Backpacks",
          description:
            "A functional and stylish school bag designed for students of all ages. Features multiple compartments for books, laptops, and school supplies. Comfortable padded straps and durable construction make it perfect for daily school use.",
          details: ["Multiple compartments", "Padded shoulder straps", "Laptop/tablet sleeve", "Durable construction", "Student-friendly design"],
          sizes: ["One Size"],
          hasCustomOptions: false,
        },
        {
          id: "9",
          name: "SONCIS Zipper Repair Kit – Quick Fix for Every Bag",
          price: 1,
          images: ["/zip1.png", "/zip2.png", "/zip3.png"],
          image: "/zip1.png",
          category: "Repair Kits",
          description:
            "Never let a broken zipper slow you down again. The SONCIS Zipper Repair Kit is a simple, reliable, and easy-to-use solution for fixing zippers on bags, pouches, travel gear, clothing, and everyday items. Whether you're at home, at school, or on the go, this compact kit gives you everything you need for fast, stress-free repairs.",
          details: [
            "Multiple zipper sliders/heads in different sizes",
            "Seam ripper for clean zipper removal",
            "Metal bobbin & repair accessories",
            "Perfect for school bags, handbags, travel bags, pouches, and more",
            "Saves money on replacements and repairs",
            "Easy-to-use tools for quick fixes",
            "Compact and travel-friendly",
            "Backed by the trusted SONCIS quality—Durable. Practical. Eco-friendly.",
          ],
          sizes: ["One Size"],
          hasCustomOptions: false,
        },
      ]

      writeProducts(hardcodedProducts)
    }

    if (existingBlogPosts.length === 0) {
      const hardcodedBlogPosts = [
        {
          id: 5,
          title: "SONCIS Launches the Bag Reward Program at Nkukuasa M/A Basic School",
          excerpt:
            "We are excited to share that we have officially launched the SONCIS Bag Reward Program, celebrating students who show hard work, good behavior, leadership, and steady improvement.",
          image: "/blog1.png",
          author: "SONCIS Team",
          date: "February 1, 2025",
          category: "Community",
          content: `<p>At SONCIS, giving back to children and supporting education has always been at the heart of what we do. We are excited to share that we have officially launched the SONCIS Bag Reward Program, starting with Nkukuasa M/A Basic School.</p>
            <p>This new initiative celebrates students who show hard work, good behavior, leadership, and steady improvement in school. As part of the program, selected students received high-quality SONCIS bags as a reward for their outstanding performance.</p>
            <p>The categories rewarded include:</p>
            <ul>
              <li>Academics (1st position, 2nd position, and Most Improved Student)</li>
              <li>Leadership</li>
              <li>Discipline (punctuality, neatness, conduct)</li>
            </ul>
            <p>These bags were delivered through a teacher at the school, and the children were thrilled to receive them.</p>
            <h2>Why We Started This Program</h2>
            <p>Education is a big part of the SONCIS story. Our goal is to inspire children, encourage them to keep learning, and support schools with durable, functional bags that make everyday school life easier and more enjoyable. The Bag Reward Program is one of the ways we are staying connected to communities and making a difference—one child at a time.</p>
            <h2>What's Next?</h2>
            <p>We plan to extend this program to many more schools across Ghana. Each bag purchased from SONCIS helps us continue this mission and reach more children.</p>
            <p>Thank you for supporting SONCIS. Together, we are helping shape confident, motivated, and hopeful young learners.</p>`,
        },
        {
          id: 1,
          title: "The Art of Choosing the Perfect Travel Bag",
          excerpt:
            "Discover how to select the ideal travel bag that combines functionality, durability, and style for your next adventure.",
          image: "/travelbag.png",
          author: "SONCIS Team",
          date: "January 15, 2025",
          category: "Travel",
          content: "<p>Content for travel bag blog post...</p>",
        },
        {
          id: 2,
          title: "Office Bags: Style Meets Professionalism",
          excerpt:
            "Explore our guide to finding the perfect office bag that reflects your professional image while keeping you organized.",
          image: "/office bage.png",
          author: "SONCIS Team",
          date: "January 10, 2025",
          category: "Lifestyle",
          content: "<p>Content for office bag blog post...</p>",
        },
        {
          id: 3,
          title: "Sustainable Fashion: Caring for Your Bags",
          excerpt:
            "Learn essential tips for maintaining and caring for your premium bags to ensure they last for years to come.",
          image: "/product1.png",
          author: "SONCIS Team",
          date: "January 5, 2025",
          category: "Care Guide",
          content: "<p>Content for care guide blog post...</p>",
        },
        {
          id: 4,
          title: "School Bags: A Student's Best Companion",
          excerpt:
            "Find out why the right school bag makes all the difference in a student's daily routine and academic success.",
          image: "/schoolbag.png",
          author: "SONCIS Team",
          date: "January 1, 2025",
          category: "Lifestyle",
          content: "<p>Content for school bag blog post...</p>",
        },
      ]

      writeBlogPosts(hardcodedBlogPosts)
    }

    return NextResponse.json({
      message: "Migration completed",
      products: readProducts().length,
      blogPosts: readBlogPosts().length,
    })
  } catch (error) {
    console.error("Migration error:", error)
    return NextResponse.json({ error: "Migration failed" }, { status: 500 })
  }
}

