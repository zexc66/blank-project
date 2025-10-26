const base = process.env.STRAPI_URL || ''
const token = process.env.STRAPI_API_TOKEN || ''

function qs(params: Record<string, any>) {
  const sp = new URLSearchParams()
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null || v === '') continue
    if (Array.isArray(v)) v.forEach((val) => sp.append(k, String(val)))
    else sp.set(k, String(v))
  }
  return sp.toString()
}

async function strapiFetch(path: string, params?: Record<string, any>) {
  const url = `${base}${path}${params ? `?${qs(params)}` : ''}`
  const res = await fetch(url, {
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
    next: { revalidate: 300 },
  })
  if (!res.ok) {
    throw new Error(`Strapi fetch failed: ${res.status} ${res.statusText}`)
  }
  return res.json()
}

export async function getOpportunities({ q, sector, country, stage }: { q?: string; sector?: string; country?: string; stage?: string }) {
  const filters: any = {}
  if (q) {
    filters['$or'] = [
      { title_ar: { $containsi: q } },
      { title_en: { $containsi: q } },
      { title_fr: { $containsi: q } },
      { summary_ar: { $containsi: q } },
      { summary_en: { $containsi: q } },
      { summary_fr: { $containsi: q } },
    ]
  }
  if (sector) filters['sector'] = { $eq: sector }
  if (country) filters['country'] = { $eq: country }
  if (stage) filters['stage'] = { $eq: stage }

  const params = {
    'filters': JSON.stringify(filters),
    'populate': JSON.stringify(['hero_image','documents','seo']),
    'sort': 'published_at:desc',
    'pagination[pageSize]': 24,
  }

  const data = await strapiFetch('/api/opportunities', params)
  return data.data?.map((item: any) => ({ id: item.id, ...item.attributes })) || []
}

export async function getOpportunityBySlug(slug: string) {
  const params = {
    'filters[slug][$eq]': slug,
    'populate': JSON.stringify(['hero_image','documents','seo']),
  }
  const data = await strapiFetch('/api/opportunities', params)
  const item = data.data?.[0]
  return item ? { id: item.id, ...item.attributes } : null
}

export async function getCountryByIso2(iso2: string) {
  const params = {
    'filters[iso2][$eq]': iso2,
    'populate': JSON.stringify(['indicators','seo']),
  }
  const data = await strapiFetch('/api/country-profiles', params)
  const item = data.data?.[0]
  return item ? { id: item.id, ...item.attributes } : null
}