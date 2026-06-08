# Redline Apparel Marketplace

A Next.js full-stack marketplace platform built for high-contrast streetwear.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up Supabase:
   - Create a new project on [Supabase](https://supabase.com).
   - Go to the SQL Editor and run the queries inside `database.sql`.
   - Copy your Project URL and Anon Key / Service Role Key into `.env.local`.

3. Run the development server:
   ```bash
   npm run dev
   ```

## Architecture
- **Frontend**: Next.js App Router, Tailwind CSS (v4), Vanilla CSS mixed aesthetics.
- **Backend**: Next.js API Routes (`/api/checkout`, `/api/import`).
- **Database & Storage**: Supabase (PostgreSQL & S3-compatible storage).
- **Integrations**: Google Sheets Webhook endpoint.
