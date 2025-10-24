"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { useToast } from '../../../components/ui/use-toast'
import { Button } from '../../../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card'
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