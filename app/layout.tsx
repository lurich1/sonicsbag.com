import type React from "react"
import type { Metadata } from "next"
import { Geist, Playfair_Display } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/components/cart-provider"
import { Toaster } from "@/components/ui/toaster"
import { ShippingTicker } from "@/components/shipping-ticker"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "SONCIS - Premium Bags",
  description: "Discover our collection of stylish and functional bags for every occasion",
  icons: {
    icon: [
      {
        url: "/photo_2025-11-02_05-35-41-removebg-preview.png",
      },
    ],
    apple: "/photo_2025-11-02_05-35-41-removebg-preview.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} ${playfair.variable} font-sans antialiased`} suppressHydrationWarning>
        <CartProvider>
          <ShippingTicker />
          {children}
          <Toaster />
        </CartProvider>
      </body>
    </html>
  )
}
