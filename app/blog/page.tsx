import { Header } from "@/components/header"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { query } from "@/lib/db"

interface DbBlogPost {
  id: number
  title: string
  content: string
  image?: string | null
  created_at: string
}

export default async function BlogPage() {
  const rows = await query<DbBlogPost>(
    "SELECT id, title, content, image, created_at FROM blog_posts ORDER BY created_at DESC"
  )

  const blogPosts = rows.map((post) => {
    const plainText = post.content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
    const excerpt = plainText.length > 160 ? `${plainText.slice(0, 160)}...` : plainText

    return {
      id: post.id,
      title: post.title,
      excerpt,
      image: post.image || "/placeholder.svg",
      author: "SONCIS Team",
      date: new Date(post.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      category: "Blog",
    }
  })

  return (
    <div className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24">
        <Button variant="ghost" asChild className="mb-6">
          <Link href="/">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </Button>

        <div className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 md:mb-24">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 tracking-tight">
            Blog
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground text-balance">
            Stay updated with the latest trends, tips, and stories from the world of premium bags.
          </p>
        </div>

        {/* Blog Posts Grid */}
        {blogPosts.length === 0 ? (
          <p className="text-center text-muted-foreground">No blog posts yet. Please check back soon.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
            {blogPosts.map((post) => (
              <article key={post.id} className="group">
                <Link href={`/blog/${post.id}`} className="block">
                  <div className="relative aspect-[4/3] overflow-hidden bg-secondary mb-4 rounded-lg">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-background/90 backdrop-blur text-xs font-medium rounded-full">
                        {post.category}
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>{post.author}</span>
                      </div>
                    </div>
                    <h2 className="font-serif text-2xl sm:text-3xl font-semibold group-hover:text-primary transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>
                    <Button variant="ghost" className="p-0 h-auto text-sm font-medium group-hover:text-primary">
                      Read More →
                    </Button>
                  </div>
                </Link>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="bg-secondary py-12 sm:py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">
              Stay in the Loop
            </h2>
            <p className="text-muted-foreground mb-8 text-base sm:text-lg leading-relaxed">
              Subscribe to our newsletter for the latest blog posts, product updates, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button size="lg" className="h-12 px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

