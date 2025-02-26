import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseURL = process.env.SUPABASE_PUBLIC;
const supabaseSECRET = process.env.SUPABASE_URL;

export default function getSupabaseConn(): SupabaseClient | null {
  if (!supabaseURL) {
    console.error('No supabase URL found in env');
    return null;
  }
  if (!supabaseSECRET) {
    console.error('No supabase secret found in env');
    return null;
  }
  const supabase = createClient(supabaseURL, supabaseSECRET);
  return supabase;
}

