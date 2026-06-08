import Image from 'next/image';
import Link from 'next/link';

import ProductGrid from '@/components/ProductGrid';

export default function Home() {
  return (
    <main className="flex-grow flex flex-col z-10">
      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          <iframe 
            src="https://www.youtube.com/embed/4fSYLOG2XJk?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&playlist=4fSYLOG2XJk" 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200%] h-[200%] md:w-[150%] md:h-[150%] object-cover pointer-events-none filter grayscale-[80%] contrast-[120%]"
            allow="autoplay; encrypted-media"
            frameBorder="0"
          />
          <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 px-8 flex flex-col items-center mt-20">
          <h1 className="glitch font-[var(--font-orbitron)] text-white" data-text="KEMUDIKAN">KEMUDIKAN</h1>
          <h1 className="glitch text-[var(--accent-red)] font-[var(--font-orbitron)]" data-text="MASA DEPAN.">MASA DEPAN.</h1>
          <p className="mt-6 text-lg text-white/80 max-w-[600px]">
            Streetwear presisi tinggi. Tanpa batas kecepatan.
          </p>
          <Link href="#shop" className="mt-12 py-4 px-8 font-[var(--font-orbitron)] font-bold bg-white text-black hover:bg-[var(--accent-red)] hover:text-white transition-colors uppercase tracking-widest text-sm rounded-none border border-transparent hover:border-[var(--accent-red)]">
            Jelajahi Koleksi
          </Link>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="shop" className="py-24 px-8 md:px-16 bg-[var(--bg-color)]">
        <div className="flex items-center gap-8 mb-16">
          <h2 className="font-[var(--font-orbitron)] text-4xl tracking-widest uppercase">RILISAN <span className="text-[var(--accent-red)]">TERBARU</span></h2>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-[var(--text-secondary)] to-transparent" />
        </div>
        
        <ProductGrid />
      </section>
    </main>
  );
}
