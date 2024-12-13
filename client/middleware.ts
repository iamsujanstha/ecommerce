import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {

  // const token = request.cookies.get('token');

  // If there is no token, redirect to the login page
  // if (!token) {
  //   return NextResponse.redirect(new URL('/auth/login', request.url));
  // }

  // If token exists, allow the request to continue
  return NextResponse.next();
}

// Configure matcher for routes
export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/profile/:path*"],
};
