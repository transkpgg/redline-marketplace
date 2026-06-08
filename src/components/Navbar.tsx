"use client";
import { useState } from 'react';
import Link from 'next/link';
import { Activity, Menu, X } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center px-8 md:px-16 py-6 fixed w-full top-0 z-[100] backdrop-blur-md border-b border-black/10 bg-white/30">
      <Link href="/" className="font-[var(--font-orbitron)] font-black text-3xl tracking-widest text-black flex items-center gap-2 z-50">
        <Activity className="w-8 h-8 text-[var(--accent-red)]" />
        RDLN<span className="text-[var(--accent-red)]">.</span>
      </Link>
      
      {/* Desktop Menu */}
      <div className="hidden md:flex gap-12 items-center">
        <div className="relative group py-4">
          <Link href="#shop" className="text-black hover:text-[var(--accent-red)] font-bold uppercase tracking-widest text-sm transition-colors flex items-center gap-1">
            Belanja <span className="text-[10px] opacity-50 group-hover:rotate-180 transition-transform">▼</span>
          </Link>
          <div className="absolute top-full left-0 mt-0 bg-white/95 backdrop-blur-xl border border-black/10 rounded-none p-4 flex flex-col min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 pointer-events-none group-hover:pointer-events-auto transform translate-y-2 group-hover:translate-y-0">
            <Link href="#shop" className="text-black/60 hover:text-black hover:bg-black/5 px-4 py-3 transition-all text-sm tracking-widest uppercase w-full text-left">Semua Produk</Link>
            <Link href="#shop" className="text-black/60 hover:text-black hover:bg-black/5 px-4 py-3 transition-all text-sm tracking-widest uppercase w-full text-left">Pakaian</Link>
            <Link href="#shop" className="text-black/60 hover:text-black hover:bg-black/5 px-4 py-3 transition-all text-sm tracking-widest uppercase w-full text-left">Aksesoris</Link>
            <Link href="#shop" className="text-black/60 hover:text-black hover:bg-black/5 px-4 py-3 transition-all text-sm tracking-widest uppercase w-full text-left">Koleksi Terbatas</Link>
          </div>
        </div>
        <Link href="#collections" className="text-black/70 hover:text-[var(--accent-red)] uppercase tracking-widest text-sm transition-colors">Koleksi</Link>
        <Link href="#about" className="text-black/70 hover:text-[var(--accent-red)] uppercase tracking-widest text-sm transition-colors">Tentang</Link>
      </div>

      <div className="flex items-center gap-6 z-50">
        <Link href="/cart" className="text-black hover:text-[var(--accent-red)] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </Link>
        
        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-black hover:text-[var(--accent-red)] transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 bg-white/98 backdrop-blur-3xl z-40 flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}>
        <div className="flex flex-col items-center gap-10 text-center w-full px-8">
          <Link href="#shop" onClick={() => setIsOpen(false)} className={`group relative text-black font-[var(--font-orbitron)] font-black uppercase tracking-[0.2em] text-3xl transition-all duration-500 delay-100 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            BELANJA
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-1 bg-[var(--accent-red)] transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(255,0,60,0.5)]"></span>
          </Link>
          
          <Link href="#collections" onClick={() => setIsOpen(false)} className={`group relative text-black font-[var(--font-orbitron)] font-black uppercase tracking-[0.2em] text-3xl transition-all duration-500 delay-200 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            KOLEKSI
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-1 bg-[var(--accent-red)] transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(255,0,60,0.5)]"></span>
          </Link>

          <Link href="#about" onClick={() => setIsOpen(false)} className={`group relative text-black font-[var(--font-orbitron)] font-black uppercase tracking-[0.2em] text-3xl transition-all duration-500 delay-300 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            TENTANG
            <span className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-1 bg-[var(--accent-red)] transition-all duration-300 group-hover:w-full shadow-[0_0_10px_rgba(255,0,60,0.5)]"></span>
          </Link>

          <div className={`mt-10 flex items-center gap-6 transition-all duration-500 delay-500 ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <Link href="#shop" onClick={() => setIsOpen(false)} className="text-black/40 hover:text-[var(--accent-red)] uppercase tracking-[0.3em] text-[10px] font-bold transition-colors">PAKAIAN</Link>
            <span className="w-1 h-1 rounded-full bg-black/10"></span>
            <Link href="#shop" onClick={() => setIsOpen(false)} className="text-black/40 hover:text-[var(--accent-red)] uppercase tracking-[0.3em] text-[10px] font-bold transition-colors">AKSESORIS</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
