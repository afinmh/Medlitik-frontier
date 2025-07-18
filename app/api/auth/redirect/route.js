import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    // Ambil token dari cookies
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    // Redirect berdasarkan role
    if (decoded.role === 'admin') {
      return NextResponse.redirect(new URL('/admin', request.url));
    } else if (decoded.userType === 'doctor' || decoded.role === 'doctor') {
      return NextResponse.redirect(new URL('/doctor', request.url));
    } else {
      return NextResponse.redirect(new URL('/user', request.url));
    }
    
  } catch (error) {
    console.error('Redirect error:', error);
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }
}
