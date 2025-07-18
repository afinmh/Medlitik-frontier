import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for API routes, static files, and _next
  if (
    pathname.startsWith('/api/') ||
    pathname.startsWith('/_next/') ||
    pathname.includes('.') ||
    pathname === '/favicon.ico'
  ) {
    return NextResponse.next();
  }
  
  // Allow all paths - no authentication required
  if (pathname === '/' || pathname === '/landing_page' || pathname === '/debug' || pathname === '/test-login') {
    return NextResponse.next();
  }
  
  // Allow auth pages
  if (pathname.startsWith('/auth/')) {
    return NextResponse.next();
  }
  
  // Allow dashboard pages - no authentication check
  if (pathname.startsWith('/admin') || pathname.startsWith('/doctor') || pathname.startsWith('/user')) {
    console.log(`[MIDDLEWARE] Allowing access to: ${pathname}`);
    return NextResponse.next();
  }
  
  console.log(`[MIDDLEWARE] Allowing access to: ${pathname}`);
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/doctor/:path*',
    '/user/:path*',
    '/auth/login',
    '/auth/register'
  ]
};
