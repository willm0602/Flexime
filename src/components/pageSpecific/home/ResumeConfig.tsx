'use client';

import type Resume from '@/lib/resume';
import { useEffect, useState } from 'react';
import { resumeFromJSONResume } from '@/lib/resume';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import useLocalStorage from '@/lib/useLocalStorage';
import { DEFAULT_RESUME } from '@/lib/resumeUtils';
import OpenResumeNewTab from './OpenResumeNewTab';
import ResumeContext from './ResumeContext';
import ResumeHiddenInput from './ResumeHiddenInput';
import EditResumeLink from './EditResumeLink';
import DownloadResume from './DownloadResume';
import ResumePreview from './ResumePreview';
import ConfigureJobTitle from './ConfigureJobTitle';
import ToggleList from './ToggleList';

export default function ResumeConfig() {
    const [isClient, setIsClient] = useState(false);
    const [resume, setResume] = useState<Resume | null>(null);
    const [initResume] = useLocalStorage('saved-resume', DEFAULT_RESUME);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Ensure configuredResume is set only on the client
    useEffect(() => {
        if (initResume) {
            setResume(resumeFromJSONResume(initResume));
        }
    }, [initResume]);

    if (!resume || !isClient) {
        return <span className='loading loading-spinner w-1/4 mx-auto' />;
    }

    return (
        <ResumeContext.Provider value={{ resume, setResume }}>
            <form
                className='w-full flex flex-col lg:flex-row'
                method='POST'
                target='resume-preview'
                action={'/api/pdf'}
                id='resume-config-form'
            >
                <ResumeHiddenInput />
                <div className='flex-4'>
                    <div className='flex'>
                        <OpenResumeNewTab />
                        <EditResumeLink />
                    </div>
                    <ConfigureJobTitle />
                    <ToggleList />
                </div>
                <div className='flex-1'>
                    <div className='flex'>
                        <button
                            className='btn btn-primary ml-12 mb-4'
                            type='submit'
                        >
                            <ArrowPathIcon
                                width={24}
                                height={24}
                                title='Preview Resume'
                            />
                        </button>

                        <DownloadResume />
                    </div>
                    <ResumePreview />
                </div>
            </form>
        </ResumeContext.Provider>
    );
}
