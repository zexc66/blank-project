# Strapi Content Types for AIABASD / AIBA

This folder contains Strapi v4 content-type and component schemas to power the CMS for the investor platform.

## Structure

- content-types
  - opportunity: AR/EN/FR, slug (uid), summaries, sector/country, ticket sizes, stage, SDGs, ESG score, KPIs, documents, hero image, SEO
  - partner: name, type, country, logo, link, SEO
  - country-profile: iso2, names AR/EN/FR, summary, indicators (component), SEO
  - news-post: titles AR/EN/FR, slug (uid), rich bodies AR/EN/FR, published_at, SEO
- components/common
  - indicator: key/value pairs
  - kpi: label/value pairs
  - seo: AIO SEO fields per locale, og_image, noindex/nofollow, schema_type

## How to use

1) Create a Strapi v4 project:
- npx create-strapi-app@latest cms --quickstart

2) Copy these files into your Strapi project:
- Place content-types JSON under: cms/src/api/{type}/content-types/{type}/schema.json
  - For example: cms/src/api/opportunity/content-types/opportunity/schema.json
- Place components JSON under: cms/src/components/common/{component}.json

3) Rebuild Strapi:
- cd cms
- npm run develop
- Visit http://localhost:1337/admin
- Create an admin user
- Verify collection types and components exist

4) Configure media:
- Set S3-compatible provider (optional) for uploads.

5) Connect Next.js:
- Expose Read-only API tokens in Strapi Settings → API Tokens.
- In Next.js, set ENV for STRAPI_URL and STRAPI_API_TOKEN, then fetch via REST or GraphQL.

## Notes

- SEO fields align with the AIO SEO module in Next.js.
- Slug uses title_en as source to create a canonical cluster with hreflang alternates.
- Add relations if needed (e.g., linking opportunities to partners).