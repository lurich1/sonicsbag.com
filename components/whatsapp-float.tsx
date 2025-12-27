"use client"

import { MessageCircle } from "lucide-react"
import Link from "next/link"

export function WhatsAppFloat() {
  const whatsappNumber = "233552702318" // Ghana format without +
  const whatsappMessage = "Hello, I'm interested in your products!"

  return (
    <Link
      href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
      <span className="absolute -top-2 -right-2 flex h-4 w-4">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
        <span className="relative inline-flex rounded-full h-4 w-4 bg-[#25D366]"></span>
      </span>
    </Link>
  )
}
