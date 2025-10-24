import { notFound } from 'next/navigation'
import { db } from '../../../lib/db'
import { formatPrice, formatDate } from '../../../lib/utils'
import { Package, Lightbulb, Eye, MapPin, Clock, CheckCircle } from 'lucide-react'
import { Button } from '../../../components/ui/button'
import Link from 'next/link'

async function getListing(id: string) {
  try {
    const listing = await db.listing.findUnique({
      where: { id, status: 'ACTIVE' },
      include: {
        user: {
          select: {
            username: true,
            firstName: true,
            lastName: true,
            university: true,
            isVerified: true,
            imageUrl: true,
            bio: true,
            whatsapp: true,
            instagram: true,
            facebook: true,
            createdAt: true,
          }
        }
      }
    })

    return listing
  } catch (error) {
    console.error('Error fetching listing:', error)
    return null
  }
}

export default async function ListingPage({ params }: { params: { id: string } }) {
  const listing = await getListing(params.id)

  if (!listing) {
    notFound()
  }

  const sellerName = listing.user.firstName && listing.user.lastName
    ? `${listing.user.firstName} ${listing.user.lastName}`
    : `@${listing.user.username}`

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="aspect-square bg-gray-100 relative">
                {listing.images.length > 0 ? (
                  <img
                    src={listing.images[0]}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange/10 to-coral/10">
                    {listing.type === 'PRODUCT' ? (
                      <Package className="w-24 h-24 text-orange/50" />
                    ) : (
                      <Lightbulb className="w-24 h-24 text-orange/50" />
                    )}
                  </div>
                )}
                
                {/* Type Badge */}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-lg">
                  <span className="text-sm font-semibold text-gray-700">
                    {listing.type === 'PRODUCT' ? '📦 Product' : '💡 Service'}
                  </span>
                </div>

                {/* Condition Badge */}
                {listing.condition && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-lg text-sm font-semibold">
                    {listing.condition.replace('_', ' ')}
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {listing.images.length > 1 && (
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2 overflow-x-auto">
                    {listing.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${listing.title} ${index + 1}`}
                        className="w-16 h-16 object-cover rounded-lg border border-gray-200 flex-shrink-0"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-2xl font-bold text-navy mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {listing.description}
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Price & Actions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-6">
              <div className="mb-6">
                <div className="text-4xl font-bold text-orange mb-2">
                  {formatPrice(listing.price)}
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Eye className="w-4 h-4" />
                  <span>123 views</span>
                  <span>•</span>
                  <span>{formatDate(listing.createdAt)}</span>
                </div>
              </div>

              {/* Contact Seller */}
              <div className="space-y-3">
                <h3 className="font-semibold text-navy mb-3">Contact Seller</h3>
                
                {listing.user.whatsapp && (
                  <a
                    href={`https://wa.me/${listing.user.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                  >
                    <span>💬</span>
                    <span>WhatsApp</span>
                  </a>
                )}
                
                {listing.user.instagram && (
                  <a
                    href={`https://instagram.com/${listing.user.instagram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all"
                  >
                    <span>📷</span>
                    <span>Instagram</span>
                  </a>
                )}
                
                {listing.user.facebook && (
                  <a
                    href={listing.user.facebook.startsWith('http') ? listing.user.facebook : `https://facebook.com/${listing.user.facebook}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-colors"
                  >
                    <span>📘</span>
                    <span>Facebook</span>
                  </a>
                )}
              </div>

              {/* Safety Notice */}
              <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-400 rounded-lg">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="w-6 h-6 bg-blue-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs">!</span>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-blue-800 font-medium mb-1">
                      🔒 Always meet in safe campus locations
                    </p>
                    <p className="text-sm text-blue-800">
                      Stay safe and verify the item before payment
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-navy mb-4">Seller Information</h3>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden">
                  {listing.user.imageUrl ? (
                    <img
                      src={listing.user.imageUrl}
                      alt={sellerName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange/20 to-coral/20">
                      <span className="text-2xl font-bold text-orange">
                        {listing.user.firstName?.[0] || listing.user.username[0]}
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-navy">{sellerName}</h4>
                    {listing.user.isVerified && (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-3 h-3" />
                    <span>{listing.user.university}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Clock className="w-3 h-3" />
                    <span>Member since {listing.user.createdAt.getFullYear()}</span>
                  </div>
                </div>
              </div>

              {listing.user.bio && (
                <div className="border-t border-gray-200 pt-4">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {listing.user.bio}
                  </p>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4 mt-4">
                <Link href={`/seller/${listing.user.username}`}>
                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}