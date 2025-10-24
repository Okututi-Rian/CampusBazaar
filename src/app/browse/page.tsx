"use client"

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from '../../components/ui/card'
import { formatPrice, formatDate } from '../../lib/utils'
import { Search, Filter, Package, Lightbulb, Eye, X } from 'lucide-react'

interface Listing {
  id: string
  title: string
  description: string
  price: number
  type: 'PRODUCT' | 'SERVICE'
  condition?: string
  images: string[]
  createdAt: Date
  user: {
    username: string
    university: string
    isVerified: boolean
  }
}

export default function BrowsePage() {
  const searchParams = useSearchParams()
  const [listings, setListings] = useState<Listing[]>([])
  const [filteredListings, setFilteredListings] = useState<Listing[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedType, setSelectedType] = useState<'all' | 'product' | 'service'>('all')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 })
  const [sortBy, setSortBy] = useState<'latest' | 'price-low' | 'price-high'>('latest')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    const q = searchParams.get('q')
    if (q) {
      setSearchQuery(q)
    }
    fetchListings()
  }, [searchParams])

  useEffect(() => {
    filterAndSortListings()
  }, [listings, searchQuery, selectedType, priceRange, sortBy])

  const fetchListings = async () => {
    try {
      const response = await fetch('/api/listings')
      if (response.ok) {
        const data = await response.json()
        setListings(data)
      }
    } catch (error) {
      console.error('Error fetching listings:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const filterAndSortListings = () => {
    let filtered = listings

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(listing =>
        listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        listing.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Type filter
    if (selectedType !== 'all') {
      filtered = filtered.filter(listing =>
        listing.type.toLowerCase() === selectedType.toUpperCase()
      )
    }

    // Price filter
    filtered = filtered.filter(listing =>
      listing.price >= priceRange.min && listing.price <= priceRange.max
    )

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price)
        break
      default:
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    setFilteredListings(filtered)
  }

  const ListingCard = ({ listing }: { listing: Listing }) => (
    <Link
      href={`/listing/${listing.id}`}
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-orange transition-all duration-300 hover:-translate-y-1"
    >
      <div className="aspect-square bg-gray-100 relative overflow-hidden">
        {listing.images.length > 0 ? (
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange/10 to-coral/10">
            {listing.type === 'PRODUCT' ? (
              <Package className="w-16 h-16 text-orange/50" />
            ) : (
              <Lightbulb className="w-16 h-16 text-orange/50" />
            )}
          </div>
        )}
        
        {/* Type Badge */}
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
          <span className="text-xs font-semibold text-gray-700">
            {listing.type === 'PRODUCT' ? '📦 Product' : '💡 Service'}
          </span>
        </div>

        {/* Condition Badge */}
        {listing.condition && (
          <div className="absolute top-3 right-3 bg-green-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
            {listing.condition.replace('_', ' ')}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-navy mb-2 line-clamp-2 group-hover:text-orange transition-colors">
          {listing.title}
        </h3>
        
        <p className="text-2xl font-bold text-orange mb-2">
          {formatPrice(listing.price)}
        </p>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-3">
          {listing.description}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <div className="flex items-center space-x-1">
            <span className="font-medium">@{listing.user.username}</span>
            {listing.user.isVerified && (
              <span className="text-green-500">✓</span>
            )}
            <span>•</span>
            <span>{listing.user.university}</span>
          </div>
          <span>{formatDate(listing.createdAt)}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-xs text-gray-500">
            <Eye className="w-3 h-3" />
            <span>123 views</span>
          </div>
          <span className="text-xs text-orange font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  )

  const FilterSidebar = () => (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-navy">Filters</h3>
        <button
          onClick={() => setShowFilters(false)}
          className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Type Filter */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Type</h4>
        <div className="space-y-2">
          {['all', 'product', 'service'].map((type) => (
            <label key={type} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value={type}
                checked={selectedType === type}
                onChange={(e) => setSelectedType(e.target.value as any)}
                className="text-orange focus:ring-orange"
              />
              <span className="text-sm capitalize">
                {type === 'all' ? 'All Items' : type + 's'}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Price Range</h4>
        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Min Price</label>
            <input
              type="number"
              value={priceRange.min}
              onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) || 0 }))}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              placeholder="0"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Max Price</label>
            <input
              type="number"
              value={priceRange.max}
              onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) || 100000 }))}
              className="w-full p-2 border border-gray-300 rounded-lg text-sm"
              placeholder="100000"
            />
          </div>
        </div>
      </div>

      {/* Sort */}
      <div className="mb-6">
        <h4 className="font-medium text-gray-700 mb-3">Sort By</h4>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as any)}
          className="w-full p-2 border border-gray-300 rounded-lg text-sm"
        >
          <option value="latest">Latest First</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
        </select>
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => {
          setSelectedType('all')
          setPriceRange({ min: 0, max: 100000 })
          setSortBy('latest')
        }}
      >
        Clear Filters
      </Button>
    </div>
  )

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-10 bg-gray-200 rounded-lg mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <Card key={i}>
                <CardContent className="p-4">
                  <div className="aspect-square bg-gray-200 rounded-lg mb-4" />
                  <div className="h-4 bg-gray-200 rounded mb-2" />
                  <div className="h-6 bg-gray-200 rounded mb-2" />
                  <div className="h-12 bg-gray-200 rounded mb-4" />
                  <div className="flex justify-between">
                    <div className="h-3 bg-gray-200 rounded w-20" />
                    <div className="h-3 bg-gray-200 rounded w-16" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-navy">
            Browse Listings
          </h1>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Search Bar */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products, services, or sellers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
              />
            </div>
          </div>

          {/* Desktop Filters Button */}
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="hidden lg:flex items-center"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filters Sidebar */}
        <div className={cn(
          'lg:w-64',
          showFilters ? 'block' : 'hidden lg:block'
        )}>
          <FilterSidebar />
        </div>

        {/* Listings Grid */}
        <div className="flex-1">
          {filteredListings.length === 0 ? (
            <Card>
              <CardContent className="text-center py-16">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-navy mb-2">
                  No listings found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filters
                </p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedType('all')
                    setPriceRange({ min: 0, max: 100000 })
                    setSortBy('latest')
                  }}
                >
                  Clear All Filters
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}

          {/* Results Summary */}
          {filteredListings.length > 0 && (
            <div className="mt-8 text-center text-gray-600">
              Showing {filteredListings.length} of {listings.length} listings
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}