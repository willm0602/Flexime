'use client'

import { useState } from 'react'
import Resume from '@/lib/resume'
import { DEFAULT_RESUME } from '@/lib/resumeUtils'
import HomePageHeader from '@/components/pageSpecific/home/header'
import ResumeConfig from '@/components/resumeConfig'

const LOCAL_STORAGE_KEY = 'saved-resume';

function loadInitResume(): Resume {
    const resumeDataFromLS = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (resumeDataFromLS) {
        return JSON.parse(resumeDataFromLS) as Resume;
    }
    return DEFAULT_RESUME;
}

export default function Home() {
    const initResume = loadInitResume();
    const [resume, $setResume] = useState<Resume>(initResume);
    const setResume = (resume: Resume) => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resume));
        $setResume(resume);
    }
    const [configuredResume, setConfiguredResume] = useState<Resume>(resume);

    return (
        <div className="font-[family-name:var(--font-geist-sans)] w-full md:w-4/5 mx-auto px-12 py-12">
            <HomePageHeader setResume={setResume} setConfiguredResume={setConfiguredResume} />
            <ResumeConfig resume={configuredResume} baseResume={resume} setResume={setConfiguredResume} />
        </div>
    )
}
