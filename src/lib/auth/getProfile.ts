'use server';

import { createClient } from "../supabase/server";
import type { UserProfile } from "../types";

export default async function useProfile(): Promise<UserProfile | null>{

    const supabase = await createClient();
    const userResp = await supabase.auth.getUser();
    if(!userResp || !userResp.data.user){
        console.log('No user');
        return null;
    }
    const profilesReq = await supabase.from('userprofile').select('*').eq('user_id',userResp.data.user.id);
    if(profilesReq.error){
        console.error(profilesReq.error);
        return null;
    }
    const profiles = profilesReq.data;
    if(profiles.length === 0){
        console.log('No profiles');
        return null;
    }
    if(profiles.length === 2){
        console.log('Too many profiles');
        return null;
    };
    const profile = profiles[0];
    return profile;
}