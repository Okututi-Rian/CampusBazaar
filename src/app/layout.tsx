import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '../components/ui/toaster'
import {Navbar} from '../components/navigation/navbar'
import {MobileNav} from '../components/navigation/mobile-nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Campus Bazaar - Your Campus Marketplace',
  description: 'A secure marketplace exclusively for university students to buy, sell, and connect within their campus communities.',
  keywords: ['campus', 'marketplace', 'students', 'university', 'buy', 'sell', 'kenya'],
  authors: [{ name: 'Campus Bazaar Team' }],
  creator: 'Campus Bazaar',
  publisher: 'Campus Bazaar',
  icons: {
    icon:'/CBLogo.png'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_KE',
    url: 'https://campusbazaar.com',
    title: 'Campus Bazaar - Your Campus Marketplace',
    description: 'A secure marketplace exclusively for university students to buy, sell, and connect within their campus communities.',
    siteName: 'Campus Bazaar',
    images: [
      {
        url: 'https://campusbazaar.com/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Campus Bazaar - Student Marketplace',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Campus Bazaar - Your Campus Marketplace',
    description: 'A secure marketplace exclusively for university students to buy, sell, and connect within their campus communities.',
    creator: '@CampusBazaar',
    images: ['https://campusbazaar.com/twitter-image.jpg'],
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Navbar/>
          <MobileNav/>
          {children}
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  )
}
