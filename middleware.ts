// import type { NextRequest } from 'next/server'

// export function middleware(request: NextRequest) {
//   const currentUser = request.cookies.get('sb-access-token')?.value;
//   const path = request.nextUrl.pathname;

//   // Define routes
//   const authRequiredRoutes = ['/dashboard']; // Base path that requires authentication
//   const publicRoutes = ['/login', '/signup']; // Routes accessible without authentication
//   const redirectIfAuthenticated = ['/login', '/signup']; // Routes to redirect if authenticated
//   const defaultAuthRedirect = '/dashboard/templates'; // Default redirect for authenticated users

//   console.log('Current user:', currentUser);

//   // Redirect authenticated users trying to access specific public routes
//   if (currentUser && redirectIfAuthenticated.some(route => path.startsWith(route))) {
//     return Response.redirect(new URL(defaultAuthRedirect, request.url));
//   }

//   // Allow authenticated users to access their routes without redirection
//   if (currentUser && authRequiredRoutes.some(route => path.startsWith(route))) {
//     return; // No redirection, proceed with the request
//   }

//   // Redirect unauthenticated users trying to access auth-required routes to login
//   if (!currentUser && authRequiredRoutes.some(route => path.startsWith(route))) {
//     return Response.redirect(new URL('/login', request.url));
//   }

//   // Allow unauthenticated access to public routes without redirection
//   if (!currentUser && publicRoutes.some(route => path.startsWith(route))) {
//     return; // No redirection, proceed with the request
//   }

//   // Additional logic for other routes can be added here
// }

// export const config = {
//   matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)'],
// }

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Define routes
  const authRequiredRoutes = ['/dashboard']; // Base path that requires authentication
  const publicRoutes = ['/login', '/signup']; // Routes accessible without authentication
  const redirectIfAuthenticated = ['/login', '/signup']; // Routes to redirect if authenticated
  const defaultAuthRedirect = '/dashboard/templates'; // Default redirect for authenticated users

  // Check for authentication token in headers
  // const authToken = request.headers.get('Authorization')?.split('Bearer ')[0];

  const authToken = true;
  
  console.log('Auth token:', authToken);

  // Redirect authenticated users trying to access specific public routes
  if (authToken && redirectIfAuthenticated.some(route => path.startsWith(route))) {
    return NextResponse.redirect(new URL(defaultAuthRedirect, request.url));
  }

  // Allow authenticated users to access their routes without redirection
  if (authToken && authRequiredRoutes.some(route => path.startsWith(route))) {
    return NextResponse.next();
  }

  // Redirect unauthenticated users trying to access auth-required routes to login
  if (!authToken && authRequiredRoutes.some(route => path.startsWith(route))) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow unauthenticated access to public routes without redirection
  if (!authToken && publicRoutes.some(route => path.startsWith(route))) {
    return NextResponse.next();
  }

  // For all other routes, proceed with the request
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$|.*\\.jpg$).*)'],
}