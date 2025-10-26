import type { Metadata } from 'next'

export const localeToOg = {
  ar: 'ar_AR',
  en: 'en_US',
  fr: 'fr_FR',
}

export function clamp(str: string, max: number) {
  if (str.length <= max) return str
  return str.slice(0, max - 1) + '…'
}

export function buildMetadata({
  locale,
  path,
  title,
  description,
  images,
}: {
  locale: 'ar' | 'en' | 'fr'
  path: string
  title: string
  description: string
  images?: { url: string; alt?: string }[]
}): Metadata {
  const base = process.env.SITE_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  const url = `${base}${path}`
  const alternates: Record<string, string> = {
    ar: `${base}${path.replace(/^\\/[^/]+/, '/ar')}`,
    en: `${base}${path.replace(/^\\/[^/]+/, '/en')}`,
    fr: `${base}${path.replace(/^\\/[^/]+/, '/fr')}`,
    'x-default': `${base}${path.replace(/^\\/[^/]+/, '/en')}`,
  }

  return {
    title: clamp(title, 60),
    description: clamp(description, 160),
    alternates: {
      canonical: url,
      languages: alternates,
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: localeToOg[locale],
      images: images?.map((img) => ({ url: img.url, alt: img.alt || title })),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images?.map((i) => i.url),
    },
  }
}

// Basic JSON-LD injectors
export function JsonLd({ data }: { data: Record<string, any> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function breadcrumbJsonLd(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: it.name,
      item: it.item,
    })),
  }
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'AIABASD / AIBA',
    url: process.env.SITE_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    logo: '/icons/logo.png',
  }
}

export function websiteJsonLd(locale: 'ar' | 'en' | 'fr') {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'AIABASD / AIBA',
    url: process.env.SITE_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    inLanguage: locale,
  }
}

export function offerJsonLd({
  locale,
  url,
  name,
  description,
  country,
  sector,
}: {
  locale: 'ar' | 'en' | 'fr'
  url: string
  name: string
  description: string
  country: string
  sector: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    url,
    name,
    description,
    areaServed: country,
    category: sector,
    inLanguage: locale,
  }
}

export function articleJsonLd({
  locale,
  url,
  headline,
  datePublished,
}: {
  locale: 'ar' | 'en' | 'fr'
  url: string
  headline: string
  datePublished: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: url,
    headline,
    datePublished,
    inLanguage: locale,
  }
}

export function placeJsonLd({
  locale,
  url,
  name,
}: {
  locale: 'ar' | 'en' | 'fr'
  url: string
  name: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name,
    url,
    inLanguage: locale,
  }
}