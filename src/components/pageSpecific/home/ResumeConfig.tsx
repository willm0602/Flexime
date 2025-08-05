'use client';

import { useRef } from 'react';
import { useEffect, useState } from 'react';
import { resumeFromJSONResume } from '@/lib/resume';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import OpenResumeNewTab from './OpenResumeNewTab';
import ResumeContext from './ResumeContext';
import ResumeHiddenInput from './ResumeHiddenInput';
import DownloadResume from './DownloadResume';
import ResumePreview from './ResumePreview';
import ConfigureJobTitle from './ConfigureJobTitle';
import ToggleList from './ToggleListNew';
import SaveConfig from './SaveConfig';
import SelectConfiguration from './SelectConfiguration';
import type { User } from '@supabase/supabase-js';
import useResume from '@/lib/hooks/useResume';
import getUser from '@/lib/auth/getUser';

export default function ResumeConfig() {
    const [initResume] = useResume();
    const [resume, setResume] = useState(resumeFromJSONResume());
    const [user, setUser] = useState<User | null>(null);

    const formRef = useRef<HTMLFormElement>(null);
    useEffect(() => {
        if (initResume) {
            setResume(resumeFromJSONResume(initResume));
        }
    }, [initResume]);

    useEffect(() => {
        getUser().then((user) => {
            setUser(user);
        });
    }, []);

    if (!resume) {
        return <span className='loading loading-spinner w-1/4 mx-auto' />;
    }

    return (
        <ResumeContext.Provider value={{ resume, setResume }}>
            <div className='w-full flex flex-col lg:flex-row gap-y-8'>
                <ResumeHiddenInput />
                <div className='flex-1'>
                    <div className='flex'>
                        <OpenResumeNewTab />
                        <SaveConfig user={user} />
                    </div>
                    <ConfigureJobTitle />
                    <SelectConfiguration user={user} />
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
