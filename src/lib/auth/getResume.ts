'use server';

import type Resume from '@/lib/jsonResume';
import useProfile from '@/lib/auth/getProfile';

export default async function getResume(): Promise<Resume | undefined> {
    try{

        const profile = await useProfile();
        if (!profile) {
            return undefined;
        }
        const resume = profile.resume;
        if (!resume) {
            return undefined;
        }
        return resume;
    } catch {
        return undefined;
    }
}
