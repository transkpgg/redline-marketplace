"use client";

import { useState, useEffect, useMemo } from 'react';
import { supabase } from '@/lib/supabase';
import * as XLSX from 'xlsx';
import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  TrendingUp, 
  AlertTriangle, 
  Download, 
  UploadCloud, 
  Activity,
  Box,
  Server
} from 'lucide-react';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/data');
        if (res.ok) {
          const data = await res.json();
          setProducts(data.products || []);
          
          const sortedOrders = (data.orders || []).sort((a: any, b: any) => 
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          setOrders(sortedOrders);
        }
      } catch (err) {
        console.error("Failed to fetch data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const metrics = useMemo(() => {
    const totalRevenue = orders.reduce((sum, o) => sum + o.total_price, 0);
    const totalOrders = orders.length;

    const salesCount: Record<string, number> = {};
    orders.forEach(o => {
      salesCount[o.product_name] = (salesCount[o.product_name] || 0) + 1;
    });
    const bestSellers = Object.entries(salesCount)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    const lowStockItems = products.filter(p => p.stock < 10).sort((a, b) => a.stock - b.stock);
    const soldProductNames = new Set(Object.keys(salesCount));
    const unsoldProducts = products.filter(p => !soldProductNames.has(p.name));

    return { totalRevenue, totalOrders, bestSellers, lowStockItems, unsoldProducts };
  }, [orders, products]);

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(orders.map((o, i) => ({
      'No': i + 1,
      'ID Order': o.order_id_string,
      'Tanggal': new Date(o.created_at).toLocaleString(),
      'Nama Pelanggan': o.customer_name,
      'Detail Produk': o.product_name,
      'Ukuran': o.size,
      'Total Harga': o.total_price,
      'Status': o.status
    })));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");
    XLSX.writeFile(workbook, `Redline_Orders_${new Date().getTime()}.xlsx`);
  };

  const handleBulkImport = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/import', { method: 'POST', body: formData });
      const result = await res.json();
      if (res.ok) alert("Import successful! " + result.message);
      else alert("Import failed: " + result.error);
    } catch (err) {
      alert("Network error.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-[#020202] flex font-sans text-white overflow-hidden selection:bg-[var(--accent-red)] selection:text-white z-50">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[var(--accent-red)]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[30%] h-[30%] bg-white/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Sidebar - Glassmorphism */}
      <aside className="w-64 border-r border-white/5 bg-white/[0.01] backdrop-blur-xl flex-shrink-0 flex flex-col z-20 relative">
        <div className="p-8 border-b border-white/5 flex-shrink-0">
          <h1 className="font-[var(--font-orbitron)] font-black text-2xl tracking-widest text-white flex items-center gap-2">
            <Activity className="w-6 h-6 text-[var(--accent-red)]" />
            RDLN<span className="text-[var(--accent-red)]">.</span>
          </h1>
          <p className="text-white/40 text-[10px] mt-2 tracking-[0.2em] uppercase font-bold">Workspace Pro</p>
        </div>
        
        <nav className="flex-1 px-5 py-8 flex flex-col gap-3">
          <button 
            onClick={() => setActiveTab('overview')} 
            className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-500 ease-out ${activeTab === 'overview' ? 'bg-gradient-to-r from-[var(--accent-red)]/20 to-transparent text-white border-l-2 border-[var(--accent-red)] shadow-[inset_0_0_30px_rgba(255,0,60,0.05)]' : 'text-white/40 hover:bg-white/5 hover:text-white border-l-2 border-transparent'}`}
          >
            <LayoutDashboard className={`w-5 h-5 ${activeTab === 'overview' ? 'text-[var(--accent-red)]' : ''}`} />
            <span className="text-xs tracking-[0.15em] uppercase font-semibold mt-0.5">Ringkasan</span>
          </button>
          <button 
            onClick={() => setActiveTab('orders')} 
            className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-500 ease-out ${activeTab === 'orders' ? 'bg-gradient-to-r from-[var(--accent-red)]/20 to-transparent text-white border-l-2 border-[var(--accent-red)] shadow-[inset_0_0_30px_rgba(255,0,60,0.05)]' : 'text-white/40 hover:bg-white/5 hover:text-white border-l-2 border-transparent'}`}
          >
            <ShoppingCart className={`w-5 h-5 ${activeTab === 'orders' ? 'text-[var(--accent-red)]' : ''}`} />
            <span className="text-xs tracking-[0.15em] uppercase font-semibold mt-0.5">Pesanan</span>
          </button>
          <button 
            onClick={() => setActiveTab('inventory')} 
            className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-500 ease-out ${activeTab === 'inventory' ? 'bg-gradient-to-r from-[var(--accent-red)]/20 to-transparent text-white border-l-2 border-[var(--accent-red)] shadow-[inset_0_0_30px_rgba(255,0,60,0.05)]' : 'text-white/40 hover:bg-white/5 hover:text-white border-l-2 border-transparent'}`}
          >
            <Package className={`w-5 h-5 ${activeTab === 'inventory' ? 'text-[var(--accent-red)]' : ''}`} />
            <span className="text-xs tracking-[0.15em] uppercase font-semibold mt-0.5">Inventaris</span>
          </button>
        </nav>

        <div className="p-8 border-t border-white/5 flex items-center justify-between text-white/30 text-[10px] tracking-widest uppercase flex-shrink-0">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4" /> System
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-8 lg:p-12 z-10">
        
        <header className="mb-12 flex justify-between items-end">
          <div>
            <h2 className="font-[var(--font-orbitron)] text-4xl tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-white to-white/50">{activeTab === 'overview' ? 'Ringkasan' : activeTab === 'orders' ? 'Pesanan' : 'Inventaris'}</h2>
            <p className="text-white/40 mt-2 text-sm">Pantau dan kelola operasi Anda.</p>
          </div>
          <div className="text-white/50 font-mono text-sm px-4 py-2 bg-white/5 rounded-lg border border-white/5 backdrop-blur-md hidden md:block">
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })}
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="animate-in fade-in duration-700 slide-in-from-bottom-4">
            
            {/* Ultra Premium Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl backdrop-blur-xl hover:bg-white/[0.04] transition-colors relative overflow-hidden group flex flex-col items-center justify-center text-center">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-green-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">Total Pendapatan</p>
                </div>
                <p className="font-[var(--font-orbitron)] text-4xl text-white tracking-wider">${metrics.totalRevenue.toFixed(2)}</p>
              </div>

              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl backdrop-blur-xl hover:bg-white/[0.04] transition-colors relative overflow-hidden group flex flex-col items-center justify-center text-center">
                <div className="flex items-center gap-2 mb-4">
                  <ShoppingCart className="w-5 h-5 text-white/50 group-hover:text-white transition-colors" />
                  <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">Unit Terjual</p>
                </div>
                <p className="font-[var(--font-orbitron)] text-4xl text-white tracking-wider">{metrics.totalOrders}</p>
              </div>

              <div className="bg-white/[0.02] border border-[var(--accent-red)]/20 p-6 rounded-2xl backdrop-blur-xl hover:bg-[var(--accent-red)]/5 transition-colors relative overflow-hidden group shadow-[0_0_30px_rgba(255,0,60,0.05)] flex flex-col items-center justify-center text-center">
                <div className="flex items-center gap-2 mb-4 relative z-10">
                  <AlertTriangle className="w-5 h-5 text-[var(--accent-red)]" />
                  <p className="text-[var(--accent-red)]/70 text-[10px] uppercase tracking-[0.2em] font-bold">Peringatan Stok Tipis</p>
                </div>
                <p className="font-[var(--font-orbitron)] text-4xl text-[var(--accent-red)] tracking-wider relative z-10">{metrics.lowStockItems.length}</p>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[var(--accent-red)]/10 rounded-full blur-2xl group-hover:bg-[var(--accent-red)]/20 transition-all duration-500 pointer-events-none"></div>
              </div>

              <div className="bg-white/[0.02] border border-white/5 p-6 rounded-2xl backdrop-blur-xl hover:bg-white/[0.04] transition-colors relative overflow-hidden group flex flex-col items-center justify-center text-center">
                <div className="flex items-center gap-2 mb-4">
                  <Box className="w-5 h-5 text-white/30" />
                  <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] font-bold">Produk Belum Laku</p>
                </div>
                <p className="font-[var(--font-orbitron)] text-4xl text-white/30 tracking-wider">{metrics.unsoldProducts.length}</p>
              </div>
            </div>

            {/* List Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-xl flex flex-col h-[400px]">
                <div className="p-6 border-b border-white/5 flex items-center gap-3">
                  <TrendingUp className="w-4 h-4 text-orange-400" />
                  <h3 className="text-xs font-bold tracking-widest uppercase text-white">Produk Terlaris</h3>
                </div>
                <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-5">
                  {metrics.bestSellers.length === 0 ? <p className="text-sm text-white/30 text-center py-10">Tidak ada data.</p> : null}
                  {metrics.bestSellers.map((item, idx) => (
                    <div key={item.name} className="flex justify-between items-center group">
                      <div className="flex items-center gap-4">
                        <span className="text-xs font-mono text-white/20">{String(idx + 1).padStart(2, '0')}</span>
                        <p className="text-sm tracking-wide text-white/80 group-hover:text-white transition-colors">{item.name}</p>
                      </div>
                      <span className="text-[10px] font-mono bg-white/5 px-3 py-1 rounded-full text-white/70">{item.count} Terjual</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-b from-[var(--accent-red)]/5 to-transparent border border-red-500/10 rounded-2xl backdrop-blur-xl flex flex-col h-[400px]">
                <div className="p-6 border-b border-red-500/10 flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <h3 className="text-xs font-bold tracking-widest uppercase text-red-400">Butuh Restock</h3>
                </div>
                <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-5">
                  {metrics.lowStockItems.length === 0 ? <p className="text-sm text-white/30 text-center py-10">Inventaris sehat.</p> : null}
                  {metrics.lowStockItems.map(item => (
                    <div key={item.id} className="flex justify-between items-center pb-4 border-b border-white/5 last:border-0 last:pb-0">
                      <p className="text-sm tracking-wide text-white/80">{item.name}</p>
                      <span className="text-[10px] font-bold text-red-400 bg-red-400/10 px-3 py-1 rounded-full">{item.stock} Unit</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white/[0.01] border border-white/5 rounded-2xl backdrop-blur-xl flex flex-col h-[400px]">
                <div className="p-6 border-b border-white/5 flex items-center gap-3">
                  <Box className="w-4 h-4 text-white/30" />
                  <h3 className="text-xs font-bold tracking-widest uppercase text-white/40">Belum Laku</h3>
                </div>
                <div className="p-6 overflow-y-auto flex-1 flex flex-col gap-5">
                  {metrics.unsoldProducts.length === 0 ? <p className="text-sm text-white/30 text-center py-10">Sangat lancar.</p> : null}
                  {metrics.unsoldProducts.map(item => (
                    <div key={item.id} className="flex justify-between items-center">
                      <p className="text-sm tracking-wide text-white/40">{item.name}</p>
                      <span className="text-[9px] tracking-[0.2em] uppercase text-white/20">{item.category}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <section className="bg-white/[0.02] border border-white/5 rounded-2xl backdrop-blur-xl overflow-hidden flex flex-col max-h-[75vh] animate-in fade-in duration-700 slide-in-from-bottom-4 shadow-2xl">
            <div className="p-6 lg:p-8 border-b border-white/5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h3 className="font-bold tracking-widest uppercase text-sm flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-[var(--accent-red)]" /> Buku Transaksi
              </h3>
              <button onClick={handleExport} className="flex items-center gap-2 border border-white/10 px-6 py-3 rounded-lg hover:border-white/30 hover:bg-white/5 transition-all text-xs tracking-widest uppercase font-bold">
                <Download className="w-4 h-4" /> Ekspor CSV
              </button>
            </div>
            
            <div className="overflow-x-auto flex-1 custom-scrollbar">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead className="bg-white/[0.02] sticky top-0 z-10 backdrop-blur-md">
                  <tr className="text-white/40 text-[10px] tracking-[0.2em] uppercase">
                    <th className="p-6 font-bold border-b border-white/5">ID Pesanan</th>
                    <th className="p-6 font-bold border-b border-white/5">Tanggal</th>
                    <th className="p-6 font-bold border-b border-white/5">Pelanggan</th>
                    <th className="p-6 font-bold border-b border-white/5">Produk</th>
                    <th className="p-6 font-bold border-b border-white/5">Ukuran</th>
                    <th className="p-6 font-bold border-b border-white/5 text-right">Total</th>
                    <th className="p-6 font-bold border-b border-white/5">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr><td colSpan={7} className="p-12 text-center text-white/30 text-xs tracking-widest animate-pulse">Menyinkronkan Database...</td></tr>
                  ) : orders.map((o) => (
                    <tr key={o.id} className="border-b border-white/5 hover:bg-white/[0.03] transition-colors group">
                      <td className="p-6 font-mono text-xs text-white/40 group-hover:text-white transition-colors">{o.order_id_string}</td>
                      <td className="p-6 text-sm text-white/70">{new Date(o.created_at).toLocaleDateString()}</td>
                      <td className="p-6 text-sm font-bold text-white/90">{o.customer_name}</td>
                      <td className="p-6 text-sm text-white/70">{o.product_name}</td>
                      <td className="p-6 text-sm font-bold text-white/90">{o.size || '-'}</td>
                      <td className="p-6 font-mono text-sm text-right text-white/90">${o.total_price.toFixed(2)}</td>
                      <td className="p-6">
                        <span className={`inline-flex items-center justify-center px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full ${o.status === 'Paid' ? 'text-emerald-400 bg-emerald-400/10 border border-emerald-400/20' : 'text-amber-400 bg-amber-400/10 border border-amber-400/20'}`}>
                          {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === 'inventory' && (
          <div className="animate-in fade-in duration-700 slide-in-from-bottom-4 max-w-4xl">
            <section className="bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-xl p-10 lg:p-14 relative overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--accent-red)]/5 rounded-full blur-3xl pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-[var(--accent-red)]/10 rounded-xl">
                  <UploadCloud className="w-6 h-6 text-[var(--accent-red)]" />
                </div>
                <h3 className="font-[var(--font-orbitron)] tracking-widest text-2xl text-white">SINKRONISASI INVENTARIS MASSAL</h3>
              </div>
              
              <p className="text-white/40 text-sm mb-12 leading-relaxed max-w-2xl">
                Unggah database master Anda (.xlsx) bersama dengan arsip aset resolusi tinggi (.zip). 
                Sistem akan secara otomatis melakukan kompresi dan menyinkronkan katalog.
              </p>
              
              <form onSubmit={handleBulkImport} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end relative z-10">
                <div className="group">
                  <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-3 group-hover:text-white transition-colors">Database (.xlsx)</label>
                  <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 hover:border-[var(--accent-red)]/50 hover:bg-[var(--accent-red)]/5 transition-all bg-black/20 cursor-pointer relative overflow-hidden text-center">
                    <input required type="file" name="excel" accept=".xlsx" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className="text-white/30 text-xs font-mono">Drag & Drop or Click</div>
                  </div>
                </div>

                <div className="group">
                  <label className="block text-[10px] font-bold tracking-[0.2em] uppercase text-white/50 mb-3 group-hover:text-white transition-colors">Assets Archive (.zip)</label>
                  <div className="border-2 border-dashed border-white/10 rounded-2xl p-6 hover:border-[var(--accent-red)]/50 hover:bg-[var(--accent-red)]/5 transition-all bg-black/20 cursor-pointer relative overflow-hidden text-center">
                    <input required type="file" name="zip" accept=".zip" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    <div className="text-white/30 text-xs font-mono">Drag & Drop or Click</div>
                  </div>
                </div>

                <div className="md:col-span-2 mt-6 pt-10 border-t border-white/5 flex justify-end">
                  <button type="submit" disabled={uploading} className="bg-white text-black hover:bg-gray-200 py-4 px-12 rounded-xl font-bold shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all">
                    <span className="font-[var(--font-orbitron)] tracking-widest">{uploading ? 'MEMPROSES...' : 'MULAI SINKRONISASI'}</span>
                  </button>
                </div>
              </form>
            </section>
          </div>
        )}

      </main>
    </div>
  );
}
