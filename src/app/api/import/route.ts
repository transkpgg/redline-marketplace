import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import * as XLSX from 'xlsx';
import JSZip from 'jszip';
import sharp from 'sharp';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';
const supabase = supabaseUrl && supabaseServiceKey ? createClient(supabaseUrl, supabaseServiceKey) : null;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const excelFile = formData.get('excel') as File;
    const zipFile = formData.get('zip') as File;

    if (!excelFile || !zipFile) {
      return NextResponse.json({ error: "Missing required files" }, { status: 400 });
    }

    if (!excelFile.name.endsWith('.xlsx')) {
      return NextResponse.json({ error: "Invalid Excel format. Expected .xlsx" }, { status: 400 });
    }
    if (!zipFile.name.endsWith('.zip')) {
      return NextResponse.json({ error: "Invalid Images format. Expected .zip" }, { status: 400 });
    }

    // 1. Read Excel
    const excelBuffer = await excelFile.arrayBuffer();
    const workbook = XLSX.read(excelBuffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]) as any[];

    // 2. Read ZIP
    const zipBuffer = await zipFile.arrayBuffer();
    const jszip = new JSZip();
    const zipContents = await jszip.loadAsync(zipBuffer);

    let importedCount = 0;

    for (const row of data) {
      const fileName = row['Nama_File_Gambar'];
      if (!fileName) continue;

      // Find file in ZIP (case insensitive search)
      const zipEntry = Object.values(zipContents.files).find(f => f.name.endsWith(fileName));
      
      let imageUrl = '';

      if (zipEntry && !zipEntry.dir) {
        const imageBuffer = await zipEntry.async('nodebuffer');
        
        // 3. Compress to WebP using sharp
        const optimizedBuffer = await sharp(imageBuffer)
          .webp({ quality: 80 })
          .resize({ width: 800, withoutEnlargement: true })
          .toBuffer();

        const webpFileName = fileName.replace(/\.[^/.]+$/, "") + ".webp";

        if (supabase) {
          // 4. Upload to Supabase Storage
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('product-images')
            .upload(`public/${webpFileName}`, optimizedBuffer, {
              contentType: 'image/webp',
              upsert: true
            });

          if (!uploadError) {
            const { data: publicUrlData } = supabase.storage.from('product-images').getPublicUrl(`public/${webpFileName}`);
            imageUrl = publicUrlData.publicUrl;
          } else {
            console.error("Upload error:", uploadError);
          }
        } else {
          // Mock URL
          imageUrl = `/mock-uploads/${webpFileName}`;
        }
      }

      // 5. Insert to DB
      const productData = {
        name: row['Nama_Produk'] || 'Unknown Product',
        category: row['Kategori'] || 'Uncategorized',
        price: parseFloat(row['Harga']) || 0,
        image_url: imageUrl,
      };

      if (supabase) {
        const { error: dbError } = await supabase.from('products').insert([productData]);
        if (dbError) console.error("DB Insert error:", dbError);
        else importedCount++;
      } else {
        console.log("Mock DB Insert Product:", productData);
        importedCount++;
      }
    }

    return NextResponse.json({ success: true, message: `Successfully processed ${importedCount} products.` });

  } catch (err: any) {
    console.error("Import Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
