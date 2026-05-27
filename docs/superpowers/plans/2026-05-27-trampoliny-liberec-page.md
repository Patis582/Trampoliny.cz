# Trampolíny Liberec Page — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Vytvořit stránku `/trampoliny-liberec` s hero slideshowem, story sekcí a gridem Liberec aktivit ze Sanity.

**Architecture:** Server Component fetchuje Liberec služby z Sanity přes novou `getServicesByBrand` funkci. Hero slideshow je samostatný Client Component (`LiberecHeroSlideshow`) se slidesy z `/public`. Story sekce (historie, úspěchy) jsou statické s fotkami z `/public`. Nav se aktualizuje, homepage získá Link na novou stránku.

**Tech Stack:** Next.js App Router, Tailwind CSS v4, Sanity GROQ, `@/components/layout/Nav`, `@/components/layout/Footer`, `@/components/services/ServiceGrid`

---

## File Structure

| Soubor | Akce | Popis |
|---|---|---|
| `sanity/lib/queries.ts` | Modify | Přidat `getServicesByBrand` |
| `components/layout/LiberecHeroSlideshow.tsx` | Create | Client Component, slideshow pro Liberec hero |
| `app/trampoliny-liberec/page.tsx` | Create | Server Component, hlavní stránka |
| `components/layout/Nav.tsx` | Modify | "Oddíl" → `/trampoliny-liberec` |
| `app/page.tsx` | Modify | Liberec blok v "Kdo jsme" → `<Link>` |

---

### Task 1: Přidat `getServicesByBrand` do queries

**Files:**
- Modify: `sanity/lib/queries.ts`

- [ ] **Step 1: Přidat funkci na konec souboru**

V `sanity/lib/queries.ts` za funkci `getAllServiceSlugs` přidat:

```ts
export async function getServicesByBrand(brand: 'liberec' | 'patrman'): Promise<Service[]> {
  return client.fetch(
    `*[_type == "service" && brand == $brand] | order(order asc) { ${serviceFields} }`,
    { brand },
    { next: { tags: ['service'] } }
  )
}
```

- [ ] **Step 2: Ověřit TypeScript**

```bash
npx tsc --noEmit
```

Expected: žádný výstup (no errors).

- [ ] **Step 3: Commit**

```bash
git add sanity/lib/queries.ts
git commit -m "feat: add getServicesByBrand query"
```

---

### Task 2: Vytvořit LiberecHeroSlideshow komponentu

**Files:**
- Create: `components/layout/LiberecHeroSlideshow.tsx`

Uživatel nahraje fotky Orionky do `/public` jako `orionka-1.jpg`, `orionka-2.jpg`, `orionka-3.jpg`. Slideshow bere stejný pattern jako `HeroSlideshow.tsx`.

- [ ] **Step 1: Nahrát fotky**

Zkopírovat fotky Orionky do `/public/` a pojmenovat je `orionka-1.jpg`, `orionka-2.jpg`, `orionka-3.jpg`.

- [ ] **Step 2: Vytvořit komponentu**

Vytvořit `components/layout/LiberecHeroSlideshow.tsx`:

```tsx
"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const slides = [
  { src: "/orionka-1.jpg", alt: "TC Orionka Liberec" },
  { src: "/orionka-2.jpg", alt: "TC Orionka Liberec" },
  { src: "/orionka-3.jpg", alt: "TC Orionka Liberec" },
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
```

- [ ] **Step 3: Ověřit TypeScript**

```bash
npx tsc --noEmit
```

Expected: žádný výstup.

- [ ] **Step 4: Commit**

```bash
git add components/layout/LiberecHeroSlideshow.tsx public/orionka-*.jpg
git commit -m "feat: add LiberecHeroSlideshow component"
```

---

### Task 3: Vytvořit stránku `/trampoliny-liberec`

**Files:**
- Create: `app/trampoliny-liberec/page.tsx`

- [ ] **Step 1: Vytvořit adresář a soubor**

```bash
mkdir -p app/trampoliny-liberec
```

Vytvořit `app/trampoliny-liberec/page.tsx`:

```tsx
import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { ServiceGrid } from "@/components/services/ServiceGrid";
import { LiberecHeroSlideshow } from "@/components/layout/LiberecHeroSlideshow";
import { getServicesByBrand } from "@/sanity/lib/queries";

export default async function TrampolinyLiberecPage() {
  const services = await getServicesByBrand("liberec");

  return (
    <div className="font-body-md antialiased bg-white min-h-screen">

      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="relative h-[75vh] min-h-[560px] flex items-end overflow-hidden">
        <LiberecHeroSlideshow />
        <div className="relative z-10 w-full max-w-container-max mx-auto px-gutter pb-16 pt-32">
          <div className="mb-6">
            <span className="inline-flex items-center font-label-bold text-[11px] uppercase tracking-widest bg-brand-orange text-white px-3 py-1.5">
              Trampolíny Liberec
            </span>
          </div>
          <h1 className="font-headline-lg-mobile md:font-headline-md text-headline-lg-mobile md:text-headline-md text-white uppercase tracking-tight leading-none mb-6">
            Závodní oddíl<br />& sport
          </h1>
          <p className="font-body-lg text-body-lg text-white/75 font-light max-w-xl leading-relaxed">
            Výkonnostní trénink, závody a přípravky pro děti i dospělé v TC Orionka v Liberci.
          </p>
        </div>
      </section>

      {/* ── STATS BAND ───────────────────────────────────────────── */}
      <div className="bg-border-dark">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="grid grid-cols-3 divide-x divide-white/10">
            {[
              { label: "Závodníků", value: "100+" },
              { label: "Medailí", value: "300+" },
              { label: "Trénujeme od roku", value: "2009" },
            ].map(({ label, value }) => (
              <div key={label} className="px-8 py-7 first:pl-0">
                <p className="font-label-bold text-[10px] uppercase tracking-widest text-white/40 mb-1.5">{label}</p>
                <p className="font-headline-sm text-headline-sm text-white uppercase tracking-tight">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── INTRO ────────────────────────────────────────────────── */}
      <section className="py-section-padding-mobile md:py-section-padding-desktop bg-white">
        <div className="max-w-container-max mx-auto px-gutter text-center max-w-4xl mx-auto">
          <span className="inline-block font-label-bold text-[11px] uppercase tracking-widest text-brand-orange mb-6">Kdo jsme</span>
          <h2 className="font-headline-md text-headline-md text-border-dark uppercase tracking-tight mb-10">
            Sportovní oddíl<br /><span className="font-medium">s tradicí</span>
          </h2>
          <p className="border-l-4 border-brand-orange pl-8 text-left font-body-lg text-body-lg text-border-dark font-medium leading-relaxed max-w-3xl mx-auto">
            Trampolíny Liberec je závodní sportovní oddíl s dlouholetou tradicí. Vychováváme závodníky všech úrovní — od začátečníků v přípravkách až po reprezentanty na mezinárodních soutěžích.
          </p>
        </div>
      </section>

      {/* ── HISTORIE (foto vlevo, text vpravo) ───────────────────── */}
      <section className="bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-gutter py-section-padding-mobile md:py-section-padding-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/orionka-1.jpg"
                alt="Závodník na trampolíně"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-6">
              <span className="inline-block font-label-bold text-[11px] uppercase tracking-widest text-brand-orange">Od roku 2009</span>
              <h2 className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight">
                Naše historie
              </h2>
              <div className="space-y-4 font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">
                <p>
                  Oddíl byl založen v roce 2009 v Trampolínovém centru Orionka v Liberci – Harcově. Za více než patnáct let jsme vybudovali jedno z nejúspěšnějších trampolínových center v České republice.
                </p>
                <p>
                  Trénujeme na profesionálních závodních trampolínách, DMT dráze a vybavení pro akrobatiku. Naši závodníci se pravidelně účastní oblastních i národních závodů — Žákovský pohár, Český pohár a Mistrovství republiky.
                </p>
                <p>
                  Ti nejlepší jsou zařazeni do Sportovních středisek a reprezentují Českou republiku na mezinárodní úrovni včetně Mistrovství Evropy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ÚSPĚCHY (text vlevo, foto vpravo) ────────────────────── */}
      <section className="bg-white">
        <div className="max-w-container-max mx-auto px-gutter py-section-padding-mobile md:py-section-padding-desktop">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6 order-2 lg:order-1">
              <span className="inline-block font-label-bold text-[11px] uppercase tracking-widest text-brand-orange">Výsledky</span>
              <h2 className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight">
                Naše úspěchy
              </h2>
              <div className="space-y-4 font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">
                <p>
                  Za roky existence jsme získali více než 300 medailí na závodech všech úrovní. Naši závodníci pravidelně obsazují přední místa na Mistrovství České republiky juniorů i seniorů.
                </p>
                <p>
                  Několik našich svěřenců reprezentovalo Českou republiku na Mistrovství Evropy a světových pohárech. Jsme hrdí na každého závodníka, který se posune o krok dál.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { num: "300+", label: "Medailí celkem" },
                  { num: "20+", label: "Závodů ročně" },
                  { num: "10+", label: "Reprezentantů ČR" },
                  { num: "5", label: "Trenérů" },
                ].map(({ num, label }) => (
                  <div key={label} className="p-5 bg-surface-container-lowest">
                    <p className="font-headline-sm text-headline-sm text-brand-orange uppercase tracking-tight">{num}</p>
                    <p className="font-label-bold text-[10px] uppercase tracking-widest text-outline mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden order-1 lg:order-2">
              <Image
                src="/orionka-2.jpg"
                alt="Závodní tým Trampolíny Liberec"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── AKTIVITY ZE SANITY ───────────────────────────────────── */}
      <section className="py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-lowest">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="mb-24">
            <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-6">Co nabízíme</span>
            <h2 className="font-headline-md text-headline-md text-border-dark uppercase tracking-tight">
              Aktivity<br /><span className="font-medium">Trampolíny Liberec</span>
            </h2>
          </div>
          {services.length > 0 ? (
            <ServiceGrid services={services} />
          ) : (
            <p className="font-body-md text-on-surface-variant font-light">Aktivity brzy přibydou.</p>
          )}
        </div>
      </section>

      {/* ── CTA BANNER ───────────────────────────────────────────── */}
      <section className="bg-border-dark py-20">
        <div className="max-w-container-max mx-auto px-gutter flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="inline-block font-label-bold text-[11px] uppercase tracking-widest text-brand-orange mb-4">Přidej se k nám</span>
            <h2 className="font-headline-sm text-headline-sm text-white uppercase tracking-tight">
              Chceš trénovat s námi?
            </h2>
          </div>
          <div className="flex flex-wrap gap-4 shrink-0">
            <Link
              href="/jak-na-eos"
              className="inline-flex items-center gap-2.5 bg-brand-orange text-white font-label-bold uppercase tracking-widest px-7 py-4 text-[11px] hover:bg-white hover:text-border-dark transition-colors"
            >
              Jak se přihlásit přes EOS
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/treneri"
              className="inline-flex items-center gap-2.5 border border-white/30 text-white font-label-bold uppercase tracking-widest px-7 py-4 text-[11px] hover:border-white hover:bg-white/10 transition-colors"
            >
              Naši trenéři
            </Link>
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

- [ ] **Step 3: Otevřít v prohlížeči**

Spustit `npm run dev`, otevřít `http://localhost:3000/trampoliny-liberec`. Zkontrolovat: hero slideshow běží, stats band viditelný, story sekce správně zarovnané, grid aktivit zobrazuje Liberec karty.

- [ ] **Step 4: Commit**

```bash
git add app/trampoliny-liberec/page.tsx
git commit -m "feat: add trampoliny-liberec page"
```

---

### Task 4: Aktualizovat Nav a homepage

**Files:**
- Modify: `components/layout/Nav.tsx`
- Modify: `app/page.tsx`

- [ ] **Step 1: Aktualizovat Nav — "Oddíl" link**

V `components/layout/Nav.tsx` změnit:

```ts
const navLinks: [string, string][] = [
  ["Oddíl", "/trampoliny-liberec"],
  ["Služby", "/#sluzby"],
  ["Rozvrh", "/#rozvrh"],
  ["Ceník", "/#cenik"],
];
```

- [ ] **Step 2: Přidat Link na Liberec blok v homepage**

V `app/page.tsx` najít `{/* Liberec Brand */}` blok a obalit ho do `<Link>`:

```tsx
{/* Liberec Brand */}
<Link href="/trampoliny-liberec" className="flex flex-col items-center text-center group">
  {/* ... obsah beze změny ... */}
</Link>
```

Původní `<div className="flex flex-col items-center text-center group">` nahradit za `<Link href="/trampoliny-liberec" className="flex flex-col items-center text-center group">` a uzavírací `</div>` za `</Link>`.

- [ ] **Step 3: Ověřit TypeScript**

```bash
npx tsc --noEmit
```

Expected: žádný výstup.

- [ ] **Step 4: Otestovat v prohlížeči**

- Klik na "Oddíl" v navu → přejde na `/trampoliny-liberec` ✓
- Klik na Trampolíny Liberec blok v "Kdo jsme" na homepage → přejde na `/trampoliny-liberec` ✓

- [ ] **Step 5: Commit**

```bash
git add components/layout/Nav.tsx app/page.tsx
git commit -m "feat: link nav and homepage to trampoliny-liberec"
```
