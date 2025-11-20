'use client'

import { useState } from 'react'

export default function ContactPage({ params }: { params: { locale: 'ar' | 'en' | 'fr' } }) {
  const isAr = params.locale === 'ar'
  const isFr = params.locale === 'fr'
  const t = (ar: string, en: string, fr: string) => (isAr ? ar : isFr ? fr : en)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [category, setCategory] = useState('investor')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [ok, setOk] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const recaptchaToken = 'test' // TODO: integrate grecaptcha v3 site key

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, category, message, recaptchaToken }),
    })
    if (res.ok) {
      setOk(true)
    } else {
      const data = await res.json().catch(() => ({}))
      setError(data.error || 'failed')
    }
    setLoading(false)
  }

  return (
    <div className="container max-w-lg py-10">
      <h1 className="text-2xl font-semibold">{t('اتصل بنا', 'Contact Us', 'Contactez-nous')}</h1>
      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-sm text-neutral-600">{t('الاسم', 'Name', 'Nom')}</label>
          <input className="mt-1 w-full rounded border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm text-neutral-600">{t('البريد الإلكتروني', 'Email', 'Email')}</label>
          <input type="email" className="mt-1 w-full rounded border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm text-neutral-600">{t('الفئة', 'Category', 'Catégorie')}</label>
          <select className="mt-1 w-full rounded border px-3 py-2" value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="investor">{t('مستثمر', 'Investor', 'Investisseur')}</option>
            <option value="partner">{t('شريك', 'Partner', 'Partenaire')}</option>
            <option value="government">{t('حكومة', 'Government', 'Gouvernement')}</option>
            <option value="media">{t('إعلام', 'Media', 'Média')}</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-neutral-600">{t('رسالة', 'Message', 'Message')}</label>
          <textarea className="mt-1 w-full rounded border px-3 py-2" value={message} onChange={(e) => setMessage(e.target.value)} required />
        </div>
        {error && <p className="text-sm text-error">{error}</p>}
        <button className="w-full rounded bg-primary-green px-3 py-2 font-medium text-white" disabled={loading}>
          {loading ? t('جارٍ الإرسال...', 'Submitting...', 'Envoi...') : t('إرسال', 'Submit', 'Envoyer')}
        </button>
      </form>
      {ok && <p className="mt-4 text-success">{t('تم الإرسال بنجاح', 'Submitted successfully', 'Envoyé avec succès')}</p>}
    </div>
  )
}