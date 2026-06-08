import { NextResponse } from 'next/server';
import { readDB } from '@/lib/db';
import { supabase } from '@/lib/supabase';

export async function GET() {
  try {
    if (supabase) {
      const [ordersRes, productsRes] = await Promise.all([
        supabase.from('orders').select('*').order('created_at', { ascending: false }),
        supabase.from('products').select('*')
      ]);
      const db = readDB();
      return NextResponse.json({
        products: productsRes.data && productsRes.data.length > 0 ? productsRes.data : db.products,
        orders: ordersRes.data || []
      });
    }

    // Fallback to local JSON DB if Supabase is not configured
    const db = readDB();
    return NextResponse.json(db);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
