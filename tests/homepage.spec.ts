import { DEFAULT_RESUME } from '@/lib/resumeUtils'
import { test, expect } from '@playwright/test'

const HOMEPAGE = 'localhost:3000'

// ensure homepage loads
test('Homepage should load properly', async ({ page }) => {
    await page.goto(HOMEPAGE)
    expect(page)
})
