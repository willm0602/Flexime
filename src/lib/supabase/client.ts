import { createBrowserClient } from '@supabase/ssr';

export default function createClient() {
  createBrowserClient(
    process.env.SUPABASE_URL || '',
    process.env.SUPABASE_PUBLIC || '',
  );
}
