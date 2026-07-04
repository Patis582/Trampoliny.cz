"use client";

import { useEffect, useState, type CSSProperties } from "react";

export function PatrmanHeroContent() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
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
    <div className="relative z-10 h-full flex flex-col justify-end px-gutter max-w-container-max mx-auto pb-16 md:pb-24">
      <div style={fadeUp(0)} className="flex items-center gap-3 mb-6">
        <div className="w-6 h-px bg-brand-green" />
        <span className="text-[12px] font-label-bold uppercase tracking-[0.4em] text-white/40">
          Tábory · Oslavy · Skákání · Liberec
        </span>
      </div>

      <h1 className="font-black uppercase leading-none mb-6">
        <span className="block overflow-hidden">
          <span className="block text-white" style={{ fontSize: "clamp(48px, 9vw, 128px)", letterSpacing: "-0.04em", lineHeight: 0.92, ...slideIn(60) }}>
            Tábory,
          </span>
        </span>
        <span className="block overflow-hidden">
          <span className="block text-white" style={{ fontSize: "clamp(48px, 9vw, 128px)", letterSpacing: "-0.04em", lineHeight: 0.92, ...slideIn(210) }}>
            Oslavy
          </span>
        </span>
        <span className="block overflow-hidden">
          <span className="block text-brand-green" style={{ fontSize: "clamp(48px, 9vw, 128px)", letterSpacing: "-0.04em", lineHeight: 0.92, ...slideIn(360) }}>
            &amp; skákání
          </span>
        </span>
      </h1>

      <p
        className="text-white/55 font-light mb-10 max-w-md leading-relaxed"
        style={{ fontSize: "clamp(14px, 1.1vw, 16px)", ...fadeUp(500) }}
      >
        Pohyb, radost a skvělá parta. Dvě haly v Liberci, zkušení trenéři a programy pro všechny věkové kategorie — od batolat po dospělé.


      </p>

      <div style={fadeUp(620)} className="flex flex-col sm:flex-row gap-4 mb-8">
        <a
          href="#sluzby"
          className="inline-flex justify-center items-center bg-brand-green text-border-dark font-label-bold text-[11px] uppercase tracking-wider px-7 py-4 hover:bg-white hover:text-border-dark transition-all duration-300 cursor-pointer"
        >
          Naše služby
        </a>
        <a
          href="#kontakt"
          className="inline-flex justify-center items-center gap-3 bg-white/10 text-white font-label-bold text-[11px] uppercase tracking-wider px-7 py-4 border border-white/25 backdrop-blur-sm hover:bg-white hover:text-brand-navy-deep transition-all duration-300 cursor-pointer"
        >
          Kontakt
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>

      <div style={fadeUp(720)} className="flex gap-5">
        <a href="https://www.instagram.com/trampolinypatrman/" target="_blank" rel="noopener noreferrer" className="font-label-bold text-[10px] uppercase tracking-widest text-white/40 hover:text-brand-green transition-colors">Instagram</a>
        <a href="https://www.facebook.com/trampolinypatrman/" target="_blank" rel="noopener noreferrer" className="font-label-bold text-[10px] uppercase tracking-widest text-white/40 hover:text-brand-green transition-colors">Facebook</a>
      </div>
    </div>
  );
}
