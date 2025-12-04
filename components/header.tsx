"use client"

import Link from "next/link"
import Image from "next/image"
import { ShoppingBag, User, Menu } from "lucide-react"
import { useCart } from "./cart-provider"
import { Button } from "./ui/button"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import { useState, useEffect } from "react"

export function Header() {
  const { itemCount } = useCart()
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/photo_2025-11-02_05-35-41-removebg-preview.png"
            alt="SONCIS Logo"
            width={120}
            height={40}
            className="h-8 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/shop" className="text-sm font-medium hover:text-muted-foreground transition-colors">
            Shop
          </Link>
          <Link href="/collections" className="text-sm font-medium hover:text-muted-foreground transition-colors">
            Collections
          </Link>
          <Link href="/blog" className="text-sm font-medium hover:text-muted-foreground transition-colors">
            Blog
          </Link>
          <Link href="/custom-bag" className="text-sm font-medium hover:text-muted-foreground transition-colors">
            Custom Bag
          </Link>
          <Link href="/repair" className="text-sm font-medium hover:text-muted-foreground transition-colors">
            Repair
          </Link>
          <Link href="/contact" className="text-sm font-medium hover:text-muted-foreground transition-colors">
            Contact
          </Link>
          <Link href="/about" className="text-sm font-medium hover:text-muted-foreground transition-colors">
            About
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <Link href="/profile">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-medium animate-in zoom-in-50 duration-200">
                  {itemCount}
                </span>
              )}
              <span className="sr-only">Cart ({itemCount} items)</span>
            </Button>
          </Link>

          {mounted ? (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[85vw] sm:w-[350px] px-6 [&>button]:border-0 [&>button]:shadow-none [&>button]:ring-0 [&>button]:top-8"
              >
                <div className="flex flex-col gap-8 pt-8">
                  <Link href="/" onClick={() => setOpen(false)}>
                    <Image
                      src="/photo_2025-11-02_05-35-41-removebg-preview.png"
                      alt="SONCIS Logo"
                      width={120}
                      height={40}
                      className="h-8 w-auto object-contain"
                    />
                  </Link>

                  <nav className="flex flex-col gap-0">
                    <Link
                      href="/shop"
                      onClick={() => setOpen(false)}
                      className="text-lg font-medium py-5 px-4 border-b border-border hover:bg-accent transition-colors"
                    >
                      Shop
                    </Link>
                    <Link
                      href="/collections"
                      onClick={() => setOpen(false)}
                      className="text-lg font-medium py-5 px-4 border-b border-border hover:bg-accent transition-colors"
                    >
                      Collections
                    </Link>
                  <Link
                    href="/blog"
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium py-5 px-4 border-b border-border hover:bg-accent transition-colors"
                  >
                    Blog
                  </Link>
                  <Link
                    href="/custom-bag"
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium py-5 px-4 border-b border-border hover:bg-accent transition-colors"
                  >
                    Custom Bag
                  </Link>
                  <Link
                    href="/repair"
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium py-5 px-4 border-b border-border hover:bg-accent transition-colors"
                  >
                    Repair
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium py-5 px-4 border-b border-border hover:bg-accent transition-colors"
                  >
                    Contact
                  </Link>
                  <Link
                    href="/about"
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium py-5 px-4 border-b border-border hover:bg-accent transition-colors"
                  >
                    About
                  </Link>
                    <Link
                      href="/profile"
                      onClick={() => setOpen(false)}
                      className="text-lg font-medium py-5 px-4 border-b border-border hover:bg-accent transition-colors"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/cart"
                      onClick={() => setOpen(false)}
                      className="text-lg font-medium py-5 px-4 border-b border-border hover:bg-accent transition-colors flex items-center justify-between"
                    >
                      <span>Cart</span>
                      {itemCount > 0 && (
                        <span className="h-6 w-6 rounded-full bg-accent text-accent-foreground text-xs flex items-center justify-center font-medium">
                          {itemCount}
                        </span>
                      )}
                    </Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          )}
        </div>
      </div>
    </header>
  )
}
