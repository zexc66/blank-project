import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

const prisma = new PrismaClient()

export default async function OpportunityDetail({
  params,
}: {
  params: { locale: string; slug: string }
}) {
  const isAr = params.locale === 'ar'
  const opp = await prisma.opportunity.findUnique({ where: { slug: params.slug } })
  if (!opp) return <div className="container py-10">{isAr ? 'غير موجود' : 'Not found'}</div>

  return (
    <div className="container py-10">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="h-64 rounded-lg bg-neutral-100" />
          <h1 className="mt-6 text-3xl font-bold">{isAr ? opp.title_ar : opp.title_en}</h1>
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
            <h2 className="text-xl font-semibold">{isAr ? 'نبذة' : 'Overview'}</h2>
            <p className="mt-2 text-neutral-700">{isAr ? opp.summary_ar : opp.summary_en}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold">{isAr ? 'المستندات' : 'Documents'}</h2>
            <ul className="mt-2 list-disc pl-5 text-neutral-700">
              {opp.documents.length ? opp.documents.map((d) => <li key={d}>{d}</li>) : <li>{isAr ? 'لا يوجد' : 'None'}</li>}
            </ul>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <h3 className="font-medium">{isAr ? 'التمويل' : 'Funding'}</h3>
            <div className="mt-2 text-sm text-neutral-600">
              <p>
                {isAr ? 'الحد الأدنى:' : 'Min:'} {opp.ticketMinUSD ? `$${opp.ticketMinUSD.toLocaleString()}` : '-'}
              </p>
              <p>
                {isAr ? 'الحد الأقصى:' : 'Max:'} {opp.ticketMaxUSD ? `$${opp.ticketMaxUSD.toLocaleString()}` : '-'}
              </p>
              <p>{isAr ? 'المرحلة:' : 'Stage:'} {opp.stage}</p>
              <p>{isAr ? 'درجة ESG:' : 'ESG Score:'} {opp.esgScore ?? '-'}</p>
            </div>
            <div className="mt-4 space-y-2">
              <Link href={`/${params.locale}/investor/opportunities/${opp.slug}/intent`} className="block w-full rounded bg-primary-orange px-3 py-2 text-center text-white">
                {isAr ? 'إبداء الاهتمام' : 'Express Interest'}
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}