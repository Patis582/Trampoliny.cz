import { Nav } from '@/components/layout/Nav'

export default function AlbumLoading() {
  return (
    <div className="font-body-md antialiased bg-white min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* Hero skeleton */}
      <div className="relative w-full bg-border-dark" style={{ height: '50vh', minHeight: 320 }}>
        <div className="absolute inset-0 bg-border-dark animate-pulse" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-container-max mx-auto">
            <div className="h-3 w-32 bg-white/20 rounded mb-4 animate-pulse" />
            <div className="h-10 w-72 bg-white/20 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Masonry skeleton */}
      <main className="py-section-padding-mobile md:py-section-padding-desktop">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-3">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="break-inside-avoid mb-3 bg-surface-container-high animate-pulse"
                style={{ height: `${[180, 240, 160, 220, 200, 280, 150, 260][i % 8]}px` }}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
