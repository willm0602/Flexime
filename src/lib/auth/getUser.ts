'use server';

import type{ User } from "@supabase/supabase-js";
import { createClient } from "../supabase/server";

export default async function useProfile(): Promise<User | null>{
    const supabase = await createClient();
    const userResp = await supabase.auth.getUser();
    return userResp.data?.user || null;
}