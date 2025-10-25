import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

const prisma = new PrismaClient()

function toArray(val: string | string[] | undefined) {
  if (!val) return []
  return Array.isArray(val) ? val : [val]
}

export default async function OpportunitiesList({
  params,
  searchParams,
}: {
  params: { locale: string }
  searchParams?: { q?: string; sector?: string; country?: string; stage?: string; sdgs?: string | string[] }
}) {
  const isAr = params.locale === 'ar'
  const q = searchParams?.q?.trim()
  const sector = searchParams?.sector
  const country = searchParams?.country
  const stage = searchParams?.stage
  const sdgs = toArray(searchParams?.sdgs)

  const where: any = {}
  if (sector) where.sector = sector
  if (country) where.country = country
  if (stage) where.stage = stage
  if (sdgs.length) where.sdgs = { hasEvery: sdgs }
  if (q) {
    where.OR = [
      { title_ar: { contains: q, mode: 'insensitive' } },
      { title_en: { contains: q, mode: 'insensitive' } },
      { summary_ar: { contains: q, mode: 'insensitive' } },
      { summary_en: { contains: q, mode: 'insensitive' } },
    ]
  }

  const opportunities = await prisma.opportunity.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 24,
  })

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold">{isAr ? 'الفرص الاستثمارية' : 'Investment Opportunities'}</h1>

      <form className="mt-4 grid gap-3 md:grid-cols-5">
        <input name="q" placeholder={isAr ? 'بحث' : 'Search'} className="rounded border px-3 py-2 md:col-span-2" defaultValue={q} />
        <input name="sector" placeholder={isAr ? 'القطاع' : 'Sector'} className="rounded border px-3 py-2" defaultValue={sector} />
        <input name="country" placeholder={isAr ? 'الدولة' : 'Country'} className="rounded border px-3 py-2" defaultValue={country} />
        <input name="stage" placeholder={isAr ? 'المرحلة' : 'Stage'} className="rounded border px-3 py-2" defaultValue={stage} />
        <button className="rounded bg-primary-blue px-3 py-2 text-white">{isAr ? 'تصفية' : 'Filter'}</button>
      </form>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {opportunities.map((o) => (
          <Link key={o.slug} href={`/${params.locale}/opportunities/${o.slug}`} className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="h-32 rounded bg-neutral-100" />
            <h3 className="mt-3 font-medium">{isAr ? o.title_ar : o.title_en}</h3>
            <p className="text-sm text-neutral-600">{isAr ? o.summary_ar : o.summary_en}</p>
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