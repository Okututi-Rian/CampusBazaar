"use client"

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, Plus, User } from 'lucide-react'
import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'

export function MobileNav() {
  const pathname = usePathname()
  const [activeTab, setActiveTab] = useState('home')

  const navItems = [
    { name: 'home', href: '/', icon: Home, label: 'Home' },
    { name: 'browse', href: '/browse', icon: Search, label: 'Browse' },
    { name: 'sell', href: '/dashboard/create-listing', icon: Plus, label: 'Sell' },
    { name: 'profile', href: '/dashboard', icon: User, label: 'Profile' },
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
      <div className="flex justify-around items-center py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href || (item.name === 'home' && pathname === '/')
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center py-2 px-4 rounded-lg transition-colors",
                isActive
                  ? "text-orange"
                  : "text-gray-500 hover:text-orange"
              )}
            >
              {item.name === 'sell' ? (
                <div className="relative">
                  <div className="w-12 h-12 bg-orange rounded-full flex items-center justify-center shadow-lg">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              ) : (
                <>
                  <Icon className="w-5 h-5 mb-1" />
                  <span className="text-xs font-medium">{item.label}</span>
                </>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}