'use client';

import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import { motion } from "motion/react";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center mb-4">
            <Image
              src="/img/hyrk logo blanco.svg"
              alt="hyrk.io"
              width={140}
              height={32}
              className="h-8 w-auto"
            />
          </div>
          <h1 className="text-2xl font-vertiga-black text-white mb-2">
            Intranet Access
          </h1>
          <p className="text-zinc-400">
            Sign in with your authorized account to access the internal system
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-zinc-900 border border-zinc-800 rounded-xl p-8"
        >
          <SignIn 
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
            Only authorized superadmin accounts can access the intranet
          </p>
        </motion.div>
      </div>
    </div>
  );
}