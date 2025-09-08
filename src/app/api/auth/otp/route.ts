import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Invalidate any previous OTPs for this user
    await prisma.oTP.deleteMany({
      where: { userId: user.id },
    });

    // Generate a 6-digit OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP expires in 10 minutes

    const newOTP = await prisma.oTP.create({
      data: {
        code: otp,
        expiresAt,
        user: {
          connect: { id: user.id },
        },
      },
    });

    return NextResponse.json({
      message: 'OTP generated successfully',
      otp: newOTP.code,
    });
  } catch (error) {
    console.error('OTP generation error:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}
