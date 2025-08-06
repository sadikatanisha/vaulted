import type { Metadata } from "next";
import { Geist, Geist_Mono, Open_Sans, Gelasio } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import Footer from "@/components/shared/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const gelasio = Gelasio({
  variable: "--font-gelasio",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "VAULTED",
  description: "A Platform To Sell Your Artworks",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
 
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${gelasio.variable} antialiased bg-[#fff3ef]`}
      >
        <Navbar  />
        {children}
        <Footer />
      </body>
    </html>
  );
}
