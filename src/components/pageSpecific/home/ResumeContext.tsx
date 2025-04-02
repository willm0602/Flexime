import type Resume from '@/lib/resume';
import React, { useState } from 'react';
import { resumeFromJSONResume } from '../../../lib/resume';
import { DEFAULT_RESUME } from '@/lib/resumeUtils';

type ResumeContextValue = {
    resume: Resume;
    setResume: (newResume: Resume) => void;
};

const ResumeContext = React.createContext<ResumeContextValue>({
    resume: resumeFromJSONResume(DEFAULT_RESUME),
    setResume: () => {
        console.error('Something went wrong!');
    },
});

export default ResumeContext;
