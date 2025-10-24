"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useToast } from '../../../../components/ui/use-toast'
import { Button } from '../../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../../components/ui/card'
import { Package, Lightbulb, Upload, X, Camera } from 'lucide-react'
import { formatPrice } from '../../../../lib/utils'
import Link from 'next/link'

const conditions = ['NEW', 'LIKE_NEW', 'GOOD', 'FAIR']

export default function CreateListingPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  
  const [formData, setFormData] = useState({
    type: 'PRODUCT' as 'PRODUCT' | 'SERVICE',
    title: '',
    description: '',
    price: '',
    condition: '' as string,
    images: [] as string[],
  })

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    const remainingSlots = 5 - formData.images.length
    const filesToUpload = files.slice(0, remainingSlots)

    for (const file of filesToUpload) {
      const formDataUpload = new FormData()
      formDataUpload.append('file', file)

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formDataUpload,
        })

        if (response.ok) {
          const { url } = await response.json()
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, url],
          }))
        }
      } catch (error) {
        console.error('Upload failed:', error)
        toast({
          title: 'Upload failed',
          description: 'Failed to upload some images',
          variant: 'destructive',
        })
      }
    }
  }

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          price: parseInt(formData.price.replace(/[^0-9]/g, '')),
        }),
      })

      if (response.ok) {
        toast({
          title: 'Listing created successfully! 🎉',
          description: 'Your listing is now live and visible to buyers',
        })
        router.push('/dashboard/listings')
      } else {
        throw new Error('Failed to create listing')
      }
    } catch (error) {
      toast({
        title: 'Error creating listing',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsLoading(false)
    }
  }

  const isFormValid = () => {
    return (
      formData.title.trim() &&
      formData.description.trim() &&
      formData.price &&
      formData.images.length > 0 &&
      (formData.type === 'SERVICE' || formData.condition)
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <Link href="/dashboard">
          <Button variant="outline" className="mb-4">
            ← Back to Dashboard
          </Button>
        </Link>
        
        <h1 className="text-3xl font-bold text-navy mb-2">
          Create New Listing
        </h1>
        <p className="text-gray-600">
          Fill in the details below to showcase what you're offering
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle>What are you offering?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: 'PRODUCT' }))}
                className={cn(
                  'p-6 border-2 rounded-xl transition-all duration-200',
                  formData.type === 'PRODUCT'
                    ? 'border-orange bg-orange/5'
                    : 'border-gray-200 hover:border-orange/50'
                )}
              >
                <div className="text-center">
                  <Package className="w-12 h-12 text-orange mx-auto mb-3" />
                  <h3 className="text-lg font-semibold mb-1">Product</h3>
                  <p className="text-sm text-gray-600">Physical item to sell</p>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, type: 'SERVICE' }))}
                className={cn(
                  'p-6 border-2 rounded-xl transition-all duration-200',
                  formData.type === 'SERVICE'
                    ? 'border-orange bg-orange/5'
                    : 'border-gray-200 hover:border-orange/50'
                )}
              >
                <div className="text-center">
                  <Lightbulb className="w-12 h-12 text-orange mx-auto mb-3" />
                  <h3 className="text-lg font-semibold mb-1">Service</h3>
                  <p className="text-sm text-gray-600">Skill or service to offer</p>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Photos */}
        <Card>
          <CardHeader>
            <CardTitle>Add photos</CardTitle>
            <p className="text-sm text-gray-600">
              Add up to 5 photos. First photo will be the cover image.
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
              {formData.images.map((image, index) => (
                <div key={index} className="relative group">
                  <img
                    src={image}
                    alt={`Listing image ${index + 1}`}
                    className="w-full aspect-square object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {index === 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-orange text-white text-xs text-center py-1 rounded-b-lg">
                      COVER
                    </div>
                  )}
                </div>
              ))}
              
              {formData.images.length < 5 && (
                <label className="w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-orange transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    multiple
                  />
                  <div className="text-center">
                    <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Add Photo</p>
                  </div>
                </label>
              )}
            </div>
            
            <p className="text-xs text-gray-500">
              JPG, PNG or WebP, max 5MB each. Photos are automatically optimized.
            </p>
          </CardContent>
        </Card>

        {/* Details */}
        <Card>
          <CardHeader>
            <CardTitle>Tell us the details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., iPhone 13 Pro Max 256GB or Graphic Design Services"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
                maxLength={60}
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {formData.title.length}/60 characters
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe your item or service in detail. Include condition, features, why you're selling, etc."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent"
                maxLength={500}
              />
              <div className="text-right text-sm text-gray-500 mt-1">
                {formData.description.length}/500 characters
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-navy mb-2">
                Price (Ksh) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-semibold">
                  Ksh
                </span>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '')
                    setFormData(prev => ({ 
                      ...prev, 
                      price: value ? parseInt(value).toLocaleString() : '' 
                    }))
                  }}
                  placeholder="1,500"
                  className="w-full pl-16 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange focus:border-transparent text-lg font-semibold"
                />
              </div>
              {formData.price && (
                <p className="text-2xl font-bold text-orange mt-2">
                  {formatPrice(parseInt(formData.price.replace(/[^0-9]/g, '')))}
                </p>
              )}
            </div>

            {formData.type === 'PRODUCT' && (
              <div>
                <label className="block text-sm font-semibold text-navy mb-2">
                  Condition *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {conditions.map((condition) => (
                    <button
                      key={condition}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, condition }))}
                      className={cn(
                        'p-3 border-2 rounded-lg text-center transition-all duration-200',
                        formData.condition === condition
                          ? 'border-orange bg-orange/5'
                          : 'border-gray-200 hover:border-orange/50'
                      )}
                    >
                      <span className="font-medium">{condition.replace('_', ' ')}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Preview */}
        <Card>
          <CardHeader>
            <CardTitle>Preview your listing</CardTitle>
            <p className="text-sm text-gray-600">
              This is how buyers will see your listing in the feed
            </p>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 rounded-lg p-6 flex justify-center">
              <div className="w-80 bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="aspect-square bg-gray-100 relative">
                  {formData.images.length > 0 ? (
                    <img
                      src={formData.images[0]}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-16 h-16 text-gray-300" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg">
                    <span className="text-xs font-semibold">
                      {formData.type === 'PRODUCT' ? '📦 Product' : '💡 Service'}
                    </span>
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-navy mb-2 line-clamp-2">
                    {formData.title || 'Your listing title...'}
                  </h3>
                  
                  <p className="text-2xl font-bold text-orange mb-2">
                    {formData.price ? formatPrice(parseInt(formData.price.replace(/[^0-9]/g, ''))) : 'Ksh 0'}
                  </p>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {formData.description || 'Your description...'}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>@yourusername • Your University</span>
                    <span>Just now</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex justify-between sticky bottom-0 bg-white border-t pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dashboard')}
          >
            Cancel
          </Button>
          
          <Button
            type="submit"
            disabled={isLoading || !isFormValid()}
            className="bg-orange hover:bg-orange/90"
          >
            {isLoading ? 'Publishing...' : 'Publish Listing'}
          </Button>
        </div>
      </form>
    </div>
  )
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}