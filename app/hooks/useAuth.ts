'use client';

// CLERK TEMPORARILY DISABLED FOR DEVELOPMENT
// import { useUser, useAuth as useClerkAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

interface AuthUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  isLoaded: boolean;
  isSuperAdmin: boolean;
}

export function useAuth() {
  // MOCK DATA FOR DEVELOPMENT
  const router = useRouter();
  
  // Temporary mock user for development
  const mockUser: AuthUser = {
    id: 'dev-user-1',
    email: 'admin@hyrk.io',
    firstName: 'Admin',
    lastName: 'User',
    role: 'superadmin',
    isLoaded: true,
    isSuperAdmin: true
  };

  // COMMENTED OUT CLERK FUNCTIONALITY
  // const { user, isLoaded: userLoaded } = useUser();
  // const { isSignedIn, isLoaded: authLoaded } = useClerkAuth();
  // const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  // useEffect(() => {
  //   if (userLoaded && authLoaded) {
  //     if (isSignedIn && user) {
  //       const userRole = (user.publicMetadata?.role as string) || 'user';
  //       const isSuperAdmin = userRole === 'superadmin';

  //       setAuthUser({
  //         id: user.id,
  //         email: user.primaryEmailAddress?.emailAddress || '',
  //         firstName: user.firstName || '',
  //         lastName: user.lastName || '',
  //         role: userRole,
  //         isLoaded: true,
  //         isSuperAdmin
  //       });
  //     } else {
  //       setAuthUser(null);
  //     }
  //   }
  // }, [user, isSignedIn, userLoaded, authLoaded]);

  const requireSuperAdmin = () => {
    // Always return true during development
    return true;
    // if (!mockUser?.isSuperAdmin) {
    //   router.push('/unauthorized');
    //   return false;
    // }
    // return true;
  };

  const redirectToSignIn = () => {
    router.push('/sign-in');
  };

  const redirectToIntranet = () => {
    router.push('/intranet/dashboard');
  };

  return {
    user: mockUser, // Return mock user during development
    isLoaded: true, // Always loaded during development
    isSignedIn: true, // Always signed in during development
    isSuperAdmin: true, // Always superadmin during development
    requireSuperAdmin,
    redirectToSignIn,
    redirectToIntranet
  };
}