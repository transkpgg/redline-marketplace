"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import CheckoutForm from './CheckoutForm';

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  stock?: number;
  image_url: string;
};

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/data');
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products);
      }
    } catch (err) {
      console.error("Failed to fetch products", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const categories = ['Semua', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'Semua' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <input 
          type="text" 
          placeholder="CARI PRODUK //" 
          className="bg-black/50 border-2 border-white/20 p-4 text-white focus:border-[var(--accent-red)] outline-none flex-grow font-[var(--font-orbitron)] uppercase tracking-widest text-xs md:text-sm transition-colors"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center text-[var(--text-secondary)] py-20 border-t border-white/10">Menyinkronkan dengan server...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-white/10">
          {filteredProducts.map(product => (
            <div key={product.id} className="group cursor-pointer border-r border-b border-white/10 p-6 hover:bg-white/5 transition-colors" onClick={() => setSelectedProduct(product)}>
              <div className="product-image-wrapper aspect-[4/5] relative mb-6 overflow-hidden border border-white/10 bg-black">
                <Image src={product.image_url} alt={product.name} fill className="object-cover transform transition-transform duration-700 ease-out group-hover:scale-110 grayscale-[20%] group-hover:grayscale-0" />
                <div className="absolute top-4 right-4 bg-[var(--accent-red)] text-white text-xs font-bold px-3 py-1 tracking-wider font-[var(--font-orbitron)] z-10">
                  BARU
                </div>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10 mb-4">
                <h3 className="font-[var(--font-orbitron)] font-bold tracking-widest text-base group-hover:text-[var(--accent-red)] transition-colors">{product.name}</h3>
                <p className="text-[var(--text-secondary)] font-[var(--font-orbitron)]">${product.price.toFixed(2)}</p>
              </div>
              <button className="w-full py-4 bg-transparent border-2 border-white/20 text-white font-black font-[var(--font-orbitron)] text-xs tracking-[0.2em] uppercase group-hover:bg-[var(--accent-red)] group-hover:text-white group-hover:border-[var(--accent-red)] group-hover:shadow-[0_0_30px_rgba(255,0,60,0.4)] transition-all duration-300 flex items-center justify-center gap-2">
                BELI SEKARANG <span className="text-[10px] opacity-50 group-hover:opacity-100 transition-all duration-300 translate-x-0 group-hover:translate-x-2">→</span>
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <CheckoutForm product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
}
