'use client';

import { useRef } from 'react';
import type Resume from '@/lib/resume';
import { useEffect, useState } from 'react';
import { resumeFromJSONResume } from '@/lib/resume';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import { DEFAULT_RESUME } from '@/lib/resumeUtils';
import OpenResumeNewTab from './OpenResumeNewTab';
import ResumeContext from './ResumeContext';
import ResumeHiddenInput from './ResumeHiddenInput';
import DownloadResume from './DownloadResume';
import ResumePreview from './ResumePreview';
import ConfigureJobTitle from './ConfigureJobTitle';
import ToggleList from './ToggleListNew';
import type JSONResume from '@/lib/jsonResume';
import SaveConfig from './SaveConfig';
import SelectConfiguration from './SelectConfiguration';
import type { User } from '@supabase/supabase-js';

interface ResumeConfigProps {
    initResume: JSONResume | undefined;
    user: User | null;
}

export default function ResumeConfig(props: ResumeConfigProps) {
    const [isClient, setIsClient] = useState(false);
    const [resume, setResume] = useState<Resume | null>(null);
    const [storedResume] = useLocalStorage('saved-resume', DEFAULT_RESUME);
    const initResume = props.initResume ?? storedResume;

    const formRef = useRef<HTMLFormElement>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Ensure configuredResume is set only on the client
    useEffect(() => {
        if (initResume) {
            setResume(resumeFromJSONResume(initResume));
        }
    }, [initResume]);

    useEffect(() => {
        if (isClient && formRef.current) formRef.current.requestSubmit();
    }, [isClient]);

    if (!resume || !isClient) {
        return <span className='loading loading-spinner w-1/4 mx-auto' />;
    }

    return (
        <ResumeContext.Provider value={{ resume, setResume }}>
            <div className='w-full flex flex-col lg:flex-row gap-y-8'>
                <ResumeHiddenInput />
                <div className='flex-1'>
                    <div className='flex'>
                        <OpenResumeNewTab />
                        <SaveConfig user={props.user} />
                    </div>
                    <ConfigureJobTitle />
                    <SelectConfiguration user={props.user} />
                    <ToggleList />
                </div>
                <form
                    className='flex-4'
                    method='POST'
                    target='resume-preview'
                    action={'/api/pdf'}
                    id='resume-config-form'
                    ref={formRef}
                >
                    <ResumeHiddenInput />
                    <div className='flex flex-col md:flex-row'>
                        <button
                            className='btn btn-primary md:ml-12 mb-4 w-full md:w-24'
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
                </form>
            </div>
        </ResumeContext.Provider>
    );
}
