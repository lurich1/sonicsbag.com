import { NextRequest, NextResponse } from "next/server"
import { readBlogPosts, writeBlogPosts } from "@/lib/data"
import { cookies } from "next/headers"

// GET all blog posts
export async function GET() {
  try {
    const posts = readBlogPosts()
    // Always return an array, even if empty
    return NextResponse.json(Array.isArray(posts) ? posts : [])
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    // Return empty array instead of error to prevent crashes
    return NextResponse.json([])
  }
}

// POST create new blog post
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("adminToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const posts = readBlogPosts()

    const newPost = {
      id: Date.now(),
      ...body,
      createdAt: new Date().toISOString(),
    }

    posts.push(newPost)
    writeBlogPosts(posts)

    return NextResponse.json(newPost, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}

