import { Header } from "@/components/header"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { notFound } from "next/navigation"

// Blog posts data - in a real app, this would come from a CMS or database
const blogPosts = [
  {
    id: 5,
    title: "SONCIS Launches the Bag Reward Program at Nkukuasa M/A Basic School",
    excerpt:
      "We are excited to share that we have officially launched the SONCIS Bag Reward Program, celebrating students who show hard work, good behavior, leadership, and steady improvement.",
    image: "/blog1.png",
    author: "SONCIS Team",
    date: "February 1, 2025",
    category: "Community",
    content: `
      <p>At SONCIS, giving back to children and supporting education has always been at the heart of what we do. We are excited to share that we have officially launched the SONCIS Bag Reward Program, starting with Nkukuasa M/A Basic School.</p>
      
      <p>This new initiative celebrates students who show hard work, good behavior, leadership, and steady improvement in school. As part of the program, selected students received high-quality SONCIS bags as a reward for their outstanding performance.</p>
      
      <h2>The Categories Rewarded Include:</h2>
      <ul>
        <li><strong>Academics</strong> (1st position, 2nd position, and Most Improved Student)</li>
        <li><strong>Leadership</strong></li>
        <li><strong>Discipline</strong> (punctuality, neatness, conduct)</li>
      </ul>
      
      <p>These bags were delivered through a teacher at the school, and the children were thrilled to receive them.</p>
      
      <h2>Why We Started This Program</h2>
      <p>Education is a big part of the SONCIS story. Our goal is to inspire children, encourage them to keep learning, and support schools with durable, functional bags that make everyday school life easier and more enjoyable.</p>
      
      <p>The Bag Reward Program is one of the ways we are staying connected to communities and making a difference—one child at a time.</p>
      
      <h2>What's Next?</h2>
      <p>We plan to extend this program to many more schools across Ghana. Each bag purchased from SONCIS helps us continue this mission and reach more children.</p>
      
      <p>Thank you for supporting SONCIS. Together, we are helping shape confident, motivated, and hopeful young learners.</p>
    `,
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
    content: `
      <p>When it comes to travel, your bag is more than just luggage—it's your companion on every journey. Choosing the right travel bag can make or break your travel experience. Here's what you need to know.</p>
      
      <h2>Size Matters</h2>
      <p>Consider the duration of your trip. For weekend getaways, a compact duffel bag works perfectly. For longer journeys, you'll need something with more capacity but still manageable.</p>
      
      <h2>Durability is Key</h2>
      <p>Look for bags made from high-quality materials that can withstand the rigors of travel. Water-resistant fabrics and reinforced stitching are essential features.</p>
      
      <h2>Organization Features</h2>
      <p>Multiple compartments, pockets, and organizers help keep your belongings in order. This is especially important for longer trips where you need quick access to different items.</p>
      
      <h2>Comfort and Style</h2>
      <p>Your travel bag should be comfortable to carry, whether you're using handles, shoulder straps, or backpack straps. But it should also reflect your personal style and make a statement.</p>
      
      <p>At SONCIS, we've designed our travel bags with all these considerations in mind. Each bag is crafted to be your perfect travel companion, combining functionality with timeless style.</p>
    `,
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
    content: `
      <p>Your office bag is a reflection of your professional identity. It's the first thing colleagues and clients notice, and it needs to perform flawlessly day in and day out.</p>
      
      <h2>Professional Appearance</h2>
      <p>An office bag should look polished and professional. Clean lines, quality materials, and a sophisticated color palette convey competence and attention to detail.</p>
      
      <h2>Laptop Protection</h2>
      <p>Most professionals need to carry a laptop. Your bag should have a dedicated, padded compartment that protects your device from bumps and scratches during your commute.</p>
      
      <h2>Document Organization</h2>
      <p>Keep important documents, notebooks, and files organized with multiple compartments. A well-organized bag saves time and reduces stress during busy workdays.</p>
      
      <h2>Comfortable Carrying</h2>
      <p>Whether you prefer a briefcase, messenger bag, or backpack style, comfort is crucial. Padded straps and ergonomic design make a difference during long commutes.</p>
      
      <h2>Versatility</h2>
      <p>The best office bags transition seamlessly from the office to after-work events. Look for designs that work in multiple settings.</p>
      
      <p>SONCIS office bags are designed with the modern professional in mind, combining elegance with practical features that support your success.</p>
    `,
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
    content: `
      <p>Investing in a quality bag means investing in something that should last for years. Proper care and maintenance are essential to preserving both the appearance and functionality of your premium bags.</p>
      
      <h2>Regular Cleaning</h2>
      <p>Dust and dirt can accumulate over time. For most bags, a gentle wipe with a damp cloth is sufficient. For leather bags, use a specialized leather cleaner and conditioner.</p>
      
      <h2>Proper Storage</h2>
      <p>When not in use, store your bag in a cool, dry place. Avoid hanging bags by their straps for extended periods, as this can cause stretching. Stuff bags with tissue paper to maintain their shape.</p>
      
      <h2>Handle with Care</h2>
      <p>Avoid overloading your bag beyond its recommended capacity. This prevents strain on zippers, straps, and seams. Distribute weight evenly when packing.</p>
      
      <h2>Protect from Elements</h2>
      <p>While many modern bags are water-resistant, it's best to avoid prolonged exposure to rain or moisture. If your bag does get wet, allow it to air dry completely before storing.</p>
      
      <h2>Address Issues Early</h2>
      <p>Small repairs, like loose threads or minor scuffs, are easier to fix when addressed promptly. Regular inspection helps catch problems before they become serious.</p>
      
      <h2>Professional Maintenance</h2>
      <p>For premium bags, consider professional cleaning and repair services. They have the expertise and tools to properly care for high-quality materials.</p>
      
      <p>At SONCIS, we believe in creating bags that stand the test of time. With proper care, your SONCIS bag will be a trusted companion for many years.</p>
    `,
  },
  {
    id: 4,
    title: "Back to School: Essential Bag Features",
    excerpt:
      "What to look for when choosing a school bag that's both practical and stylish for students of all ages.",
    image: "/schoolbag.png",
    author: "SONCIS Team",
    date: "December 28, 2024",
    category: "Education",
    content: `
      <p>Choosing the right school bag is crucial for students. It needs to be functional, durable, and comfortable enough to carry throughout the school day.</p>
      
      <h2>Ergonomic Design</h2>
      <p>Look for bags with padded, adjustable straps that distribute weight evenly across the shoulders. This is especially important for students who carry heavy textbooks and laptops.</p>
      
      <h2>Spacious Compartments</h2>
      <p>Students need space for books, notebooks, laptops, and supplies. Multiple compartments help organize different items and make it easier to find what you need quickly.</p>
      
      <h2>Durability</h2>
      <p>School bags face daily wear and tear. Reinforced stitching, quality zippers, and durable materials ensure your bag lasts through the entire school year and beyond.</p>
      
      <h2>Laptop Protection</h2>
      <p>Most students now carry laptops or tablets. A dedicated, padded compartment protects these valuable devices from damage.</p>
      
      <h2>Water Resistance</h2>
      <p>Protect books and electronics from unexpected rain or spills. Water-resistant materials keep contents dry even in wet conditions.</p>
      
      <h2>Reflective Elements</h2>
      <p>For students who walk or bike to school, reflective strips or patches improve visibility and safety, especially during early morning or evening commutes.</p>
      
      <h2>Style Matters</h2>
      <p>While functionality is key, students also want bags that reflect their personal style. Modern designs that balance practicality with aesthetics are ideal.</p>
      
      <p>SONCIS school bags are designed with students in mind, combining all these essential features with contemporary style that students love.</p>
    `,
  },
]

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = blogPosts.find((p) => p.id === parseInt(id))

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>

        <article className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <div className="mb-4">
              <span className="px-3 py-1 bg-secondary text-sm font-medium rounded-full">
                {post.category}
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 tracking-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] overflow-hidden bg-secondary mb-12 rounded-lg">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Additional Images for Blog Post 5 */}
          {post.id === 5 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary rounded-lg">
                <Image
                  src="/blog2.png"
                  alt="SONCIS Bag Reward Program"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary rounded-lg">
                <Image
                  src="/blog1.png"
                  alt="SONCIS Bag Reward Program"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          )}

          {/* Content */}
          <div
            className="prose prose-lg max-w-none dark:prose-invert
              prose-headings:font-serif prose-headings:font-semibold
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* CTA Section */}
          <div className="mt-16 pt-8 border-t border-border">
            <div className="bg-secondary rounded-lg p-8 text-center">
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold mb-4">
                Explore Our Collection
              </h2>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Discover the perfect bag that matches your lifestyle and needs.
              </p>
              <Button asChild size="lg">
                <Link href="/shop">Shop Now</Link>
              </Button>
            </div>
          </div>
        </article>
      </section>
    </div>
  )
}

