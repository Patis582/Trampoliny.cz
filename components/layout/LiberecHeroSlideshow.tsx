"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/hero-liberec-1.jpg", alt: "TC Orionka Liberec" },
  { src: "/hero-liberec-2.jpg", alt: "TC Orionka Liberec" },
  { src: "/hero-liberec3.jpg", alt: "TC Orionka Liberec" },
];

const kenburnsClass = ["kenburns-1", "kenburns-2", "kenburns-3"];

export function LiberecHeroSlideshow() {
  const [current, setCurrent] = useState(0);
  const [keys, setKeys] = useState([0, 0, 0]);

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
      <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep via-brand-navy-deep/50 to-brand-navy-deep/10" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-navy-deep/80 to-transparent" />
    </div>
  );
}
