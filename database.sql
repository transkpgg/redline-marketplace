-- Redline Marketplace Supabase Schema
-- Run this script in the Supabase SQL Editor to set up the database.

-- 1. Create the Products Table
CREATE TABLE IF NOT EXISTS public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT DEFAULT 'Uncategorized',
    price NUMERIC NOT NULL DEFAULT 0.00,
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create the Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id_string TEXT NOT NULL UNIQUE,
    customer_name TEXT NOT NULL,
    whatsapp TEXT NOT NULL,
    address TEXT NOT NULL,
    product_id UUID,
    product_name TEXT NOT NULL,
    total_price NUMERIC NOT NULL,
    payment_method TEXT NOT NULL,
    status TEXT DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Set up Row Level Security (RLS)

-- Products: Everyone can read, only authenticated admins can write (if using service role, it bypasses RLS)
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public profiles are viewable by everyone." ON public.products FOR SELECT USING (true);

-- Orders: Authenticated users/service role can insert, admins can read
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
-- (Service role key bypasses RLS automatically, so no strict insert policy is needed for the webhook backend)

-- 4. Set up Storage Bucket for Images
-- Make sure to create a public bucket named "product-images" in the Storage UI
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policy: allow public reads
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'product-images' );
