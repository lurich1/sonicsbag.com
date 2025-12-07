import fs from "fs"
import path from "path"

// In-memory storage for Vercel (serverless functions have read-only filesystem)
let productsCache: any[] | null = null
let blogPostsCache: any[] | null = null
let ordersCache: any[] | null = null

const dataDir = path.join(process.cwd(), "data")

// Check if we're in a serverless environment (Vercel)
const isServerless = process.env.VERCEL === "1" || !fs.existsSync || typeof fs.writeFileSync === "undefined"

// Ensure data directory exists (only in non-serverless)
function ensureDataDir() {
  if (isServerless) return
  try {
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
  } catch (error) {
    // Ignore errors in serverless
  }
}

// Products data file
export const productsFile = path.join(dataDir, "products.json")

// Blog posts data file
export const blogPostsFile = path.join(dataDir, "blog-posts.json")

// Orders data file
export const ordersFile = path.join(dataDir, "orders.json")

// Initialize data files if they don't exist
export function initializeDataFiles() {
  if (isServerless) return
  ensureDataDir()
  try {
    if (!fs.existsSync(productsFile)) {
      fs.writeFileSync(productsFile, JSON.stringify([], null, 2))
    }
    if (!fs.existsSync(blogPostsFile)) {
      fs.writeFileSync(blogPostsFile, JSON.stringify([], null, 2))
    }
    if (!fs.existsSync(ordersFile)) {
      fs.writeFileSync(ordersFile, JSON.stringify([], null, 2))
    }
  } catch (error) {
    // Ignore errors in serverless
  }
}

// Read products
export function readProducts() {
  // Return cache if available (for serverless)
  if (productsCache !== null) {
    return productsCache
  }

  if (isServerless) {
    return []
  }

  initializeDataFiles()
  try {
    if (!fs.existsSync(productsFile)) {
      return []
    }
    const data = fs.readFileSync(productsFile, "utf-8")
    const parsed = JSON.parse(data)
    productsCache = parsed
    return parsed
  } catch (error) {
    console.error("Error reading products:", error)
    return []
  }
}

// Write products
export function writeProducts(products: any[]) {
  // Update cache
  productsCache = products

  if (isServerless) {
    // In serverless, we can't persist to disk, so just update cache
    return
  }

  ensureDataDir()
  try {
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2))
  } catch (error) {
    console.error("Error writing products:", error)
    // Don't throw - just log the error
  }
}

// Read blog posts
export function readBlogPosts() {
  // Return cache if available (for serverless)
  if (blogPostsCache !== null) {
    return blogPostsCache
  }

  if (isServerless) {
    return []
  }

  initializeDataFiles()
  try {
    if (!fs.existsSync(blogPostsFile)) {
      return []
    }
    const data = fs.readFileSync(blogPostsFile, "utf-8")
    const parsed = JSON.parse(data)
    blogPostsCache = parsed
    return parsed
  } catch (error) {
    console.error("Error reading blog posts:", error)
    return []
  }
}

// Write blog posts
export function writeBlogPosts(posts: any[]) {
  // Update cache
  blogPostsCache = posts

  if (isServerless) {
    // In serverless, we can't persist to disk, so just update cache
    return
  }

  ensureDataDir()
  try {
    fs.writeFileSync(blogPostsFile, JSON.stringify(posts, null, 2))
  } catch (error) {
    console.error("Error writing blog posts:", error)
    // Don't throw - just log the error
  }
}

// Read orders
export function readOrders() {
  // Return cache if available (for serverless)
  if (ordersCache !== null) {
    return ordersCache
  }

  if (isServerless) {
    return []
  }

  initializeDataFiles()
  try {
    if (!fs.existsSync(ordersFile)) {
      return []
    }
    const data = fs.readFileSync(ordersFile, "utf-8")
    const parsed = JSON.parse(data)
    ordersCache = parsed
    return parsed
  } catch (error) {
    console.error("Error reading orders:", error)
    return []
  }
}

// Write orders
export function writeOrders(orders: any[]) {
  // Update cache
  ordersCache = orders

  if (isServerless) {
    // In serverless, we can't persist to disk, so just update cache
    return
  }

  ensureDataDir()
  try {
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2))
  } catch (error) {
    console.error("Error writing orders:", error)
    // Don't throw - just log the error
  }
}

