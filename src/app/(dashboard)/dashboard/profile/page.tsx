// "use client"

// import { useState, useEffect } from 'react'
// import Link from 'next/link'
// import { Button } from '../../../../components/ui/button'
// import { Card, CardContent } from '../../../../components/ui/card'
// import { formatPrice, formatDate } from '../../../../lib/utils'
// import { Package, Eye, Pencil, Trash2, Plus, Filter } from 'lucide-react'
// import { useToast } from '../../../../components/ui/use-toast'

// interface Listing {
//   id: string
//   title: string
//   price: number
//   type: 'PRODUCT' | 'SERVICE'
//   status: 'ACTIVE' | 'DRAFT' | 'SOLD' | 'ARCHIVED'
//   images: string[]
//   createdAt: Date
//   views: number
// }

// export default function MyListingsPage() {
//   const { toast } = useToast()
//   const [listings, setListings] = useState<Listing[]>([])
//   const [isLoading, setIsLoading] = useState(true)
//   const [filter, setFilter] = useState<'all' | 'active' | 'draft'>('all')

//   useEffect(() => {
//     fetchListings()
//   }, [])

//   const fetchListings = async () => {
//     try {
//       const response = await fetch('/api/dashboard/listings')
//       if (response.ok) {
//         const data = await response.json()
//         setListings(data)
//       }
//     } catch (error) {
//       console.error('Error fetching listings:', error)
//       toast({
//         title: 'Error',
//         description: 'Failed to fetch your listings',
//         variant: 'destructive',
//       })
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleDelete = async (id: string) => {
//     if (!confirm('Are you sure you want to delete this listing?')) return

//     try {
//       const response = await fetch(`/api/listings/${id}`, {
//         method: 'DELETE',
//       })

//       if (response.ok) {
//         toast({
//           title: 'Listing deleted',
//           description: 'Your listing has been successfully deleted',
//         })
//         setListings(listings.filter(listing => listing.id !== id))
//       } else {
//         throw new Error('Failed to delete listing')
//       }
//     } catch (error) {
//       toast({
//         title: 'Error',
//         description: 'Failed to delete listing',
//         variant: 'destructive',
//       })
//     }
//   }

//   const filteredListings = listings.filter(listing => {
//     if (filter === 'all') return true
//     if (filter === 'active') return listing.status === 'ACTIVE'
//     if (filter === 'draft') return listing.status === 'DRAFT'
//     return true
//   })

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case 'ACTIVE':
//         return 'bg-green-100 text-green-800'
//       case 'DRAFT':
//         return 'bg-gray-100 text-gray-800'
//       case 'SOLD':
//         return 'bg-blue-100 text-blue-800'
//       default:
//         return 'bg-gray-100 text-gray-800'
//     }
//   }

//   if (isLoading) {
//     return (
//       <div className="space-y-6">
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//           {[1, 2, 3, 4, 5, 6].map((i) => (
//             <Card key={i} className="animate-pulse">
//               <CardContent className="p-4">
//                 <div className="flex items-start space-x-4">
//                   <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0" />
//                   <div className="flex-1">
//                     <div className="h-4 bg-gray-200 rounded mb-2" />
//                     <div className="h-6 bg-gray-200 rounded mb-2" />
//                     <div className="h-3 bg-gray-200 rounded w-20" />
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold text-navy mb-2">My Listings</h1>
//           <p className="text-gray-600">Manage your products and services</p>
//         </div>
        
//         <Link href="/dashboard/create-listing">
//           <Button className="bg-orange hover:bg-orange/90">
//             <Plus className="w-4 h-4 mr-2" />
//             Create Listing
//           </Button>
//         </Link>
//       </div>

//       {/* Filters */}
//       <div className="flex items-center space-x-4">
//         <div className="flex items-center space-x-2">
//           <Filter className="w-4 h-4 text-gray-500" />
//           <span className="text-sm font-medium text-gray-700">Filter:</span>
//         </div>
        
//         <div className="flex space-x-2">
//           {['all', 'active', 'draft'].map((filterType) => (
//             <button
//               key={filterType}
//               onClick={() => setFilter(filterType as any)}
//               className={cn(
//                 'px-4 py-2 rounded-lg text-sm font-medium transition-colors',
//                 filter === filterType
//                   ? 'bg-orange text-white'
//                   : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
//               )}
//             >
//               {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
//               {filterType === 'all' && ` (${listings.length})`}
//               {filterType === 'active' && ` (${listings.filter(l => l.status === 'ACTIVE').length})`}
//               {filterType === 'draft' && ` (${listings.filter(l => l.status === 'DRAFT').length})`}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Listings Grid */}
//       {filteredListings.length === 0 ? (
//         <Card>
//           <CardContent className="text-center py-12">
//             <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
//             <h3 className="text-xl font-semibold text-navy mb-2">
//               {filter === 'all' ? 'No listings yet' : `No ${filter} listings`}
//             </h3>
//             <p className="text-gray-600 mb-4">
//               {filter === 'all' 
//                 ? 'Create your first listing to start selling to fellow students'
//                 : `You don't have any ${filter} listings yet`
//               }
//             </p>
//             <Link href="/dashboard/create-listing">
//               <Button className="bg-orange hover:bg-orange/90">
//                 Create Your First Listing
//               </Button>
//             </Link>
//           </CardContent>
//         </Card>
//       ) : (
//         <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
//           {filteredListings.map((listing) => (
//             <Card key={listing.id} className="group hover:shadow-lg transition-shadow">
//               <CardContent className="p-4">
//                 <div className="flex items-start space-x-4">
//                   <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
//                     {listing.images.length > 0 ? (
//                       <img
//                         src={listing.images[0]}
//                         alt={listing.title}
//                         className="w-full h-full object-cover"
//                       />
//                     ) : (
//                       <div className="w-full h-full flex items-center justify-center">
//                         <Package className="w-8 h-8 text-gray-400" />
//                       </div>
//                     )}
//                   </div>
                  
//                   <div className="flex-1 min-w-0">
//                     <div className="flex items-start justify-between mb-2">
//                       <h3 className="font-semibold text-navy truncate group-hover:text-orange transition-colors">
//                         {listing.title}
//                       </h3>
                      
//                       <div className="flex space-x-1 ml-2">
//                         <Link href={`/dashboard/edit-listing/${listing.id}`}>
//                           <button className="p-1 text-gray-500 hover:text-orange transition-colors">
//                             <Pencil className="w-4 h-4" />
//                           </button>
//                         </Link>
                        
//                         <button
//                           onClick={() => handleDelete(listing.id)}
//                           className="p-1 text-gray-500 hover:text-red-500 transition-colors"
//                         >
//                           <Trash2 className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
                    
//                     <p className="text-lg font-bold text-orange mb-2">
//                       {formatPrice(listing.price)}
//                     </p>
                    
//                     <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
//                       <div className="flex items-center space-x-2">
//                         <span className={cn(
//                           'px-2 py-1 rounded-full text-xs font-medium',
//                           getStatusColor(listing.status)
//                         )}>
//                           {listing.status.replace('_', ' ')}
//                         </span>
//                         <span>{formatDate(listing.createdAt)}</span>
//                       </div>
//                       <div className="flex items-center space-x-1">
//                         <Eye className="w-3 h-3" />
//                         <span>{listing.views}</span>
//                       </div>
//                     </div>
                    
//                     <div className="flex items-center space-x-2">
//                       <Link href={`/listing/${listing.id}`}>
//                         <Button size="sm" variant="outline">
//                           View
//                         </Button>
//                       </Link>
                      
//                       {listing.status === 'DRAFT' && (
//                         <Link href={`/dashboard/edit-listing/${listing.id}`}>
//                           <Button size="sm" className="bg-orange hover:bg-orange/90">
//                             Publish
//                           </Button>
//                         </Link>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// function cn(...classes: (string | boolean | undefined)[]) {
//   return classes.filter(Boolean).join(' ')
// }

"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { useToast } from '../../../../components/ui/use-toast'
import { Button } from '../../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Camera, Upload, CheckCircle, Info } from 'lucide-react'

const steps = [
  { id: 1, title: 'Profile Photo', description: 'Show your campus community who you are' },
  { id: 2, title: 'Your Story', description: 'Tell buyers about yourself' },
  { id: 3, title: 'Your University', description: 'Which campus do you call home?' },
  { id: 4, title: 'Stay Connected', description: 'How should buyers reach you?' },
]

const universities = [
  'University of Nairobi',
  'Kenyatta University', 
  'Strathmore University',
  'JKUAT',
  'Moi University',
  'Technical University of Kenya',
  'Maseno University',
  'Egerton University',
  'University of Eldoret',
  'Kisii University',
]

export default function OnboardingPage() {
  const router = useRouter()
  const { user } = useUser()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    imageUrl: '',
    bio: '',
    university: '',
    whatsapp: '',
    instagram: '',
    facebook: '',
  })

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = async () => {
    setIsLoading(true)
    
    try {
      const response = await fetch('/api/onboarding/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          username: user?.username || user?.firstName?.toLowerCase(),
        }),
      })

      if (response.ok) {
        toast({
          title: 'Welcome to Campus Bazaar! 🎉',
          description: 'Your profile is all set up. Let\'s start selling!',
        })
        router.push('/dashboard')
      } else {
        throw new Error('Failed to complete onboarding')
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <ProfilePhotoStep formData={formData} setFormData={setFormData} />
      case 2:
        return <BioStep formData={formData} setFormData={setFormData} />
      case 3:
        return <UniversityStep formData={formData} setFormData={setFormData} />
      case 4:
        return <ContactStep formData={formData} setFormData={setFormData} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy via-purple to-orange flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-navy mb-2">
            Complete Your Profile
          </CardTitle>
          <p className="text-gray-600">
            {steps[currentStep - 1]?.description}
          </p>
        </CardHeader>
        
        <CardContent>
          {/* Progress Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-4">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-colors',
                      currentStep > step.id
                        ? 'bg-green-500 text-white'
                        : currentStep === step.id
                        ? 'bg-orange text-white'
                        : 'bg-gray-200 text-gray-500'
                    )}
                  >
                    {currentStep > step.id ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step.id
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        'w-16 h-1 mx-2 transition-colors',
                        currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
                      )}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Content */}
          <div className="mb-8">
            {renderStep()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="px-6"
            >
              Previous
            </Button>
            
            <Button
              onClick={handleNext}
              disabled={isLoading}
              className="px-6 bg-orange hover:bg-orange/90"
            >
              {isLoading ? 'Saving...' : currentStep === steps.length ? 'Complete Setup' : 'Next'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ProfilePhotoStep({ formData, setFormData }: any) {
  const [isUploading, setIsUploading] = useState(false)

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const { url } = await response.json()
        setFormData((prev: any) => ({ ...prev, imageUrl: url }))
      }
    } catch (error) {
      console.error('Upload failed:', error)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="text-center">
      <div className="mb-6">
        <div className="relative inline-block">
          {formData.imageUrl ? (
            <img
              src={formData.imageUrl}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-orange"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center border-4 border-dashed border-gray-300">
              <Camera className="w-12 h-12 text-gray-400" />
            </div>
          )}
          
          <label className="absolute bottom-0 right-0 bg-orange text-white p-2 rounded-full cursor-pointer hover:bg-orange/90 transition-colors">
            <Upload className="w-4 h-4" />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={isUploading}
            />
          </label>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4">
        {isUploading ? 'Uploading...' : 'Click the camera icon to upload your photo'}
      </p>
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-400 mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-blue-800">
              A friendly photo helps build trust with other students
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function BioStep({ formData, setFormData }: any) {
  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-navy mb-2">
          Tell us about yourself
        </label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData((prev: any) => ({ ...prev, bio: e.target.value }))}
          placeholder="4th year student passionate about tech and entrepreneurship. Quick to respond and always ready to help fellow students find what they need! 🚀"
          className="w-full h-32 p-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
          maxLength={200}
        />
        <div className="text-right text-sm text-gray-500 mt-1">
          {formData.bio.length}/200 characters
        </div>
      </div>
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-400 mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-blue-800 font-medium mb-1">💡 Tip:</p>
            <p className="text-sm text-blue-800">
              Mention your year, major, and why students can trust you
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function UniversityStep({ formData, setFormData }: any) {
  const [searchTerm, setSearchTerm] = useState('')
  
  const filteredUniversities = universities.filter(uni =>
    uni.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <div className="mb-4">
        <label className="block text-sm font-semibold text-navy mb-2">
          Select your university
        </label>
        <input
          type="text"
          placeholder="Search universities..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent mb-4"
        />
        
        <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg">
          {filteredUniversities.map((university) => (
            <div
              key={university}
              onClick={() => setFormData((prev: any) => ({ ...prev, university }))}
              className={cn(
                'p-3 cursor-pointer hover:bg-orange/10 transition-colors border-b border-gray-100 last:border-b-0',
                formData.university === university && 'bg-orange/20 text-orange font-medium'
              )}
            >
              {university}
            </div>
          ))}
        </div>
      </div>
      
      {formData.university && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-lg">
          <div className="flex items-start">
            <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 mr-3" />
            <div>
              <p className="text-sm text-green-800 font-medium">
                Your profile will display a verified badge once confirmed
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function ContactStep({ formData, setFormData }: any) {
  return (
    <div>
      <p className="text-sm text-gray-600 mb-6">
        Add at least one contact method so buyers can connect directly
      </p>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">
            WhatsApp Number
          </label>
          <input
            type="tel"
            placeholder="+254 7__ ___ ___"
            value={formData.whatsapp}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, whatsapp: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">
            Instagram Handle
          </label>
          <input
            type="text"
            placeholder="@yourhandle"
            value={formData.instagram}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, instagram: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
          />
        </div>
        
        <div>
          <label className="block text-sm font-semibold text-navy mb-2">
            Facebook Profile
          </label>
          <input
            type="text"
            placeholder="facebook.com/yourprofile"
            value={formData.facebook}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, facebook: e.target.value }))}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
          />
        </div>
      </div>
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-lg mt-6">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-400 mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-blue-800 font-medium mb-1">
              🔒 Your contact details are only visible to logged-in sellers
            </p>
            <p className="text-sm text-blue-800">
              Buyers contact you directly—no middleman fees, faster deals!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}


