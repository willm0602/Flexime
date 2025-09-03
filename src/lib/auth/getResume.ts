'use server';

import type Resume from '@/lib/jsonResume';
import useProfile from '@/lib/auth/getProfile';
import useLocalStorage from '../hooks/useLocalStorage';

export default async function getResume(): Promise<Resume | undefined> {
    let resumeInLS: Resume | undefined;
    if (typeof window !== 'undefined') {
        const resumeInLSUnparsed = window.localStorage.getItem('saved-resume');
        try {
            resumeInLS = resumeInLSUnparsed
                ? JSON.parse(resumeInLSUnparsed)
                : undefined;
        } catch (err) {
            console.error('Failed to parse resume from localStorage', err);
        }
    }

    try {
        const profile = await useProfile();
        if (profile?.resume) return profile.resume;
        return resumeInLS;
    } catch {
        return undefined;
    }
}
