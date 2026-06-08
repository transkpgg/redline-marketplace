import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import BackgroundGrid from "@/components/BackgroundGrid";
import Navbar from "@/components/Navbar";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
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
      className={`${inter.variable} ${orbitron.variable} scroll-smooth`}
    >
      <body className="min-h-screen flex flex-col font-sans" style={{ fontFamily: 'var(--font-inter)' }}>
        <BackgroundGrid />
        <CustomCursor />
        <Navbar />
        {children}
        <footer className="mt-16 p-16 border-t border-white/10 flex justify-between items-center z-10">
          <div className="font-[var(--font-orbitron)] font-black text-xl tracking-[4px] text-[var(--text-secondary)]">REDLINE</div>
          <p className="text-[var(--text-secondary)] text-sm">&copy; 2026 Redline Apparel. All systems operational.</p>
        </footer>
      </body>
    </html>
  );
}
