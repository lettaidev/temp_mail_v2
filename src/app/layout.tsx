import "./globals.css";

import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import type { Metadata } from "next";
import NextTopLoader from "nextjs-toploader";
import { Button } from "@/components/ui/button";
import { Plus_Jakarta_Sans } from "next/font/google";
import { SITE_NAME, SITE_URL } from "@/lib/site-config";

const font = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
  fallback: ["system-ui", "sans-serif"],
  preload: true
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: `${SITE_NAME} - Simple Temporary Email Service`,
  description: "A beautiful, simple and secure temporary email service"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className={`${font.className} bg-slate-50 text-slate-800 antialiased`}>
        <NextTopLoader showSpinner={false} color="#6366f1" height={3} />
        
        <div className="min-h-screen flex flex-col">
          <header className="backdrop-blur-sm bg-white/80 border-b border-slate-100 sticky top-0 z-40">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2" title="Home">
                <div className="size-9 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold">
                  OM
                </div>
                <span className="font-medium text-lg text-slate-800">{SITE_NAME}</span>
              </Link>
              
              <div className="flex items-center gap-4">
                <Link href="/api" title="API Documentation">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
                  >
                    API
                  </Button>
                </Link>
                <a 
                  href="https://t.me/Lethanhtai" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  title="Telegram"
                >
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-slate-600 hover:text-indigo-600 hover:bg-indigo-50"
                  >
                    Telegram
                  </Button>
                </a>
              </div>
            </div>
          </header>
          
          <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
            {children}
          </main>
          
          <footer className="border-t border-slate-100 py-8 bg-white">
            <div className="container mx-auto px-4 max-w-5xl">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="size-7 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold text-xs">
                    OM
                  </div>
                  <span className="text-slate-600">{SITE_NAME}</span>
                </div>
                
                <div className="text-center md:text-right">
                  <p className="text-sm text-slate-500">
                    Author <a href="https://t.me/Lethanhtai" className="text-indigo-600 hover:underline">Lethanhtai</a>
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    © {new Date().getFullYear()} {SITE_NAME} - All rights reserved
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
