import { Button } from '../../components/ui/button'
import { 
  Users, 
  Shield, 
  MapPin, 
  TrendingUp, 
  Mail, 
  Phone, 
  Twitter, 
  Instagram, 
  Linkedin,
  ShoppingBag,
  CheckCircle,
  Award,
  Heart
} from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-purple-600 to-orange-600 opacity-90" />
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-navy/50 to-purple-600/50" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.05%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"/>
        </div>
        
        <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
          <h1 className="text-4xl lg:text-6xl font-bold mb-6">
            Built by students, for students
          </h1>
          <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
            Empowering campus communities through safe, seamless commerce and connection
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-sm font-bold text-orange uppercase tracking-wider mb-4">
              Our Mission
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold text-navy mb-6">
              Creating opportunities for student entrepreneurs
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Campus Bazaar is a secure marketplace exclusively for university students to buy, sell, and connect within their campus communities. We empower student entrepreneurs with verified vendor identities and localized storefronts to showcase products and services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-orange to-coral rounded-2xl flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">
                Personalized Storefronts
              </h3>
              <p className="text-gray-600">
                Every seller gets their own custom profile to showcase their unique offerings and build their brand
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">
                Verified Identities
              </h3>
              <p className="text-gray-600">
                University email validation ensures every seller is a legitimate student from your campus community
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <MapPin className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">
                Foster Local Engagement
              </h3>
              <p className="text-gray-600">
                Connect with students on your campus for easy, convenient transactions and community building
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-bold text-navy mb-3">
                Build Experience
              </h3>
              <p className="text-gray-600">
                Gain valuable entrepreneurial skills and create networking opportunities while still in school
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Campus Bazaar Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-sm font-bold text-orange uppercase tracking-wider mb-4">
                Why Campus Bazaar?
              </p>
              <h2 className="text-4xl font-bold text-navy mb-6">
                A safe, seamless platform built for student success
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We offer a safe, seamless platform for students to grow entrepreneurial skills and connect with peers through real-world selling. Campus Bazaar isn't just a marketplace—it's a launchpad for your business dreams.
              </p>

              <div className="grid grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="text-4xl font-bold text-orange mb-2">5</div>
                  <div className="text-gray-600">Universities</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange mb-2">2,000+</div>
                  <div className="text-gray-600">Students</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange mb-2">10,000+</div>
                  <div className="text-gray-600">Transactions</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-orange mb-2">0%</div>
                  <div className="text-gray-600">Commission</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Zero commission fees—keep 100% of your earnings</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Direct communication with buyers (no middleman)</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Build your reputation through verified transactions</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Access to thousands of potential customers on your campus</span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">Easy listing creation in under 2 minutes</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange to-coral rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-navy">What Students Are Saying</h3>
                </div>
                
                <div className="space-y-6">
                  <blockquote className="text-gray-700 italic">
                    "Sold my textbooks in just 2 days! Way better than waiting for the campus bookstore."
                  </blockquote>
                  <cite className="text-sm text-gray-500">— Sarah, University of Nairobi</cite>
                  
                  <blockquote className="text-gray-700 italic">
                    "Found a great deal on a laptop. The verification system made me feel safe buying."
                  </blockquote>
                  <cite className="text-sm text-gray-500">— Mike, Kenyatta University</cite>
                  
                  <blockquote className="text-gray-700 italic">
                    "Perfect for selling my design services to other students. Built my client base!"
                  </blockquote>
                  <cite className="text-sm text-gray-500">— Amina, Strathmore University</cite>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gradient-to-br from-navy via-purple-600 to-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">
              Connect With Us
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Have questions, feedback, or just want to say hi? We'd love to hear from you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center text-white">
              <Mail className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Email</h3>
              <a href="mailto:contact@campusbazaar.com" className="text-white/80 hover:text-white transition-colors">
                contact@campusbazaar.com
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center text-white">
              <Phone className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Phone</h3>
              <a href="tel:+254700000000" className="text-white/80 hover:text-white transition-colors">
                +254 700 000 000
              </a>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center text-white">
              <MapPin className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Location</h3>
              <p className="text-white/80">Nairobi, Kenya</p>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-6">Follow our journey</h3>
            <div className="flex justify-center space-x-6">
              <a href="#" className="bg-white/10 hover:bg-white/20 p-4 rounded-full transition-colors">
                <Twitter className="w-6 h-6 text-white" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-4 rounded-full transition-colors">
                <Instagram className="w-6 h-6 text-white" />
              </a>
              <a href="#" className="bg-white/10 hover:bg-white/20 p-4 rounded-full transition-colors">
                <Linkedin className="w-6 h-6 text-white" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-orange rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">CB</span>
              </div>
              <span className="text-xl font-bold">Campus Bazaar</span>
            </div>
            <p className="text-gray-400 mb-6">
              Empowering student entrepreneurs across Kenya
            </p>
            <div className="border-t border-gray-700 pt-6">
              <p className="text-gray-400 text-sm">
                © 2025 Campus Bazaar. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}