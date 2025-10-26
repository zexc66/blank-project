import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = ['ar', 'en', 'fr']
  const base = process.env.SITE_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const pages = ['', '/opportunities', '/partnerships', '/countries/EG', '/news', '/investor']

  const entries = []
  for (const l of locales) {
    for (const p of pages) {
      entries.push({
        url: `${base}/${l}${p}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    }
  }
  return entries
}