import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// naive in-memory rate limit
const buckets = new Map<string, { tokens: number; last: number }>()
function rateLimit(ip: string, limit = 10, intervalMs = 60_000) {
  const now = Date.now()
  const b = buckets.get(ip) || { tokens: limit, last: now }
  const elapsed = now - b.last
  if (elapsed > intervalMs) {
    b.tokens = limit
    b.last = now
  }
  if (b.tokens <= 0) {
    buckets.set(ip, b)
    return false
  }
  b.tokens -= 1
  buckets.set(ip, b)
  return true
}

async function verifyRecaptcha(token: string) {
  const secret = process.env.RECAPTCHA_SECRET
  if (!secret) return true // allow in dev
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secret}&response=${token}`,
  })
  const data = await res.json()
  return data.success
}

export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0] || 'local'
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }

  const body = await req.json()
  const { slug, investorName, investorEmail, message, recaptchaToken, locale } = body

  if (!slug || !investorName || !investorEmail) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const ok = await verifyRecaptcha(recaptchaToken || '')
  if (!ok) {
    return NextResponse.json({ error: 'recaptcha_failed' }, { status: 400 })
  }

  const opp = await prisma.opportunity.findUnique({ where: { slug } })
  if (!opp) {
    return NextResponse.json({ error: 'opportunity_not_found' }, { status: 404 })
  }

  const intent = await prisma.investorIntent.create({
    data: {
      opportunityId: opp.id,
      investorName,
      investorEmail,
      message,
    },
  })

  const pdfUrl = `${process.env.NEXT_PUBLIC_APP_URL || ''}/api/investor/intent/${intent.id}/pdf?locale=${locale || 'ar'}`

  return NextResponse.json({ intentId: intent.id, pdfUrl }, { status: 201 })
}