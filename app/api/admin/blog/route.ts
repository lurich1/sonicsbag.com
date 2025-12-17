import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { query } from "@/lib/db"

// GET all blog posts
export async function GET() {
  try {
    const posts = await query<any>("SELECT * FROM blog_posts ORDER BY created_at DESC")
    return NextResponse.json(posts)
  } catch (error) {
    console.error("Error fetching blog posts:", error)
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 })
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
    const {
      title,
      content,
      image,
    } = body

    await query<any>(
      "INSERT INTO blog_posts (title, content, image, created_at) VALUES (?, ?, ?, NOW())",
      [title, content, image]
    )

    const inserted = await query<any>("SELECT * FROM blog_posts WHERE id = LAST_INSERT_ID()")

    return NextResponse.json(inserted[0], { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 })
  }
}

