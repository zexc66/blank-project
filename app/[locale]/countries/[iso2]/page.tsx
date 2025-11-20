import { getCountryByIso2 } from '@/lib/strapi-client'

export default async function CountryPage({ params }: { params: { locale: string; iso2: string } }) {
  const isAr = params.locale === 'ar'
  const isFr = params.locale === 'fr'
  const t = (ar: string, en: string, fr: string) => (isAr ? ar : isFr ? fr : en)

  const country: any = await getCountryByIso2(params.iso2)
  if (!country) return <div className="container py-10">{t('غير موجود', 'Not found', 'Introuvable')}</div>

  const indicators = country.indicators || []
  const name = isAr ? country.name_ar : isFr ? country.name_fr : country.name_en

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold">{name}</h1>
      <p className="mt-2 text-neutral-700">{country.summary}</p>

      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {indicators.slice(0, 5).map((i: any, idx: number) => (
          <div key={`${i.key}-${idx}`} className="rounded border bg-white p-4">
            <p className="text-sm text-neutral-600">{i.key}</p>
            <p className="text-xl font-semibold">{i.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded border bg-neutral-100 p-6 text-neutral-600">
        {t('خريطة الدولة (قريبًا)', 'Country map (coming soon)', 'Carte du pays (bientôt)')}
      </div>
    </div>
  )
}