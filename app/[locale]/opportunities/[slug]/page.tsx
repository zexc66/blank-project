import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import type { Metadata } from 'next'
import { buildMetadata, JsonLd, breadcrumbJsonLd, offerJsonLd } from '@/lib/seo'

const prisma = new PrismaClient()

export async function generateMetadata({ params }: { params: { locale: 'ar' | 'en' | 'fr'; slug: string } }): Promise<Metadata> {
  const opp = await prisma.opportunity.findUnique({ where: { slug: params.slug } })
  const isAr = params.locale === 'ar'
  const isFr = params.locale === 'fr'
  const title = opp ? (isAr ? opp.title_ar : isFr ? opp.title_fr : opp.title_en) : ''
  const description = opp ? (isAr ? opp.summary_ar : isFr ? opp.summary_fr : opp.summary_en) : ''

  return buildMetadata({
    locale: params.locale,
    path: `/${params.locale}/opportunities/${params.slug}`,
    title,
    description,
    images: opp?.heroImage ? [{ url: opp.heroImage, alt: title }] : undefined,
  })
}

export default async function OpportunityDetail({
  params,
}: {
  params: { locale: 'ar' | 'en' | 'fr'; slug: string }
}) {
  const isAr = params.locale === 'ar'
  const isFr = params.locale === 'fr'
  const t = (ar: string, en: string, fr: string) => (isAr ? ar : isFr ? fr : en)

  const opp = await prisma.opportunity.findUnique({ where: { slug: params.slug } })
  if (!opp) return <div className="container py-10">{t('غير موجود', 'Not found', 'Introuvable')}</div>

  const title = isAr ? opp.title_ar : isFr ? opp.title_fr : opp.title_en
  const summary = isAr ? opp.summary_ar : isFr ? opp.summary_fr : opp.summary_en

  const base = process.env.SITE_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const url = `${base}/${params.locale}/opportunities/${opp.slug}`

  return (
    <div className="container py-10">
      <JsonLd data={breadcrumbJsonLd([
        { name: t('الرئيسية', 'Home', 'Accueil'), item: `${base}/${params.locale}` },
        { name: t('الفرص', 'Opportunities', 'Opportunités'), item: `${base}/${params.locale}/opportunities` },
        { name: title, item: url },
      ])} />
      <JsonLd data={offerJsonLd({
        locale: params.locale,
        url,
        name: title,
        description: summary,
        country: opp.country,
        sector: opp.sector,
      })} />
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="h-64 rounded-lg bg-neutral-100" />
          <h1 className="mt-6 text-3xl font-bold">{title}</h1>
          <div className="mt-3 flex flex-wrap gap-2 text-sm text-neutral-600">
            <span className="rounded bg-neutral-100 px-2 py-1">{opp.country}</span>
            <span className="rounded bg-neutral-100 px-2 py-1 capitalize">{opp.sector}</span>
            {opp.sdgs.map((s) => (
              <span key={s} className="rounded bg-success/10 px-2 py-1 text-success">
                {s}
              </span>
            ))}
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold">{t('نبذة', 'Overview', 'Aperçu')}</h2>
            <p className="mt-2 text-neutral-700">{summary}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold">{t('المستندات', 'Documents', 'Documents')}</h2>
            <ul className="mt-2 list-disc pl-5 text-neutral-700">
              {opp.documents.length ? opp.documents.map((d) => <li key={d}>{d}</li>) : <li>{t('لا يوجد', 'None', 'Aucun')}</li>}
            </ul>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <h3 className="font-medium">{t('التمويل', 'Funding', 'Financement')}</h3>
            <div className="mt-2 text-sm text-neutral-600">
              <p>
                {t('الحد الأدنى:', 'Min:', 'Min :')} {opp.ticketMinUSD ? `${opp.ticketMinUSD.toLocaleString()}` : '-'}
              </p>
              <p>
                {t('الحد الأقصى:', 'Max:', 'Max :')} {opp.ticketMaxUSD ? `${opp.ticketMaxUSD.toLocaleString()}` : '-'}
              </p>
              <p>{t('المرحلة:', 'Stage:', 'Phase :')} {opp.stage}</p>
              <p>{t('درجة ESG:', 'ESG Score:', 'Score ESG :')} {opp.esgScore ?? '-'}</p>
            </div>
            <div className="mt-4 space-y-2">
              <Link href={`/${params.locale}/investor/opportunities/${opp.slug}/intent`} className="block w-full rounded bg-primary-orange px-3 py-2 text-center text-white">
                {t('إبداء الاهتمام', 'Express Interest', 'Manifester son intérêt')}
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}