export function OrganizationJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "AIABASD / AIBA",
    "url": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    "logo": "/icons/logo.png"
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

export function WebsiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "AIABASD / AIBA",
    "url": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    "inLanguage": "ar"
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}