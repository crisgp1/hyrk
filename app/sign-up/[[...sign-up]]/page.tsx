'use client';

import { SignUp } from "@clerk/nextjs";
import { motion } from "motion/react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-gradient-to-r from-white to-zinc-400 flex items-center justify-center">
              <span className="text-black font-bold">H</span>
            </div>
            <span className="text-white font-lexend font-bold text-2xl">hyrk.io</span>
          </div>
          <h1 className="text-2xl font-lexend font-bold text-white mb-2">
            Request Access
          </h1>
          <p className="text-zinc-400">
            Sign up to request access to the internal system
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-8"
        >
          <SignUp 
            appearance={{
              elements: {
                formButtonPrimary: 
                  "bg-white text-black hover:bg-zinc-200 text-sm normal-case font-medium",
                card: "bg-transparent shadow-none",
                headerTitle: "text-white",
                headerSubtitle: "text-zinc-400",
                socialButtonsIconButton: 
                  "bg-zinc-800 border-zinc-700 hover:bg-zinc-700",
                socialButtonsBlockButton: 
                  "bg-zinc-800 border-zinc-700 hover:bg-zinc-700 text-white",
                formFieldInput: 
                  "bg-zinc-800 border-zinc-700 text-white focus:border-zinc-500",
                formFieldLabel: "text-zinc-300",
                footerActionLink: "text-white hover:text-zinc-300",
                identityPreviewText: "text-white",
                identityPreviewEditButton: "text-zinc-400"
              }
            }}
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-6"
        >
          <p className="text-zinc-500 text-sm">
            Account registration requires admin approval for intranet access
          </p>
        </motion.div>
      </div>
    </div>
  );
}