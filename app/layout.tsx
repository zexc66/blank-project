import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'African Business & Sustainable Development Platform',
  description:
    'Connecting African entrepreneurs, investors, and organizations to drive sustainable growth across the continent.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 text-neutral-900">
        <header className="border-b bg-white">
          <div className="container flex h-16 items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded bg-primary-green" />
              <span className="font-semibold">Africa Growth Hub</span>
            </div>
            <nav className="hidden gap-6 md:flex">
              <a href="/" className="hover:text-primary-blue">Home</a>
              <a href="/projects" className="hover:text-primary-blue">Projects</a>
              <a href="/funding" className="hover:text-primary-blue">Funding</a>
              <a href="/events" className="hover:text-primary-blue">Events</a>
              <a href="/blog" className="hover:text-primary-blue">Blog</a>
            </nav>
            <div className="flex items-center gap-3">
              <a href="/login" className="text-sm hover:text-primary-blue">Login</a>
              <a href="/register" className="rounded bg-primary-gold px-3 py-2 text-sm font-medium text-neutral-900 hover:opacity-90">
                Get Started
              </a>
            </div>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-16 border-t bg-white">
          <div className="container py-10">
            <p className="text-sm text-neutral-500">
              © {new Date().getFullYear()} Africa Growth Hub. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}