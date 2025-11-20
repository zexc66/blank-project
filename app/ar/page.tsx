export default function ARHome() {
  return (
    <div dir="rtl" className="bg-neutral-50 text-neutral-900">
      <header className="border-b bg-white">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-3 font-semibold">
              <div className="h-8 w-8 rounded bg-primary-green" />
              <span>AIABASD / AIBA</span>
            </div>
            <nav className="hidden gap-6 md:flex">
              <a href="#" className="hover:text-primary-blue">الرئيسية</a>
              <a href="#" className="hover:text-primary-blue">الفرص</a>
              <a href="#" className="hover:text-primary-blue">القطاعات</a>
              <a href="#" className="hover:text-primary-blue">البلدان</a>
              <a href="#" className="hover:text-primary-blue">الأخبار</a>
              <a href="#" className="hover:text-primary-blue">المستثمر</a>
            </nav>
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-green/10 via-primary-gold/10 to-primary-blue/10">
          <div className="container mx-auto max-w-5xl px-4 py-12">
            <div className="grid gap-6 md:grid-cols-2 md:items-center">
              <div>
                <h1 className="text-3xl font-bold md:text-4xl">القوة التجارية لأفريقيا الحديثة</h1>
                <p className="mt-3 text-neutral-700">
                  التحالف الدولي الإفريقي للأعمال والتنمية المستدامة منصة استراتيجية رائدة تجمع النخبة من الفاعلين الاقتصاديين وصنّاع القرار…
                </p>
                <div className="mt-4 flex gap-3">
                  <a className="rounded bg-primary-green px-4 py-2 text-white">استكشف الفرص</a>
                  <a className="rounded border border-primary-blue px-4 py-2 text-primary-blue">انضم كشريك</a>
                </div>
              </div>
              <div className="rounded-lg border bg-white p-6 shadow-sm">
                <ul className="space-y-2 text-neutral-700">
                  <li>
                    <strong>المجالات الاستراتيجية:</strong>{' '}
                    التداول والتبادل التجاري؛ تنمية السلة الغذائية القارية؛ الاستيراد والتصدير.
                  </li>
                  <li>
                    <strong>السلع الاستراتيجية:</strong>{' '}
                    الحبوب والمنتجات الزراعية؛ المعادن والموارد الطبيعية؛ الطاقة والطاقة المتجددة.
                  </li>
                  <li>
                    <strong>منصة الفرص:</strong>{' '}
                    قاعدة مستثمرين متنوعة؛ فرص مدعومة بدراسات جدوى؛ مؤشرات أداء وخطط تنفيذ؛ شراكات PPP/BOT.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="container mx-auto max-w-5xl px-4 py-10">
          <h2 className="text-2xl font-semibold">فرص مميّزة</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[0,1,2].map((i) => (
              <div key={i} className="rounded border bg-white p-4">
                <div className="h-28 rounded bg-neutral-100" />
                <h3 className="mt-3 font-medium">
                  {i === 0 ? 'شبكات طاقة شمسية مصغرة للمجتمعات' : i === 1 ? 'تحديث سلاسل القيمة الزراعية' : 'عيادات رقمية مجتمعية'}
                </h3>
                <p className="text-sm text-neutral-600">
                  {i === 0 ? 'حل طاقة متجددة للمناطق الريفية يدعم الوصول للطاقة النظيفة.' :
                   i === 1 ? 'برنامج شامل لرفع الإنتاجية واللوجستيات في الزراعة.' :
                   'حلول صحية رقمية لدعم الوصول للرعاية الأساسية.'}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="container mx-auto max-w-5xl px-4">
          <h2 className="text-2xl font-semibold">شركاؤنا</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {['African Development Partner','Global Green Capital','Continental Trade Group'].map((name) => (
              <div key={name} className="rounded border bg-white p-4">{name}</div>
            ))}
          </div>
        </section>

        <section className="container mx-auto max-w-5xl px-4 py-10">
          <h2 className="text-2xl font-semibold">الاستدامة والحوكمة</h2>
          <p className="mt-2 text-neutral-700">
            التزام ESG/ESMS ومواءمة SDGs؛ شراكات أصحاب المصلحة؛ استمرارية العوائد مع الحفاظ على الموارد.
          </p>
        </section>
      </main>

      <footer className="mt-10 border-t bg-white">
        <div className="container mx-auto max-w-5xl px-4 py-6 text-sm text-neutral-600">
          © {new Date().getFullYear()} AIABASD / AIBA. جميع الحقوق محفوظة.
        </div>
      </footer>
    </div>
  )
}