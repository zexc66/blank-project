import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(req: Request) {
  const url = new URL(req.url)
  const q = url.searchParams.get('q') || undefined
  const sector = url.searchParams.get('sector') || undefined
  const country = url.searchParams.get('country') || undefined
  const stage = url.searchParams.get('stage') || undefined
  const sdgs = url.searchParams.getAll('sdgs')

  const where: any = {}
  if (sector) where.sector = sector
  if (country) where.country = country
  if (stage) where.stage = stage
  if (sdgs?.length) where.sdgs = { hasEvery: sdgs }
  if (q) {
    where.OR = [
      { title_ar: { contains: q, mode: 'insensitive' } },
      { title_en: { contains: q, mode: 'insensitive' } },
      { summary_ar: { contains: q, mode: 'insensitive' } },
      { summary_en: { contains: q, mode: 'insensitive' } },
    ]
  }

  const items = await prisma.opportunity.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    take: 50,
  })

  return NextResponse.json({ items })
}