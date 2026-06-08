import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { readDB, writeDB, LocalOrder } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const supabase = (isValidUrl(supabaseUrl) && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Generate order ID
    const dateStr = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const order_id_string = `#ORD${dateStr}-${randomNum}`;

    const orderData = {
      order_id_string,
      customer_name: body.customer_name,
      whatsapp: body.whatsapp,
      address: body.address,
      product_name: body.product_name,
      product_id: body.product_id,
      size: body.size,
      total_price: body.price,
      payment_method: body.payment_method,
      status: 'Pending'
    };

    if (supabase) {
      const { error } = await supabase.from('orders').insert([orderData]);
      if (error) {
        console.error("Supabase error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      
      // Attempt to decrement stock
      if (body.product_id) {
        const { data: prodData } = await supabase.from('products').select('stock').eq('id', body.product_id).maybeSingle();
        if (prodData && prodData.stock > 0) {
          await supabase.from('products').update({ stock: prodData.stock - 1 }).eq('id', body.product_id);
        }
      }
    } else {
      // ----------------------------------------------------
      // LOCAL JSON DB LOGIC
      // ----------------------------------------------------
      const db = readDB();
      
      const newOrder: LocalOrder = {
        id: uuidv4(),
        ...orderData,
        created_at: new Date().toISOString()
      };
      
      db.orders.push(newOrder);
      
      // Decrement stock in local DB
      const productIndex = db.products.findIndex(p => p.id === body.product_id);
      if (productIndex !== -1 && db.products[productIndex].stock > 0) {
        db.products[productIndex].stock -= 1;
      }
      
      writeDB(db);
    }

    // Trigger Google Sheets Webhook asynchronously
    fetch(new URL('/api/webhook/google-sheets', req.url).toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    }).catch(err => console.error("Webhook trigger failed", err));

    return NextResponse.json({ success: true, order_id: order_id_string });

  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
