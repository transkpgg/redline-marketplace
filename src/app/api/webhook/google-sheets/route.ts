import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const orderData = await req.json();
    
    // TODO: Google Sheets Integration
    // To be implemented when Google Service Account JSON is provided.
    // Flow:
    // 1. Authenticate with googleapis using JWT
    // 2. Append row to the spreadsheet ID with orderData
    
    console.log("Webhook triggered. Preparing to sync with Google Sheets (Pending Credentials):", orderData.order_id_string);

    return NextResponse.json({ success: true, message: "Webhook received, sync pending configuration." });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
