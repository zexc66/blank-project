import { test, expect } from '@playwright/test'

test('home loads in Arabic and has hero text', async ({ page }) => {
  await page.goto('/ar')
  await expect(page.getByText('القوة التجارية لأفريقيا الحديثة')).toBeVisible()
})

test('opportunities list loads and filters work', async ({ page }) => {
  await page.goto('/ar/opportunities')
  await page.fill('input[name="q"]', 'منصة')
  await page.click('button:has-text("تصفية")')
  await expect(page.getByText('الفرص الاستثمارية')).toBeVisible()
})