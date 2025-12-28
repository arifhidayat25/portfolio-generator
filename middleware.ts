import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public routes that don't require authentication
const publicRoutes = ['/', '/login', '/register', '/quick-generate'];

// Define routes that should redirect authenticated users away
const authRoutes = ['/login', '/register'];

export async function middleware(request: NextRequest) {
  const res = NextResponse.next();
  const { pathname } = request.nextUrl;

  // Check if route should be accessible to everyone
  const isPublicRoute = publicRoutes.some(route => 
    pathname === route || pathname.startsWith('/portfolio/')
  );
  
  // Check if it's an auth page (login/register)
  const isAuthRoute = authRoutes.includes(pathname);

  // For now, let public routes and auth routes pass through
  // Protected routes will check auth in the page component
  if (isPublicRoute || isAuthRoute) {
    return res;
  }

  // For protected routes, redirect to login
  // The actual auth check will happen in the page
  const loginUrl = new URL('/login', request.url);
  loginUrl.searchParams.set('callbackUrl', pathname);
  return NextResponse.redirect(loginUrl);
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    // TEMPORARILY DISABLED - Let pages handle their own auth
    // '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)' ,
  ],
};
