import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Clear all auth cookies (token, session_token, next-auth.session-token)
    const response = NextResponse.json({
      success: true,
      message: 'Logout successful'
    });
    response.cookies.set('token', '', { httpOnly: true, path: '/', maxAge: 0, sameSite: 'strict' });
    response.cookies.set('session_token', '', { httpOnly: true, path: '/', maxAge: 0, sameSite: 'lax' });
    response.cookies.set('next-auth.session-token', '', { httpOnly: true, path: '/', maxAge: 0, sameSite: 'lax' });
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
