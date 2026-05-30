"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { HeroScrollHint } from "./HeroScrollHint";

const slides = [
  { src: "/hero.jpg",           alt: "Trampolíny Liberec" },
  { src: "/hero-liberec-1.jpg", alt: "Závodní trampolíny Liberec" },
  { src: "/hero-patrman-1.jpg", alt: "Trampolíny Patrman" },
];

const kenburns = ["kenburns-1", "kenburns-2", "kenburns-3"];

export function HomeCinematicHero() {
  const [mounted, setMounted] = useState(false);
  const [current, setCurrent] = useState(0);
  const [keys, setKeys] = useState([0, 0, 0]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

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

  const slideIn = (delay: number): CSSProperties => ({
    transform: mounted ? "translateY(0)" : "translateY(108%)",
    opacity: mounted ? 1 : 0,
    transition: `transform 0.85s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity 0.85s ease ${delay}ms`,
  });

  const fadeUp = (delay: number): CSSProperties => ({
    transform: mounted ? "translateY(0)" : "translateY(16px)",
    opacity: mounted ? 1 : 0,
    transition: `transform 0.65s ease ${delay}ms, opacity 0.65s ease ${delay}ms`,
  });

  return (
    <section
      className="relative h-screen overflow-hidden"
      style={{ height: "100svh", minHeight: 600 }}
    >
      {/* Slideshow */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${i === current ? "opacity-100" : "opacity-0"}`}
          >
            <div key={keys[i]} className={`absolute inset-0 ${kenburns[i]}`}>
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
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Content — anchored to bottom */}
      <div className="relative z-10 h-full flex flex-col justify-end px-gutter max-w-container-max mx-auto pb-16 md:pb-24">
        <div style={fadeUp(0)} className="flex items-center gap-3 mb-6">
          <div className="w-6 h-px bg-brand-orange" />
          <span className="text-[10px] font-label-bold uppercase tracking-[0.4em] text-white/40">
            TC Orionka · Nádraží · Liberec
          </span>
        </div>

        <h1 className="font-black uppercase leading-none mb-6">
          <span className="block overflow-hidden">
            <span
              className="block text-white"
              style={{ fontSize: "clamp(52px, 10vw, 144px)", letterSpacing: "-0.04em", lineHeight: 0.92, ...slideIn(60) }}
            >
              Posouvej limity
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              className="block text-brand-orange"
              style={{ fontSize: "clamp(52px, 10vw, 144px)", letterSpacing: "-0.04em", lineHeight: 0.92, ...slideIn(210) }}
            >
              na maximum
            </span>
          </span>
        </h1>

        <p
          className="text-white/55 font-light mb-10 max-w-md leading-relaxed"
          style={{ fontSize: "clamp(14px, 1.1vw, 16px)", ...fadeUp(390) }}
        >
          Závody, tábory, oslavy i parkour. Dvě haly v Liberci pro každého.
        </p>

        <div style={fadeUp(500)} className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/trampoliny-liberec"
            className="inline-flex justify-center items-center bg-brand-orange text-white font-label-bold text-[11px] uppercase tracking-wider px-7 py-4 hover:bg-white hover:text-brand-orange transition-all duration-300 cursor-pointer"
          >
            Sportovní oddíl
          </Link>
          <Link
            href="#sluzby"
            className="inline-flex justify-center items-center gap-3 bg-white/10 text-white font-label-bold text-[11px] uppercase tracking-wider px-7 py-4 border border-white/25 backdrop-blur-sm hover:bg-white hover:text-brand-navy-deep transition-all duration-300 cursor-pointer group"
          >
            Naše služby
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>

      <HeroScrollHint />
    </section>
  );
}
