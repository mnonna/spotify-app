import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers';
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("auth-token");

  const { searchParams } = request.nextUrl;
  const url = new URL(request.url);
  const { pathname } = url;
  
  if (!token && pathname !== '/login' && pathname !== '/login/auth') {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (pathname === '/login/auth') {
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    
    return NextResponse.next()
  }

  return NextResponse.next()
}
 
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}