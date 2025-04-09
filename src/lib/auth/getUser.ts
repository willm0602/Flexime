'use server';

import type { User } from '@supabase/supabase-js';
import { createClient } from '../supabase/server';

export default async function getUser(): Promise<User | null> {
    const supabase = await createClient();
    if (!supabase) return null;
    const userResp = await supabase.auth.getUser();
    return userResp.data?.user || null;
}
