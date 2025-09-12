'use client';

import type Resume from '@/lib/jsonResume';
import React from 'react';
import { DEFAULT_RESUME } from '@/lib/resumeUtils';

type JSONResumeContextValue = {
    resume: Resume;
    setResume: (newResume: Resume) => unknown;
};

const JSONResumeContext = React.createContext<JSONResumeContextValue>({
    resume: DEFAULT_RESUME,
    setResume: () => {
        console.error('Something went wrong!');
    },
});

export default JSONResumeContext;
