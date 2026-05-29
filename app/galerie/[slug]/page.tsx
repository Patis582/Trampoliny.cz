import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { AlbumGallery } from '@/components/gallery/AlbumGallery'
import { getGalleryAlbumBySlug, getAllGalleryAlbumSlugs } from '@/sanity/lib/queries'

export async function generateStaticParams() {
  const slugs = await getAllGalleryAlbumSlugs()
  return slugs.map((slug) => ({ slug }))
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export default async function GalerieAlbumPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const album = await getGalleryAlbumBySlug(slug)
  if (!album) notFound()

  return (
    <div className="font-body-md antialiased bg-white min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>
      <main className="pt-24 md:pt-40 pb-section-padding-mobile md:pb-section-padding-desktop">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="pb-8 mb-8 md:pb-10 md:mb-10 border-b border-surface-container-high">
            <Link
              href="/galerie"
              className="inline-flex items-center gap-2 text-outline hover:text-border-dark transition-colors font-label-bold text-[10px] uppercase tracking-widest mb-6 group"
            >
              <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Všechna alba
            </Link>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-3">
                  {formatDate(album.date)} · {album.photos.length} fotek
                </span>
                <h1 className="font-headline-md-mobile text-headline-md-mobile md:font-headline-md md:text-headline-md text-border-dark uppercase tracking-tight">
                  {album.title}
                </h1>
              </div>
              {album.event?.slug && (
                <Link
                  href={`/akce/${album.event.slug}`}
                  className="shrink-0 font-label-bold text-[11px] uppercase tracking-widest text-outline hover:text-brand-orange transition-colors"
                >
                  Zobrazit akci →
                </Link>
              )}
            </div>
          </div>

          <AlbumGallery photos={album.photos} />
        </div>
      </main>
      <Footer />
    </div>
  )
}
