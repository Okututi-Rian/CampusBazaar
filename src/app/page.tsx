import { Navbar } from '../components/navigation/navbar'
import { MobileNav } from '../components/navigation/mobile-nav'
import { HeroSection } from '../components/home/hero-section'
import { TrustBanner } from '../components/home/trust-banner'
import { FeaturedCategories } from '../components/home/featured-categories'
import { RecentListings } from '../components/home/recent-listings'
import { CtaSection } from '../components/home/cta-section'
import './globals.css'


export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-16">
        <HeroSection />
        <TrustBanner />
        <FeaturedCategories />
        <RecentListings />
        <CtaSection />
      </main>

      <MobileNav />
    </div>
  )
}