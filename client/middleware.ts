import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Assume you store the token in cookies
  const token = false;

  const protectedRoutes = ["/settings"];

  if (!token && protectedRoutes.includes(request.nextUrl.pathname)) {
    const loginUrl = new URL('/auth/login', request.nextUrl.origin);
    return NextResponse.redirect(loginUrl.toString());
  }

  return NextResponse.next();
}


export const config = {
  matcher: ['/:path*', '/auth/login']
};
