import { PrismaClient } from '@prisma/client'
import { ensureOpportunityIndex } from '../../lib/search/meilisearch'

async function main() {
  const prisma = new PrismaClient()
  const index = await ensureOpportunityIndex()
  const items = await prisma.opportunity.findMany({ take: 1000 })
  const docs = items.map((o) => ({
    slug: o.slug,
    title_ar: o.title_ar,
    title_en: o.title_en,
    title_fr: o.title_fr,
    summary_ar: o.summary_ar,
    summary_en: o.summary_en,
    summary_fr: o.summary_fr,
    sector: o.sector,
    country: o.country,
    ticketMinUSD: o.ticketMinUSD || 0,
    ticketMaxUSD: o.ticketMaxUSD || 0,
    stage: o.stage,
    sdgs: o.sdgs,
    esgScore: o.esgScore || 0,
  }))
  await index.addDocuments(docs)
  console.log(`Indexed ${docs.length} opportunities to Meilisearch.`)
  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})