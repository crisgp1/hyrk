import type { Metadata } from "next";
import { Lexend, Outfit } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
// import { ClerkProvider } from '@clerk/nextjs';
import { LanguageProvider } from "./contexts/LanguageContext";
import "./globals.css";

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

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
          className={`${lexend.variable} ${outfit.variable} antialiased`}
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
