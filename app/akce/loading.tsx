export default function AkceLoading() {
  return (
    <div className="font-body-md antialiased bg-white min-h-screen">
      {/* Hero skeleton */}
      <section className="bg-border-dark pt-24 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="h-3 w-20 bg-white/20 rounded mb-4 animate-pulse" />
          <div className="h-14 w-40 bg-white/20 rounded mb-6 animate-pulse" />
          <div className="h-4 w-[480px] max-w-full bg-white/10 rounded animate-pulse" />
        </div>
      </section>

      {/* Filter bar + cards skeleton */}
      <main className="py-section-padding-mobile md:py-section-padding-desktop">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="flex gap-2 flex-wrap mb-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-8 w-20 bg-surface-container-high rounded animate-pulse" />
            ))}
          </div>

          <div className="h-6 w-48 bg-surface-container-high rounded mb-8 animate-pulse" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3 pt-4 border-t-2 border-surface-container-high">
                <div className="aspect-video bg-surface-container-high animate-pulse" />
                <div className="h-3 w-32 bg-surface-container-high rounded animate-pulse" />
                <div className="h-5 w-full bg-surface-container-high rounded animate-pulse" />
                <div className="h-3 w-16 bg-surface-container-high rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
