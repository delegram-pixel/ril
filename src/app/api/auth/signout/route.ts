import { NextResponse } from 'next/server';


export async function POST() {
  try {
   
    
    return NextResponse.json({ 
      success: true, 
      message: 'Signed out successfully' 
    });
  } catch (error) {
    console.error('Sign out error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to sign out' 
      },
      { status: 500 }
    );
  }
}
