import { DEFAULT_RESUME } from '@/lib/resumeUtils';
import { test, expect } from '@playwright/test';

const HOMEPAGE = '127.0.0.1:3000'

// ensure homepage loads
test('Homepage should load properly', async ({ page }) => {
    await page.goto(HOMEPAGE);
    expect(page);
});
