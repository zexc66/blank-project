export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-green/10 via-primary-gold/10 to-primary-blue/10">
        <div className="container py-16">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <h1 className="font-heading text-3xl font-bold md:text-5xl">
                Empowering Sustainable Business Across Africa
              </h1>
              <p className="mt-4 text-neutral-700">
                Discover projects, funding opportunities, and partners to drive impact and growth.
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href="/projects"
                  className="rounded bg-primary-green px-4 py-2 text-white hover:opacity-90"
                >
                  Explore Projects
                </a>
                <a
                  href="/funding"
                  className="rounded border border-primary-blue px-4 py-2 text-primary-blue hover:bg-primary-blue/10"
                >
                  Find Funding
                </a>
              </div>
            </div>
            <div className="rounded-lg border bg-white p-6 shadow-sm">
              <form action="/projects" className="space-y-3">
                <div>
                  <label className="text-sm text-neutral-600">Search</label>
                  <input
                    name="q"
                    placeholder="e.g. solar, agriculture, fintech"
                    className="mt-1 w-full rounded border px-3 py-2"
                  />
                </div>
                <div className="grid gap-3 md:grid-cols-3">
                  <input className="rounded border px-3 py-2" placeholder="Country" />
                  <input className="rounded border px-3 py-2" placeholder="Category" />
                  <input className="rounded border px-3 py-2" placeholder="Funding Range" />
                </div>
                <button className="w-full rounded bg-primary-orange px-3 py-2 font-medium text-white hover:opacity-90">
                  Search Projects
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="container py-12">
        <h2 className="text-2xl font-semibold">Featured Projects</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="rounded-lg border bg-white p-4 shadow-sm">
              <div className="h-32 rounded bg-neutral-100" />
              <h3 className="mt-3 font-medium">Project {i}</h3>
              <p className="text-sm text-neutral-600">
                Short description of the project and its impact area.
              </p>
              <div className="mt-3 flex justify-between">
                <span className="text-sm text-neutral-500">Kenya</span>
                <a className="text-sm text-primary-blue hover:underline" href={`/projects/project-${i}`}>
                  View
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}