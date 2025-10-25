import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function CountryPage({ params }: { params: { locale: string; iso2: string } }) {
  const isAr = params.locale === 'ar'
  const country = await prisma.countryProfile.findUnique({ where: { iso2: params.iso2 } })
  if (!country) return <div className="container py-10">{isAr ? 'غير موجود' : 'Not found'}</div>

  const indicators = country.indicators as any[]

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold">{isAr ? country.name_ar : country.name_en}</h1>
      <p className="mt-2 text-neutral-700">{country.summary}</p>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {indicators.slice(0, 5).map((i) => (
          <div key={i.key} className="rounded border bg-white p-4">
            <p className="text-sm text-neutral-600">{i.key}</p>
            <p className="text-xl font-semibold">{i.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded border bg-neutral-100 p-6 text-neutral-600">
        {isAr ? 'خريطة الدولة (قريبًا)' : 'Country map (coming soon)'}
      </div>
    </div>
  )
}