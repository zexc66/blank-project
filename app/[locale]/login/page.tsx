'use client'

import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function LoginPage({ params }: { params: { locale: string } }) {
  const isAr = params.locale === 'ar'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await signIn('credentials', {
      name,
      email,
      callbackUrl: `/${params.locale}/investor`,
    })
  }

  return (
    <div className="container max-w-md py-12">
      <h1 className="text-2xl font-semibold">{isAr ? 'تسجيل الدخول' : 'Login'}</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-sm text-neutral-600">{isAr ? 'الاسم' : 'Name'}</label>
          <input className="mt-1 w-full rounded border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm text-neutral-600">{isAr ? 'البريد الإلكتروني' : 'Email'}</label>
          <input type="email" className="mt-1 w-full rounded border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <button className="w-full rounded bg-primary-blue px-3 py-2 font-medium text-white">
          {isAr ? 'دخول' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}