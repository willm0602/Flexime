// ensures validators are working as expected

import juniorResume from './sample/juniorEngineer.json';
import seniorResume from './sample/seniorEngineer.json';
import emptyResume from './sample/missingData.json';
import { describe, expect, test } from 'vitest';
import jsonResumeSchema from '@/lib/validators/jsonResume';

describe('JSON Resume validator should detect properly formatted resumes match json resume schema', () => {
    test('Ensure validators dont have false negatives', () => {
        const juniorResumeValidation = jsonResumeSchema.safeParse(juniorResume);
        if(juniorResumeValidation.error)
            console.dir(juniorResumeValidation.error, {depth: null});
        expect(juniorResumeValidation.success).toBeTruthy();
        
        const seniorResumeValidation = jsonResumeSchema.safeParse(seniorResume);
        if(seniorResumeValidation.error)
            console.dir(seniorResumeValidation.error, {depth: null});
        expect(seniorResumeValidation.success).toBeTruthy();
    });

    test('Ensure validators dont have false postives', () => {
        const emptyResumeValidation = jsonResumeSchema.safeParse(emptyResume);
        expect(emptyResumeValidation.success).toBeFalsy();
    });
})