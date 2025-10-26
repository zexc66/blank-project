'use client'

import { useState } from 'react'
import { signIn, useSession } from 'next-auth/react'

export default function InvestorHome({ params }: { params: { locale: string } }) {
  const isAr = params.locale === 'ar'
  const isFr = params.locale === 'fr'
  const t = (ar: string, en: string, fr: string) => (isAr ? ar : isFr ? fr : en)
  const { data: session } = useSession()
  const [file, setFile] = useState<File | null>(null)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null)

  const upload = async () => {
    if (!file) return
    const res = await fetch('/api/uploads/presign', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ filename: file.name, contentType: file.type }),
    })
    const data = await res.json()
    const uploadRes = await fetch(data.uploadUrl, {
      method: 'PUT',
      headers: { 'Content-Type': file.type },
      body: file,
    })
    if (uploadRes.ok) setUploadedUrl(data.fileUrl)
  }

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold">{t('بوابة المستثمر', 'Investor Portal', 'Portail investisseur')}</h1>
      <p className="mt-2 text-neutral-700">
        {t('يمكنك إبداء الاهتمام بالفرص المختلفة ومتابعة المستجدات.', 'You can express interest in opportunities and follow updates.', 'Vous pouvez manifester de l’intérêt et suivre les mises à jour.')}
      </p>

      {!session && (
        <div className="mt-6 flex gap-3">
          <button className="rounded bg-primary-blue px-3 py-2 text-white" onClick={() => signIn('google')}>
            {t('تسجيل عبر جوجل', 'Sign in with Google', 'Se connecter avec Google')}
          </button>
          <button className="rounded bg-primary-blue px-3 py-2 text-white" onClick={() => signIn('linkedin')}>
            {t('تسجيل عبر لينكدإن', 'Sign in with LinkedIn', 'Se connecter avec LinkedIn')}
          </button>
        </div>
      )}

      {session && (
        <div className="mt-6 rounded border bg-white p-4">
          <h2 className="font-medium">{t('رفع مستند (KYC/LOI)', 'Upload Document (KYC/LOI)', 'Téléverser un document (KYC/LOI)')}</h2>
          <input type="file" className="mt-3" onChange={(e) => setFile(e.target.files?.[0] || null)} />
          <button className="mt-3 rounded bg-primary-green px-3 py-2 text-white" onClick={upload}>
            {t('رفع', 'Upload', 'Téléverser')}
          </button>
          {uploadedUrl && (
            <p className="mt-2 text-sm text-neutral-600">
              {t('تم الرفع إلى:', 'Uploaded to:', 'Téléversé vers :')} <a href={uploadedUrl} className="text-primary-blue underline">{uploadedUrl}</a>
            </p>
          )}
        </div>
      )}
    </div>
  )
}