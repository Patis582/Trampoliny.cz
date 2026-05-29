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
      <div className="relative aspect-[4/3] overflow-hidden mb-3">
        <Image
          src={urlFor(album.coverImage).width(600).height(450).url()}
          alt={album.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      <p className="font-label-bold text-[10px] uppercase tracking-widest text-outline mb-1">
        {formatDate(album.date)} · {album.photoCount} fotek
      </p>
      <h2 className="font-headline-sm-mobile text-headline-sm-mobile md:font-headline-sm md:text-headline-sm text-border-dark uppercase tracking-tight group-hover:text-brand-orange transition-colors">
        {album.title}
      </h2>
    </Link>
  )
}
