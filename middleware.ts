// import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';

// CLERK TEMPORARILY DISABLED FOR DEVELOPMENT
// const isProtectedRoute = createRouteMatcher(['/intranet(.*)']);

export default function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Content Security Policy for iframe security
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live https://va.vercel-scripts.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com data:;
    img-src 'self' data: https: blob:;
    media-src 'self' https: data:;
    connect-src 'self' https://vitals.vercel-insights.com https://vercel.live;
    frame-src 'self' https://*.mx https://*.com https://cliquealo.mx https://tramboory.com https://livinning.com https://www.dinrise.com https://veilcar.com https://kuentra.com https://www.altum-legal.mx;
    child-src 'self' https://*.mx https://*.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  // Set security headers
  response.headers.set('Content-Security-Policy', cspHeader);
  
  // Additional security headers for iframe protection
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  
  // Permissions Policy to restrict iframe capabilities
  response.headers.set('Permissions-Policy', 
    'accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), cross-origin-isolated=(), display-capture=(), document-domain=(), encrypted-media=(), execution-while-not-rendered=(), execution-while-out-of-viewport=(), fullscreen=(), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), navigation-override=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=()'
  );

  // Strict Transport Security (HTTPS only)
  if (request.nextUrl.protocol === 'https:') {
    response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  }

  // Performance and caching headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  
  // Temporarily allow all routes during development
  return response;
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