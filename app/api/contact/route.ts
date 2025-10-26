import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function verifyRecaptcha(token: string) {
  const secret = process.env.RECAPTCHA_SECRET
  if (!secret) return true // dev fallback
  const res = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `secret=${secret}&response=${token}`,
  })
  const data = await res.json()
  return data.success
}

// naive rate limit
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

export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0] || 'local'
  if (!rateLimit(ip)) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }

  const body = await req.json()
  const { name, email, category, message, recaptchaToken } = body

  if (!name || !email || !category || !message) {
    return NextResponse.json({ error: 'missing_fields' }, { status: 400 })
  }

  const ok = await verifyRecaptcha(recaptchaToken || '')
  if (!ok) {
    return NextResponse.json({ error: 'recaptcha_failed' }, { status: 400 })
  }

  await prisma.contactInquiry.create({
    data: { name, email, category, message },
  })

  return NextResponse.json({ ok: true }, { status: 201 })
}