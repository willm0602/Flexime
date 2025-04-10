'use client';

import type JSONResume from '@/lib/jsonResume';
import type Resume from "@/lib/resume";
import { useEffect, useRef, useState } from "react";
import { resumeFromJSONResume } from "@/lib/resume";
import { ArrowPathIcon } from "@heroicons/react/24/solid";
import useLocalStorage from "@/lib/hooks/useLocalStorage";
import { DEFAULT_RESUME } from "@/lib/resumeUtils";
import OpenResumeNewTab from "./OpenResumeNewTab";
import ResumeContext from "./ResumeContext";
import ResumeHiddenInput from "./ResumeHiddenInput";
import EditResumeLink from "./EditResumeLink";
import DownloadResume from "./DownloadResume";
import ResumePreview from "./ResumePreview";
import ConfigureJobTitle from "./ConfigureJobTitle";
import ToggleList from "./ToggleList";
import AITaylorTrigger from './AITaylorTrigger';
import AITaylorResumeModal from './AITaylorResumeModal';


interface ResumeConfigProps {
    initResume: JSONResume | undefined;
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
            <AITaylorResumeModal />
            <form
                className='w-full flex flex-col lg:flex-row'
                method='POST'
                target='resume-preview'
                action={'/api/pdf'}
                id='resume-config-form'
                ref={formRef}
            >
                <ResumeHiddenInput />
                <div className='flex-4'>
                    <div className='flex'>
                        <OpenResumeNewTab />
                        <EditResumeLink />
                        <AITaylorTrigger/>
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