import type { Page } from '@playwright/test';
import path from 'node:path';
import loadResume from './loadResume';

const sampleDir = `${path.dirname}../sample`;
const samples = [
    `${sampleDir}/juniorEngineer.json`,
    `${sampleDir}/misformattedResume.json`,
    `${sampleDir}/missingData.json`,
    `${sampleDir}/seniorEngineer.json`,
];

export default async function forEachResume(
    page: Page,
    callback: (page: Page) => unknown,
) {
    for(const path of samples){
        await loadResume(path, page);
        await callback(page);
    }
}
