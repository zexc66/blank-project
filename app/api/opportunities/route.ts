import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { meili, OPPORTUNITIES_INDEX } from '@/lib/search/meilisearch'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  const url = new URL(req.url)
  const q = url.searchParams.get('q') || undefined
  const sector = url.searchParams.get('sector') || undefined
  const country = url.searchParams.get('country') || undefined
  const stage = url.searchParams.get('stage') || undefined
  const sdgs = url.searchParams.getAll('sdgs')
  const useSearch = url.searchParams.get('useSearch') === '1'

  // If Meilisearch is configured and useSearch=1, perform search there
  if (useSearch && process.env.MEILISEARCH_HOST && process.env.MEILISEARCH_API_KEY) {
    const index = meili.index(OPPORTUNITIES_INDEX)
    const filters: string[] = []
    if (sector) filters.push(`sector = "${sector}"`)
    if (country) filters.push(`country = "${country}"`)
    if (stage) filters.push(`stage = "${stage}"`)
    if (sdgs?.length) {
      // Meilisearch filter for array membership: sdgs IN ["SDG7","SDG9"]
      filters.push(`sdgs IN [${sdgs.map((s) => `"${s}"`).join(',')}]`)
    }

    const { hits } = await index.search(q || '', {
      filter: filters.length ? filters.join(' AND ') : undefined,
      sort: ['ticketMinUSD:asc'],
      limit: 50,
    })
    return NextResponse.json({ items: hits })
  }

  // Fallback to Prisma query
  const where: any = {}
  if (sector) where.sector = sector
  if (country) where.country = country
  if (stage) where.stage = stage
  if (sdgs?.length) where.sdgs = { hasEvery: sdgs }
  if (q) {
    where.OR = [
      { title_ar: { contains: q, mode: 'insensitive' } },
      { title_en: { contains: q, mode: 'insensitive' } },
      { title_fr: { contains: q, mode: 'insensitive' } },
      { summary_ar: { contains: q, mode: 'insensitive' } },
      { summary_en: { contains: q, mode: 'insensitive' } },
      { summary_fr: { contains: q, mode: 'insensitive' } },
    ]
  }

  const items = await prisma.opportunity.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return NextResponse.json({ items })
}