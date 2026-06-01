import { Nav } from '@/components/layout/Nav'

export default function GalerieLoading() {
  return (
    <div className="font-body-md antialiased bg-white min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* Hero skeleton */}
      <section className="bg-border-dark pt-24 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="h-3 w-24 bg-white/20 rounded mb-4 animate-pulse" />
          <div className="h-14 w-52 bg-white/20 rounded mb-6 animate-pulse" />
          <div className="h-4 w-96 bg-white/10 rounded animate-pulse" />
        </div>
      </section>

      {/* Album grid skeleton */}
      <main className="py-section-padding-mobile md:py-section-padding-desktop">
        <div className="max-w-container-max mx-auto px-gutter space-y-20 md:space-y-28">
          <div>
            <div className="flex items-center gap-6 mb-10">
              <div className="h-12 w-28 bg-surface-container-high rounded animate-pulse shrink-0" />
              <div className="flex-1 h-px bg-surface-container-high" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-surface-container-high animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
