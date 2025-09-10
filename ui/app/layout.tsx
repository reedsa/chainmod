import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";

import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Navigation from "@/components/Navigation";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ethereum Dashboard",
  description: "Chain overview and wallet details",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <div className="container mx-auto p-4">
            <header className="flex justify-between items-center rounded-lg pl-4 mt-6 mb-0 h-[55px] bg-blue-900">
              <Navigation />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: 12,
                }}
              >
                <ConnectButton />
              </div>
            </header>
            {children}
          </div>
          <AnalyticsTracker />
        </Providers>
      </body>
    </html>
  );
}
