import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const resume = await request.json();
    const supabase = await createClient();
    if (!supabase) return NextResponse.json({}, { status: 500 });
    const userResp = await supabase.auth.getUser();
    if (!userResp || !userResp.data.user) {
        console.log('No user');
        return NextResponse.json({
            status: 401,
        });
    }
    const profilesReq = await supabase
        .from('userprofile')
        .select('*')
        .eq('user_id', userResp.data.user.id);
    if (profilesReq.error) {
        console.error(profilesReq.error);
        return NextResponse.json(
            {},
            {
                status: 500,
            },
        );
    }
    const profiles = profilesReq.data;
    if (profiles.length === 0) {
        console.log('No profiles');
        return NextResponse.json({}, { status: 401 });
    }
    if (profiles.length === 2) {
        return NextResponse.json({}, { status: 500 });
    }
    const profile = profiles[0];
    const { error } = await supabase
        .from('userprofile')
        .update({
            resume: resume,
        })
        .eq('id', profile.id);
    if (error) {
        console.error(error);
        return NextResponse.json({}, { status: 500 });
    }
    console.log(userResp.data.user.id);
    console.log(resume);
    return NextResponse.json({
        status: 200,
        message: 'Resume updated',
    });
}
