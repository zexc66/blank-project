import { defineConfig } from '@playwright/test'

export default defineConfig({
  use: {
    headless: true,
    baseURL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    timeout: 120000,
    reuseExistingServer: !process.env.CI,
  },
})