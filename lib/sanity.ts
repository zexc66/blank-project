import { createClient } from '@sanity/client'

export const sanity = createClient({
  projectId: process.env.SANITY_PROJECT_ID || '',
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-10-01',
  useCdn: true,
  token: process.env.SANITY_READ_TOKEN,
})