import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { locales, defaultLocale } from './i18n/config'

function getLocale(pathname: string) {
  const pathSegments = pathname.split('/')
  const first = pathSegments[1]
  if (locales.includes(first as any)) return first
  return null
}

// Basic security headers incl. CSP
function withSecurityHeaders(res: NextResponse) {
  res.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:; connect-src 'self' https:; frame-ancestors 'none'; form-action 'self';"
  )
  res.headers.set('X-Frame-Options', 'DENY')
  res.headers.set('X-Content-Type-Options', 'nosniff')
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  return res
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const url = req.nextUrl

  // Redirect to default locale if missing
  const locale = getLocale(pathname)
  if (!locale) {
    url.pathname = `/${defaultLocale}${pathname}`
    return withSecurityHeaders(NextResponse.redirect(url))
  }

  // Gate investor portal routes via NextAuth session cookie presence (shallow check)
  if (pathname.startsWith(`/${locale}/investor`) && !req.cookies.get('next-auth.session-token') && !req.cookies.get('__Secure-next-auth.session-token')) {
    url.pathname = `/${locale}/login`
    return withSecurityHeaders(NextResponse.redirect(url))
  }

  return withSecurityHeaders(NextResponse.next())
}

export const config = {
  matcher: ['/((?!_next|.*\\..*).*)'],
}