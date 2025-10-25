import type { Metadata } from 'next'
import { isRTL, Locale } from '@/i18n/config'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'AIABASD / AIBA',
  description: 'African International Business Alliance & Sustainable Development',
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
              <Link href={`/${params.locale}`}>{params.locale === 'ar' ? 'الرئيسية' : 'Home'}</Link>
              <Link href={`/${params.locale}/opportunities`}>{params.locale === 'ar' ? 'الفرص' : 'Opportunities'}</Link>
              <Link href={`/${params.locale}/sectors/energy`}>{params.locale === 'ar' ? 'القطاعات' : 'Sectors'}</Link>
              <Link href={`/${params.locale}/countries/EG`}>{params.locale === 'ar' ? 'البلدان' : 'Countries'}</Link>
              <Link href={`/${params.locale}/news`}>{params.locale === 'ar' ? 'الأخبار' : 'News'}</Link>
              <Link href={`/${params.locale}/investor`}>{params.locale === 'ar' ? 'المستثمر' : 'Investor'}</Link>
            </nav>
            <div className="flex items-center gap-3">
              <Link
                href={`/${params.locale === 'ar' ? 'en' : 'ar'}`}
                className="rounded border px-3 py-2 text-sm"
              >
                {params.locale === 'ar' ? 'EN' : 'AR'}
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