import type { Metadata } from 'next'
import { JsonLd, articleJsonLd, buildMetadata } from '@/lib/seo'
import { getNewsBySlug } from '@/lib/strapi-client'

export async function generateMetadata({ params }: { params: { locale: 'ar' | 'en' | 'fr'; slug: string } }): Promise<Metadata> {
  const post = await getNewsBySlug(params.slug)
  const isAr = params.locale === 'ar'
  const isFr = params.locale === 'fr'
  const title = post ? (isAr ? post.title_ar : isFr ? post.title_fr : post.title_en) : ''
  const description = post ? (isAr ? post.title_ar : isFr ? post.title_fr : post.title_en) : ''

  return buildMetadata({
    locale: params.locale,
    path: `/${params.locale}/news/${params.slug}`,
    title,
    description,
  })
}

export default async function NewsDetail({ params }: { params: { locale: 'ar' | 'en' | 'fr'; slug: string } }) {
  const isAr = params.locale === 'ar'
  const isFr = params.locale === 'fr'
  const t = (ar: string, en: string, fr: string) => (isAr ? ar : isFr ? fr : en)

  const post: any = await getNewsBySlug(params.slug)
  if (!post) return <div className="container py-10">{t('غير موجود', 'Not found', 'Introuvable')}</div>

  const title = isAr ? post.title_ar : isFr ? post.title_fr : post.title_en
  const body = isAr ? post.body_ar : isFr ? post.body_fr : post.body_en
  const base = process.env.SITE_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const url = `${base}/${params.locale}/news/${params.slug}`

  return (
    <div className="container py-10 prose max-w-none">
      <JsonLd data={articleJsonLd({ locale: params.locale, url, headline: title, datePublished: post.published_at })} />
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </div>
  )
}