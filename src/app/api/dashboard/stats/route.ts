import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

export async function GET() {
  try {
    const { userId } = auth()
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Get user
    const user = await db.user.findUnique({
      where: { clerkId: userId }
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get user's listings count
    const totalListings = await db.listing.count({
      where: { userId: user.id, status: 'ACTIVE' }
    })

    // Mock data for other stats (will be implemented with features)
    const stats = {
      totalListings,
      profileViews: Math.floor(Math.random() * 500) + 100, // Mock data
      messagesCount: 0, // Coming soon
      rating: 0, // Coming soon
    }

    return NextResponse.json(stats)
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
}