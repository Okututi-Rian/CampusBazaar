import { Button } from '../../components/ui/button'
import { BookOpen, FileText, Video, MessageCircle, BarChart3, Star, Bell, ArrowRight } from 'lucide-react'
import { Navbar } from '../../components/navigation/navbar'


const features = [
  {
    icon: BookOpen,
    title: 'Resource Hub',
    description: 'Access curated business templates, guides, and tools designed specifically for student entrepreneurs. Everything you need to launch and grow your campus venture.',
    benefits: [
      'Business plan templates',
      'Marketing guides',
      'Financial calculators',
      'Legal document templates',
      'Growth frameworks',
    ],
    progress: 65,
    status: 'In Development',
    gradient: 'from-orange to-coral',
  },
  {
    icon: FileText,
    title: 'Business Planning Templates',
    description: 'Step-by-step templates to help you plan, launch, and scale your student business. From idea validation to financial projections.',
    benefits: [
      'Lean canvas templates',
      'Financial projection sheets',
      'Marketing plan builders',
      'Pitch deck templates',
      'Competitor analysis tools',
    ],
    progress: 45,
    status: 'Design Phase',
    gradient: 'from-blue-500 to-purple-600',
  },
  {
    icon: Video,
    title: 'Workshops & Webinars',
    description: 'Join live expert-led sessions covering everything from pricing strategies to social media marketing. Learn from successful student entrepreneurs.',
    benefits: [
      'Live Q&A sessions',
      'Expert guest speakers',
      'Recorded session library',
      'Networking opportunities',
      'Certificate of completion',
    ],
    progress: 30,
    status: 'Coming Q2 2025',
    gradient: 'from-green-500 to-teal-600',
  },
  {
    icon: MessageCircle,
    title: 'In-App Messaging',
    description: 'Chat directly with buyers and sellers without leaving the platform. Safe, fast, and convenient communication.',
    benefits: [
      'Real-time chat',
      'Image sharing',
      'Typing indicators',
      'Read receipts',
      'Message history',
    ],
    progress: 20,
    status: 'Early Planning',
    gradient: 'from-pink-500 to-red-500',
  },
  {
    icon: BarChart3,
    title: 'Seller Analytics',
    description: 'Track your performance with detailed insights. See what\'s working, identify trends, and grow your campus business smarter.',
    benefits: [
      'View statistics',
      'Traffic sources',
      'Popular listings',
      'Revenue tracking',
      'Growth metrics',
    ],
    progress: 15,
    status: 'Roadmap',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Star,
    title: 'Ratings & Reviews',
    description: 'Build trust through verified reviews. Buyers can rate their experience and leave feedback after successful transactions.',
    benefits: [
      'Verified reviews only',
      'Reply to feedback',
      'Overall rating display',
      'Trust building',
      'Seller reputation',
    ],
    progress: 10,
    status: 'Concept Phase',
    gradient: 'from-purple-600 to-indigo-600',
  },
]

export default function UpcomingFeaturesPage() {
  return (
     <div className="min-h-screen bg-gray-50">
      <Navbar /> 

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-bold text-orange uppercase tracking-wider mb-4">
            Coming Soon
          </p>
          <h1 className="text-4xl lg:text-5xl font-bold text-navy mb-6">
            Exciting Features in the Works
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We're constantly building new ways to help you succeed on campus. 
            Here's a sneak peek at what's coming next.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border-2 border-gray-200 p-8 relative overflow-hidden hover:border-orange transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
              >
                {/* Coming Soon Ribbon */}
                <div className="absolute top-4 right-[-35px] bg-orange text-white px-10 py-1 transform rotate-45 text-xs font-bold uppercase shadow-lg">
                  Coming Soon
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mb-6`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-navy mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {feature.description}
                </p>

                {/* Benefits */}
                <div className="mb-6">
                  <h4 className="font-semibold text-navy mb-3">What you'll get:</h4>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center text-sm text-gray-600">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Progress */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-navy">Progress</span>
                    <span className="text-sm text-gray-600">{feature.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r ${feature.gradient} h-2 rounded-full transition-all duration-1000`}
                      style={{ width: `${feature.progress}%` }}
                    />
                  </div>
                  <p className="text-sm text-orange font-medium mt-2">
                    {feature.status}
                  </p>
                </div>

                {/* Notify Button */}
                <button className="w-full h-12 border-2 border-dashed border-gray-300 rounded-lg text-navy font-semibold hover:border-orange hover:bg-orange/5 transition-all duration-200 flex items-center justify-center space-x-2">
                  <Bell className="w-4 h-4" />
                  <span>Notify Me</span>
                </button>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-navy via-purple-600 to-orange-600 rounded-3xl p-12 text-white text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Have a feature request?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            We're always listening to our community. Share your ideas and help shape the future of Campus Bazaar.
          </p>
          <Button className="bg-white text-navy hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105">
            Share Your Ideas
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}