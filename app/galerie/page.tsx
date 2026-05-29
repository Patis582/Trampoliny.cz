import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { AlbumCard } from '@/components/gallery/AlbumCard'
import { SectionError } from '@/components/ui/SectionError'
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
      <main className="pt-24 md:pt-40 pb-section-padding-mobile md:pb-section-padding-desktop">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="pb-8 mb-8 md:pb-10 md:mb-10 border-b border-surface-container-high">
            <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-3">
              Fotogalerie
            </span>
            <h1 className="font-headline-md-mobile text-headline-md-mobile md:font-headline-md md:text-headline-md text-border-dark uppercase tracking-tight">
              Galerie
            </h1>
          </div>

          {albums === null ? (
            <SectionError message="Galerie se momentálně nepodařilo načíst. Zkuste obnovit stránku." />
          ) : albums.length === 0 ? (
            <p className="font-body-md text-on-surface-variant font-light">Alba brzy přibydou.</p>
          ) : (
            <div className="space-y-12">
              {years.map((year) => (
                <div key={year}>
                  <h2 className="font-label-bold text-[10px] uppercase tracking-widest text-outline mb-5">
                    {year}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {byYear[year].map((album) => (
                      <AlbumCard key={album._id} album={album} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
