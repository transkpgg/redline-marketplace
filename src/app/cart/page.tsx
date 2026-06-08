import Link from 'next/link';

export default function CartPage() {
  return (
    <main className="min-h-screen pt-32 px-8 flex flex-col items-center justify-center text-center relative z-10">
      <h1 className="font-[var(--font-orbitron)] text-4xl mb-6 tracking-widest uppercase">KERANJANG <span className="text-[var(--accent-red)]">BELANJA</span></h1>
      <p className="text-[var(--text-secondary)] text-lg mb-12 max-w-md">
        Saat ini sistem keranjang sedang dalam perbaikan. Anda bisa melakukan pemesanan (Checkout) langsung dengan mengklik produk di halaman katalog!
      </p>
      <Link href="/#shop" className="py-4 px-8 border border-[var(--accent-red)] text-[var(--accent-red)] hover:bg-[var(--accent-red)] hover:text-white transition-colors font-bold tracking-widest uppercase text-sm">
        KEMBALI KE KATALOG
      </Link>
    </main>
  );
}
