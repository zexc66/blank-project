import Link from 'next/link'
import { getOpportunities } from '@/lib/strapi-client'

export default async function OpportunitiesList({
  params,
  searchParams,
}: {
  params: { locale: 'ar' | 'en' | 'fr' }
  searchParams?: { q?: string; sector?: string; country?: string; stage?: string }
}) {
  const isAr = params.locale === 'ar'
  const isFr = params.locale === 'fr'
  const t = (ar: string, en: string, fr: string) => (isAr ? ar : isFr ? fr : en)

  const q = searchParams?.q?.trim()
  const opportunities = await getOpportunities({
    q,
    sector: searchParams?.sector,
    country: searchParams?.country,
    stage: searchParams?.stage,
  })

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold">{t('الفرص الاستثمارية', 'Investment Opportunities', "Opportunités d’investissement")}</h1>

      <form className="mt-4 grid gap-3 md:grid-cols-5">
        <input name="q" placeholder={t('بحث', 'Search', 'Recherche')} className="rounded border px-3 py-2 md:col-span-2" defaultValue={q} />
        <input name="sector" placeholder={t('القطاع', 'Sector', 'Secteur')} className="rounded border px-3 py-2" defaultValue={searchParams?.sector} />
        <input name="country" placeholder={t('الدولة', 'Country', 'Pays')} className="rounded border px-3 py-2" defaultValue={searchParams?.country} />
        <input name="stage" placeholder={t('المرحلة', 'Stage', 'Phase')} className="rounded border px-3 py-2" defaultValue={searchParams?.stage} />
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