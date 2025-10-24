"use client"

import { useEffect, useState } from 'react'
import { Users, ShoppingCart, CheckCircle, TrendingUp, Award } from 'lucide-react'

export function TrustBanner() {
  const [stats, setStats] = useState([
    { icon: Users, value: 0, label: 'Verified Students', target: 2000 },
    { icon: ShoppingCart, value: 0, label: 'Active Sellers', target: 500 },
    { icon: CheckCircle, value: 0, label: 'Safe Transactions', target: 10000 },
    { icon: Award, value: 0, label: 'Universities Connected', target: 5 },
    { icon: TrendingUp, value: 0, label: 'Growing Daily', target: 100 },
  ])

  useEffect(() => {
    const animateStats = () => {
      setStats(prevStats => 
        prevStats.map(stat => ({
          ...stat,
          value: Math.min(stat.value + Math.ceil(stat.target / 50), stat.target)
        }))
      )
    }

    const interval = setInterval(animateStats, 50)
    
    setTimeout(() => {
      clearInterval(interval)
      // Ensure final values are set
      setStats(prevStats => 
        prevStats.map(stat => ({
          ...stat,
          value: stat.target
        }))
      )
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="bg-white border-y border-gray-200 overflow-hidden">
      <div className="flex items-center space-x-16 py-4 animate-infinite-scroll">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div 
              key={index} 
              className="flex items-center space-x-3 min-w-max group hover:scale-105 transition-transform duration-200"
            >
              <Icon className="w-8 h-8 text-orange" />
              <div>
                <span className="text-2xl font-bold text-navy">
                  {stat.value.toLocaleString()}+
                </span>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>
      
      <style jsx>{`
        @keyframes infinite-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-infinite-scroll {
          animation: infinite-scroll 40s linear infinite;
        }
        
        .animate-infinite-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}