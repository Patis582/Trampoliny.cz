'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import Download from 'yet-another-react-lightbox/plugins/download'
import 'yet-another-react-lightbox/styles.css'
import type { GalleryPhoto } from '@/sanity/lib/queries'

interface Props {
  photos: GalleryPhoto[]
}

export function AlbumGallery({ photos }: Props) {
  const [index, setIndex] = useState(-1)

  const slides = photos.map((photo) => ({
    src: photo.url,
    width: photo.width,
    height: photo.height,
    alt: photo.alt ?? '',
    download: { url: photo.url, filename: photo.alt ?? 'photo' },
  }))

  return (
    <>
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-3">
        {photos.map((photo, i) => (
          <button
            key={photo._key}
            onClick={() => setIndex(i)}
            className="break-inside-avoid mb-3 block w-full cursor-zoom-in overflow-hidden group"
          >
            <Image
              src={photo.url}
              alt={photo.alt ?? ''}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Download]}
      />
    </>
  )
}
