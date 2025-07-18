// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// CLERK TEMPORARILY DISABLED FOR DEVELOPMENT
// const isProtectedRoute = createRouteMatcher(['/intranet(.*)']);

export default function middleware(req: any) {
  // Temporarily allow all routes during development
  return NextResponse.next();
}

// export default clerkMiddleware((auth, req) => {
//   // If it's a protected route, ensure user is authenticated
//   if (isProtectedRoute(req)) {
//     auth().protect();
//     
//     // TODO: Add superadmin role verification here when ready
//     // const { userId } = auth();
//     // if (userId) {
//     //   const user = await clerkClient.users.getUser(userId);
//     //   const userRole = user.publicMetadata?.role;
//     //   if (userRole !== 'superadmin') {
//     //     return NextResponse.redirect(new URL('/unauthorized', req.url));
//     //   }
//     // }
//   }
//   
//   return NextResponse.next();
// });

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};