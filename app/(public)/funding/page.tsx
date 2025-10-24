export default function FundingPage() {
  const items = [
    {
      slug: 'green-grants-2025',
      title: 'Green Innovation Grants',
      type: 'grant',
      amount: 'Up to $50,000',
      deadline: '2025-12-31',
    },
    {
      slug: 'impact-loans-east-africa',
      title: 'Impact Loans - East Africa',
      type: 'loan',
      amount: '$10,000 - $250,000',
      deadline: '2025-11-15',
    },
    {
      slug: 'seed-equity-africa',
      title: 'Seed Equity Fund Africa',
      type: 'equity_investment',
      amount: '$100,000 - $1,000,000',
      deadline: '2025-10-31',
    },
  ]

  return (
    <div className="container py-10">
      <h1 className="text-2xl font-semibold">Funding Opportunities</h1>
      <p className="mt-2 text-neutral-700">Discover grants, loans, and impact investments.</p>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {items.map((o) => (
          <a key={o.slug} href={`/funding/${o.slug}`} className="rounded-lg border bg-white p-4 shadow-sm">
            <h3 className="font-medium">{o.title}</h3>
            <div className="mt-2 text-sm text-neutral-600">
              <p>Type: <span className="capitalize">{o.type.replace('_', ' ')}</span></p>
              <p>Amount: {o.amount}</p>
              <p>Deadline: {new Date(o.deadline).toLocaleDateString()}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}