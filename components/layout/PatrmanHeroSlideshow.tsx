"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/hero-patrman-31.jpg", alt: "Trampolíny Patrman" },
  { src: "/hero-patrman-7.jpg", alt: "Trampolíny Patrman" },
  { src: "/hero-patrman-18.jpg", alt: "Trampolíny Patrman" },
  { src: "/hero-patrman-10.jpg", alt: "Trampolíny Patrman" },
];

const kenburnsClass = ["kenburns-1", "kenburns-2", "kenburns-3", "kenburns-1"];

export function PatrmanHeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [keys, setKeys] = useState([0, 0, 0, 0]);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % slides.length;
        setKeys((k) => k.map((v, i) => (i === next ? v + 1 : v)));
        return next;
      });
    }, 7000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={slide.src}
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${i === current ? "opacity-100" : "opacity-0"
            }`}
        >
          <div key={keys[i]} className={`absolute inset-0 ${kenburnsClass[i]}`}>
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              sizes="100vw"
              className="object-cover object-center"
              priority={i === 0}
            />
          </div>
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </div>
  );
}
