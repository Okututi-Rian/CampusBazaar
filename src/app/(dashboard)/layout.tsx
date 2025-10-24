"use client"

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { 
  Home, 
  Package, 
  Plus, 
  User, 
  Settings, 
  HelpCircle, 
  LogOut,
  Menu,
  X,
  TrendingUp
} from 'lucide-react'
import { Button } from '../../components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { useToast } from '../../components/ui/use-toast'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { toast } = useToast()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'My Listings', href: '/dashboard/listings', icon: Package },
    { name: 'Create Listing', href: '/dashboard/create-listing', icon: Plus },
    { name: 'Profile', href: '/dashboard/profile', icon: User },
    { name: 'Upcoming Features', href: '/upcoming-features', icon: TrendingUp },
  ]

  const handleSignOut = () => {
    toast({
      title: 'Signed out successfully',
      description: 'Come back soon!',
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile header */}
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-md text-gray-600 hover:text-orange"
        >
          {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
        <h1 className="text-xl font-bold text-navy">Dashboard</h1>
        <UserButton afterSignOutUrl="/" />
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className={cn(
          'fixed lg:relative inset-y-0 left-0 z-50 w-64 bg-navy text-white transform transition-transform duration-300 lg:translate-x-0',
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}>
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-center p-6 border-b border-white/10">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-orange rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">CB</span>
                </div>
                <span className="text-xl font-bold">Campus Bazaar</span>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors',
                      isActive
                        ? 'bg-orange/20 text-orange border-l-4 border-orange'
                        : 'text-white/70 hover:text-white hover:bg-white/10'
                    )}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            {/* Bottom section */}
            <div className="p-4 border-t border-white/10">
              <div className="space-y-2">
                <Link
                  href="/help"
                  className="flex items-center space-x-3 px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  <HelpCircle className="w-5 h-5" />
                  <span className="font-medium">Help & Support</span>
                </Link>
                
                <UserButton afterSignOutUrl="/" signOutCallback={handleSignOut}>
                  <div className="flex items-center space-x-3 px-4 py-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer w-full">
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Sign Out</span>
                  </div>
                </UserButton>
              </div>
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Main content */}
        <div className="flex-1 lg:ml-64">
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}