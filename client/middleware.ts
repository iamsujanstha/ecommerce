import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from 'jsonwebtoken'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  
  // If there is no token, redirect to the login page
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  try {
    const decoded = jwt.verify(token, 'wrong-secret');
    console.log(decoded)
  } catch (err) {
    console.log(err)
  }

  return NextResponse.next();
}

// Configure matcher for routes
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/profile/:path*"],
};
