import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/image'
import type { GalleryAlbumCard } from '@/sanity/lib/queries'

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function AlbumCard({ album }: { album: GalleryAlbumCard }) {
  return (
    <Link href={`/galerie/${album.slug}`} className="group block cursor-pointer">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={urlFor(album.coverImage).width(600).height(450).url()}
          alt={album.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Stálý gradient pro čitelnost textu dole */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />

        {/* Hover overlay — tmavý + CTA */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="inline-flex items-center gap-2.5 font-label-bold text-[11px] uppercase tracking-widest text-white border border-white/50 px-5 py-3">
            Prohlédnout
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>

        {/* Spodní text — mizí na hover */}
        <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 group-hover:opacity-0 transition-opacity duration-300">
          <p className="font-label-bold text-[10px] uppercase tracking-widest text-white/50 mb-2">
            {formatDate(album.date)} · {album.photoCount} fotek
          </p>
          <h2
            className="font-black text-white uppercase tracking-tight leading-tight"
            style={{ fontSize: "clamp(14px, 1.5vw, 18px)" }}
          >
            {album.title}
          </h2>
        </div>
      </div>
    </Link>
  )
}
