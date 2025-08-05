'use client';

import { DEFAULT_RESUME } from '@/lib/resumeUtils';
import LoadResume from '@/components/LoadResume';
import type Resume from '@/lib/jsonResume';
import useLocalStorage from '@/lib/hooks/useLocalStorage';
import * as Tabs from '@radix-ui/react-tabs';
import EditBasics from '@/components/pageSpecific/profile/EditBasics';
import EditWork from '@/components/pageSpecific/profile/EditWork';
import EditEducation from '@/components/pageSpecific/profile/EditEducation';
import EditProjects from '@/components/pageSpecific/profile/EditProjects';
import EditSkills from '@/components/pageSpecific/profile/EditSkills';
import { useEffect, useState } from 'react';
import useQueryParam from '@/lib/hooks/useQueryParam';
import LoadingSpinner from '@/components/LoadingSpinner';
import JSONResumeContext from './JSONResumeContext';
import useResume from '@/lib/hooks/useResume';

const RESUME_KEY = 'saved-resume';

export default function ConfigureProfile() {
    const [isClient, setIsClient] = useState(false);
    const [resume, setResume] = useResume();

    const [exportURL, setExportURL] = useState<string>('');
    const [activeTab, setActiveTab] = useQueryParam('tab', 'basics');
    const [isLoadingResume, setIsLoadingResume] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (resume) {
            const dataStr = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(resume))}`;
            setExportURL(dataStr);
        }
    }, [resume]);

    return (
        <div className='font-(family-name:--font-geist-sans) w-full md:w-4/5 mx-auto md:px-12 md:py-12 px-4 py-4'>
            {!isClient || !resume ? (
                <div className='flex'>
                    <span className='loading loading-spinner w-1/4 mx-auto' />
                </div>
            ) : (
                <JSONResumeContext.Provider value={{ resume, setResume }}>
                    <h1>Modify Profile</h1>
                    <div className='flex'>
                        <LoadResume
                            setResume={setResume}
                            isLoadingResume={isLoadingResume}
                            setIsLoadingResume={setIsLoadingResume}
                        />
                        <a
                            href={exportURL}
                            className='btn no-underline btn-secondary text-black ml-4'
                            download='resume.json'
                        >
                            {isLoadingResume ? (
                                <LoadingSpinner className='w-24 h-12' />
                            ) : (
                                'Export Profile JSON'
                            )}
                        </a>
                    </div>

                    <Tabs.Root
                        defaultValue={activeTab}
                        onValueChange={(e) => {
                            setActiveTab(e);
                        }}
                        className='mt-12'
                    >
                        <Tabs.List className='tabs-boxed'>
                            <Tabs.Trigger value='basics' className='tab'>
                                Basics
                            </Tabs.Trigger>
                            <Tabs.Trigger value='work' className='tab'>
                                Work Experience
                            </Tabs.Trigger>
                            <Tabs.Trigger value='education' className='tab'>
                                Education
                            </Tabs.Trigger>
                            <Tabs.Trigger value='projects' className='tab'>
                                Personal Projects
                            </Tabs.Trigger>
                            <Tabs.Trigger value='skills' className='tab'>
                                Skills
                            </Tabs.Trigger>
                        </Tabs.List>
                        <Tabs.Content value='basics'>
                            <EditBasics />
                        </Tabs.Content>
                        <Tabs.Content value='work'>
                            <EditWork />
                        </Tabs.Content>
                        <Tabs.Content value='education'>
                            <EditEducation />
                        </Tabs.Content>
                        <Tabs.Content value='projects'>
                            <EditProjects />
                        </Tabs.Content>
                        <Tabs.Content value='skills'>
                            <EditSkills />
                        </Tabs.Content>
                    </Tabs.Root>
                </JSONResumeContext.Provider>
            )}
        </div>
    );
}
