import Link from 'next/link'
import { Smartphone, Shirt, BookOpen, Home, Briefcase, Gamepad2, Palette, Dumbbell, Music, Pizza, Plane, GraduationCap } from 'lucide-react'

const categories = [
  { name: 'Electronics', icon: Smartphone, count: 243, href: '/browse?category=electronics' },
  { name: 'Fashion', icon: Shirt, count: 189, href: '/browse?category=fashion' },
  { name: 'Books & Notes', icon: BookOpen, count: 456, href: '/browse?category=books' },
  { name: 'Room Essentials', icon: Home, count: 178, href: '/browse?category=essentials' },
  { name: 'Services', icon: Briefcase, count: 234, href: '/browse?category=services' },
  { name: 'Gaming', icon: Gamepad2, count: 145, href: '/browse?category=gaming' },
  { name: 'Art & Crafts', icon: Palette, count: 98, href: '/browse?category=art' },
  { name: 'Sports', icon: Dumbbell, count: 167, href: '/browse?category=sports' },
  { name: 'Music', icon: Music, count: 89, href: '/browse?category=music' },
  { name: 'Food Delivery', icon: Pizza, count: 67, href: '/browse?category=food' },
  { name: 'Travel', icon: Plane, count: 54, href: '/browse?category=travel' },
  { name: 'Tutoring', icon: GraduationCap, count: 321, href: '/browse?category=tutoring' },
]

export function FeaturedCategories() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-navy mb-4">
            What are you looking for today?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our diverse categories and find exactly what you need from fellow students
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <Link
                key={category.name}
                href={category.href}
                className="group bg-white rounded-xl p-6 border-2 border-gray-200 hover:border-orange transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-orange/10 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-orange group-hover:text-white transition-all duration-300">
                    <Icon className="w-8 h-8 text-orange group-hover:text-white" />
                  </div>
                  <h3 className="font-semibold text-navy mb-1 group-hover:text-orange transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {category.count} items
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}