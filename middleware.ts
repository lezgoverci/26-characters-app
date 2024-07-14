import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get('sb-access-token')?.value;
  const path = request.nextUrl.pathname;

  // Define routes
  const authRequiredRoutes = ['/dashboard']; // Base path that requires authentication
  const publicRoutes = ['/login', '/signup']; // Routes accessible without authentication
  const redirectIfAuthenticated = ['/login', '/signup']; // Routes to redirect if authenticated
  const defaultAuthRedirect = '/dashboard/templates'; // Default redirect for authenticated users

  // Redirect authenticated users trying to access specific public routes
  if (currentUser && redirectIfAuthenticated.some(route => path.startsWith(route))) {
    return Response.redirect(new URL(defaultAuthRedirect, request.url));
  }

  // Allow authenticated users to access their routes without redirection
  if (currentUser && authRequiredRoutes.some(route => path.startsWith(route))) {
    return; // No redirection, proceed with the request
  }

  // Redirect unauthenticated users trying to access auth-required routes to login
  if (!currentUser && authRequiredRoutes.some(route => path.startsWith(route))) {
    return Response.redirect(new URL('/login', request.url));
  }

  // Allow unauthenticated access to public routes without redirection
  if (!currentUser && publicRoutes.some(route => path.startsWith(route))) {
    return; // No redirection, proceed with the request
  }

  // Additional logic for other routes can be added here
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)'],
}