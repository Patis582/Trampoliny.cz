"use client";

import { useState, useCallback } from "react";
import Image from "next/image";

type HallPanelProps = {
  name: string;
  subtitle: string;
  description: string;
  accentColor: string;
  slides: string[];
};

function HallPanel({ name, subtitle, description, accentColor, slides }: HallPanelProps) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() => setCurrent(i => (i - 1 + slides.length) % slides.length), [slides.length]);
  const next = useCallback(() => setCurrent(i => (i + 1) % slides.length), [slides.length]);

  return (
    <div className="relative flex-1 h-[50vh] md:h-[62vh] overflow-hidden" style={{ minHeight: 340 }}>
      {slides.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={src}
            alt={name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={i === 0}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/15" />

      <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10">
        <span className={`font-label-bold text-[10px] uppercase tracking-widest mb-2 ${accentColor}`}>
          {subtitle}
        </span>
        <h3
          className="font-black uppercase tracking-tight leading-none text-white mb-3"
          style={{ fontSize: "clamp(22px, 2.8vw, 38px)" }}
        >
          {name}
        </h3>
        <p
          className="text-white/55 font-light leading-relaxed mb-8 max-w-xs"
          style={{ fontSize: "clamp(13px, 1vw, 15px)" }}
        >
          {description}
        </p>

        <div className="flex items-center gap-4">
          <button
            onClick={prev}
            aria-label="Předchozí fotka"
            className="w-10 h-10 flex items-center justify-center border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-200 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <span className="font-label-bold text-[10px] text-white/35 uppercase tracking-widest tabular-nums">
            {current + 1} / {slides.length}
          </span>
          <button
            onClick={next}
            aria-label="Další fotka"
            className="w-10 h-10 flex items-center justify-center border border-white/30 text-white hover:bg-white hover:text-black transition-all duration-200 cursor-pointer"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

const ORIONKA_SLIDES = [
  "/fotky-orionka/hero.jpg",
  "/fotky-orionka/hero2.jpg",
  "/fotky-orionka/hero3.jpg",
  "/fotky-orionka/hero-liberec-2.jpg",
  "/fotky-orionka/hero-liberec3.jpg",
  "/fotky-orionka/recepce-1.jpg",
  "/fotky-orionka/recepce-2.jpg",
];

const NADRAZI_SLIDES = [
  "/fotky-nadrazi/nadrazi.JPG",
  "/fotky-nadrazi/nadrazi2.JPG",
  "/fotky-nadrazi/recepce_nadrazi.JPG",
  "/fotky-nadrazi/recepce1_nadrazi.JPG",
];

export function HallsSection() {
  return (
    <section className="flex flex-col md:flex-row">
      <HallPanel
        name="TC Orionka"
        subtitle="Závodní hala · Harcov"
        description="Profesionální závodní trampolíny, DMT dráha a vybavení pro akrobatiku. Domov závodního oddílu Trampolíny Liberec."
        accentColor="text-brand-orange"
        slides={ORIONKA_SLIDES}
      />
      <div className="hidden md:block w-px bg-white/10 shrink-0" />
      <HallPanel
        name="Hala Nádraží"
        subtitle="Veřejné skákání · Centrum"
        description="Trampolínová hala pro volné skákání, kroužky, tábory a oslavy. Přímo u hlavního nádraží v Liberci."
        accentColor="text-brand-green"
        slides={NADRAZI_SLIDES}
      />
    </section>
  );
}
