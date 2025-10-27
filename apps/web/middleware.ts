import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(_request: NextRequest) {
  // For now, allow all requests through
  // Authentication will be handled client-side by the AuthProvider
  // and protected pages will redirect in their useEffect
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
