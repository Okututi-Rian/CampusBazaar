"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Plus } from 'lucide-react'
import { Button } from '../../components/ui/button'

export function HeroSection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const heroImages = [
    '/hero-1.jpg',
    '/hero-2.jpg',
    '/hero-3.jpg',
    '/hero-4.jpg',
    '/hero-5.jpg',
    '/hero-6.jpg',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [heroImages.length])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Gradient Overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-purple to-orange opacity-90" />

        {/* Animated Grid of Images */}
        <div className="absolute right-0 top-0 w-1/2 h-full flex items-center justify-center p-8">
          <div className="grid grid-cols-2 gap-4 max-w-lg">
            {heroImages.map((image, index) => (
              <div
                key={index}
                className={cn(
                  "relative overflow-hidden rounded-2xl transition-all duration-700 ease-in-out",
                  index === currentImageIndex
                    ? "opacity-100 scale-100"
                    : "opacity-0 scale-95"
                )}
              >
                <Image
                  src={image}
                  alt={`Hero Image ${index + 1}`}
                  width={300}
                  height={400}
                  className="w-48 h-60 object-cover rounded-2xl"
                  priority={index === currentImageIndex}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <div className="animate-fade-in" style={{ animationDelay: '600ms' }}>
              <p className="text-orange text-sm font-medium uppercase tracking-wider mb-4">
                Welcome to Campus Bazaar
              </p>
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              <span className="block animate-slide-up" style={{ animationDelay: '800ms' }}>
                Your Campus.
              </span>
              <span className="block animate-slide-up" style={{ animationDelay: '1000ms' }}>
                Your Hustle.
              </span>
              <span className="block animate-slide-up" style={{ animationDelay: '1200ms' }}>
                Your Community.
              </span>
            </h1>

            <p
              className="text-xl text-white/90 mb-8 max-w-lg animate-fade-in"
              style={{ animationDelay: '1400ms' }}
            >
              Connect with verified students. Buy smart. Sell fast. Build your legacy.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4 animate-fade-in"
              style={{ animationDelay: '1600ms' }}
            >
              <Link href="/browse">
                <Button
                  size="lg"
                  className="bg-orange hover:bg-orange/90 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Start Browsing
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-navy px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                >
                  Become a Seller
                  <Plus className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}
