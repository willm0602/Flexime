import { expect, type Page } from '@playwright/test'

export default async function loadResume(file: string, page: Page) {
    page.goto('http://127.0.0.1:3000/profile')
    const loadFileInput = page.locator('input[id="load-resume"]')
    loadFileInput.setInputFiles([file])
}
