export default function ProjectsPage() {
  const projects = [
    { slug: 'solar-village-kenya', title: 'Solar Village Initiative', country: 'Kenya', category: 'renewable_energy' },
    { slug: 'agri-supply-ghana', title: 'Agri Supply Chain', country: 'Ghana', category: 'agriculture' },
    { slug: 'healthtech-nigeria', title: 'Community HealthTech', country: 'Nigeria', category: 'healthcare' },
  ]

  return (
    <div className="container py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <a href="/projects/create" className="rounded bg-primary-green px-3 py-2 text-white">Create Project</a>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {projects.map((p) => (
          <a key={p.slug} href={`/projects/${p.slug}`} className="rounded-lg border bg-white p-4 shadow-sm">
            <div className="h-32 rounded bg-neutral-100" />
            <h3 className="mt-3 font-medium">{p.title}</h3>
            <div className="mt-2 flex justify-between text-sm text-neutral-600">
              <span>{p.country}</span>
              <span className="capitalize">{p.category.replace('_', ' ')}</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}