"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import * as XLSX from 'xlsx';

export default function AdminDashboard() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function fetchOrders() {
      if (supabase) {
        const { data } = await supabase.from('orders').select('*').order('created_at', { ascending: false });
        if (data) setOrders(data);
      } else {
        // Mock data
        setOrders([
          { id: 1, order_id_string: '#ORD2026-1023', created_at: new Date().toISOString(), customer_name: 'John Doe', whatsapp: '+628123456789', product_name: 'NEON DRIFT TEE', total_price: 45, address: 'Jakarta', status: 'Pending' }
        ]);
      }
      setLoading(false);
    }
    fetchOrders();
  }, []);

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(orders.map((o, i) => ({
      'No': i + 1,
      'ID Order': o.order_id_string,
      'Tanggal': new Date(o.created_at).toLocaleString(),
      'Nama Pelanggan': o.customer_name,
      'No. WhatsApp': o.whatsapp,
      'Detail Produk': o.product_name,
      'Total Harga': o.total_price,
      'Alamat Pengiriman': o.address,
      'Status Order': o.status
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
      const res = await fetch('/api/import', {
        method: 'POST',
        body: formData,
      });
      
      const result = await res.json();
      if (res.ok) {
        alert("Import successful! " + result.message);
      } else {
        alert("Import failed: " + result.error);
      }
    } catch (err) {
      alert("Network error during import.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="pt-32 px-8 md:px-16 pb-24 font-sans min-h-screen">
      <h1 className="font-[var(--font-orbitron)] text-3xl tracking-widest text-[var(--accent-red)] mb-8">COMMAND CENTER</h1>
      
      {/* Bulk Import Section */}
      <section className="mb-16 border border-white/20 p-8 bg-[#111]">
        <h2 className="font-[var(--font-orbitron)] text-xl mb-4">BULK PRODUCT IMPORT</h2>
        <p className="text-[var(--text-secondary)] mb-6 text-sm">Upload Excel template (.xlsx) alongside the images zip file (.zip).</p>
        
        <form onSubmit={handleBulkImport} className="flex flex-col md:flex-row gap-6 items-end">
          <div className="flex-grow">
            <label className="block text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">Excel Data (.xlsx)</label>
            <input required type="file" name="excel" accept=".xlsx" className="w-full bg-transparent border border-white/20 p-3 text-white" />
          </div>
          <div className="flex-grow">
            <label className="block text-xs uppercase tracking-wider text-[var(--text-secondary)] mb-2">Images Archive (.zip)</label>
            <input required type="file" name="zip" accept=".zip" className="w-full bg-transparent border border-white/20 p-3 text-white" />
          </div>
          <button type="submit" disabled={uploading} className="cta-button py-3 px-8 font-bold">
            <span className="relative z-10">{uploading ? 'UPLOADING...' : 'INITIATE IMPORT'}</span>
          </button>
        </form>
      </section>

      {/* Orders Section */}
      <section>
        <div className="flex justify-between items-center mb-6">
          <h2 className="font-[var(--font-orbitron)] text-xl">RECENT TRANSACTIONS</h2>
          <button onClick={handleExport} className="border border-[var(--accent-red)] text-[var(--accent-red)] px-4 py-2 hover:bg-[var(--accent-red)] hover:text-white transition-colors text-sm tracking-wider">
            EXPORT TO EXCEL
          </button>
        </div>

        <div className="overflow-x-auto border border-white/20">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/20 text-[var(--text-secondary)] text-sm tracking-wider uppercase">
                <th className="p-4">Order ID</th>
                <th className="p-4">Date</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Product</th>
                <th className="p-4">Total</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="p-4 text-center">Loading data...</td></tr>
              ) : orders.map((o) => (
                <tr key={o.id} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-mono text-[var(--accent-red)]">{o.order_id_string}</td>
                  <td className="p-4 text-sm">{new Date(o.created_at).toLocaleDateString()}</td>
                  <td className="p-4">{o.customer_name}</td>
                  <td className="p-4">{o.product_name}</td>
                  <td className="p-4">${o.total_price.toFixed(2)}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 text-xs border border-white/20 rounded-sm uppercase tracking-wider">{o.status}</span>
                  </td>
                </tr>
              ))}
              {!loading && orders.length === 0 && (
                <tr><td colSpan={6} className="p-4 text-center text-[var(--text-secondary)]">No transactions found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
