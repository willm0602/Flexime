import {test, expect, Page} from '@playwright/test';
import loadResume from './utils/loadResume';
import forEachResume from './utils/forEachResume';

test('Ensure loading the resume works', async ({page}) => {
    forEachResume(page, ()=>{});
})