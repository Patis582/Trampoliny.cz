import { Nav } from '@/components/layout/Nav'

export default function DokumentyLoading() {
  return (
    <div className="font-body-md antialiased bg-border-dark min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* Hero skeleton */}
      <section className="bg-border-dark pt-24 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="h-3 w-24 bg-white/20 rounded mb-4 animate-pulse" />
          <div className="h-14 w-52 bg-white/20 rounded mb-6 animate-pulse" />
          <div className="h-4 w-72 bg-white/10 rounded animate-pulse" />
        </div>
      </section>

      {/* Content skeleton */}
      <div className="max-w-container-max mx-auto px-gutter py-section-padding-mobile md:py-section-padding-desktop">
        {/* Tab buttons */}
        <div className="flex flex-wrap gap-2 mb-12">
          {[140, 160, 90].map((w, i) => (
            <div
              key={i}
              className="h-10 bg-white/10 rounded animate-pulse"
              style={{ width: w }}
            />
          ))}
        </div>

        {/* Category label + divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-3 w-36 bg-white/20 rounded animate-pulse shrink-0" />
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Document rows */}
        {[62, 48, 55, 70].map((pct, i) => (
          <div key={i} className="flex justify-between items-center py-4 border-b border-white/5">
            <div
              className="h-4 bg-white/10 rounded animate-pulse"
              style={{ width: `${pct}%` }}
            />
            <div className="h-3 w-16 bg-white/10 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}
