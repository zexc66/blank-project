import Link from 'next/link'
import { OrganizationJsonLd, WebsiteJsonLd } from '@/components/seo/JsonLd'

export default function Home({ params }: { params: { locale: string } }) {
  const isAr = params.locale === 'ar'
  return (
    <div>
      <OrganizationJsonLd />
      <WebsiteJsonLd />
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-green/10 via-primary-gold/10 to-primary-blue/10">
        <div className="container py-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="font-heading text-3xl font-bold md:text-5xl">
                {isAr ? 'القوة التجارية لأفريقيا الحديثة' : 'The Trade Power of Modern Africa'}
              </h1>
              <p className="mt-4 text-neutral-700">
                {isAr
                  ? 'التحالف الدولي الإفريقي للأعمال والتنمية المستدامة منصة استراتيجية رائدة تجمع النخبة من الفاعلين الاقتصاديين وصنّاع القرار…'
                  : 'The African International Business Alliance & Sustainable Development is a leading strategic platform bringing together top economic actors and decision-makers…'}
              </p>
              <div className="mt-6 flex gap-3">
                <Link
                  href={`/${params.locale}/opportunities`}
                  className="rounded bg-primary-green px-4 py-2 text-white hover:opacity-90"
                >
                  {isAr ? 'استكشف الفرص' : 'Explore Opportunities'}
                </Link>
                <Link
                  href={`/${params.locale}/partnerships`}
                  className="rounded border border-primary-blue px-4 py-2 text-primary-blue hover:bg-primary-blue/10"
                >
                  {isAr ? 'انضم كشريك' : 'Join as Partner'}
                </Link>
              </div>
            </div>
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <ul className="space-y-2 text-neutral-700">
                <li>
                  <strong>{isAr ? 'المجالات الاستراتيجية:' : 'Strategic Domains:'}</strong>{' '}
                  {isAr
                    ? 'التداول والتبادل التجاري؛ تنمية السلة الغذائية القارية؛ الاستيراد والتصدير.'
                    : 'Trade and exchange; developing the continental food basket; import and export.'}
                </li>
                <li>
                  <strong>{isAr ? 'السلع الاستراتيجية:' : 'Strategic Commodities:'}</strong>{' '}
                  {isAr
                    ? 'الحبوب والمنتجات الزراعية؛ المعادن والموارد الطبيعية؛ الطاقة والطاقة المتجددة.'
                    : 'Grains and agricultural products; minerals and natural resources; energy and renewables.'}
                </li>
                <li>
                  <strong>{isAr ? 'منصة الفرص:' : 'Opportunity Platform:'}</strong>{' '}
                  {isAr
                    ? 'قاعدة مستثمرين متنوعة؛ طرح وترويج الفرص مدعومة بدراسات جدوى؛ مؤشرات أداء وخطط تنفيذ؛ شراكات PPP/BOT في القطاعات الحيوية.'
                    : 'Diverse investor base; opportunities with feasibility studies; KPIs and execution plans; PPP/BOT partnerships across key sectors.'}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <h2 className="text-2xl font-semibold">{isAr ? 'الاستدامة والحوكمة' : 'Sustainability & Governance'}</h2>
        <p className="mt-3 text-neutral-700">
          {isAr
            ? 'التزام ESG/ESMS ومواءمة SDGs؛ شراكات أصحاب المصلحة؛ استمرارية العوائد مع الحفاظ على الموارد.'
            : 'Commitment to ESG/ESMS and SDGs; stakeholder partnerships; sustained returns while preserving resources.'}
        </p>
      </section>
    </div>
  )
}