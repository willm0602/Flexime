'use server';

import type Resume from '@/lib/jsonResume';
import useProfile from '@/lib/auth/getProfile';
import useLocalStorage from '../hooks/useLocalStorage';

export default async function getResume(): Promise<Resume | undefined> {
    const [resumeInLS] = useLocalStorage<Resume | undefined>(
        'saved-resume',
        undefined,
    );
    try {
        const profile = await useProfile();
        if (profile?.resume) return profile.resume;
        return resumeInLS;
    } catch {
        return undefined;
    }
}
