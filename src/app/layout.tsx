import React from "react";
import type { Metadata, Viewport } from "next";
import { Orbitron, Manrope } from "next/font/google";
import "@/styles/tailwind.css";
import FomoNotification from "@/components/FomoNotification";
import { CartProvider } from "@/context/CartContext"; 
import FloatingContact from "@/components/FloatingContact";
import LoadingScreen from "@/components/LoadingScreen";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-orbitron",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: "LuminaTech — Sınırlarını Zorla, Geleceği Yaşa",
  description:
    "LuminaTech ile akıllı saatler, kablosuz kulaklıklar ve hoparlörlerle gençlik enerjini teknolojiye dönüştür.",
  icons: {
    icon: [{ url: "/favicon.ico", type: "image/x-icon" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr" className={`${orbitron.variable} ${manrope.variable}`}>
      <body className={`${manrope.className} bg-[#f7f9fc] text-[#1a1a2e] dark:bg-[#0a0f1c] dark:text-gray-100 transition-colors duration-500`}>
        <LoadingScreen />
        <CartProvider>
          {children}
        </CartProvider>
        <FloatingContact />
        <FomoNotification />
      </body>
    </html>
  );
}