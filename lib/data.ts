import fs from "fs"
import path from "path"

const dataDir = path.join(process.cwd(), "data")

// Ensure data directory exists
function ensureDataDir() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
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
  ensureDataDir()
  if (!fs.existsSync(productsFile)) {
    fs.writeFileSync(productsFile, JSON.stringify([], null, 2))
  }
  if (!fs.existsSync(blogPostsFile)) {
    fs.writeFileSync(blogPostsFile, JSON.stringify([], null, 2))
  }
  if (!fs.existsSync(ordersFile)) {
    fs.writeFileSync(ordersFile, JSON.stringify([], null, 2))
  }
}

// Read products
export function readProducts() {
  initializeDataFiles()
  try {
    if (!fs.existsSync(productsFile)) {
      return []
    }
    const data = fs.readFileSync(productsFile, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading products:", error)
    return []
  }
}

// Write products
export function writeProducts(products: any[]) {
  ensureDataDir()
  try {
    fs.writeFileSync(productsFile, JSON.stringify(products, null, 2))
  } catch (error) {
    console.error("Error writing products:", error)
    throw error
  }
}

// Read blog posts
export function readBlogPosts() {
  initializeDataFiles()
  try {
    if (!fs.existsSync(blogPostsFile)) {
      return []
    }
    const data = fs.readFileSync(blogPostsFile, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading blog posts:", error)
    return []
  }
}

// Write blog posts
export function writeBlogPosts(posts: any[]) {
  ensureDataDir()
  try {
    fs.writeFileSync(blogPostsFile, JSON.stringify(posts, null, 2))
  } catch (error) {
    console.error("Error writing blog posts:", error)
    throw error
  }
}

// Read orders
export function readOrders() {
  initializeDataFiles()
  try {
    if (!fs.existsSync(ordersFile)) {
      return []
    }
    const data = fs.readFileSync(ordersFile, "utf-8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading orders:", error)
    return []
  }
}

// Write orders
export function writeOrders(orders: any[]) {
  ensureDataDir()
  try {
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2))
  } catch (error) {
    console.error("Error writing orders:", error)
    throw error
  }
}

