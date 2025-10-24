interface Params {
  params: { slug: string }
}

export default function ProjectDetailPage({ params }: Params) {
  const { slug } = params

  // Placeholder data. Replace with Supabase fetch by slug.
  const project = {
    title: 'Solar Village Initiative',
    description:
      'A community-led solar microgrid project delivering affordable, clean energy to rural households.',
    country: 'Kenya',
    city: 'Kisumu',
    category: 'renewable_energy',
    fundingGoal: 250000,
    fundingRaised: 85000,
  }

  const progress = Math.round((project.fundingRaised / project.fundingGoal) * 100)

  return (
    <div className="container py-10">
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="h-64 rounded-lg bg-neutral-100" />
          <h1 className="mt-6 text-3xl font-bold">{project.title}</h1>
          <div className="mt-3 flex flex-wrap gap-2 text-sm text-neutral-600">
            <span className="rounded bg-neutral-100 px-2 py-1">{project.country}</span>
            <span className="rounded bg-neutral-100 px-2 py-1">{project.city}</span>
            <span className="rounded bg-neutral-100 px-2 py-1 capitalize">
              {project.category.replace('_', ' ')}
            </span>
          </div>

          <div className="mt-6">
            <h2 className="text-xl font-semibold">Overview</h2>
            <p className="mt-2 text-neutral-700">{project.description}</p>
          </div>

          <div className="mt-8">
            <h2 className="text-xl font-semibold">Impact</h2>
            <ul className="mt-2 list-disc pl-5 text-neutral-700">
              <li>1000 households connected to clean energy</li>
              <li>30 local jobs created</li>
              <li>SDG7: Affordable and Clean Energy</li>
            </ul>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <h3 className="font-medium">Funding Progress</h3>
            <div className="mt-2 h-2 w-full rounded bg-neutral-200">
              <div
                className="h-2 rounded bg-primary-green"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-sm text-neutral-600">
              <span>Raised: ${project.fundingRaised.toLocaleString()}</span>
              <span>Goal: ${project.fundingGoal.toLocaleString()}</span>
            </div>
            <div className="mt-4 space-y-2">
              <button className="w-full rounded bg-primary-orange px-3 py-2 text-white">
                Donate
              </button>
              <button className="w-full rounded border border-primary-blue px-3 py-2 text-primary-blue">
                Contact Owner
              </button>
              <button className="w-full rounded border border-primary-gold px-3 py-2">
                Apply to Funding
              </button>
            </div>
          </div>

          <div className="rounded-lg border bg-white p-4 shadow-sm">
            <h3 className="font-medium">Project Owner</h3>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-neutral-200" />
              <div>
                <p className="font-medium">Jane Doe</p>
                <p className="text-sm text-neutral-600">Entrepreneur</p>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}