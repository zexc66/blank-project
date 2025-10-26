import { MeiliSearch } from 'meilisearch'

export const meili = new MeiliSearch({
  host: process.env.MEILISEARCH_HOST || '',
  apiKey: process.env.MEILISEARCH_API_KEY || '',
})

export const OPPORTUNITIES_INDEX = 'opportunities'

export async function ensureOpportunityIndex() {
  const index = await meili.getIndex(OPPORTUNITIES_INDEX).catch(async () => {
    return meili.createIndex(OPPORTUNITIES_INDEX, { primaryKey: 'slug' })
  })
  await index.updateSettings({
    searchableAttributes: ['title_ar', 'title_en', 'title_fr', 'summary_ar', 'summary_en', 'summary_fr', 'sector', 'country'],
    filterableAttributes: ['sector', 'country', 'stage', 'sdgs'],
    sortableAttributes: ['ticketMinUSD', 'ticketMaxUSD', 'esgScore'],
  })
  return index
}