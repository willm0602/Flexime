'use client';

import type Resume from '@/lib/resume';
import Templates, { TemplateNames } from '@/lib/templates';
import ToggleField from './ToggleField';
import type Togglable from '@/lib/togglable';
import { isTogglable } from '@/lib/togglable';
import { type MouseEventHandler, useEffect, useState } from 'react';
import { jsonResumeFromResume, resumeFromJSONResume } from '@/lib/resume';
import {
    ArrowDownTrayIcon,
    ArrowPathIcon,
    PencilSquareIcon,
} from '@heroicons/react/24/solid';
import useLocalStorage from '@/lib/useLocalStorage';
import { DEFAULT_RESUME } from '@/lib/resumeUtils';
import OpenResumeNewTab from './OpenResumeNewTab';
import ResumeContext from './ResumeContext';
import ResumeHiddenInput from './ResumeHiddenInput';
import EditResumeLink from './EditResumeLink';
import DownloadResume from './DownloadResume';
import ResumePreview from './ResumePreview';
import ConfigureJobTitle from './ConfigureJobTitle';

export default function ResumeConfig() {
    const [isClient, setIsClient] = useState(false);
    const [resume, setResume] = useState<Resume | null>(
        null,
    );
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

    if(!resume || !isClient){
        return <span className='loading loading-spinner w-1/4 mx-auto' />
    }

    return (
        <ResumeContext.Provider value={{resume, setResume}}>
            <form 
                className='w-full flex flex-col lg:flex-row'
                method='POST'
                target='resume-preview'
                action={'/api/pdf'}
                id='resume-config-form'
            >
                <ResumeHiddenInput/>
                <div className='flex-4'>
                    <div className='flex'>
                        <OpenResumeNewTab/>
                        <EditResumeLink />
                    </div>
                    <ConfigureJobTitle/>
                    <ul className='pl-0 overflow-scroll max-h-[70vh]'>
                        {Object.entries(resume).map(([key, val]) => {
                            if (!isTogglable(val)) return;

                            if (
                                !(
                                    val.val ||
                                    (val.children && val.children.length > 0)
                                )
                            )
                                return;

                            return (
                                <li
                                    key={`toggle-field-${key}`}
                                    className='list-none'
                                >
                                    <ToggleField
                                        fieldName={key as keyof Resume}
                                        // @ts-expect-error type needs to be generic
                                        togglable={
                                            val as Resume[keyof Resume] &
                                                Togglable<unknown>
                                        }
                                        parent={resume}
                                        setParent={setResume}
                                    />
                                </li>
                            );
                        })}
                    </ul>
                </div>
                <div className='flex-1'>
                    <div className='flex'>
                        <button className='btn btn-primary ml-12 mb-4' type="submit">
                            <ArrowPathIcon
                                width={24}
                                height={24}
                                title='Preview Resume'
                            />
                        </button>

                        <DownloadResume/>
                    </div>
                    <ResumePreview/>
                </div>
            </form>
        </ResumeContext.Provider>
    );
}
