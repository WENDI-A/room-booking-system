import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import AuthProvider from "@/components/AuthProvider";
import ToastProvider from "@/components/ToastProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "LuxuryStay Hotel - Premium Accommodation",
  description: "Experience luxury and comfort at LuxuryStay Hotel. Book your perfect room today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <AuthProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <ToastProvider />
        </AuthProvider>
      </body>
    </html>
  );
}
