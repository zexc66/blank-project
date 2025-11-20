import { getOpportunities } from '@/lib/strapi-client'
import Link from 'next/link'

export default async function SectorPage({ params }: { params: { locale: 'ar' | 'en' | 'fr'; sector: string } }) {
  const isAr = params.locale === 'ar'
  const isFr = params.locale === 'fr'
  const t = (ar: string, en: string, fr: string) => (isAr ? ar : isFr ? fr : en)

  const opportunities = await getOpportunities({ sector: params.sector })

  const sectorTitle = t('القطاع', 'Sector', 'Secteur')

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold">{sectorTitle}: {params.sector}</h1>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded border bg-white p-4">
          <h2 className="font-medium">{t('مؤشرات رئيسية', 'Key KPIs', 'Indicateurs clés')}</h2>
          <ul className="mt-2 list-disc pl-5 text-neutral-700">
            <li>{t('حجم الفرص المنشورة', 'Published opportunities count', 'Nombre d’opportunités publiées')}: {opportunities.length}</li>
            <li>{t('متوسط حجم التذكرة', 'Average ticket size', 'Taille moyenne du ticket')}: {averageTicket(opportunities)}</li>
          </ul>
        </div>
        <div className="rounded border bg-white p-4">
          <h2 className="font-medium">{t('رسم بياني مبسط', 'Simple Chart', 'Graphique simple')}</h2>
          <div className="h-40 rounded bg-neutral-100" />
        </div>
      </div>

      <h2 className="mt-8 text-xl font-semibold">{t('فرص مرتبطة', 'Related Opportunities', 'Opportunités liées')}</h2>
      <div className="mt-4 grid gap-6 md:grid-cols-3">
        {opportunities.map((o: any) => (
          <Link key={o.slug} href={`/${params.locale}/opportunities/${o.slug}`} className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="h-32 rounded bg-neutral-100" />
            <h3 className="mt-3 font-medium">{isAr ? o.title_ar : isFr ? o.title_fr : o.title_en}</h3>
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

function averageTicket(items: any[]) {
  const tickets = items.map((i) => i.ticket_min_usd || 0).filter(Boolean)
  if (!tickets.length) return '-'
  const avg = Math.round(tickets.reduce((a, b) => a + b, 0) / tickets.length)
  return `$${avg.toLocaleString()}`
}