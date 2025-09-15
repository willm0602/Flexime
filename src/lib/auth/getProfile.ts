'use server';

import { createClient } from '../supabase/server';
import type { UserProfile } from '@/lib/types/userprofile';
import getUser from './getUser';

export default async function useProfile(): Promise<UserProfile | null> {
    const supabase = await createClient();
    if (!supabase) {
        return null;
    }
    const user = await getUser();
    if (!user) {
        return null;
    }
    const profilesReq = await supabase
        .from('userprofile')
        .select('*')
        .eq('user_id', user.id);
    if (profilesReq.error) {
        console.error(profilesReq.error);
        return null;
    }
    const profiles = profilesReq.data;
    if (profiles.length === 0) {
        console.error('No profiles');
        return null;
    }
    if (profiles.length === 2) {
        console.error('Too many profiles');
        return null;
    }
    const profile = profiles[0];
    return profile;
}
