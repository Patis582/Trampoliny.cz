"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, type CSSProperties } from "react";
import { HeroScrollHint } from "./HeroScrollHint";

export function HomeSplitHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const slideIn = (delay: number): CSSProperties => ({
    transform: mounted ? "translateY(0)" : "translateY(108%)",
    opacity: mounted ? 1 : 0,
    transition: `transform 0.75s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms, opacity 0.75s ease ${delay}ms`,
  });

  const fadeUp = (delay: number): CSSProperties => ({
    transform: mounted ? "translateY(0)" : "translateY(18px)",
    opacity: mounted ? 1 : 0,
    transition: `transform 0.65s ease ${delay}ms, opacity 0.65s ease ${delay}ms`,
  });

  return (
    <section
      className="relative flex flex-col bg-brand-navy-deep overflow-hidden h-screen"
      style={{ height: "100svh", minHeight: 600 }}
    >
      {/* ── Headline ── */}
      <div
        className="relative z-20 flex-shrink-0 px-gutter max-w-container-max mx-auto w-full"
        style={{ paddingTop: "clamp(100px, 14vh, 132px)", paddingBottom: "clamp(16px, 2vh, 24px)" }}
      >
        <div style={fadeUp(0)} className="flex items-center gap-3 mb-4">
          <div className="w-6 h-px bg-brand-orange" />
          <span className="text-[10px] font-label-bold uppercase tracking-[0.4em] text-white/40">
            TC Orionka · Nádraží · Liberec
          </span>
        </div>

        <h1 className="font-black uppercase leading-none mb-4">
          <span className="block overflow-hidden">
            <span
              className="block text-white"
              style={{
                fontSize: "clamp(48px, 8.5vw, 118px)",
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                ...slideIn(60),
              }}
            >
              Posouvej limity
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              className="block text-brand-orange"
              style={{
                fontSize: "clamp(48px, 8.5vw, 118px)",
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                ...slideIn(210),
              }}
            >
              na maximum
            </span>
          </span>
        </h1>

        <p
          className="text-white/50 font-light leading-relaxed"
          style={{ fontSize: "clamp(13px, 1.1vw, 15px)", maxWidth: 340, ...fadeUp(400) }}
        >
          Závody, tábory, oslavy i parkour. Dvě haly v Liberci pro každého.
        </p>
      </div>

      {/* ── Split panels ── */}
      <div className="relative flex-1 overflow-hidden">

        {/* MOBILE: single panel */}
        <div className="md:hidden absolute inset-0">
          <div className="absolute inset-0 kenburns-1">
            <Image
              src="/hero-liberec-1.jpg"
              alt="Závodní trampolíny v Liberci"
              fill
              sizes="100vw"
              className="object-cover"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep/95 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 z-10 px-gutter pb-10 flex flex-col gap-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/trampoliny-liberec"
                className="inline-flex justify-center items-center bg-brand-orange text-white font-label-bold text-[11px] uppercase tracking-wider px-6 py-3.5 hover:bg-white hover:text-brand-orange transition-all duration-300 cursor-pointer"
              >
                Sportovní oddíl
              </Link>
              <Link
                href="#sluzby"
                className="inline-flex justify-center items-center bg-white/10 text-white font-label-bold text-[11px] uppercase tracking-wider px-6 py-3.5 border border-white/25 backdrop-blur-sm hover:bg-white hover:text-brand-navy-deep transition-all duration-300 cursor-pointer"
              >
                Naše služby →
              </Link>
            </div>
          </div>
        </div>

        {/* DESKTOP: two-panel split */}
        <div className="hidden md:flex h-full">

          {/* Left — závodní oddíl */}
          <div className="relative flex-1 overflow-hidden group/left">
            <div className="absolute inset-0 kenburns-1">
              <Image
                src="/hero-liberec-1.jpg"
                alt="Závodní trampolíny — Trampolíny Liberec"
                fill
                sizes="50vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-brand-orange/6 group-hover/left:bg-brand-orange/12 transition-colors duration-500" />

            <div
              className="relative z-10 h-full flex flex-col justify-end p-10 lg:p-14"
              style={fadeUp(480)}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-px bg-brand-orange" />
                <span className="text-[9px] font-label-bold uppercase tracking-[0.45em] text-brand-orange">
                  Závodní oddíl
                </span>
              </div>
              <Link
                href="/trampoliny-liberec"
                className="inline-flex w-fit items-center gap-3 bg-brand-orange text-white font-label-bold text-[11px] uppercase tracking-wider px-6 py-3.5 hover:bg-white hover:text-brand-orange transition-all duration-300 cursor-pointer group/btn"
              >
                Sportovní oddíl
                <svg
                  className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div className="w-px bg-white/10 flex-shrink-0 z-10" />

          {/* Right — tábory, oslavy, skákání */}
          <div className="relative flex-1 overflow-hidden group/right">
            <div className="absolute inset-0 kenburns-2">
              <Image
                src="/hero-patrman-1.jpg"
                alt="Tábory, oslavy a skákání — Trampolíny Patrman"
                fill
                sizes="50vw"
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep via-black/20 to-transparent" />
            <div className="absolute inset-0 bg-brand-green/6 group-hover/right:bg-brand-green/12 transition-colors duration-500" />

            <div
              className="relative z-10 h-full flex flex-col justify-end p-10 lg:p-14"
              style={fadeUp(600)}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-4 h-px bg-brand-green" />
                <span className="text-[9px] font-label-bold uppercase tracking-[0.45em] text-brand-green">
                  Tábory · Oslavy · Skákání
                </span>
              </div>
              <Link
                href="#sluzby"
                className="inline-flex w-fit items-center gap-3 bg-white/10 text-white font-label-bold text-[11px] uppercase tracking-wider px-6 py-3.5 border border-white/25 backdrop-blur-sm hover:bg-brand-green hover:text-brand-navy-deep hover:border-transparent transition-all duration-300 cursor-pointer group/btn"
              >
                Naše služby
                <svg
                  className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <HeroScrollHint />
    </section>
  );
}
