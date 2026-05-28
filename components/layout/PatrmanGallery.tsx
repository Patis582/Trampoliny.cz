"use client";

import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const photos = [
  { src: "/hero-patrman-6.jpg",  alt: "Kroužky pro děti",        offset: "md:-translate-y-5" },
  { src: "/hero-patrman-14.jpg", alt: "Trenér s dítětem",        offset: "md:translate-y-5" },
  { src: "/hero-patrman-22.jpg", alt: "Skupina batolat",         offset: "md:-translate-y-5" },
  { src: "/hero-patrman-28.jpg", alt: "Backflip",                offset: "md:translate-y-5" },
  { src: "/hero-patrman-30.jpg", alt: "Akrobacie s trenérem",   offset: "md:-translate-y-5" },
  { src: "/hero-patrman-4.jpg",  alt: "Děti s míči",             offset: "md:translate-y-5" },
  { src: "/hero-patrman-9.jpg",  alt: "Děti na trampolíně",     offset: "md:-translate-y-5" },
  { src: "/hero-patrman-19.jpg", alt: "Starší děti na koberci", offset: "md:translate-y-5" },
];

const slides = photos.map(({ src, alt }) => ({ src, alt }));

export function PatrmanGallery() {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 py-6">
        {photos.map(({ src, alt, offset }, i) => (
          <button
            key={src}
            onClick={() => setIndex(i)}
            className={`group relative aspect-[4/3] overflow-hidden cursor-zoom-in ${offset}`}
          >
            <Image
              src={src}
              alt={alt}
              fill
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
              sizes="(max-width:768px) 50vw, 25vw"
            />
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
