'use client';

import { useEffect, useState } from 'react';
import type Resume from '@/lib/resume';
import { resumeFromJSONResume } from '@/lib/resume';
import { DEFAULT_RESUME } from '@/lib/resumeUtils';
import ResumeConfig from '@/components/ResumeConfig';
import useLocalStorage from '@/lib/useLocalStorage';

const LOCAL_STORAGE_KEY = 'saved-resume';

export default function Home() {
    const [isClient, setIsClient] = useState(false);
    const [configuredResume, setConfiguredResume] = useState<Resume | null>(
        null,
    );
    const [initResume] = useLocalStorage(LOCAL_STORAGE_KEY, DEFAULT_RESUME);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Ensure configuredResume is set only on the client
    useEffect(() => {
        if (initResume) {
            setConfiguredResume(resumeFromJSONResume(initResume));
        }
    }, [initResume]);

    return (
        <div
            className='font-[family-name:var(--font-geist-sans)] w-full md:w-4/5 mx-auto px-12 py-12'
            suppressHydrationWarning
        >
            {!isClient || !initResume || !configuredResume ? (
                <div className='flex'>
                    <span className='loading loading-spinner w-1/4 mx-auto' />
                </div>
            ) : (
                <>
                    <div className='flex'>
                        <h1>Flexime</h1>
                    </div>
                    <ResumeConfig
                        resume={configuredResume}
                        baseResume={initResume}
                        setResume={setConfiguredResume}
                    />
                </>
            )}
        </div>
    );
}
