export async function GET() {
  const base = process.env.SITE_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const locales = ['ar','en','fr']
  const paths = ['', '/opportunities', '/partnerships', '/countries/EG', '/news', '/investor']

  const entries = []
  for (const p of paths) {
    for (const l of locales) {
      const loc = `${base}/${l}${p}`
      const alternates = locales.map((alt) => `<xhtml:link rel="alternate" hreflang="${alt}" href="${base}/${alt}${p}"/>`).join('')
      const xdefault = `<xhtml:link rel="alternate" hreflang="x-default" href="${base}/en${p}"/>`
      entries.push(`<url><loc>${loc}</loc>${alternates}${xdefault}<changefreq>weekly</changefreq><priority>0.7</priority></url>`)
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xhtml="http://www.w3.org/1999/xhtml">
    ${entries.join('\n')}
  </urlset>`

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml' },
  })
}