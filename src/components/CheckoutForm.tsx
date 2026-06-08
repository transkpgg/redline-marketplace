"use client";

import { useState } from 'react';
import { Product } from './ProductGrid';

interface CheckoutFormProps {
  product: Product;
  onClose: () => void;
}

export default function CheckoutForm({ product, onClose }: CheckoutFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      customer_name: formData.get('name'),
      whatsapp: formData.get('whatsapp'),
      address: formData.get('address'),
      payment_method: formData.get('payment'),
    };

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        alert("Transaction failed. System anomaly detected.");
      }
    } catch (err) {
      alert("Network error.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="fixed inset-0 bg-black/90 z-[1000] flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="border border-[var(--accent-red)] p-8 max-w-md w-full bg-[#050505] text-center">
          <h2 className="font-[var(--font-orbitron)] text-2xl text-[var(--accent-red)] mb-4">ORDER CONFIRMED</h2>
          <p className="text-[var(--text-secondary)] mb-8">Your transaction has been secured. Our agents will contact you via WhatsApp shortly.</p>
          <button onClick={onClose} className="cta-button py-3 px-6 w-full justify-center">
            <span className="relative z-10">CLOSE TERMINAL</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-[1000] flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
      <div className="border border-white/20 p-8 max-w-lg w-full bg-[#050505] relative mt-20 md:mt-0">
        <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-[var(--accent-red)] text-xl font-bold">&times;</button>
        
        <h2 className="font-[var(--font-orbitron)] text-2xl tracking-widest mb-6">SECURE <span className="text-[var(--accent-red)]">CHECKOUT</span></h2>
        
        <div className="flex gap-4 mb-8 border-b border-white/10 pb-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image_url} alt={product.name} className="w-20 h-24 object-cover border border-white/10" />
          <div>
            <h3 className="font-[var(--font-orbitron)] text-sm tracking-wide">{product.name}</h3>
            <p className="text-[var(--text-secondary)] mt-1">${product.price.toFixed(2)}</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 font-sans">
          <div>
            <label className="block text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">Full Name</label>
            <input required name="name" type="text" className="w-full bg-transparent border border-white/20 p-3 text-white focus:border-[var(--accent-red)] outline-none" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">WhatsApp Number</label>
            <input required name="whatsapp" type="tel" placeholder="+62..." className="w-full bg-transparent border border-white/20 p-3 text-white focus:border-[var(--accent-red)] outline-none" />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">Shipping Address</label>
            <textarea required name="address" rows={3} className="w-full bg-transparent border border-white/20 p-3 text-white focus:border-[var(--accent-red)] outline-none resize-none"></textarea>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">Payment Method</label>
            <select name="payment" className="w-full bg-black border border-white/20 p-3 text-white focus:border-[var(--accent-red)] outline-none">
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="E-Wallet">E-Wallet (OVO/GoPay/Dana)</option>
              <option value="COD">Cash on Delivery (COD)</option>
            </select>
          </div>
          
          <button type="submit" disabled={loading} className="cta-button w-full justify-center py-4 mt-4 font-[var(--font-orbitron)] font-bold">
            <span className="relative z-10">{loading ? 'PROCESSING...' : `PAY $${product.price.toFixed(2)}`}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
