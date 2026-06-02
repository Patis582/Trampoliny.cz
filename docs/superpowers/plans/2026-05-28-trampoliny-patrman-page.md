# Trampolíny Patrman Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Vytvořit stránku `/trampoliny-patrman` s hero slideshow, intro sekcí, foto galerií s offset layoutem, ServiceGrid filtrovaným na Patrman a CTA s kontakty.

**Architecture:** Dva nové soubory — `PatrmanHeroSlideshow` Client Component (kopíruje vzor `LiberecHeroSlideshow`) a Server Component `app/trampoliny-patrman/page.tsx`. Fotky ze `/public`, služby z Sanity přes `getServicesByBrand("patrman")`. Akcent barva: `on-tertiary-container` (#6ca21b zelená).

**Tech Stack:** Next.js App Router, Tailwind CSS v4, next/image, Sanity

---

## File Structure

| Soubor | Akce | Popis |
|---|---|---|
| `components/layout/PatrmanHeroSlideshow.tsx` | Create | Client Component — Ken Burns slideshow pro Patrman hero |
| `app/trampoliny-patrman/page.tsx` | Create | Server Component — celá stránka |

---

### Task 1: PatrmanHeroSlideshow komponenta

**Files:**
- Create: `components/layout/PatrmanHeroSlideshow.tsx`

- [ ] **Step 1: Vytvořit soubor**

Vytvořit `components/layout/PatrmanHeroSlideshow.tsx`:

```tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/hero-patrman-33.jpg", alt: "Trampolíny Patrman" },
  { src: "/hero-patrman-25.jpg", alt: "Trampolíny Patrman" },
  { src: "/hero-patrman-14.jpg", alt: "Trampolíny Patrman" },
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
          className={`absolute inset-0 transition-opacity duration-[1500ms] ease-in-out ${
            i === current ? "opacity-100" : "opacity-0"
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
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </div>
  );
}
```

- [ ] **Step 2: Ověřit TypeScript**

```bash
npx tsc --noEmit
```

Expected: žádný výstup.

- [ ] **Step 3: Commit**

```bash
git add components/layout/PatrmanHeroSlideshow.tsx
git commit -m "feat: add PatrmanHeroSlideshow component"
```

---

### Task 2: Trampolíny Patrman stránka

**Files:**
- Create: `app/trampoliny-patrman/page.tsx`

- [ ] **Step 1: Vytvořit soubor s celou stránkou**

Vytvořit `app/trampoliny-patrman/page.tsx`:

```tsx
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { PatrmanHeroSlideshow } from "@/components/layout/PatrmanHeroSlideshow";
import { getServicesByBrand } from "@/sanity/lib/queries";

const galleryRow1 = [
  { src: "/hero-patrman-6.jpg",  alt: "Kroužky pro děti",      offset: "translate-y-0",  h: "h-56" },
  { src: "/hero-patrman-14.jpg", alt: "Trenér s dítětem",      offset: "translate-y-8",  h: "h-72" },
  { src: "/hero-patrman-22.jpg", alt: "Skupina batolat",       offset: "-translate-y-4", h: "h-56" },
  { src: "/hero-patrman-28.jpg", alt: "Backflip",              offset: "translate-y-6",  h: "h-72" },
];

const galleryRow2 = [
  { src: "/hero-patrman-30.jpg", alt: "Akrobacie s trenérem",  offset: "translate-y-4",  h: "h-72" },
  { src: "/hero-patrman-4.jpg",  alt: "Děti s míči",           offset: "-translate-y-6", h: "h-56" },
  { src: "/hero-patrman-25.jpg", alt: "Děti skáčou v řadě",   offset: "translate-y-2",  h: "h-72" },
  { src: "/hero-patrman-19.jpg", alt: "Starší děti na koberci",offset: "-translate-y-4", h: "h-56" },
];

const contacts = [
  { name: "Kamila Brücklérová", phone: "+420 720 987 654", email: "kamilabrucklerova@gmail.com" },
  { name: "Klára Patrmanová",   phone: "+420 731 123 456", email: "pripravky@trampoliny-liberec.cz" },
];

export default async function TrampolinyPatrmanPage() {
  const services = await getServicesByBrand("patrman");

  return (
    <div className="font-body-md antialiased bg-white min-h-screen">

      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative h-[75vh] min-h-[560px] flex items-end overflow-hidden">
        <PatrmanHeroSlideshow />
        <div className="relative z-10 w-full max-w-container-max mx-auto px-gutter pb-16 pt-32">
          <div className="mb-6">
            <span className="inline-flex items-center font-label-bold text-[11px] uppercase tracking-widest bg-on-tertiary-container text-white px-3 py-1.5">
              Trampolíny Patrman
            </span>
          </div>
          <h1 className="font-headline-lg-mobile md:font-headline-md text-headline-lg-mobile md:text-headline-md text-white uppercase tracking-tight leading-none mb-6">
            Zábava<br />bez hranic
          </h1>
          <p className="font-body-lg text-body-lg text-white/75 font-light max-w-xl leading-relaxed">
            Kroužky, tábory, oslavy i volné skákání. Pro každého od 1 roku.
          </p>
          <div className="mt-8">
            <a
              href="#sluzby"
              className="inline-flex items-center gap-2.5 bg-on-tertiary-container text-white font-label-bold uppercase tracking-widest px-7 py-4 text-[11px] hover:bg-white hover:text-border-dark transition-colors"
            >
              Naše služby
            </a>
          </div>
        </div>
      </section>

      {/* ── KDO JSME (foto vlevo, text vpravo) ───────────────────── */}
      <section className="bg-white">
        <div className="max-w-container-max mx-auto px-gutter py-section-padding-mobile md:py-section-padding-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[3/2] overflow-hidden">
              <Image
                src="/hero-patrman-1.jpg"
                alt="Trampolíny Patrman — trenér s dítětem"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-6">
              <span className="inline-block font-label-bold text-[11px] uppercase tracking-widest text-on-tertiary-container">Kdo jsme</span>
              <h2 className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight">
                Trampolíny Patrman
              </h2>
              <div className="space-y-4 font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">
                <p>
                  Trampolíny Patrman provozuje Miroslav Patrman v Liberci od roku 2009.
                  Začínali jsme s jednou halou a hrstkou nadšených dětí — dnes každý týden
                  přivítáme stovky dětí od jednoho roku až po dospělé.
                </p>
                <p>
                  Naším cílem není vychovat závodníky, ale dát každému dítěti radost z pohybu,
                  sebevědomí a bezpečné prostředí kde se mohou posouvat svým vlastním tempem.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALERIE ──────────────────────────────────────────────── */}
      <section className="bg-surface-container-lowest py-section-padding-mobile md:py-section-padding-desktop overflow-hidden">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="mb-16">
            <span className="inline-block font-label-bold text-[11px] uppercase tracking-widest text-on-tertiary-container mb-6">Atmosféra</span>
            <h2 className="font-headline-md text-headline-md text-border-dark uppercase tracking-tight">
              Jak to u nás <span className="font-medium">vypadá</span>
            </h2>
          </div>

          {/* Řada 1 */}
          <div className="grid grid-cols-4 gap-3 mb-3 pb-8">
            {galleryRow1.map(({ src, alt, offset, h }) => (
              <div key={src} className={`relative ${h} overflow-hidden ${offset}`}>
                <Image src={src} alt={alt} fill className="object-cover" sizes="25vw" />
              </div>
            ))}
          </div>

          {/* Řada 2 */}
          <div className="grid grid-cols-4 gap-3 pb-8">
            {galleryRow2.map(({ src, alt, offset, h }) => (
              <div key={src} className={`relative ${h} overflow-hidden ${offset}`}>
                <Image src={src} alt={alt} fill className="object-cover" sizes="25vw" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NAŠE SLUŽBY ──────────────────────────────────────────── */}
      <section
        className="py-section-padding-mobile md:py-section-padding-desktop bg-white"
        id="sluzby"
      >
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="mb-24">
            <span className="inline-block text-on-tertiary-container font-label-bold text-label-bold uppercase tracking-widest mb-6">Aktivity</span>
            <h2 className="font-headline-md text-headline-md text-border-dark uppercase tracking-tight">
              Co u nás <span className="font-medium">najdeš</span>
            </h2>
          </div>
          {services.length > 0 ? (
            <ServiceGrid services={services} />
          ) : (
            <p className="font-body-md text-on-surface-variant font-light">Aktivity brzy přibydou.</p>
          )}
        </div>
      </section>

      {/* ── CTA / KONTAKT ────────────────────────────────────────── */}
      <section className="bg-border-dark py-20">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="mb-12">
            <span className="inline-block font-label-bold text-[11px] uppercase tracking-widest text-on-tertiary-container mb-4">Kontakt</span>
            <h2 className="font-headline-sm text-headline-sm text-white uppercase tracking-tight">
              Napiš nebo zavolej
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
            {contacts.map(({ name, phone, email }) => (
              <div key={name} className="p-6 border border-white/10">
                <p className="font-headline-sm text-white font-bold text-sm uppercase tracking-tight mb-4">{name}</p>
                <a
                  href={`tel:${phone.replace(/\s/g, "")}`}
                  className="block font-body-md text-white/70 hover:text-white transition-colors mb-1"
                >
                  {phone}
                </a>
                <a
                  href={`mailto:${email}`}
                  className="block font-body-md text-white/50 hover:text-white transition-colors text-sm"
                >
                  {email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
```

- [ ] **Step 2: Ověřit TypeScript**

```bash
npx tsc --noEmit
```

Expected: žádný výstup.

- [ ] **Step 3: Otestovat v prohlížeči**

Spustit `npm run dev`, otevřít `http://localhost:3000/trampoliny-patrman`. Zkontrolovat:
- Hero slideshow běží (4 fotky, Ken Burns) ✓
- Eyebrow badge je zelený ✓
- Foto vlevo + text vpravo v "Kdo jsme" ✓
- Galerie — 8 fotek ve 2 řadách, každá offsetnutá vertikálně ✓
- ServiceGrid zobrazuje Patrman aktivity (nebo fallback text) ✓
- CTA sekce — dvě kontaktní karty (Kamila + Klára) bez štítků ✓
- Nav a Footer jsou vidět ✓

- [ ] **Step 4: Commit**

```bash
git add app/trampoliny-patrman/page.tsx
git commit -m "feat: add Trampoliny Patrman page"
```
