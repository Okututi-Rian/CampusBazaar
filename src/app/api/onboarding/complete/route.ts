import { auth, clerkClient } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import { db } from '../../../../lib/db'

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth()

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { imageUrl, bio, university, whatsapp, instagram, facebook, username } = await req.json()

    // Get user info from Clerk
    const clerkUser = await clerkClient.users.getUser(userId)
    const userEmail = clerkUser.emailAddresses[0]?.emailAddress || null

    // Check if user already exists by clerkId or email
    const existingUser = await db.user.findFirst({
      where: {
        OR: [
          { clerkId: userId },
          { email: userEmail },
        ],
      },
    })

    if (existingUser) {
      const updatedUser = await db.user.update({
        where: { id: existingUser.id },
        data: {
          imageUrl,
          bio,
          university,
          whatsapp,
          instagram,
          facebook,
          username,
          isVerified: true,
        },
      })

      return NextResponse.json({ user: updatedUser })
    }

    // Create new user
    const newUser = await db.user.create({
      data: {
        clerkId: userId,
        email: userEmail,
        imageUrl,
        bio,
        university,
        whatsapp,
        instagram,
        facebook,
        username,
        isVerified: true,
      },
    })

    return NextResponse.json({ user: newUser })
  } catch (error) {
    console.error('Onboarding error:', error)
    return NextResponse.json(
      { error: 'Failed to complete onboarding' },
      { status: 500 }
    )
  }
}
