import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { AlbumCard } from '@/components/gallery/AlbumCard'
import { SectionError } from '@/components/ui/SectionError'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { getGalleryAlbums, type GalleryAlbumCard } from '@/sanity/lib/queries'

export default async function GaleriePage() {
  const albums = await getGalleryAlbums()

  const byYear: Record<string, GalleryAlbumCard[]> = {}
  if (Array.isArray(albums)) {
    for (const album of albums) {
      const year = new Date(album.date).getFullYear().toString()
      if (!byYear[year]) byYear[year] = []
      byYear[year].push(album)
    }
  }
  const years = Object.keys(byYear).sort((a, b) => Number(b) - Number(a))

  return (
    <div className="font-body-md antialiased bg-white min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* ── HERO ── */}
      <section className="bg-border-dark pt-24 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-container-max mx-auto px-gutter">
          <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-4">
            Fotogalerie
          </span>
          <h1
            className="font-black uppercase tracking-tight leading-none text-white mb-6"
            style={{ fontSize: "clamp(40px, 6vw, 80px)", letterSpacing: "-0.03em" }}
          >
            Galerie
          </h1>
          <p
            className="text-white/55 font-light max-w-xl leading-relaxed"
            style={{ fontSize: "clamp(14px, 1.1vw, 17px)" }}
          >
            Fotky z tréninků, závodů, táborů a akcí Trampolín Liberec a Trampolín Patrman.
          </p>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <main className="py-section-padding-mobile md:py-section-padding-desktop">
        <div className="max-w-container-max mx-auto px-gutter">
          {albums === null ? (
            <SectionError message="Galerie se momentálně nepodařilo načíst. Zkuste obnovit stránku." />
          ) : albums.length === 0 ? (
            <p className="text-on-surface-variant font-light">Alba brzy přibydou.</p>
          ) : (
            <div className="space-y-20 md:space-y-28">
              {years.map((year) => (
                <ScrollReveal key={year}>
                  <div className="flex items-center gap-6 mb-10">
                    <span
                      className="font-black uppercase tracking-tight leading-none text-border-dark shrink-0"
                      style={{ fontSize: "clamp(36px, 5vw, 64px)" }}
                    >
                      {year}
                    </span>
                    <div className="flex-1 h-px bg-surface-container-high" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {byYear[year].map((album) => (
                      <AlbumCard key={album._id} album={album} />
                    ))}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
