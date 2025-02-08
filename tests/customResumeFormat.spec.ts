// tests for the custom resume format to ensure that they work properly

import {test, expect} from '@playwright/test';
import JSONResume, { Project } from '@/lib/jsonResume';
import { resumeFromJSONResume } from '@/lib/resume';

const testResumeConverter = async (baseResume: JSONResume) => {
    const resume = resumeFromJSONResume(baseResume);
    
    // basics
    expect(resume.name).toBe(baseResume.basics?.name || 'Name');
    expect(resume.email.val).toBe(baseResume.basics?.email);
    expect(resume.location.val).toBe(baseResume.basics?.location);
    expect(resume.phone.val).toBe(baseResume.basics?.phone);

    // test projects
    expect(resume.personalProjects.title).toBe('Personal Projects');
    const resumeProjects: Project[] = (resume.personalProjects.children || []).map((togglableProject) => {
        return togglableProject.val.val;
    }); 
};

test('Ensure the resume converter method works for an empty dictionary', async () => {
    testResumeConverter({});
})