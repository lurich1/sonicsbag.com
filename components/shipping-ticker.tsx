"use client"

import { Truck, Package, Shield, Star } from "lucide-react"

export function ShippingTicker() {
  const messages = [
    { text: "FREE SHIPPING ON ORDERS OVER ₵3,000", icon: Truck },
    { text: "30-DAY RETURNS ON SONICS BAGS", icon: Package },
    { text: "PREMIUM SONICS BAG COLLECTION", icon: Star },
    { text: "QUALITY GUARANTEED", icon: Shield },
  ]

  return (
    <div className="sticky top-0 z-50 bg-primary text-primary-foreground py-1.5 overflow-hidden">
      <div className="flex gap-8">
        {/* First set for infinite scroll */}
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee-infinite">
          {messages.map((message, index) => {
            const Icon = message.icon
            return (
              <span
                key={`set1-${index}`}
                className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wide"
              >
                <Icon className="h-3 w-3" />
                {message.text}
              </span>
            )
          })}
        </div>
        {/* Duplicate set for seamless loop */}
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee-infinite" aria-hidden="true">
          {messages.map((message, index) => {
            const Icon = message.icon
            return (
              <span
                key={`set2-${index}`}
                className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wide"
              >
                <Icon className="h-3 w-3" />
                {message.text}
              </span>
            )
          })}
        </div>
        {/* Third set to ensure no gaps */}
        <div className="flex items-center gap-8 whitespace-nowrap animate-marquee-infinite" aria-hidden="true">
          {messages.map((message, index) => {
            const Icon = message.icon
            return (
              <span
                key={`set3-${index}`}
                className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-medium uppercase tracking-wide"
              >
                <Icon className="h-3 w-3" />
                {message.text}
              </span>
            )
          })}
        </div>
      </div>
    </div>
  )
}
