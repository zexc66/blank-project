export default function InvestorHome({ params }: { params: { locale: string } }) {
  const isAr = params.locale === 'ar'
  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold">{isAr ? 'بوابة المستثمر' : 'Investor Portal'}</h1>
      <p className="mt-2 text-neutral-700">
        {isAr ? 'يمكنك إبداء الاهتمام بالفرص المختلفة ومتابعة المستجدات.' : 'You can express interest in opportunities and follow updates.'}
      </p>
    </div>
  )
}