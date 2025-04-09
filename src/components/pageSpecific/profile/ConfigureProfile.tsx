'use client';

import { DEFAULT_RESUME } from '@/lib/resumeUtils';
import Link from 'next/link';
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
import type { User } from '@supabase/supabase-js';

const RESUME_KEY = 'saved-resume';

interface ConfigureResumeProps {
    resume: Resume | undefined;
    user: User | null;
}

const setResumeForProfile = (resume: Resume) => {
    fetch('/api/profile/set_resume', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(resume),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .catch((error) => {
            console.error('There was a problem with the fetch operation:', error);
        });
};

export default function ConfigureProfile(props: ConfigureResumeProps) {
    const [isClient, setIsClient] = useState(false);
    const [resumeFromLS, setResumeInLS] = useLocalStorage<Resume>(
        RESUME_KEY,
        DEFAULT_RESUME,
    );
    const resume = props.resume ?? resumeFromLS ?? DEFAULT_RESUME;
    const setResume = props.user ? setResumeForProfile : setResumeInLS;
    const [exportURL, setExportURL] = useState<string>('');
    const [activeTab, setActiveTab] = useQueryParam('tab', 'basics');

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
        <div className='font-[family-name:var(--font-geist-sans)] w-full md:w-4/5 mx-auto px-12 py-12'>
            {!isClient || !resume ? (
                <div className='flex'>
                    <span className='loading loading-spinner w-1/4 mx-auto' />
                </div>
            ) : (
                <>
                    <h1>Modify Profile</h1>
                    <div className='flex'>
                        <Link href='/' className='btn no-underline'>
                            Return Home
                        </Link>
                        <LoadResume setResume={setResume} />
                        <a
                            href={exportURL}
                            className='btn no-underline btn-secondary text-black ml-4'
                            download='resume.json'
                        >
                            Export Profile
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
                            <EditBasics resume={resume} setResume={setResume} />
                        </Tabs.Content>
                        <Tabs.Content value='work'>
                            <EditWork
                                resume={resume}
                                dispatchResume={setResume}
                            />
                        </Tabs.Content>
                        <Tabs.Content value='education'>
                            <EditEducation
                                resume={resume}
                                dispatchResume={setResume}
                            />
                        </Tabs.Content>
                        <Tabs.Content value='projects'>
                            <EditProjects
                                resume={resume}
                                dispatchResume={setResume}
                            />
                        </Tabs.Content>
                        <Tabs.Content value='skills'>
                            <EditSkills
                                resume={resume}
                                dispatchResume={setResume}
                            />
                        </Tabs.Content>
                    </Tabs.Root>
                </>
            )}
        </div>
    );
}
