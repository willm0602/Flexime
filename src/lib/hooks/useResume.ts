// useResume.ts
import { useEffect, useState } from 'react';
import type Resume from '@/lib/jsonResume';
import useLocalStorage from '../hooks/useLocalStorage';
import getProfile from '@/lib/auth/getProfile';
import setResumeForUser from '@/lib/auth/setResumeForUser';
import { DEFAULT_RESUME } from '@/lib/resumeUtils';

const LS_KEY = 'saved-resume';

export default function useResume(): [
    Resume | undefined,
    (resume: Resume) => void,
] {
    const [resume, setResume] = useLocalStorage<Resume>(LS_KEY, DEFAULT_RESUME);

    useEffect(() => {
        getProfile().then((prof) => {
            if (prof?.resume) {
                setResume(prof.resume);
            }
        });
    }, [setResume]);

    const save = (newResume: Resume) => {
        setResume(newResume);
        getProfile().then((prof) => {
            if (prof) setResumeForUser(newResume, prof);
        });
    };

    return [resume, save];
}
