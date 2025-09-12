// useResume.ts
import { useEffect, useState } from 'react';
import type Resume from '@/lib/jsonResume';
import useLocalStorage from '../hooks/useLocalStorage';
import getProfile from '@/lib/auth/getProfile';
import setResumeForUser from '@/lib/auth/setResumeForUser';
import { DEFAULT_RESUME } from '@/lib/resumeUtils';
import { UserProfile } from '../types/userprofile';

const LS_KEY = 'saved-resume';

export default function useResume(): [
    Resume | undefined,
    (resume: Resume) => void,
] {
    const [resumeInLS, setResumeInLS] = useLocalStorage<Resume>(
        LS_KEY,
        DEFAULT_RESUME,
    );
    const [resume, setResume] = useState<Resume>();
    const [profile, setProfile] = useState<UserProfile | undefined>();

    useEffect(() => {
        getProfile().then((prof) => {
            if (!prof) {
                setResume(resumeInLS);
                return;
            }
            setProfile(prof);
            if (prof.resume) {
                setResume(prof.resume);
            } else {
                setResume(prof.resume);
            }
        });
    }, [resumeInLS]);

    const save = (newResume: Resume) => {
        setResume(newResume);
        console.log('PROFILE IS', profile);
        if (profile) {
            setResumeForUser(newResume, profile).catch((err) => {
                console.error(err);
            });
        } else {
            setResumeInLS(newResume);
        }
    };

    return [resume, save];
}
