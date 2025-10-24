import Link from 'next/link'
import { Button } from '../../components/ui/button'
import { ArrowRight, Users, Shield, Zap } from 'lucide-react'

export function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-navy via-purple to-orange">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Ready to Start Your Campus Hustle?
            </h2>
            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Join thousands of students already buying and selling on Campus Bazaar. 
              It's free, secure, and built just for you.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90">Verified student community</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90">Zero commission fees</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <span className="text-white/90">Direct buyer-seller connection</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/browse">
                <Button 
                  size="lg" 
                  className="bg-white text-navy hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                >
                  Start Shopping
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
              <Link href="/dashboard">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white hover:text-navy px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                >
                  Start Selling
                </Button>
              </Link>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-bold text-white mb-4">What Students Are Saying</h3>
              
              <div className="space-y-6">
                <blockquote className="text-white/90 italic">
                  "Sold my textbooks in just 2 days! Way better than waiting for the campus bookstore."
                </blockquote>
                <cite className="text-white/70 text-sm">— Sarah, University of Nairobi</cite>
                
                <blockquote className="text-white/90 italic">
                  "Found a great deal on a laptop. The verification system made me feel safe buying."
                </blockquote>
                <cite className="text-white/70 text-sm">— Mike, Kenyatta University</cite>
                
                <blockquote className="text-white/90 italic">
                  "Perfect for selling my design services to other students. Built my client base!"
                </blockquote>
                <cite className="text-white/70 text-sm">— Amina, Strathmore University</cite>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}