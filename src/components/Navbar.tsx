import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 md:px-16 py-6 fixed w-full top-0 z-[100] backdrop-blur-md border-b border-white/10">
      <Link href="/" className="font-heading font-black text-2xl tracking-widest text-white">
        REDLINE
      </Link>
      
      <div className="hidden md:flex gap-12">
        <Link href="#shop" className="text-[var(--text-secondary)] hover:text-white uppercase tracking-widest text-sm transition-colors">Shop</Link>
        <Link href="#collections" className="text-[var(--text-secondary)] hover:text-white uppercase tracking-widest text-sm transition-colors">Collections</Link>
        <Link href="#about" className="text-[var(--text-secondary)] hover:text-white uppercase tracking-widest text-sm transition-colors">About</Link>
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
