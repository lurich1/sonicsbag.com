import { Header } from "@/components/header"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, User } from "lucide-react"
import { notFound } from "next/navigation"
import { apiConfig } from "@/lib/api"

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let post: any = null
  
  try {
    // Fetch blog post from backend API
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 5000) // 5 second timeout

    const response = await fetch(apiConfig.endpoints.blogPost(id), {
      cache: "no-store", // Always fetch fresh data
      signal: controller.signal,
    })
    
    clearTimeout(timeoutId)
    
    if (response.ok) {
      post = await response.json()
    }
  } catch (error: any) {
    // Handle connection errors gracefully
    if (error.name === 'AbortError' || error.code === 'ECONNREFUSED' || error.cause?.code === 'ECONNREFUSED') {
      // Backend is not running
    } else {
      console.error("Error fetching blog post:", error)
    }
  }

  if (!post) {
    notFound()
  }

  // Helper function to fix localhost URLs to production URL
  const fixImageUrl = (url: string | null | undefined): string => {
    if (!url) return "/placeholder.svg"
    // Replace localhost URLs with production URL
    const productionUrl = apiConfig.baseUrl
    if (url.includes("localhost")) {
      return url.replace(/https?:\/\/localhost:\d+/, productionUrl)
    }
    return url
  }

  const date = post.date
    ? post.date
    : new Date(post.createdAt || Date.now()).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
  
  const imageUrl = fixImageUrl(post.imageUrl || post.image)

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
                {post.category || "Blog"}
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-semibold mb-6 tracking-tight">
              {post.title}
            </h1>
            <div className="flex items-center gap-6 text-sm text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author || "SONCIS Team"}</span>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative aspect-[16/9] overflow-hidden bg-secondary mb-12 rounded-lg">
            {imageUrl && imageUrl !== "/placeholder.svg" ? (
              <img
                src={imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-muted">
                <span className="text-muted-foreground">{post.title}</span>
              </div>
            )}
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
            dangerouslySetInnerHTML={{ __html: post.content || post.Content || "" }}
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

