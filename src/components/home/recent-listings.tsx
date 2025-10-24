import Link from 'next/link'
import { db } from '../../lib/db'
import { formatPrice, formatDate } from '../../lib/utils'
import { Package, Lightbulb, Eye } from 'lucide-react'
import { Button } from '../ui/button'
import { ArrowRight } from 'lucide-react'

async function getRecentListings() {
  try {
    const listings = await db.listing.findMany({
      where: { status: 'ACTIVE' },
      include: {
        user: {
          select: {
            username: true,
            university: true,
            isVerified: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 12,
    })
    
    return listings
  } catch (error) {
    console.error('Error fetching listings:', error)
    return []
  }
}

export async function RecentListings() {
  const listings = await getRecentListings()

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-navy mb-4">
            Latest Listings
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Check out what fellow students are selling right now
          </p>
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-navy mb-2">No listings yet</h3>
            <p className="text-gray-600 mb-4">Be the first to post a listing!</p>
            <Link href="/dashboard/create-listing">
              <button className="bg-orange text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange/90 transition-colors">
                Create Listing
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {listings.map((listing) => (
              <Link
                key={listing.id}
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
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {listing.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
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
                  
                  <div className="mt-3 flex items-center justify-between">
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
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Link href="/browse">
            <Button size="lg" variant="outline">
              View All Listings
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}