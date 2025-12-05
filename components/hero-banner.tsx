"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const bannerImages = [
  "/banner-large-image2.jpg",
  "/banner-large-image.jpg",
  "/banner-large-image1.jpg",
  "/banner-large-image3.jpg",
]

export function HeroBanner() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerImages.length)
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative h-[50vh] sm:h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Banner Images Carousel */}
      <div className="absolute inset-0 w-full h-full">
        {bannerImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
            style={{ zIndex: index === currentIndex ? 1 : 0 }}
          >
            <Image
              src={image}
              alt={`Banner ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
              sizes="100vw"
              unoptimized
            />
          </div>
        ))}
      </div>

      {/* Gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 text-white">
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold mb-4 sm:mb-6 tracking-tight text-balance drop-shadow-lg">
          Style Meets Function
        </h1>
        <p className="text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto text-balance drop-shadow-md text-white/90">
          Discover premium bags designed for your everyday adventures
        </p>
        <Button asChild size="lg" className="h-10 sm:h-11 px-6 sm:px-8 text-sm sm:text-base">
          <Link href="/shop">Explore Collection</Link>
        </Button>
      </div>

      {/* Carousel Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-white"
                : "w-2 bg-white/50 hover:bg-white/75"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}

