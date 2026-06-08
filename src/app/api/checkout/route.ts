import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

// Mock Supabase client if keys are not present
const supabase = supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null;

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
    } else {
      console.log("Mock DB Insert:", orderData);
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
