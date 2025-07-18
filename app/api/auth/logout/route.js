import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Clear the token cookie
    return NextResponse.json({
      success: true,
      message: 'Logout successful'
    }, {
      headers: {
        'Set-Cookie': 'token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict'
      }
    });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
