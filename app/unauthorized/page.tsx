'use client';

import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UnauthorizedPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-6xl mb-6">🔒</div>
          
          <h1 className="text-3xl font-vertiga-black text-white mb-4">
            Access Denied
          </h1>
          
          <p className="text-zinc-400 mb-6 leading-relaxed">
            You don't have permission to access the intranet. Only authorized superadmin accounts can access this area.
          </p>
          
          <div className="space-y-4">
            <motion.button
              onClick={() => router.push('/')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-zinc-200 transition-colors"
            >
              Return to Homepage
            </motion.button>
            
            <motion.button
              onClick={() => router.push('/sign-in')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full border border-zinc-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-zinc-900 transition-colors"
            >
              Sign In with Different Account
            </motion.button>
          </div>
          
          <div className="mt-8 pt-6 border-t border-zinc-800">
            <p className="text-zinc-500 text-sm">
              Need access? Contact your system administrator.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}