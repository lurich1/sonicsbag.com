import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { apiConfig } from "@/lib/api"

// GET single blog post - proxy to backend
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const response = await fetch(apiConfig.endpoints.blogPost(id))
    
    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
      }
      return NextResponse.json({ error: "Failed to fetch blog post" }, { status: response.status })
    }

    const post = await response.json()
    
    // Map backend format to frontend format
    const frontendPost = {
      id: String(post.id),
      title: post.title,
      content: post.content || "",
      image: post.imageUrl || "",
      images: post.imageUrl ? [post.imageUrl] : [],
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
    }

    return NextResponse.json(frontendPost)
  } catch (error) {
    console.error("Error fetching blog post from backend:", error)
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}

// PUT update blog post - proxy to backend with auth
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("adminToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const body = await request.json()
    
    // Map frontend format to backend format
    const backendPost = {
      title: body.title,
      content: body.content || null,
      imageUrl: body.image || body.images?.[0] || null,
      category: body.category || null,
    }

    const response = await fetch(apiConfig.endpoints.blogPost(id), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(backendPost),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Failed to update blog post" }))
      return NextResponse.json(error, { status: response.status })
    }

    const updatedPost = await response.json()
    
    // Map backend format to frontend format
    const frontendPost = {
      id: String(updatedPost.id),
      title: updatedPost.title,
      content: updatedPost.content || "",
      image: updatedPost.imageUrl || "",
      images: updatedPost.imageUrl ? [updatedPost.imageUrl] : [],
      category: updatedPost.category || "",
      date: updatedPost.createdAt ? new Date(updatedPost.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      createdAt: updatedPost.createdAt,
    }

    return NextResponse.json(frontendPost)
  } catch (error) {
    console.error("Error updating blog post:", error)
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 })
  }
}

// DELETE blog post - proxy to backend with auth
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("adminToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    const response = await fetch(apiConfig.endpoints.blogPost(id), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "Failed to delete blog post" }))
      return NextResponse.json(error, { status: response.status })
    }

    return NextResponse.json({ message: "Blog post deleted successfully" })
  } catch (error) {
    console.error("Error deleting blog post:", error)
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}

