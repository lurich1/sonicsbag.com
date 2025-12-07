import { NextRequest, NextResponse } from "next/server"
import { readBlogPosts, writeBlogPosts } from "@/lib/data"
import { cookies } from "next/headers"

// GET single blog post
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const posts = readBlogPosts()
    const post = posts.find((p: any) => p.id === parseInt(id))

    if (!post) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 })
  }
}

// PUT update blog post
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
    const posts = readBlogPosts()

    const index = posts.findIndex((p: any) => p.id === parseInt(id))
    if (index === -1) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    posts[index] = {
      ...posts[index],
      ...body,
      updatedAt: new Date().toISOString(),
    }

    writeBlogPosts(posts)
    return NextResponse.json(posts[index])
  } catch (error) {
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 })
  }
}

// DELETE blog post
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
    const posts = readBlogPosts()

    const filtered = posts.filter((p: any) => p.id !== parseInt(id))
    if (filtered.length === posts.length) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 })
    }

    writeBlogPosts(filtered)
    return NextResponse.json({ message: "Blog post deleted successfully" })
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete blog post" }, { status: 500 })
  }
}

