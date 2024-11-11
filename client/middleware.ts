import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const token = (await cookieStore).has('token');

  const protectedRoutes = ["/settings", "/admin/dashboard"];

  if (!token && protectedRoutes.includes(request.nextUrl.pathname)) {
    const loginUrl = new URL('/auth/login', request.nextUrl.origin);
    return NextResponse.redirect(loginUrl.toString());
  }


  return NextResponse.next();
}

export const config = {
  matcher: ['/:path*'],
};
