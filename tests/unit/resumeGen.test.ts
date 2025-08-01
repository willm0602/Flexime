import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import juniorResume from '../sample/juniorEngineer.json';
import seniorResume from '../sample/seniorEngineer.json';
import { describe, expect } from 'vitest';
import { test } from 'vitest';
import { DefaultTemplate } from '@/lib/templates/index';
import BoldTemplate from '@/lib/templates/BoldClassic';
import type Resume from '@/lib/jsonResume';

const resumes: Resume[] = [juniorResume, seniorResume];

describe('Resumes can be generated with default template', () => {
    for (const resume of resumes) {
        test(`Default template loads resume ${resume.basics.name}`, async () => {
            const data = await DefaultTemplate(resume);
            expect(data).toBeTruthy();
        });

        test(`Bold template loads resume ${resume.basics.name}`, async () => {
            const data = await BoldTemplate(resume);
            expect(data).toBeTruthy();
        });
    }
});
