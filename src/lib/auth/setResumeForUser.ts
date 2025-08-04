import type Resume from '../jsonResume';
import { createClient } from '../supabase/client';
import type { UserProfile } from '../types/userprofile';

export default async function setResumeForUser(
    resume: Resume,
    user: UserProfile,
) {
    const supabase = createClient();
    if (!supabase) {
        console.error(
            `Attempting to set resume for user ${user.id}, but unable to connect to supabase`,
        );
        return;
    }
    supabase.from('userprofile').update({ resume: resume }).eq('id', user.id);
}
