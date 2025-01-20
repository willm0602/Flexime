'use client'

import { useState } from 'react'
import JSONResume from '@/lib/jsonResume'
import Resume, { resumeFromJSONResume } from '@/lib/resume'
import { DEFAULT_RESUME } from '@/lib/resumeUtils'
import HomePageHeader from '@/components/pageSpecific/home/Header';
import ResumeConfig from '@/components/ResumeConfig';

const LOCAL_STORAGE_KEY = 'saved-resume';

function loadInitResume(): JSONResume {
    const resumeDataFromLS = window.localStorage.getItem(LOCAL_STORAGE_KEY);
    if (resumeDataFromLS) {
        console.log('Using resume from LS')
        console.log(JSON.parse(resumeDataFromLS));
        return JSON.parse(resumeDataFromLS) as JSONResume;
    }
    console.log('Using default resume')
    return DEFAULT_RESUME;
}

export default function Home() {
    const initResume = loadInitResume();
    const [resume, $setResume] = useState<JSONResume>(initResume);
    const setResume = (resume: JSONResume) => {
        window.localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(resume));
        $setResume(resume);
    }
    const initConfiguredResume = resumeFromJSONResume(initResume);
    const [configuredResume, setConfiguredResume] = useState<Resume>(initConfiguredResume);

    return (
        <div className="font-[family-name:var(--font-geist-sans)] w-full md:w-4/5 mx-auto px-12 py-12">
            <HomePageHeader setResume={setResume} setConfiguredResume={setConfiguredResume} />
            <ResumeConfig resume={configuredResume} baseResume={resume} setResume={setConfiguredResume} />
        </div>
    )
}
