import Image from 'next/image';
import Link from 'next/link';

import ProductGrid from '@/components/ProductGrid';

export default function Home() {
  return (
    <main className="flex-grow flex flex-col pt-32 px-8 md:px-16 z-10">
      {/* Hero Section */}
      <section className="min-h-[80vh] grid grid-cols-1 md:grid-cols-2 items-center gap-8 relative">
        <div className="flex flex-col justify-center z-10">
          <h1 className="glitch font-[var(--font-orbitron)]" data-text="DRIVE">DRIVE</h1>
          <h1 className="glitch text-[var(--accent-red)] font-[var(--font-orbitron)]" data-text="THE FUTURE.">THE FUTURE.</h1>
          <p className="mt-6 text-lg text-[var(--text-secondary)] max-w-[400px]">
            Precision engineered streetwear. No speed limits.
          </p>
          <Link href="#shop" className="cta-button mt-12 py-4 px-8 font-[var(--font-orbitron)] font-bold">
            <span className="relative z-10">EXPLORE COLLECTION</span>
            <span className="btn-arrow relative z-10">→</span>
          </Link>
        </div>
        <div className="relative h-[50vh] md:h-[80vh] flex justify-center items-center">
          <div className="relative w-full h-full max-w-[500px]">
            <Image 
              src="/model_streetwear.png" 
              alt="Model wearing Redline apparel" 
              fill
              className="object-cover grayscale-[80%] contrast-[120%] hover:grayscale-0 hover:contrast-[110%] transition-[filter] duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-[rgba(255,0,60,0.1)] to-transparent pointer-events-none" />
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="shop" className="py-24">
        <div className="flex items-center gap-8 mb-16">
          <h2 className="font-[var(--font-orbitron)] text-4xl tracking-widest uppercase">LATEST <span className="text-[var(--accent-red)]">DROPS</span></h2>
          <div className="h-[1px] flex-grow bg-gradient-to-r from-[var(--text-secondary)] to-transparent" />
        </div>
        
        <ProductGrid />
      </section>
    </main>
  );
}
