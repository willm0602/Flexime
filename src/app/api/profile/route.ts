/**
 * DEPRECATED
 * profiles should be obtained using getClient instead
 */
import getUser from '@/lib/auth/getUser';
import { createClient } from '@/lib/supabase/server';
import type { UserProfile } from '@/lib/types/userprofile';
import { NextResponse } from 'next/server';

export async function GET() {
    const supabase = await createClient();
    if (!supabase) return NextResponse.json({}, { status: 500 });
    const user = await getUser();
    if (!user) {
        return NextResponse.json({
            status: 401,
        });
    }
    const profilesReq = await supabase
        .from('userprofile')
        .select('*')
        .eq('user_id', user.id);
    if (profilesReq.error) {
        console.error(profilesReq.error);
        return NextResponse.json(
            {},
            {
                status: 500,
            },
        );
    }
    const profiles: UserProfile[] = profilesReq.data;
    if (profiles.length === 0) {
        console.error('No profiles');
        return NextResponse.json({}, { status: 401 });
    }
    if (profiles.length === 2) {
        return NextResponse.json({}, { status: 500 });
    }
    const profile = profiles[0];
    return NextResponse.json({ profile }, { status: 200 });
}
