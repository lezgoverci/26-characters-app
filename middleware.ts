import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('sb-access-token')?.value

  // Redirect authenticated users trying to access /login or /signup to /dashboard/templates
  if (currentUser && (request.nextUrl.pathname.startsWith('/login') || request.nextUrl.pathname.startsWith('/signup'))) {
    return Response.redirect(new URL('/dashboard/templates', request.url))
  }

  // Adjusted logic to allow access to /dashboard/templates and its subpaths without redirection
  if (currentUser && request.nextUrl.pathname.startsWith('/dashboard/templates')) {
    // No redirection for /dashboard/templates and its subpaths
    return; // Allow the request to proceed without redirection
  }

  // Existing logic to redirect authenticated users not trying to access /dashboard
  if (currentUser && !request.nextUrl.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/dashboard/templates', request.url))
  }

  // Redirect unauthenticated users trying to access any page other than /login to /login
  if (!currentUser && !request.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)'],
}