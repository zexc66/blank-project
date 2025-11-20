# AIABASD / AIBA Investor Platform

Trilingual (Arabic default, English and French mirrors) investor website for African International Business Alliance & Sustainable Development (AIABASD/AIBA).

## Tech Stack

- Next.js 15 (App Router, RSC) + TypeScript
- Tailwind CSS (RTL-aware)
- next-intl for i18n (ar, en, fr)
- Prisma + PostgreSQL
- NextAuth (gated investor portal)
- Meilisearch or Algolia (search index scaffolding)
- React Hook Form + Zod (forms)
- PDF generation via pdf-lib (LOI, AR/EN/FR)
- Analytics: GA4, PostHog
- Tests: Playwright (E2E), Vitest (unit)
- CI: GitHub Actions (typecheck, lint, unit, e2e)

## AIO SEO

Central module `lib/seo.ts` provides:
- Localized titles/descriptions (safe limits), canonical, hreflang (ar, en, fr, x-default→/en)
- Open Graph + Twitter tags with localized alt
- JSON-LD helpers for Organization, WebSite, BreadcrumbList, Offer, Article, Place
- Sitemaps:
  - Next sitemap (app/sitemap.ts)
  - Custom sitemap with `<xhtml:link>` alternates (app/sitemap.xml/route.ts)
- Robots: app/robots.txt

## Getting Started

1. Clone and install:
- pnpm i

2. Environment variables:
- Copy .env.example to .env.local
- Set DATABASE_URL (Postgres)
- Set NEXTAUTH_SECRET and NEXTAUTH_URL
- Set NEXT_PUBLIC_APP_URL and SITE_BASE_URL
- Optional: MEILISEARCH_* or ALGOLIA_* keys, RECAPTCHA_* keys, analytics keys.

3. Database and seed:
- pnpm prisma:generate
- pnpm prisma:migrate
- pnpm db:seed

4. Run:
- pnpm dev
- Visit http://localhost:3000 (auto-redirects to /ar)

5. Build and start:
- pnpm build && pnpm start

6. Tests:
- pnpm test
- pnpm e2e

## Routes

- /ar (default), /en, /fr
- Home, Opportunities (list + detail), Countries, Investor Portal (intent)
- API: /api/opportunities, /api/investor/intent, /api/investor/intent/[id]/pdf
- SEO: /sitemap.xml, /robots.txt

## Acceptance Criteria coverage (MVP)

1) Languages:
- Arabic RTL default; EN/FR LTR; language toggle persists (URL-based).

2) Opportunities:
- Server-side filters and text search (Prisma). Also /api/opportunities.
- Detail pages show localized fields and docs.

3) Investor flow:
- Intent form posts to /api/investor/intent with rate limit + reCAPTCHA hook.
- Generates LOI PDF localized (AR/EN/FR) at /api/investor/intent/:id/pdf.

4) Country Profiles:
- 3 demo profiles, each with ≥5 indicators and a map placeholder.

5) SEO:
- Canonical + hreflang via lib/seo.ts generateMetadata.
- JSON-LD for Organization/WebSite on home; Breadcrumb + Offer on opportunity.
- Sitemaps and robots included.

6) Security:
- CSP, clickjacking, content-type, permissions headers via middleware.
- Basic API rate limiting.
- reCAPTCHA v3 hook (requires secrets for production).

7) Tests/CI:
- Playwright smoke tests for home and opportunities list.
- Vitest unit for i18n RTL utility.
- GitHub Actions workflow runs typecheck, lint, unit, e2e.

## Deployment (Vercel)

- Configure environment variables in Vercel project.
- Set SITE_BASE_URL to your production domain.
- Middleware handles locale redirects and portal gating.

## Seed Content

Seed script populates:
- 6 opportunities (energy, agriculture, healthcare, education, infrastructure, tourism) AR/EN/FR
- 3 partners
- 3 news posts AR/EN/FR
- 3 country profiles AR/EN/FR

Arabic is the source of truth with English and French mirrors.