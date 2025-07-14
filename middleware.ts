import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const locale = req.cookies.get('locale')?.value || 'vi';
  const token = req.cookies.get('access_token')?.value;

  // Nếu không có token → redirect
  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  // Nếu có token → tiếp tục và set header
  const response = NextResponse.next();
  response.headers.set('x-locale', locale);

  return response;
}

export const config = {
  matcher: [
    // '/dashboard/:path*',
    '/admin/:path*',
    '/profile/:path*',
    '/user/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico|assets|public|login|register|reset-password)/:path*)',
  ],
};
