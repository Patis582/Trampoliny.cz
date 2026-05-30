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
      <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-3">
        {photos.map((photo, i) => (
          <button
            key={photo._key}
            onClick={() => setIndex(i)}
            className="break-inside-avoid mb-3 block w-full cursor-zoom-in overflow-hidden group relative"
          >
            <Image
              src={photo.url}
              alt={photo.alt ?? ''}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
              </svg>
            </div>
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
