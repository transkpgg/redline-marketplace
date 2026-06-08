import Link from 'next/link';
import { Activity } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 md:px-16 py-6 fixed w-full top-0 z-[100] backdrop-blur-md border-b border-white/10">
      <Link href="/" className="font-[var(--font-orbitron)] font-black text-3xl tracking-widest text-white flex items-center gap-2">
        <Activity className="w-8 h-8 text-[var(--accent-red)]" />
        RDLN<span className="text-[var(--accent-red)]">.</span>
      </Link>
      
      <div className="hidden md:flex gap-12 items-center">
        <div className="relative group py-4">
          <Link href="#shop" className="text-white hover:text-[var(--accent-red)] font-bold uppercase tracking-widest text-sm transition-colors flex items-center gap-1">
            Belanja <span className="text-[10px] opacity-50 group-hover:rotate-180 transition-transform">▼</span>
          </Link>
          <div className="absolute top-full left-0 mt-0 bg-[#050505]/95 backdrop-blur-xl border border-white/10 rounded-none p-4 flex flex-col min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto transform translate-y-2 group-hover:translate-y-0">
            <Link href="#shop" className="text-white/60 hover:text-white hover:bg-white/5 px-4 py-3 transition-all text-sm tracking-widest uppercase w-full text-left">Semua Produk</Link>
            <Link href="#shop" className="text-white/60 hover:text-white hover:bg-white/5 px-4 py-3 transition-all text-sm tracking-widest uppercase w-full text-left">Pakaian</Link>
            <Link href="#shop" className="text-white/60 hover:text-white hover:bg-white/5 px-4 py-3 transition-all text-sm tracking-widest uppercase w-full text-left">Aksesoris</Link>
            <Link href="#shop" className="text-white/60 hover:text-white hover:bg-white/5 px-4 py-3 transition-all text-sm tracking-widest uppercase w-full text-left">Koleksi Terbatas</Link>
          </div>
        </div>
        <Link href="#collections" className="text-white/70 hover:text-[var(--accent-red)] uppercase tracking-widest text-sm transition-colors">Koleksi</Link>
        <Link href="#about" className="text-white/70 hover:text-[var(--accent-red)] uppercase tracking-widest text-sm transition-colors">Tentang</Link>
      </div>

      <Link href="/cart" className="text-white hover:text-[var(--accent-red)] transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
      </Link>
    </nav>
  );
}
