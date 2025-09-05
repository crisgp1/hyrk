import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
// import { ClerkProvider } from '@clerk/nextjs';
import { LanguageProvider } from "./contexts/LanguageContext";
import "./globals.css";

// Fonts are now defined in globals.css using @font-face
// This keeps the variable names for backward compatibility during transition

export const metadata: Metadata = {
  title: "hyrk.io - Software Accelerator & Idea Creator",
  description: "Premium software accelerator specializing in automotive luxury, financial services, and client tracking solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // CLERK TEMPORARILY DISABLED FOR DEVELOPMENT
    // <ClerkProvider
    //   appearance={{
    //     variables: {
    //       colorPrimary: '#ffffff',
    //       colorText: '#ffffff',
    //       colorTextSecondary: '#a1a1aa',
    //       colorBackground: '#18181b',
    //       colorInputBackground: '#27272a',
    //       colorInputText: '#ffffff',
    //     }
    //   }}
    // >
      <html lang="es">
        <body
          className="antialiased"
        >
          <LanguageProvider defaultLanguage="es">
            {children}
            <Analytics />
          </LanguageProvider>
        </body>
      </html>
    // </ClerkProvider>
  );
}
