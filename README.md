# AIABASD / AIBA Investor Platform

Bilingual (Arabic default, English mirror) investor website for African International Business Alliance & Sustainable Development (AIABASD/AIBA).

## Tech Stack

- Next.js 15 (App Router, RSC) + TypeScript
- Tailwind CSS (RTL-aware)
- next-intl for i18n (ar, en)
- Prisma + PostgreSQL
- NextAuth (gated investor portal)
- Algolia (search index scaffolding)
- React Hook Form + Zod (forms)
- PDF generation via pdf-lib (LOI)
- Analytics: GA4, PostHog
- Tests: Playwright (E2E), Vitest (unit)
- CI: GitHub Actions (typecheck, lint, unit, e2e)

## Getting Started

1. Clone and install:
- pnpm i

2. Environment variables:
- Copy .env.example to .env.local
- Set DATABASE_URL (Postgres)
- Set NEXTAUTH_SECRET and NEXTAUTH_URL
- Set NEXT_PUBLIC_APP_URL
- Optional: ALGOLIA_* keys, RECAPTCHA_* keys, analytics keys.

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

- /ar (default), /en
- Home, Opportunities (list + detail), Countries, Investor Intent
- API: /api/opportunities, /api/investor/intent, /api/investor/intent/[id]/pdf
- SEO: /sitemap.xml, /robots.txt

## Acceptance Criteria coverage

1) i18n + RTL:
- Arabic default with RTL via html dir.
- EN LTR. Language toggle in navbar.

2) Opportunities list:
- Server-side filters and text search (Prisma). Also /api/opportunities.

3) Opportunity detail + LOI:
- Detail page shows SDGs, docs.
- Express Interest form posts to /api/investor/intent, generates bilingual PDF downloadable at /api/investor/intent/:id/pdf.

4) Country Profiles:
- 3 demo profiles include 5 indicators and a map placeholder.

5) SEO:
- Sitemap and robots.
- JSON-LD for Organization and WebSite on home.
- Offer/Project JSON-LD can be extended per-opportunity.

6) Security:
- CSP, clickjacking, content-type headers via middleware.
- Basic rate limit on intent API.
- reCAPTCHA v3 hook (dev allows without secret).

7) Tests:
- Scaffolding in place; add more Playwright/Vitest tests per needs.

8) CI:
- GitHub Actions workflow runs typecheck, lint, unit, e2e.

## Deployment (Vercel)

- Configure environment variables in Vercel project.
- Enable Node and Edge as needed.
- Set default locale path redirect handled by middleware.

## Seed Content

Seed script populates:
- 6 opportunities (energy, agriculture, healthcare, education, infrastructure, tourism)
- 3 partners
- 3 news posts
- 3 country profiles

Arabic is the source of truth with English mirrors.