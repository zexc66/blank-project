import type { Metadata } from 'next'
import { isRTL, Locale } from '@/i18n/config'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AIABASD / AIBA',
  description: 'African International Business Alliance & Sustainable Development',
}

function t(locale: Locale, ar: string, en: string, fr: string) {
  return locale === 'ar' ? ar : locale === 'fr' ? fr : en
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: Locale }
}) {
  const dir = isRTL(params.locale) ? 'rtl' : 'ltr'

  return (
    <html lang={params.locale} dir={dir}>
      <body className="min-h-screen bg-neutral-50 text-neutral-900">
        <header className="border-b bg-white">
          <div className="container flex h-16 items-center justify-between">
            <Link href={`/${params.locale}`} className="flex items-center gap-3">
              <div className="h-8 w-8 rounded bg-primary-green" />
              <span className="font-semibold">AIABASD / AIBA</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link href={`/${params.locale}`}>{t(params.locale, 'الرئيسية', 'Home', 'Accueil')}</Link>
              <Link href={`/${params.locale}/opportunities`}>{t(params.locale, 'الفرص', 'Opportunities', 'Opportunités')}</Link>
              <Link href={`/${params.locale}/sectors/energy`}>{t(params.locale, 'القطاعات', 'Sectors', 'Secteurs')}</Link>
              <Link href={`/${params.locale}/countries/EG`}>{t(params.locale, 'البلدان', 'Countries', 'Pays')}</Link>
              <Link href={`/${params.locale}/news`}>{t(params.locale, 'الأخبار', 'News', 'Actualités')}</Link>
              <Link href={`/${params.locale}/investor`}>{t(params.locale, 'المستثمر', 'Investor', 'Investisseur')}</Link>
            </nav>
            <div className="flex items-center gap-2">
              <Link href={`/${params.locale === 'ar' ? 'en' : 'ar'}`} className="rounded border px-3 py-2 text-sm">
                {params.locale === 'ar' ? 'EN' : 'AR'}
              </Link>
              <Link href={`/${params.locale === 'fr' ? 'en' : 'fr'}`} className="rounded border px-3 py-2 text-sm">
                {params.locale === 'fr' ? 'EN' : 'FR'}
              </Link>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-16 border-t bg-white">
          <div className="container py-10">
            <p className="text-sm text-neutral-500">
              © {new Date().getFullYear()} AIABASD / AIBA. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}