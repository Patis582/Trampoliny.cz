# Gallery & Events Loading States Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Přidat LQIP blur placeholder pro obrázky v galerii a akcích + loading.tsx skeletony pro eliminaci bílé obrazovky při navigaci.

**Architecture:** Sanity queries rozšíříme o `asset->metadata.lqip` pro tři typy dokumentů. Next.js `<Image>` dostane `placeholder="blur"` + `blurDataURL`. Tři nové `loading.tsx` soubory v App Routeru ukáží skeleton ihned při navigaci.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS v4, Sanity CDN

---

### Task 1: Sanity queries — přidat LQIP do typů a GROQ dotazů

**Files:**
- Modify: `sanity/lib/queries.ts`

- [ ] **Krok 1: Přidat `lqip` do TypeScript typů**

V souboru `sanity/lib/queries.ts` najdi tento blok typů a nahraď ho:

```typescript
// PŘED:
export type GalleryAlbumCard = {
  _id: string
  title: string
  slug: string
  date: string
  coverImage: { asset: { _ref: string }; alt?: string }
  photoCount: number
}

export type GalleryPhoto = {
  _key: string
  url: string
  width: number
  height: number
  alt?: string
}
```

```typescript
// PO:
export type GalleryAlbumCard = {
  _id: string
  title: string
  slug: string
  date: string
  coverImage: { asset: { _ref: string }; alt?: string; lqip?: string }
  photoCount: number
}

export type GalleryPhoto = {
  _key: string
  url: string
  width: number
  height: number
  alt?: string
  lqip?: string
}
```

- [ ] **Krok 2: Přidat `lqip` do typu `Event.image`**

Najdi:
```typescript
  image?: { asset: { _ref: string; _type: 'reference' }; hotspot?: { x: number; y: number } }
```

Nahraď:
```typescript
  image?: { asset: { _ref: string; _type: 'reference' }; hotspot?: { x: number; y: number }; lqip?: string }
```

- [ ] **Krok 3: Přidat `lqip` do GROQ query pro album listing**

Najdi v `getGalleryAlbums`:
```typescript
        "coverImage": coverImage { asset, "alt": alt },
```

Nahraď:
```typescript
        "coverImage": coverImage { asset, "alt": alt, "lqip": asset->metadata.lqip },
```

- [ ] **Krok 4: Přidat `lqip` do GROQ query pro album detail**

Najdi v `getGalleryAlbumBySlug`:
```typescript
        "photos": photos[] {
          "_key": _key,
          "url": asset->url,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
          alt
        },
```

Nahraď:
```typescript
        "photos": photos[] {
          "_key": _key,
          "url": asset->url,
          "width": asset->metadata.dimensions.width,
          "height": asset->metadata.dimensions.height,
          "lqip": asset->metadata.lqip,
          alt
        },
```

- [ ] **Krok 5: Přidat `lqip` do GROQ query pro akce**

Najdi konstantu `eventFields`:
```typescript
const eventFields = `
  _id, "slug": slug.current, title, date, endDate, type, customType, description,
  image { asset, hotspot },
  links[] { label, url },
  registration { url, isOpen }
`
```

Nahraď:
```typescript
const eventFields = `
  _id, "slug": slug.current, title, date, endDate, type, customType, description,
  "image": image { asset, hotspot, "lqip": asset->metadata.lqip },
  links[] { label, url },
  registration { url, isOpen }
`
```

- [ ] **Krok 6: TypeScript check**

```bash
cd /Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz && npx tsc --noEmit 2>&1
```

Očekávaný výstup: žádné chyby.

- [ ] **Krok 7: Commit**

```bash
git add sanity/lib/queries.ts
git commit -m "feat(sanity): přidat lqip do queries pro galerii, album detail a akce"
```

---

### Task 2: AlbumGallery — blur placeholder + priority pro první fotky

**Files:**
- Modify: `components/gallery/AlbumGallery.tsx`

- [ ] **Krok 1: Přepsat komponentu**

Celý soubor `components/gallery/AlbumGallery.tsx` nahraď tímto:

```tsx
'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import Download from 'yet-another-react-lightbox/plugins/download'
import 'yet-another-react-lightbox/styles.css'
import type { GalleryPhoto } from '@/sanity/lib/queries'

interface Props {
  photos: GalleryPhoto[]
}

const PRIORITY_COUNT = 6

export function AlbumGallery({ photos }: Props) {
  const [index, setIndex] = useState(-1)

  const slides = photos.map((photo) => ({
    src: photo.url,
    width: photo.width,
    height: photo.height,
    alt: photo.alt ?? '',
    download: { url: photo.url, filename: photo.alt ?? 'photo' },
  }))

  return (
    <>
      <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-3">
        {photos.map((photo, i) => (
          <button
            key={photo._key}
            onClick={() => setIndex(i)}
            className="break-inside-avoid mb-3 block w-full cursor-zoom-in overflow-hidden group relative"
          >
            <Image
              src={photo.url}
              alt={photo.alt ?? ''}
              width={photo.width}
              height={photo.height}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
              className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
              priority={i < PRIORITY_COUNT}
              loading={i < PRIORITY_COUNT ? undefined : 'lazy'}
              placeholder={photo.lqip ? 'blur' : undefined}
              blurDataURL={photo.lqip ?? undefined}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
              </svg>
            </div>
          </button>
        ))}
      </div>

      <Lightbox
        open={index >= 0}
        index={index}
        close={() => setIndex(-1)}
        slides={slides}
        plugins={[Download]}
      />
    </>
  )
}
```

- [ ] **Krok 2: TypeScript check**

```bash
cd /Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz && npx tsc --noEmit 2>&1
```

Očekávaný výstup: žádné chyby.

- [ ] **Krok 3: Commit**

```bash
git add components/gallery/AlbumGallery.tsx
git commit -m "feat(gallery): LQIP blur placeholder + priority pro prvních 6 fotek"
```

---

### Task 3: AlbumCard — blur placeholder na cover image

**Files:**
- Modify: `components/gallery/AlbumCard.tsx`

- [ ] **Krok 1: Přidat blur placeholder**

Najdi v `components/gallery/AlbumCard.tsx`:
```tsx
        <Image
          src={urlFor(album.coverImage).width(600).height(450).url()}
          alt={album.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
```

Nahraď:
```tsx
        <Image
          src={urlFor(album.coverImage).width(600).height(450).url()}
          alt={album.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          placeholder={album.coverImage.lqip ? 'blur' : undefined}
          blurDataURL={album.coverImage.lqip ?? undefined}
        />
```

- [ ] **Krok 2: TypeScript check**

```bash
cd /Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz && npx tsc --noEmit 2>&1
```

Očekávaný výstup: žádné chyby.

- [ ] **Krok 3: Commit**

```bash
git add components/gallery/AlbumCard.tsx
git commit -m "feat(gallery): LQIP blur placeholder na cover image alba"
```

---

### Task 4: EventCard — blur placeholder na obrázek akce

**Files:**
- Modify: `components/events/EventCard.tsx`

- [ ] **Krok 1: Přidat blur placeholder**

Najdi v `components/events/EventCard.tsx`:
```tsx
        <div className="aspect-video overflow-hidden relative mb-4">
          <Image
            src={urlFor(event.image).width(800).height(450).url()}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
```

Nahraď:
```tsx
        <div className="aspect-video overflow-hidden relative mb-4">
          <Image
            src={urlFor(event.image).width(800).height(450).url()}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            placeholder={event.image.lqip ? 'blur' : undefined}
            blurDataURL={event.image.lqip ?? undefined}
          />
        </div>
```

- [ ] **Krok 2: TypeScript check**

```bash
cd /Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz && npx tsc --noEmit 2>&1
```

Očekávaný výstup: žádné chyby.

- [ ] **Krok 3: Commit**

```bash
git add components/events/EventCard.tsx
git commit -m "feat(events): LQIP blur placeholder na obrázek akce"
```

---

### Task 5: loading.tsx pro galerii (seznam alb)

**Files:**
- Create: `app/galerie/loading.tsx`

- [ ] **Krok 1: Vytvořit skeleton**

Vytvoř soubor `app/galerie/loading.tsx`:

```tsx
import { Nav } from '@/components/layout/Nav'

export default function GalerieLoading() {
  return (
    <div className="font-body-md antialiased bg-white min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* Hero skeleton */}
      <section className="bg-border-dark pt-24 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="h-3 w-24 bg-white/20 rounded mb-4 animate-pulse" />
          <div className="h-14 w-52 bg-white/20 rounded mb-6 animate-pulse" />
          <div className="h-4 w-96 bg-white/10 rounded animate-pulse" />
        </div>
      </section>

      {/* Album grid skeleton */}
      <main className="py-section-padding-mobile md:py-section-padding-desktop">
        <div className="max-w-container-max mx-auto px-gutter space-y-20 md:space-y-28">
          {/* Rok + grid */}
          <div>
            <div className="flex items-center gap-6 mb-10">
              <div className="h-12 w-28 bg-surface-container-high rounded animate-pulse shrink-0" />
              <div className="flex-1 h-px bg-surface-container-high" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] bg-surface-container-high animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
```

- [ ] **Krok 2: TypeScript check**

```bash
cd /Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz && npx tsc --noEmit 2>&1
```

Očekávaný výstup: žádné chyby.

- [ ] **Krok 3: Commit**

```bash
git add app/galerie/loading.tsx
git commit -m "feat(galerie): loading.tsx skeleton pro seznam alb"
```

---

### Task 6: loading.tsx pro album detail

**Files:**
- Create: `app/galerie/[slug]/loading.tsx`

- [ ] **Krok 1: Vytvořit skeleton**

Vytvoř soubor `app/galerie/[slug]/loading.tsx`:

```tsx
import { Nav } from '@/components/layout/Nav'

export default function AlbumLoading() {
  return (
    <div className="font-body-md antialiased bg-white min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* Hero skeleton */}
      <div className="relative w-full bg-border-dark" style={{ height: '50vh', minHeight: 320 }}>
        <div className="absolute inset-0 bg-border-dark animate-pulse" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <div className="max-w-container-max mx-auto">
            <div className="h-3 w-32 bg-white/20 rounded mb-4 animate-pulse" />
            <div className="h-10 w-72 bg-white/20 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Masonry skeleton */}
      <main className="py-section-padding-mobile md:py-section-padding-desktop">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-3">
            {Array.from({ length: 20 }).map((_, i) => (
              <div
                key={i}
                className="break-inside-avoid mb-3 bg-surface-container-high animate-pulse"
                style={{ height: `${[180, 240, 160, 220, 200, 280, 150, 260][i % 8]}px` }}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
```

- [ ] **Krok 2: TypeScript check**

```bash
cd /Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz && npx tsc --noEmit 2>&1
```

Očekávaný výstup: žádné chyby.

- [ ] **Krok 3: Commit**

```bash
git add "app/galerie/[slug]/loading.tsx"
git commit -m "feat(galerie): loading.tsx skeleton pro album detail"
```

---

### Task 7: loading.tsx pro akce

**Files:**
- Create: `app/akce/loading.tsx`

- [ ] **Krok 1: Vytvořit skeleton**

Vytvoř soubor `app/akce/loading.tsx`:

```tsx
import { Nav } from '@/components/layout/Nav'

export default function AkceLoading() {
  return (
    <div className="font-body-md antialiased bg-white min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* Hero skeleton */}
      <section className="bg-border-dark pt-24 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="h-3 w-20 bg-white/20 rounded mb-4 animate-pulse" />
          <div className="h-14 w-40 bg-white/20 rounded mb-6 animate-pulse" />
          <div className="h-4 w-[480px] max-w-full bg-white/10 rounded animate-pulse" />
        </div>
      </section>

      {/* Filter bar + cards skeleton */}
      <main className="py-section-padding-mobile md:py-section-padding-desktop">
        <div className="max-w-container-max mx-auto px-gutter">
          {/* Filter skeleton */}
          <div className="flex gap-2 flex-wrap mb-10">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-8 w-20 bg-surface-container-high rounded animate-pulse" />
            ))}
          </div>

          {/* Section title skeleton */}
          <div className="h-6 w-48 bg-surface-container-high rounded mb-8 animate-pulse" />

          {/* Cards grid skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3 pt-4 border-t-2 border-surface-container-high">
                <div className="aspect-video bg-surface-container-high animate-pulse" />
                <div className="h-3 w-32 bg-surface-container-high rounded animate-pulse" />
                <div className="h-5 w-full bg-surface-container-high rounded animate-pulse" />
                <div className="h-3 w-16 bg-surface-container-high rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
```

- [ ] **Krok 2: TypeScript check**

```bash
cd /Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz && npx tsc --noEmit 2>&1
```

Očekávaný výstup: žádné chyby.

- [ ] **Krok 3: Commit + push**

```bash
git add app/akce/loading.tsx
git commit -m "feat(akce): loading.tsx skeleton pro stránku akcí"
git push origin v2-redesign
```
