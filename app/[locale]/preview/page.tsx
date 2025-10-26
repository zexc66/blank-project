export default function LocalePreview({ params }: { params: { locale: 'ar' | 'en' | 'fr' } }) {
  const isAr = params.locale === 'ar'
  const isFr = params.locale === 'fr'
  const t = (ar: string, en: string, fr: string) => (isAr ? ar : isFr ? fr : en)

  return (
    <div dir={isAr ? 'rtl' : 'ltr'} className="bg-neutral-50 text-neutral-900">
      <header className="border-b bg-white">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3 font-semibold">
              <div className="h-8 w-8 rounded bg-primary-green" />
              <span>AIABASD / AIBA</span>
            </div>
            <nav className="hidden gap-6 md:flex">
              <a href="#" className="hover:text-primary-blue">{t('الرئيسية', 'Home', 'Accueil')}</a>
              <a href="#" className="hover:text-primary-blue">{t('الفرص', 'Opportunities', 'Opportunités')}</a>
              <a href="#" className="hover:text-primary-blue">{t('القطاعات', 'Sectors', 'Secteurs')}</a>
              <a href="#" className="hover:text-primary-blue">{t('البلدان', 'Countries', 'Pays')}</a>
              <a href="#" className="hover:text-primary-blue">{t('الأخبار', 'News', 'Actualités')}</a>
              <a href="#" className="hover:text-primary-blue">{t('المستثمر', 'Investor', 'Investisseur')}</a>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-green/10 via-primary-gold/10 to-primary-blue/10">
          <div className="container mx-auto max-w-5xl px-4 py-12">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div>
                <h1 className="text-3xl font-bold md:text-4xl">
                  {t('القوة التجارية لأفريقيا الحديثة', 'The Commercial Power of Modern Africa', 'La puissance commerciale de l’Afrique moderne')}
                </h1>
                <p className="mt-3 text-neutral-700">
                  {t(
                    'التحالف الدولي الإفريقي للأعمال والتنمية المستدامة منصة استراتيجية رائدة تجمع النخبة من الفاعلين الاقتصاديين وصنّاع القرار…',
                    'The African International Business Alliance & Sustainable Development is a leading strategic platform bringing together top economic actors and decision-makers…',
                    "L'Alliance internationale africaine des affaires et du développement durable est une plateforme stratégique de premier plan réunissant les principaux acteurs économiques et les décideurs…"
                  )}
                </p>
                <div className="mt-4 flex gap-3">
                  <a className="rounded bg-primary-green px-4 py-2 text-white">{t('استكشف الفرص', 'Explore Opportunities', 'Explorer les opportunités')}</a>
                  <a className="rounded border border-primary-blue px-4 py-2 text-primary-blue">{t('انضم كشريك', 'Join as Partner', 'Rejoindre comme partenaire')}</a>
                </div>
              </div>
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <ul className="space-y-2 text-neutral-700">
                  <li>
                    <strong>{t('المجالات الاستراتيجية:', 'Strategic Domains:', 'Domaines stratégiques:')}</strong>{' '}
                    {t('التداول والتبادل التجاري؛ تنمية السلة الغذائية القارية؛ الاستيراد والتصدير.', 'Trade and exchange; developing the continental food basket; import and export.', 'Commerce et échanges; développement du panier alimentaire continental; import et export.')}
                  </li>
                  <li>
                    <strong>{t('السلع الاستراتيجية:', 'Strategic Commodities:', 'Produits stratégiques:')}</strong>{' '}
                    {t('الحبوب والمنتجات الزراعية؛ المعادن والموارد الطبيعية؛ الطاقة والطاقة المتجددة.', 'Grains and agricultural products; minerals and natural resources; energy and renewables.', 'Céréales et produits agricoles; minerais et ressources naturelles; énergie et renouvelables.')}
                  </li>
                  <li>
                    <strong>{t('منصة الفرص:', 'Opportunity Platform:', 'Plateforme des opportunités:')}</strong>{' '}
                    {t('قاعدة مستثمرين متنوعة؛ فرص مدعومة بدراسات جدوى؛ مؤشرات أداء وخطط تنفيذ؛ شراكات PPP/BOT.', 'Diverse investor base; opportunities with feasibility studies; KPIs and execution plans; PPP/BOT.', "Base d'investisseurs diversifiée; opportunités avec études de faisabilité; indicateurs de performance et plans d'exécution; PPP/BOT.")}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-5xl px-4 py-10">
          <h2 className="text-2xl font-semibold">{t('فرص مميّزة', 'Featured Opportunities', 'Opportunités en vedette')}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[0,1,2].map((i) => (
              <div key={i} className="rounded border bg-white p-4">
                <div className="h-28 rounded bg-neutral-100" />
                <h3 className="mt-3 font-medium">
                  {i === 0 ? t('شبكات طاقة شمسية مصغرة للمجتمعات','Community Solar Microgrids','Micro-réseaux solaires communautaires')
                    : i === 1 ? t('تحديث سلاسل القيمة الزراعية','Agricultural Value Chain Modernization','Modernisation de la chaîne de valeur agricole')
                    : t('عيادات رقمية مجتمعية','Community Digital Clinics','Cliniques numériques communautaires')}
                </h3>
                <p className="text-sm text-neutral-600">
                  {i === 0 ? t('حل طاقة متجددة للمناطق الريفية يدعم الوصول للطاقة النظيفة.','Renewable energy solution for rural areas.','Solution d’énergie renouvelable pour les zones rurales.')
                    : i === 1 ? t('برنامج شامل لرفع الإنتاجية واللوجستيات في الزراعة.','Enhance productivity and logistics in agriculture.','Améliorer la productivité et la logistique dans l’agriculture.')
                    : t('حلول صحية رقمية لدعم الوصول للرعاية الأساسية.','Digital health solutions to improve access.','Solutions de santé numériques pour améliorer l’accès.')}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold">{t('شركاؤنا', 'Our Partners', 'Nos partenaires')}</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {['African Development Partner','Global Green Capital','Continental Trade Group'].map((name) => (
              <div key={name} className="rounded border bg-white p-4">{name}</div>
            ))}
          </div>
        </section>

        <section className="container mx-auto max-w-5xl px-4 py-10">
          <h2 className="text-2xl font-semibold">{t('الاستدامة والحوكمة','Sustainability & Governance','Durabilité et gouvernance')}</h2>
          <p className="mt-2 text-neutral-700">
            {t('التزام ESG/ESMS ومواءمة SDGs؛ شراكات أصحاب المصلحة؛ استمرارية العوائد مع الحفاظ على الموارد.',
               'Commitment to ESG/ESMS and SDGs; stakeholder partnerships; sustained returns.',
               'Engagement ESG/ESMS et alignement avec les ODD; partenariats; pérennité des rendements.')}
          </p>
        </section>
      </main>

      <footer className="mt-10 border-t bg-white">
        <div className="container mx-auto max-w-5xl px-4 py-6 text-sm text-neutral-600">
          © {new Date().getFullYear()} AIABASD / AIBA. {t('جميع الحقوق محفوظة.', 'All rights reserved.', 'Tous droits réservés.')}
        </div>
      </footer>
    </div>
  )
}