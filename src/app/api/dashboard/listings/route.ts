import { auth } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

export async function GET() {
  try {
    const listings = await db.listing.findMany({
      where: { status: 'ACTIVE' },
      include: {
        user: {
          select: {
            username: true,
            university: true,
            isVerified: true,
          }
        }
      },
      orderBy: { createdAt: 'desc' },
      take: 24,
    })

    return NextResponse.json(listings)
  } catch (error) {
    console.error('Listings fetch error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch listings' },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
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

    const { type, title, description, price, condition, images } = await req.json()

    // Validate required fields
    if (!title || !description || !price || images.length === 0) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate product-specific fields
    if (type === 'PRODUCT' && !condition) {
      return NextResponse.json(
        { error: 'Condition is required for products' },
        { status: 400 }
      )
    }

    // Create listing
    const listing = await db.listing.create({
      data: {
        title,
        description,
        price,
        type,
        condition: type === 'PRODUCT' ? condition : null,
        images,
        userId: user.id,
        status: 'ACTIVE',
      },
      include: {
        user: {
          select: {
            username: true,
            university: true,
            isVerified: true,
          }
        }
      }
    })

    return NextResponse.json(listing, { status: 201 })
  } catch (error) {
    console.error('Create listing error:', error)
    return NextResponse.json(
      { error: 'Failed to create listing' },
      { status: 500 }
    )
  }
}