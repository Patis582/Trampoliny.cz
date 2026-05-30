import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
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

  const heroPhoto = album.photos[0] ?? null

  return (
    <div className="font-body-md antialiased bg-white min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* ── HERO ── */}
      <section
        className="relative overflow-hidden flex flex-col justify-end"
        style={{ height: "65vh", minHeight: 480 }}
      >
        <div className="absolute inset-0">
          {heroPhoto ? (
            <Image
              src={heroPhoto.url}
              alt={album.title}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
          ) : (
            <div className="w-full h-full bg-border-dark" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-container-max mx-auto px-gutter pb-12 md:pb-16">
          <Link
            href="/galerie"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors font-label-bold text-[9px] uppercase tracking-widest mb-8 group"
          >
            <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Všechna alba
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <div className="w-6 h-px bg-brand-orange" />
            <span className="text-[10px] font-label-bold uppercase tracking-[0.4em] text-white/50">
              {formatDate(album.date)} · {album.photos.length} fotek
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <h1
              className="font-black text-white uppercase tracking-tight leading-none"
              style={{ fontSize: "clamp(32px, 5vw, 72px)", letterSpacing: "-0.03em" }}
            >
              {album.title}
            </h1>
            {album.event?.slug && (
              <Link
                href={`/akce/${album.event.slug}`}
                className="shrink-0 inline-flex items-center gap-2 font-label-bold text-[11px] uppercase tracking-widest text-white/50 hover:text-white transition-colors"
              >
                Zobrazit akci
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ── FOTKY ── */}
      <main className="py-section-padding-mobile md:py-section-padding-desktop bg-white">
        <div className="max-w-container-max mx-auto px-gutter">
          <AlbumGallery photos={album.photos} />
        </div>
      </main>

      {/* ── BACK LINK ── */}
      <div className="border-t border-surface-container-high py-10">
        <div className="max-w-container-max mx-auto px-gutter">
          <Link
            href="/galerie"
            className="inline-flex items-center gap-2 font-label-bold text-[11px] uppercase tracking-widest text-outline hover:text-border-dark transition-colors group"
          >
            <svg className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Zpět na galerii
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
