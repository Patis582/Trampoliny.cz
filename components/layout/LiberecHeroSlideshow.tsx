"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/hero-liberec-1.jpg", alt: "TC Orionka Liberec" },
  { src: "/hero-liberec-2.jpg", alt: "TC Orionka Liberec" },
  { src: "/hero-liberec-4.jpg", alt: "TC Orionka Liberec" },
];

const kenburnsClass = ["kenburns-1", "kenburns-2", "kenburns-3"];

const randomNext = (current: number, total: number) => {
  if (total <= 1) return 0;
  let next: number;
  do { next = Math.floor(Math.random() * total); } while (next === current);
  return next;
};

export function LiberecHeroSlideshow() {
  const [current, setCurrent] = useState(() => Math.floor(Math.random() * slides.length));
  const [keys, setKeys] = useState([0, 0, 0]);

  useEffect(() => {
    const id = setInterval(() => {
      setCurrent((prev) => {
        const next = randomNext(prev, slides.length);
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
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${i === current ? "opacity-100" : "opacity-0"}`}
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
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
    </div>
  );
}
