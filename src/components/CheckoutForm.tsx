"use client";

import { useState, useEffect } from 'react';
import { Product } from './ProductGrid';

interface CheckoutFormProps {
  product: Product;
  onClose: () => void;
}

export default function CheckoutForm({ product, onClose }: CheckoutFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [size, setSize] = useState('L'); // Default size
  const [show, setShow] = useState(false);

  // Trigger entrance animation
  useEffect(() => {
    setShow(true);
  }, []);

  const handleClose = () => {
    setShow(false);
    setTimeout(onClose, 300); // Wait for exit animation
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      product_id: product.id,
      product_name: product.name,
      price: product.price,
      size: size,
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
      <div className="fixed inset-0 bg-black/60 z-[1000] flex items-center justify-center p-4 backdrop-blur-md transition-opacity duration-300">
        <div className="border border-[var(--accent-red)] p-10 max-w-md w-full bg-[#0a0a0a]/90 shadow-[0_0_50px_rgba(255,0,60,0.2)] text-center transform scale-100 transition-transform duration-300">
          <h2 className="font-[var(--font-anton)] text-2xl text-[var(--accent-red)] mb-4 tracking-widest">PESANAN BERHASIL</h2>
          <p className="text-[var(--text-secondary)] mb-8 font-sans leading-relaxed">Transaksi Anda telah diproses. Agen kami akan segera menghubungi Anda melalui WhatsApp untuk mengonfirmasi pengiriman.</p>
          <button onClick={onClose} className="cta-button py-3 px-6 w-full justify-center">
            <span className="relative z-10">TUTUP TERMINAL</span>
          </button>
        </div>
      </div>
    );
  }

  const sizes = ['S', 'M', 'L', 'XL', 'XXL'];

  return (
    <div className={`fixed inset-0 bg-black/60 z-[1000] flex items-center justify-center p-4 backdrop-blur-md transition-opacity duration-300 overflow-y-auto ${show ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`border border-white/10 p-8 max-w-lg w-full bg-[#050505]/95 shadow-2xl relative mt-20 md:mt-0 transition-transform duration-300 ${show ? 'translate-y-0 scale-100' : 'translate-y-10 scale-95'}`}>
        <button onClick={handleClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors text-2xl">&times;</button>
        
        <h2 className="font-[var(--font-anton)] text-2xl tracking-widest mb-6 border-b border-white/10 pb-4">CHECKOUT <span className="text-[var(--accent-red)]">AMAN</span></h2>
        
        <div className="flex gap-6 mb-8 bg-white/5 p-4 rounded-none border border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image_url} alt={product.name} className="w-24 h-28 object-cover border border-white/10 grayscale-[20%]" />
          <div className="flex flex-col justify-center">
            <h3 className="font-[var(--font-anton)] tracking-wide mb-1 text-lg">{product.name}</h3>
            <p className="text-[var(--text-secondary)] font-sans mb-3">${product.price.toFixed(2)}</p>
            {product.stock !== undefined && (
              <span className={`text-xs px-2 py-1 border rounded-none w-max ${product.stock > 0 ? 'border-green-500/50 text-green-400' : 'border-red-500/50 text-red-400'}`}>
                {product.stock > 0 ? `${product.stock} STOK` : 'HABIS'}
              </span>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 font-sans">
          
          {/* Size Selector */}
          <div>
            <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-3">Pilih Ukuran</label>
            <div className="flex gap-3">
              {sizes.map(s => (
                <button 
                  key={s} 
                  type="button"
                  onClick={() => setSize(s)}
                  className={`w-12 h-12 flex items-center justify-center border font-bold transition-all duration-200 ${size === s ? 'border-[var(--accent-red)] bg-[rgba(255,0,60,0.1)] text-white' : 'border-white/20 text-white/50 hover:border-white/50 hover:text-white'}`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-2">
            <div>
              <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2">Nama Lengkap</label>
              <input required name="name" type="text" className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-[var(--accent-red)] focus:bg-transparent transition-colors outline-none" />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2">Nomor WhatsApp</label>
              <input required name="whatsapp" type="tel" placeholder="+62..." className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-[var(--accent-red)] focus:bg-transparent transition-colors outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2">Alamat Pengiriman</label>
            <textarea required name="address" rows={2} className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-[var(--accent-red)] focus:bg-transparent transition-colors outline-none resize-none"></textarea>
          </div>
          
          <div>
            <label className="block text-xs uppercase tracking-widest text-[var(--text-secondary)] mb-2">Metode Pembayaran</label>
            <div className="relative">
              <select name="payment" className="w-full bg-white/5 border border-white/10 p-3 text-white focus:border-[var(--accent-red)] focus:bg-transparent transition-colors outline-none appearance-none">
                <option value="Bank Transfer" className="bg-black text-white">Transfer Bank</option>
                <option value="E-Wallet" className="bg-black text-white">E-Wallet (OVO/GoPay/Dana)</option>
                <option value="COD" className="bg-black text-white">Bayar di Tempat (COD)</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">▼</div>
            </div>
          </div>
          
          <button type="submit" disabled={loading || product.stock === 0} className="cta-button w-full justify-center py-4 mt-6 font-[var(--font-anton)] font-bold shadow-[0_0_20px_rgba(255,0,60,0.1)] hover:shadow-[0_0_30px_rgba(255,0,60,0.3)]">
            <span className="relative z-10">{loading ? 'MEMPROSES...' : `BAYAR $${product.price.toFixed(2)}`}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
