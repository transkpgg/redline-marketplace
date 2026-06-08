import type { Metadata } from "next";
import { Inter, Anton } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import BackgroundGrid from "@/components/BackgroundGrid";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "REDLINE Apparel | Automotive Streetwear",
  description: "Automotive streetwear for the relentless. High-contrast, premium, futuristic clothing.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${anton.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-[#050505] text-white" style={{ fontFamily: 'var(--font-inter)' }}>
        {children}
      </body>
    </html>
  );
}
