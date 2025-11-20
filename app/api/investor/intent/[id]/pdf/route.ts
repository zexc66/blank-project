import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

const prisma = new PrismaClient()

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const url = new URL(req.url)
  const locale = (url.searchParams.get('locale') || 'ar') as 'ar' | 'en' | 'fr'
  const intentId = params.id

  const intent = await prisma.investorIntent.findUnique({
    where: { id: intentId },
    include: { opportunity: true },
  })
  if (!intent) return NextResponse.json({ error: 'intent_not_found' }, { status: 404 })

  const pdf = await PDFDocument.create()
  const page = pdf.addPage([595, 842]) // A4
  const font = await pdf.embedFont(StandardFonts.Helvetica)

  const t = (ar: string, en: string, fr: string) => (locale === 'ar' ? ar : locale === 'fr' ? fr : en)
  const oppTitle = locale === 'ar' ? intent.opportunity.title_ar : locale === 'fr' ? intent.opportunity.title_fr : intent.opportunity.title_en

  const title = t('خطاب نوايا للاستثمار', 'Investment Letter of Intent', "Lettre d’intention d’investissement")
  const bodyLines = [
    t(`السيد/السيدة: ${intent.investorName}`, `Mr/Ms: ${intent.investorName}`, `M./Mme : ${intent.investorName}`),
    t(`البريد الإلكتروني: ${intent.investorEmail}`, `Email: ${intent.investorEmail}`, `Email : ${intent.investorEmail}`),
    t(`الفرصة: ${oppTitle}`, `Opportunity: ${oppTitle}`, `Opportunité : ${oppTitle}`),
    t(`الدولة: ${intent.opportunity.country} | القطاع: ${intent.opportunity.sector}`, `Country: ${intent.opportunity.country} | Sector: ${intent.opportunity.sector}`, `Pays : ${intent.opportunity.country} | Secteur : ${intent.opportunity.sector}`),
    t(`الرسالة: ${intent.message || '-'}`, `Message: ${intent.message || '-'}`, `Message : ${intent.message || '-'}`),
    t(
      'يعبّر هذا الخطاب عن نية المستثمر لدراسة وإبداء الاهتمام بالفرصة المذكورة ضمن إطار الشراكة.',
      'This letter expresses the investor’s intent to review and express interest in the mentioned opportunity within a partnership framework.',
      "Cette lettre exprime l'intention de l'investisseur d'étudier et de manifester son intérêt pour l'opportunité mentionnée dans le cadre d'un partenariat."
    ),
  ]

  page.setFont(font)
  page.setFontSize(18)
  page.drawText(title, { x: 50, y: 780, color: rgb(0, 0.2, 0.5) })

  page.setFontSize(12)
  let y = 740
  for (const line of bodyLines) {
    page.drawText(line, { x: 50, y })
    y -= 24
  }

  const pdfBytes = await pdf.save()
  return new NextResponse(Buffer.from(pdfBytes), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="LOI-${intentId}.pdf"`,
    },
  })
}