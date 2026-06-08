"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import CheckoutForm from './CheckoutForm';

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image_url: string;
};

// Mock data if Supabase is empty
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'NEON DRIFT TEE',
    category: 'T-Shirts',
    price: 45.00,
    image_url: '/shirt_car_graphic.png'
  },
  {
    id: '2',
    name: 'GRIDLINE ESSENTIAL',
    category: 'T-Shirts',
    price: 40.00,
    image_url: '/shirt_minimalist_grid.png'
  }
];

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        if (supabase) {
          const { data, error } = await supabase.from('products').select('*');
          if (data && data.length > 0) {
            setProducts(data);
          }
        }
      } catch (err) {
        console.error("Failed to fetch products", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 mb-12">
        <input 
          type="text" 
          placeholder="Search items..." 
          className="bg-transparent border border-white/20 p-3 text-white focus:border-[var(--accent-red)] outline-none flex-grow font-sans"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          className="bg-black border border-white/20 p-3 text-white focus:border-[var(--accent-red)] outline-none font-sans"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="text-center text-[var(--text-secondary)]">Syncing with mainframe...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProducts.map(product => (
            <div key={product.id} className="group cursor-pointer" onClick={() => setSelectedProduct(product)}>
              <div className="product-image-wrapper aspect-[4/5] relative mb-6">
                <Image src={product.image_url} alt={product.name} fill className="object-cover" />
                <div className="absolute top-4 right-4 bg-[var(--accent-red)] text-white text-xs font-bold px-3 py-1 tracking-wider font-[var(--font-orbitron)] z-10">
                  NEW
                </div>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-white/10">
                <h3 className="font-[var(--font-orbitron)] tracking-wider text-sm">{product.name}</h3>
                <p className="text-[var(--text-secondary)] font-sans">${product.price.toFixed(2)}</p>
              </div>
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
