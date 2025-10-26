import Link from 'next/link'
import { getNewsPosts } from '@/lib/strapi-client'

export default async function NewsList({ params }: { params: { locale: 'ar' | 'en' | 'fr' } }) {
  const isAr = params.locale === 'ar'
  const isFr = params.locale === 'fr'
  const t = (ar: string, en: string, fr: string) => (isAr ? ar : isFr ? fr : en)

  const posts = await getNewsPosts()

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold">{t('الأخبار والرؤى', 'News & Insights', 'Actualités et insights')}</h1>
      <div className="mt-6 space-y-4">
        {posts.map((p: any) => (
          <Link key={p.slug} href={`/${params.locale}/news/${p.slug}`} className="block rounded border bg-white p-4 shadow-sm">
            <h3 className="font-medium">{isAr ? p.title_ar : isFr ? p.title_fr : p.title_en}</h3>
            <p className="text-sm text-neutral-600">{new Date(p.published_at).toLocaleDateString()}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}