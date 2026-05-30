"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const photos = [
  { src: "/hero-patrman-22.jpg", alt: "Skupina dětí na trampolíně" },
  { src: "/hero-patrman-31.jpg", alt: "Trampolíny Patrman" },
  { src: "/hero-patrman-6.jpg",  alt: "Kroužky pro děti" },
  { src: "/hero-patrman-14.jpg", alt: "Trenér s dítětem" },
  { src: "/hero-patrman-28.jpg", alt: "Akrobacie" },
  { src: "/hero-patrman-9.jpg",  alt: "Děti na trampolíně" },
];

export function PatrmanGallery() {
  const [index, setIndex] = useState(-1);
  const slides = photos.map(({ src, alt }) => ({ src, alt }));

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {/* Two wide feature photos */}
        {photos.slice(0, 2).map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setIndex(i)}
            className="col-span-2 relative aspect-video overflow-hidden cursor-zoom-in group"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </button>
        ))}

        {/* Four square photos */}
        {photos.slice(2).map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setIndex(i + 2)}
            className="relative aspect-square overflow-hidden cursor-zoom-in group"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
          </button>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
      />
    </>
  );
}
