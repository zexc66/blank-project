import Link from 'next/link'
import { JsonLd, organizationJsonLd, websiteJsonLd } from '@/lib/seo'
import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'

export async function generateMetadata({ params }: { params: { locale: 'ar' | 'en' | 'fr' } }): Promise<Metadata> {
  const title = params.locale === 'ar' ? 'القوة التجارية لأفريقيا الحديثة' :
    params.locale === 'fr' ? 'La puissance commerciale de l’Afrique moderne' :
    'The Commercial Power of Modern Africa'
  const description =
    params.locale === 'ar'
      ? 'التحالف الدولي الإفريقي للأعمال والتنمية المستدامة منصة استراتيجية رائدة تجمع النخبة من الفاعلين الاقتصاديين وصنّاع القرار…'
      : params.locale === 'fr'
      ? "L'Alliance internationale africaine des affaires et du développement durable est une plateforme stratégique de premier plan réunissant les principaux acteurs économiques et les décideurs…"
      : 'The African International Business Alliance & Sustainable Development is a leading strategic platform bringing together top economic actors and decision-makers…'

  return buildMetadata({
    locale: params.locale,
    path: `/${params.locale}`,
    title,
    description,
    images: [{ url: '/images/og/home.jpg', alt: title }],
  })
}

export default function Home({ params }: { params: { locale: 'ar' | 'en' | 'fr' } }) {
  const isAr = params.locale === 'ar'
  const isFr = params.locale === 'fr'
  const t = (ar: string, en: string, fr: string) => (isAr ? ar : isFr ? fr : en)

  return (
    <div>
      <JsonLd data={organizationJsonLd()} />
      <JsonLd data={websiteJsonLd(params.locale)} />
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-green/10 via-primary-gold/10 to-primary-blue/10">
        <div className="container py-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="font-heading text-3xl font-bold md:text-5xl">
                {t('القوة التجارية لأفريقيا الحديثة', 'The Commercial Power of Modern Africa', 'La puissance commerciale de l’Afrique moderne')}
              </h1>
              <p className="mt-4 text-neutral-700">
                {t(
                  'التحالف الدولي الإفريقي للأعمال والتنمية المستدامة منصة استراتيجية رائدة تجمع النخبة من الفاعلين الاقتصاديين وصنّاع القرار…',
                  'The African International Business Alliance & Sustainable Development is a leading strategic platform bringing together top economic actors and decision-makers…',
                  "L'Alliance internationale africaine des affaires et du développement durable est une plateforme stratégique de premier plan réunissant les principaux acteurs économiques et les décideurs…"
                )}
              </p>
              <div className="mt-6 flex gap-3">
                <Link
                  href={`/${params.locale}/opportunities`}
                  className="rounded bg-primary-green px-4 py-2 text-white hover:opacity-90"
                >
                  {t('استكشف الفرص', 'Explore Opportunities', 'Explorer les opportunités')}
                </Link>
                <Link
                  href={`/${params.locale}/partnerships`}
                  className="rounded border border-primary-blue px-4 py-2 text-primary-blue hover:bg-primary-blue/10"
                >
                  {t('انضم كشريك', 'Join as Partner', 'Rejoindre comme partenaire')}
                </Link>
              </div>
            </div>
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <ul className="space-y-2 text-neutral-700">
                <li>
                  <strong>{t('المجالات الاستراتيجية:', 'Strategic Domains:', 'Domaines stratégiques:')}</strong>{' '}
                  {t(
                    'التداول والتبادل التجاري؛ تنمية السلة الغذائية القارية؛ الاستيراد والتصدير.',
                    'Trade and exchange; developing the continental food basket; import and export.',
                    'Commerce et échanges; développement du panier alimentaire continental; import et export.'
                  )}
                </li>
                <li>
                  <strong>{t('السلع الاستراتيجية:', 'Strategic Commodities:', 'Produits stratégiques:')}</strong>{' '}
                  {t(
                    'الحبوب والمنتجات الزراعية؛ المعادن والموارد الطبيعية؛ الطاقة والطاقة المتجددة.',
                    'Grains and agricultural products; minerals and natural resources; energy and renewables.',
                    'Céréales et produits agricoles; minerais et ressources naturelles; énergie et renouvelables.'
                  )}
                </li>
                <li>
                  <strong>{t('منصة الفرص:', 'Opportunity Platform:', 'Plateforme des opportunités:')}</strong>{' '}
                  {t(
                    'قاعدة مستثمرين متنوعة؛ طرح وترويج الفرص مدعومة بدراسات جدوى؛ مؤشرات أداء وخطط تنفيذ؛ شراكات PPP/BOT في القطاعات الحيوية.',
                    'Diverse investor base; opportunities with feasibility studies; KPIs and execution plans; PPP/BOT partnerships across key sectors.',
                    "Base d'investisseurs diversifiée; opportunités avec études de faisabilité; indicateurs de performance et plans d'exécution; partenariats PPP/BOT dans les secteurs clés."
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <h2 className="text-2xl font-semibold">{t('الاستدامة والحوكمة', 'Sustainability & Governance', 'Durabilité et gouvernance')}</h2>
        <p className="mt-3 text-neutral-700">
          {t(
            'التزام ESG/ESMS ومواءمة SDGs؛ شراكات أصحاب المصلحة؛ استمرارية العوائد مع الحفاظ على الموارد.',
            'Commitment to ESG/ESMS and SDGs; stakeholder partnerships; sustained returns while preserving resources.',
            "Engagement ESG/ESMS et alignement avec les ODD; partenariats avec les parties prenantes; pérennité des rendements tout en préservant les ressources."
          )}
        </p>
      </section>
    </div>
  )
}