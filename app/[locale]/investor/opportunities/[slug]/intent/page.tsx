'use client'

import { useState } from 'react'

export default function IntentPage({ params }: { params: { locale: string; slug: string } }) {
  const isAr = params.locale === 'ar'
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [pdfUrl, setPdfUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // ReCAPTCHA v3 token request (placeholder)
    const recaptchaToken = 'test'

    const res = await fetch(`/api/investor/intent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: params.slug,
        investorName: name,
        investorEmail: email,
        message,
        recaptchaToken,
        locale: params.locale,
      }),
    })

    const data = await res.json()
    if (!res.ok) {
      setError(data.error || 'Submission failed')
    } else {
      setPdfUrl(data.pdfUrl)
    }
    setLoading(false)
  }

  return (
    <div className="container max-w-lg py-10">
      <h1 className="text-2xl font-semibold">{isAr ? 'خطاب نوايا' : 'Letter of Intent'}</h1>
      <p className="mt-2 text-neutral-700">
        {isAr ? 'يرجى تعبئة النموذج لإبداء اهتمامك.' : 'Please fill the form to express your interest.'}
      </p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <div>
          <label className="text-sm text-neutral-600">{isAr ? 'الاسم' : 'Name'}</label>
          <input className="mt-1 w-full rounded border px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm text-neutral-600">{isAr ? 'البريد الإلكتروني' : 'Email'}</label>
          <input type="email" className="mt-1 w-full rounded border px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="text-sm text-neutral-600">{isAr ? 'رسالة' : 'Message'}</label>
          <textarea className="mt-1 w-full rounded border px-3 py-2" value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>
        {error && <p className="text-sm text-error">{error}</p>}
        <button className="w-full rounded bg-primary-gold px-3 py-2 font-medium text-neutral-900 hover:opacity-90" disabled={loading}>
          {loading ? (isAr ? 'جارٍ الإرسال...' : 'Submitting...') : (isAr ? 'إرسال' : 'Submit')}
        </button>
      </form>

      {pdfUrl && (
        <div className="mt-6 rounded border bg-white p-4">
          <p className="text-neutral-700">{isAr ? 'تم إنشاء ملف PDF:' : 'PDF generated:'}</p>
          <a href={pdfUrl} className="text-primary-blue hover:underline" target="_blank" rel="noreferrer">
            {isAr ? 'تحميل خطاب النوايا' : 'Download LOI PDF'}
          </a>
        </div>
      )}
    </div>
  )
}