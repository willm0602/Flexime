'use server';

import type Resume from '@/lib/jsonResume';
import type { UserProfile } from '../types/userprofile';
import getProfile from '@/lib/auth/getProfile';

export default async function getResume(profile: UserProfile | null = null): Promise<Resume | undefined> {
    const resolvedProfile = profile ?? await getProfile();
    if (!resolvedProfile) {
        return undefined;
    }
    const resume = resolvedProfile.resume;
    if (!resume) {
        return undefined;
    }
    return resume;
}
