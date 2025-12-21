import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { apiConfig } from "@/lib/api"

// GET all blog posts - proxy to backend
export async function GET() {
  try {
    const response = await fetch(apiConfig.endpoints.blog)
    if (!response.ok) {
      return NextResponse.json([], { status: response.status })
    }
    const posts = await response.json()
    
    // Map backend format to frontend format
    const mappedPosts = (Array.isArray(posts) ? posts : []).map((post: any) => ({
      id: String(post.id),
      title: post.title,
      content: post.content || "",
      image: post.imageUrl || "",
      category: post.category || "",
      date: post.createdAt ? new Date(post.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      createdAt: post.createdAt,
    }))
    
    return NextResponse.json(mappedPosts)
  } catch (error) {
    console.error("Error fetching blog posts from backend:", error)
    return NextResponse.json([])
  }
}

// POST create new blog post - proxy to backend with auth
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("adminToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    
    // Map frontend format to backend format
    const backendPost = {
      title: body.title,
      content: body.content || null,
      imageUrl: body.image || body.images?.[0] || null,
      category: body.category || null,
    }

    const response = await fetch(apiConfig.endpoints.blog, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(backendPost),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Failed to create blog post" }))
      return NextResponse.json(error, { status: response.status })
    }

    const createdPost = await response.json()
    
    // Map backend format to frontend format
    const frontendPost = {
      id: String(createdPost.id),
      title: createdPost.title,
      content: createdPost.content || "",
      image: createdPost.imageUrl || "",
      images: createdPost.imageUrl ? [createdPost.imageUrl] : [],
      category: createdPost.category || "",
      date: createdPost.createdAt ? new Date(createdPost.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      createdAt: createdPost.createdAt,
    }

    return NextResponse.json(frontendPost, { status: 201 })
  } catch (error) {
    console.error("Error creating blog post:", error)
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}

