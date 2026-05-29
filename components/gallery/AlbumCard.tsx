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
    <Link href={`/galerie/${album.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={urlFor(album.coverImage).width(600).height(450).url()}
          alt={album.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent group-hover:from-black/85 transition-all duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <p className="font-label-bold text-[10px] uppercase tracking-widest text-white/55 mb-1">
            {formatDate(album.date)} · {album.photoCount} fotek
          </p>
          <h2 className="font-bold text-[14px] md:text-[15px] leading-tight text-white uppercase tracking-tight">
            {album.title}
          </h2>
        </div>
      </div>
    </Link>
  )
}
