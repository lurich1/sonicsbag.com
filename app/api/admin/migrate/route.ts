import { NextResponse } from "next/server"
import { cookies } from "next/headers"

// This route is deprecated - data is now stored in the database via the backend API
// Kept for backward compatibility but does nothing
export async function POST() {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get("adminToken")?.value
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Migration is no longer needed - all data is managed through the backend API
    return NextResponse.json({ 
      message: "Migration is no longer needed. Products are stored in the database.",
      migrated: false 
    })
  } catch (error) {
    return NextResponse.json({ error: "Migration failed" }, { status: 500 })
  }
}
