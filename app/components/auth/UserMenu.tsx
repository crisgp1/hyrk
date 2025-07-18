'use client';

import { useAuth } from '@/app/hooks/useAuth';
// import { SignOutButton } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

export default function UserMenu() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  // Fallback user for development
  const displayUser = user || {
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@hyrk.io',
    role: 'superadmin',
    isSuperAdmin: true
  };

  if (!displayUser) {
    return (
      <div className="flex items-center space-x-3 pl-4 border-l border-zinc-800">
        <div className="w-8 h-8 bg-gradient-to-r from-zinc-600 to-zinc-700 rounded-full animate-pulse" />
        <div className="hidden md:block">
          <div className="w-20 h-3 bg-zinc-700 rounded animate-pulse mb-1" />
          <div className="w-24 h-3 bg-zinc-700 rounded animate-pulse" />
        </div>
      </div>
    );
  }

  const userInitials = `${displayUser.firstName?.charAt(0) || 'A'}${displayUser.lastName?.charAt(0) || 'U'}`;

  return (
    <div className="relative">
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-3 pl-4 border-l border-zinc-800 hover:bg-zinc-800/50 rounded-lg p-2 transition-colors"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="w-8 h-8 bg-gradient-to-r from-zinc-600 to-zinc-700 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-bold">{userInitials}</span>
        </div>
        <div className="hidden md:block">
          <p className="text-sm font-medium text-white">
            {displayUser.firstName} {displayUser.lastName}
          </p>
          <div className="flex items-center space-x-2">
            <p className="text-xs text-zinc-500">{displayUser.email}</p>
            {displayUser.isSuperAdmin && (
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
                ADMIN
              </span>
            )}
          </div>
        </div>
        <span className="text-zinc-400 text-sm">
          {isOpen ? '↑' : '↓'}
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-2 w-64 bg-zinc-900 border border-zinc-800 rounded-lg shadow-xl z-50"
          >
            <div className="p-4 border-b border-zinc-800">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-zinc-600 to-zinc-700 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">{userInitials}</span>
                </div>
                <div>
                  <p className="text-white font-medium">
                    {displayUser.firstName} {displayUser.lastName}
                  </p>
                  <p className="text-zinc-400 text-sm">{displayUser.email}</p>
                  <p className="text-zinc-500 text-xs capitalize">
                    Role: {displayUser.role}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-2">
              <motion.button
                whileHover={{ backgroundColor: 'rgba(39, 39, 42, 0.5)' }}
                className="w-full text-left px-3 py-2 rounded-md text-sm text-zinc-300 hover:text-white transition-colors"
              >
                Account Settings
              </motion.button>
              
              <motion.button
                whileHover={{ backgroundColor: 'rgba(39, 39, 42, 0.5)' }}
                className="w-full text-left px-3 py-2 rounded-md text-sm text-zinc-300 hover:text-white transition-colors"
              >
                Preferences
              </motion.button>
              
              <div className="border-t border-zinc-800 mt-2 pt-2">
                {/* CLERK SIGN OUT TEMPORARILY DISABLED */}
                {/* {user ? (
                  <SignOutButton>
                    <motion.button
                      whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                      className="w-full text-left px-3 py-2 rounded-md text-sm text-red-400 hover:text-red-300 transition-colors"
                    >
                      Sign Out
                    </motion.button>
                  </SignOutButton>
                ) : ( */}
                  <motion.button
                    whileHover={{ backgroundColor: 'rgba(239, 68, 68, 0.1)' }}
                    className="w-full text-left px-3 py-2 rounded-md text-sm text-zinc-500 cursor-not-allowed"
                    disabled
                  >
                    Sign Out (Dev Mode)
                  </motion.button>
                {/* )} */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Overlay to close menu */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}