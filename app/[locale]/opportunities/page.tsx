import Link from 'next/link'
import { getOpportunities } from '@/lib/strapi-client'

async function fetchSearch(params: Record<string, string | undefined>) {
  const base = process.env.NEXT_PUBLIC_APP_URL || ''
  const sp = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => v && sp.set(k, v))
  sp.set('useSearch', '1')
  const res = await fetch(`${base}/api/opportunities?${sp.toString()}`, { next: { revalidate: 60 } })
  if (!res.ok) return null
  const data = await res.json()
  return data.items
}

export default async function OpportunitiesList({
  params,
  searchParams,
}: {
  params: { locale: 'ar' | 'en' | 'fr' }
  searchParams?: { q?: string; sector?: string; country?: string; stage?: string; sort?: string }
}) {
  const isAr = params.locale === 'ar'
  const isFr = params.locale === 'fr'
  const t = (ar: string, en: string, fr: string) => (isAr ? ar : isFr ? fr : en)

  const q = searchParams?.q?.trim()
  const sort = searchParams?.sort || 'ticketMinUSD:asc'

  let opportunities: any[] | null = null
  if (process.env.MEILISEARCH_HOST && process.env.MEILISEARCH_API_KEY) {
    opportunities = await fetchSearch({
      q,
      sector: searchParams?.sector,
      country: searchParams?.country,
      stage: searchParams?.stage,
    })
  }
  if (!opportunities) {
    opportunities = await getOpportunities({
      q,
      sector: searchParams?.sector,
      country: searchParams?.country,
      stage: searchParams?.stage,
    })
  }

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold">{t('الفرص الاستثمارية', 'Investment Opportunities', "Opportunités d’investissement")}</h1>

      <form className="mt-4 grid gap-3 md:grid-cols-6">
        <input name="q" placeholder={t('بحث', 'Search', 'Recherche')} className="rounded border px-3 py-2 md:col-span-2" defaultValue={q || ''} />
        <input name="sector" placeholder={t('القطاع', 'Sector', 'Secteur')} className="rounded border px-3 py-2" defaultValue={searchParams?.sector || ''} />
        <input name="country" placeholder={t('الدولة', 'Country', 'Pays')} className="rounded border px-3 py-2" defaultValue={searchParams?.country || ''} />
        <input name="stage" placeholder={t('المرحلة', 'Stage', 'Phase')} className="rounded border px-3 py-2" defaultValue={searchParams?.stage || ''} />
        <select name="sort" className="rounded border px-3 py-2">
          <option value="ticketMinUSD:asc">{t('الحد الأدنى ↑', 'Min Ticket ↑', 'Ticket min ↑')}</option>
          <option value="ticketMinUSD:desc">{t('الحد الأدنى ↓', 'Min Ticket ↓', 'Ticket min ↓')}</option>
          <option value="esgScore:desc">{t('ESG الأعلى', 'Top ESG', 'ESG élevé')}</option>
        </select>
        <button className="rounded bg-primary-blue px-3 py-2 text-white">{t('تصفية', 'Filter', 'Filtrer')}</button>
      </form>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {opportunities.map((o: any) => (
          <Link key={o.slug} href={`/${params.locale}/opportunities/${o.slug}`} className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="h-32 rounded bg-neutral-100" />
            <h3 className="mt-3 font-medium">{isAr ? o.title_ar : isFr ? o.title_fr : o.title_en}</h3>
            <p className="text-sm text-neutral-600">{isAr ? o.summary_ar : isFr ? o.summary_fr : o.summary_en}</p>
            <div className="mt-2 flex justify-between text-sm text-neutral-600">
              <span>{o.country}</span>
              <span className="capitalize">{o.sector}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}