import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'

const prisma = new PrismaClient()

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const url = new URL(req.url)
  const locale = url.searchParams.get('locale') || 'ar'
  const intentId = params.id

  const intent = await prisma.investorIntent.findUnique({
    where: { id: intentId },
    include: { opportunity: true },
  })
  if (!intent) return NextResponse.json({ error: 'intent_not_found' }, { status: 404 })

  const pdf = await PDFDocument.create()
  const page = pdf.addPage([595, 842]) // A4
  const font = await pdf.embedFont(StandardFonts.Helvetica)

  const isAr = locale === 'ar'
  const title = isAr ? 'خطاب نوايا للاستثمار' : 'Investment Letter of Intent'
  const bodyLines = [
    isAr ? `السيد/السيدة: ${intent.investorName}` : `Mr/Ms: ${intent.investorName}`,
    isAr ? `البريد الإلكتروني: ${intent.investorEmail}` : `Email: ${intent.investorEmail}`,
    isAr ? `الفرصة: ${intent.opportunity.title_ar}` : `Opportunity: ${intent.opportunity.title_en}`,
    isAr ? `الدولة: ${intent.opportunity.country} | القطاع: ${intent.opportunity.sector}` : `Country: ${intent.opportunity.country} | Sector: ${intent.opportunity.sector}`,
    isAr ? `الرسالة: ${intent.message || '-'}` : `Message: ${intent.message || '-'}`,
    isAr ? 'يعبّر هذا الخطاب عن نية المستثمر لدراسة وإبداء الاهتمام بالفرصة المذكورة ضمن إطار الشراكة.' :
           'This letter expresses the investor’s intent to review and express interest in the mentioned opportunity within a partnership framework.',
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