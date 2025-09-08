// app/api/auth/signin/route.ts
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    // Find or create user
    const user = await prisma.user.upsert({
      where: { email },
      update: {}, // Don't update anything if user exists
      create: { 
        email,
        fullName: '',
        contact: 0,
        role: 'user',
        position: 'user',
      }
    })
    
    return Response.json({ success: true, user })
  } catch (error) {
    console.error('Error creating user:', error)
    return Response.json({ error: 'Failed to process sign in' }, { status: 500 })
  }
}