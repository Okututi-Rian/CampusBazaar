"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '../../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Eye, MessageCircle, Star, Package, TrendingUp, Users } from 'lucide-react'
import { formatPrice, formatDate } from '../../../../lib/utils'

interface DashboardStats {
  totalListings: number
  profileViews: number
  messagesCount: number
  rating: number
}

interface Listing {
  id: string
  title: string
  price: number
  type: 'PRODUCT' | 'SERVICE'
  status: string
  images: string[]
  createdAt: Date
  views: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalListings: 0,
    profileViews: 0,
    messagesCount: 0,
    rating: 0,
  })
  const [recentListings, setRecentListings] = useState<Listing[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, listingsResponse] = await Promise.all([
        fetch('/api/dashboard/stats'),
        fetch('/api/dashboard/listings?limit=6'),
      ])

      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        setStats(statsData)
      }

      if (listingsResponse.ok) {
        const listingsData = await listingsResponse.json()
        setRecentListings(listingsData)
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const StatCard = ({ icon: Icon, title, value, change, color }: any) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon className="h-4 w-4 text-white" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-navy">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        {change && (
          <p className="text-xs text-green-600 font-medium mt-1">
            +{change} this week
          </p>
        )}
      </CardContent>
    </Card>
  )

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-24" />
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded w-16 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-20" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-3xl font-bold text-navy mb-2">
          Welcome back! 👋
        </h1>
        <p className="text-gray-600">
          Here's what's happening with your listings
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Package}
          title="Total Listings"
          value={stats.totalListings}
          change={3}
          color="bg-orange"
        />
        <StatCard
          icon={Eye}
          title="Profile Views"
          value={stats.profileViews}
          change={89}
          color="bg-blue-500"
        />
        <StatCard
          icon={MessageCircle}
          title="Messages"
          value="Coming Soon"
          color="bg-green-500"
        />
        <StatCard
          icon={Star}
          title="Seller Rating"
          value="Coming Soon"
          color="bg-yellow-500"
        />
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/dashboard/create-listing">
              <Button className="w-full bg-orange hover:bg-orange/90">
                Create New Listing
              </Button>
            </Link>
            <Link href="/dashboard/profile">
              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Getting Started</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-gray-600">
            <p>• Complete your profile for better trust</p>
            <p>• Add clear photos to your listings</p>
            <p>• Respond quickly to buyer inquiries</p>
            <p>• Share your listings on social media</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Listings */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-navy">Recent Listings</h2>
          <Link href="/dashboard/listings">
            <Button variant="outline">View All</Button>
          </Link>
        </div>

        {recentListings.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-navy mb-2">No listings yet</h3>
              <p className="text-gray-600 mb-4">
                Create your first listing to start selling to fellow students
              </p>
              <Link href="/dashboard/create-listing">
                <Button className="bg-orange hover:bg-orange/90">
                  Create Your First Listing
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentListings.map((listing) => (
              <Card key={listing.id} className="group hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                      {listing.images.length > 0 ? (
                        <img
                          src={listing.images[0]}
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-navy truncate group-hover:text-orange transition-colors">
                        {listing.title}
                      </h3>
                      <p className="text-lg font-bold text-orange">
                        {formatPrice(listing.price)}
                      </p>
                      <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                        <span>{formatDate(listing.createdAt)}</span>
                        <span>{listing.views} views</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}