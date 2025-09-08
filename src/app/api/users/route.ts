import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// Singleton pattern to prevent multiple Prisma instances
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { fullName, email, contact, role, position } = body

    // Validation
    if (!fullName || !email || !contact || !role || !position) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Contact number validation and conversion
    let contactNumber: bigint
    if (typeof contact === 'string') {
      const parsed = parseInt(contact, 10)
      if (isNaN(parsed) || parsed <= 0) {
        return NextResponse.json(
          { error: 'Invalid contact number' },
          { status: 400 }
        )
      }
      contactNumber = BigInt(parsed)
    } else if (typeof contact === 'number') {
      if (contact <= 0) {
        return NextResponse.json(
          { error: 'Invalid contact number' },
          { status: 400 }
        )
      }
      contactNumber = BigInt(contact)
    } else if (typeof contact === 'bigint') {
      if (contact <= 0) {
        return NextResponse.json(
          { error: 'Invalid contact number' },
          { status: 400 }
        )
      }
      contactNumber = contact
    } else {
      return NextResponse.json(
        { error: 'Invalid contact number format' },
        { status: 400 }
      )
    }

    // Role validation
    const validRoles = ['staff', 'intern', 'visitor']
    if (!validRoles.includes(role.toLowerCase())) {
      return NextResponse.json(
        { error: 'Invalid role. Must be staff, intern, or visitor' },
        { status: 400 }
      )
    }

    // Create user in database
    const newUser = await prisma.user.create({
      data: {
        fullName,
        email: email.toLowerCase(),
        contact: contactNumber,
        role: role.toLowerCase(),
        position,
      },
    })

    return NextResponse.json(
      { 
        message: 'User registered successfully',
        user: {
          id: newUser.id,
          fullName: newUser.fullName,
          email: newUser.email,
          contact: newUser.contact.toString(), // Convert BigInt to string for JSON
          role: newUser.role,
          position: newUser.position,
          createdAt: newUser.createdAt
        }
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('User registration error:', error)

    // Handle unique constraint violations
    if (error instanceof Error && error.message.includes('Unique constraint')) {
      if (error.message.includes('email')) {
        return NextResponse.json(
          { error: 'Email address is already registered' },
          { status: 409 }
        )
      }
      if (error.message.includes('contact')) {
        return NextResponse.json(
          { error: 'Contact number is already registered' },
          { status: 409 }
        )
      }
    }

    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    )
  }
  // Note: Removed prisma.$disconnect() from finally block
  // The singleton instance should remain connected
}

// Helper function to handle BigInt serialization
const serializeBigInt = (data: unknown): unknown => {
  if (data === null || data === undefined) {
    return data
  }
  
  if (typeof data === 'bigint') {
    return data.toString()
  }
  
  if (Array.isArray(data)) {
    return data.map(item => serializeBigInt(item))
  }
  
  if (data !== null && typeof data === 'object') {
    const result: Record<string, unknown> = {}
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        result[key] = serializeBigInt((data as Record<string, unknown>)[key])
      }
    }
    return result
  }
  
  return data
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const email = searchParams.get('email')

  try {
    if (email) {
      const user = await prisma.user.findUnique({
        where: { email: email.toLowerCase() },
        select: {
          id: true,
          fullName: true,
          email: true,
          contact: true,
          role: true,
          position: true,
          createdAt: true,
          updatedAt: true
        }
      })

      if (user) {
        const serializedUser = serializeBigInt(user)
        return NextResponse.json(serializedUser)
      } else {
        return NextResponse.json({ error: 'User not found' }, { status: 404 })
      }
    } else {
      const users = await prisma.user.findMany({
        orderBy: {
          createdAt: 'desc'
        },
        select: {
          id: true,
          fullName: true,
          email: true,
          contact: true,
          role: true,
          position: true,
          createdAt: true,
          updatedAt: true
        }
      })
      const serializedUsers = serializeBigInt(users)
      return NextResponse.json(serializedUsers)
    }
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}