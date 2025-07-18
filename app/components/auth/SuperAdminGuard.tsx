'use client';

// CLERK TEMPORARILY DISABLED FOR DEVELOPMENT
// import { useAuth } from '@/app/hooks/useAuth';
// import { motion } from 'motion/react';
// import { useEffect, useState } from 'react';

interface SuperAdminGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function SuperAdminGuard({ children, fallback }: SuperAdminGuardProps) {
  // SIMPLIFIED FOR DEVELOPMENT - JUST RENDER CHILDREN
  return <>{children}</>;

  // COMMENTED OUT CLERK FUNCTIONALITY
  // const { user, isLoaded, isSignedIn, isSuperAdmin, redirectToSignIn, requireSuperAdmin } = useAuth();
  // const [shouldRender, setShouldRender] = useState(false);

  // useEffect(() => {
  //   if (isLoaded) {
  //     if (!isSignedIn) {
  //       setShouldRender(false);
  //       return;
  //     }
      
  //     if (!isSuperAdmin) {
  //       console.warn('User is not superadmin, but allowing access for development');
  //       setShouldRender(true);
  //       return;
  //     }
      
  //     setShouldRender(true);
  //   }
  // }, [isLoaded, isSignedIn, isSuperAdmin]);

  // if (!isLoaded) {
  //   return (
  //     <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
  //       <motion.div
  //         initial={{ opacity: 0 }}
  //         animate={{ opacity: 1 }}
  //         className="text-center"
  //       >
  //         <div className="w-12 h-12 border-4 border-zinc-700 border-t-white rounded-full animate-spin mx-auto mb-4"></div>
  //         <p className="text-zinc-400">Loading...</p>
  //       </motion.div>
  //     </div>
  //   );
  // }

  // if (!shouldRender && process.env.NODE_ENV === 'development') {
  //   setShouldRender(true);
  // }

  // if (!shouldRender) {
  //   return (
  //     <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
  //       <motion.div
  //         initial={{ opacity: 0, y: 20 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         className="text-center"
  //       >
  //         <div className="text-4xl mb-4">🔐</div>
  //         <h2 className="text-xl font-semibold text-white mb-2">Access Restricted</h2>
  //         <p className="text-zinc-400">Please complete authentication setup...</p>
  //       </motion.div>
  //     </div>
  //   );
  // }

  // return <>{children}</>;
}