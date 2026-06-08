import Navbar from "@/components/Navbar";
import BackgroundGrid from "@/components/BackgroundGrid";

export default function ShopLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BackgroundGrid />
      <Navbar />
      {children}
      <footer className="mt-16 p-16 border-t border-white/10 flex justify-between items-center z-10 bg-black/50 backdrop-blur-md">
        <div className="font-[var(--font-orbitron)] font-black text-xl tracking-[4px] text-[var(--text-secondary)]">RDLN.</div>
        <p className="text-[var(--text-secondary)] text-sm">&copy; 2026 Redline Apparel. Semua sistem beroperasi.</p>
      </footer>
    </>
  );
}
