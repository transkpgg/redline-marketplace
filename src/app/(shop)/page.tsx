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
            src="https://www.youtube.com/embed/4fSYLOG2XJk?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&playlist=4fSYLOG2XJk&playsinline=1&rel=0&modestbranding=1" 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] h-[300%] md:w-[150%] md:h-[150%] object-cover pointer-events-none filter grayscale-[80%] contrast-[120%]"
            allow="autoplay; encrypted-media"
            frameBorder="0"
          />
          <div className="absolute inset-0 bg-black/70 md:bg-black/60 z-10 pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 px-6 md:px-8 flex flex-col items-center justify-center pt-20 w-full">
          <h1 className="glitch font-[var(--font-orbitron)] text-white text-4xl md:text-6xl lg:text-8xl" data-text="KEMUDIKAN">KEMUDIKAN</h1>
          <h1 className="glitch text-[var(--accent-red)] font-[var(--font-orbitron)] text-4xl md:text-6xl lg:text-8xl mt-2" data-text="MASA DEPAN.">MASA DEPAN.</h1>
          <p className="mt-6 md:mt-8 text-sm md:text-lg text-white/80 max-w-[600px] leading-relaxed">
            Streetwear presisi tinggi. Tanpa batas kecepatan.
          </p>
          <Link href="#shop" className="mt-10 md:mt-12 py-4 px-10 font-[var(--font-orbitron)] font-bold bg-transparent text-white border-2 border-[var(--accent-red)] hover:bg-[var(--accent-red)] hover:shadow-[0_0_30px_rgba(255,0,60,0.4)] transition-all duration-300 uppercase tracking-[0.2em] text-xs md:text-sm">
            Jelajahi Koleksi
          </Link>
        </div>
      </section>

      {/* Marquee Ticker */}
      <div className="bg-[var(--accent-red)] py-3 overflow-hidden border-y border-black text-black font-[var(--font-orbitron)] font-black text-2xl md:text-4xl tracking-widest uppercase flex items-center">
        <div className="animate-marquee inline-flex whitespace-nowrap opacity-90">
          <span className="mx-6">PERFORMANCE GEAR</span><span className="mx-6">///</span>
          <span className="mx-6">STAY LOADED</span><span className="mx-6">///</span>
          <span className="mx-6">NO LIMITS</span><span className="mx-6">///</span>
          <span className="mx-6">PERFORMANCE GEAR</span><span className="mx-6">///</span>
          <span className="mx-6">STAY LOADED</span><span className="mx-6">///</span>
          <span className="mx-6">NO LIMITS</span><span className="mx-6">///</span>
        </div>
      </div>

      {/* Editorial Section */}
      <section className="border-b border-white/10 flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10">
          <h2 className="font-[var(--font-orbitron)] font-black text-3xl md:text-5xl uppercase tracking-widest mb-6">
            ENGINEERED FOR THE <br/><span className="text-[var(--accent-red)]">UNDERGROUND.</span>
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed mb-8 max-w-md">
            Mendobrak batasan desain dengan material presisi tinggi. Koleksi ini bukan sekadar pakaian, melainkan perlengkapan tempur di era modern. Tahan banting, fungsional, dan estetis tanpa kompromi.
          </p>
          <Link href="#shop" className="w-max py-4 px-10 bg-transparent border-2 border-white text-white font-black font-[var(--font-orbitron)] text-xs tracking-[0.2em] uppercase hover:bg-[var(--accent-red)] hover:border-[var(--accent-red)] hover:shadow-[0_0_30px_rgba(255,0,60,0.5)] transition-all duration-300">
            LIHAT ARSIP LENGKAP
          </Link>
        </div>
        <div className="w-full md:w-1/2 relative min-h-[500px]">
          <Image src="/editorial.png" alt="Editorial Streetwear" fill className="object-cover filter grayscale-[50%] contrast-[110%]" />
        </div>
      </section>

      {/* Catalog Section */}
      <section id="shop" className="py-24 px-8 md:px-16 bg-[var(--bg-color)] border-b border-white/10">
        <div className="flex items-center gap-8 mb-16">
          <h2 className="font-[var(--font-orbitron)] text-4xl tracking-widest uppercase">RILISAN <span className="text-[var(--accent-red)]">TERBARU</span></h2>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-[var(--text-secondary)] to-transparent" />
        </div>
        
        <ProductGrid />
      </section>
    </main>
  );
}
