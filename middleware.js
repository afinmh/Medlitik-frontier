
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request) {
  // Cek session NextAuth
  const nextAuthToken = request.cookies.get('next-auth.session-token');
  // Cek session manual
  const sessionToken = request.cookies.get('session_token');
  const legacyToken = request.cookies.get('token');

  // Helper untuk decode JWT tanpa verifikasi (untuk ambil role)
  function decodeJwt(token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (e) {
      return null;
    }
  }

  let role = null;
  // Cek NextAuth session
  if (nextAuthToken) {
    const payload = decodeJwt(nextAuthToken.value || nextAuthToken);
    role = payload?.role;
  } else if (sessionToken) {
    const payload = decodeJwt(sessionToken.value || sessionToken);
    role = payload?.role;
  } else if (legacyToken) {
    const payload = decodeJwt(legacyToken.value || legacyToken);
    role = payload?.role;
  }

  const { pathname } = request.nextUrl;
  if (pathname.startsWith('/admin')) {
    if (role !== 'admin') {
      return NextResponse.redirect(new URL('/user', request.url));
    }
  }
  if (pathname.startsWith('/doctor')) {
    if (role !== 'doctor') {
      return NextResponse.redirect(new URL('/user', request.url));
    }
  }
  // Untuk /user, semua role boleh

  if (nextAuthToken || sessionToken || legacyToken) {
    return NextResponse.next();
  }
  return NextResponse.redirect(new URL('/auth/login', request.url));
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/doctor/:path*',
    '/user/:path*'
    // '/auth/login',
    // '/auth/register'
  ]
};
