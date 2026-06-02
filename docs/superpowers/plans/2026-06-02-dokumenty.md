# Dokumenty ke stažení — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Vytvořit stránku `/dokumenty` s taby (Liberec / Patrman / Trenéři), kde kategorie i soubory jsou spravované v Sanity CMS a odkaz je v patičce webu.

**Architecture:** Dva nové Sanity typy (`documentCategory`, `downloadableDocument`). Server component fetchne všechny kategorie najednou, předá do klientského `DokumentyTabs` komponenty, která spravuje tab state přes `useState`. Žádná autentizace.

**Tech Stack:** Next.js 16 App Router, TypeScript, Sanity CMS (GROQ), Tailwind CSS v4

---

## File Map

| Soubor | Akce |
|--------|------|
| `sanity/schemaTypes/documentCategory.ts` | Vytvořit |
| `sanity/schemaTypes/downloadableDocument.ts` | Vytvořit |
| `sanity/schemaTypes/index.ts` | Upravit — přidat oba typy |
| `sanity/lib/queries.ts` | Upravit — přidat typy + `getDocumentCategories()` |
| `components/dokumenty/DokumentyTabs.tsx` | Vytvořit |
| `app/dokumenty/page.tsx` | Vytvořit |
| `app/dokumenty/loading.tsx` | Vytvořit |
| `app/sitemap.ts` | Upravit — přidat `/dokumenty` |
| `components/layout/Footer.tsx` | Upravit — přidat link „Dokumenty" |

---

### Task 1: Sanity schémata

**Files:**
- Create: `sanity/schemaTypes/documentCategory.ts`
- Create: `sanity/schemaTypes/downloadableDocument.ts`
- Modify: `sanity/schemaTypes/index.ts`

- [ ] **Krok 1: Vytvořit `sanity/schemaTypes/documentCategory.ts`**

```typescript
import { defineField, defineType } from 'sanity'

export const documentCategoryType = defineType({
  name: 'documentCategory',
  title: 'Dokumenty — kategorie',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název kategorie',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'brand',
      title: 'Sekce',
      type: 'string',
      options: {
        list: [
          { title: 'Trampolíny Liberec', value: 'liberec' },
          { title: 'Trampolíny Patrman', value: 'patrman' },
          { title: 'Trenéři', value: 'treneri' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Pořadí',
      type: 'number',
      validation: (r) => r.required().integer().positive(),
    }),
  ],
  orderings: [
    {
      title: 'Pořadí',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'brand' },
    prepare({ title, subtitle }: { title: string; subtitle: string }) {
      const labels: Record<string, string> = {
        liberec: 'Trampolíny Liberec',
        patrman: 'Trampolíny Patrman',
        treneri: 'Trenéři',
      }
      return { title, subtitle: labels[subtitle] ?? subtitle }
    },
  },
})
```

- [ ] **Krok 2: Vytvořit `sanity/schemaTypes/downloadableDocument.ts`**

```typescript
import { defineField, defineType } from 'sanity'

export const downloadableDocumentType = defineType({
  name: 'downloadableDocument',
  title: 'Dokumenty — soubor',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název dokumentu',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'file',
      title: 'Soubor (PDF, DOCX…)',
      type: 'file',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Kategorie',
      type: 'reference',
      to: [{ type: 'documentCategory' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Pořadí v kategorii',
      type: 'number',
      validation: (r) => r.required().integer().positive(),
    }),
  ],
  orderings: [
    {
      title: 'Pořadí',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'category.title' },
    prepare({ title, subtitle }: { title: string; subtitle?: string }) {
      return { title, subtitle: subtitle ?? '' }
    },
  },
})
```

- [ ] **Krok 3: Aktualizovat `sanity/schemaTypes/index.ts`**

Přidej dva nové importy a typy do pole `types`. Výsledný soubor:

```typescript
import { type SchemaTypeDefinition } from 'sanity'
import { serviceType } from './service'
import { eventType } from './event'
import { announcementType } from './announcement'
import { trainerType } from './trainer'
import { pricingSectionType } from './pricingSection'
import { galleryAlbumType } from './galleryAlbum'
import { siteConfigType } from './siteConfig'
import { testimonialType } from './testimonial'
import { notableVisitorType } from './notableVisitor'
import { documentCategoryType } from './documentCategory'
import { downloadableDocumentType } from './downloadableDocument'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    serviceType,
    eventType,
    announcementType,
    trainerType,
    pricingSectionType,
    galleryAlbumType,
    siteConfigType,
    testimonialType,
    notableVisitorType,
    documentCategoryType,
    downloadableDocumentType,
  ],
}
```

- [ ] **Krok 4: TypeScript check**

```bash
cd /Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz && npx tsc --noEmit 2>&1
```

Očekávaný výstup: žádné chyby.

- [ ] **Krok 5: Commit**

```bash
cd /Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz && git add sanity/schemaTypes/documentCategory.ts sanity/schemaTypes/downloadableDocument.ts sanity/schemaTypes/index.ts && git commit -m "feat(dokumenty): Sanity schémata documentCategory + downloadableDocument"
```

---

### Task 2: Queries — typy a getDocumentCategories

**Files:**
- Modify: `sanity/lib/queries.ts`

- [ ] **Krok 1: Přidat typy a funkci na konec `sanity/lib/queries.ts`**

Za poslední funkci v souboru přidej:

```typescript
// ── DOCUMENTS ────────────────────────────────────────────────────────────────

export type DocumentFile = {
  _id: string
  title: string
  fileUrl: string
}

export type DocumentCategory = {
  _id: string
  title: string
  brand: 'liberec' | 'patrman' | 'treneri'
  documents: DocumentFile[]
}

export async function getDocumentCategories(): Promise<DocumentCategory[]> {
  try {
    return await client.fetch(
      `*[_type == "documentCategory"] | order(order asc) {
        _id,
        title,
        brand,
        "documents": *[_type == "downloadableDocument" && references(^._id)] | order(order asc) {
          _id,
          title,
          "fileUrl": file.asset->url,
        }
      }`,
      {},
      { next: { tags: ['documents'] } }
    )
  } catch {
    return []
  }
}
```

- [ ] **Krok 2: TypeScript check**

```bash
cd /Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz && npx tsc --noEmit 2>&1
```

Očekávaný výstup: žádné chyby.

- [ ] **Krok 3: Commit**

```bash
cd /Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz && git add sanity/lib/queries.ts && git commit -m "feat(dokumenty): přidat DocumentCategory, DocumentFile typy a getDocumentCategories query"
```

---

### Task 3: DokumentyTabs klientský komponent

**Files:**
- Create: `components/dokumenty/DokumentyTabs.tsx`

- [ ] **Krok 1: Vytvořit `components/dokumenty/DokumentyTabs.tsx`**

```tsx
'use client'

import { useState } from 'react'
import type { DocumentCategory } from '@/sanity/lib/queries'

type Brand = 'liberec' | 'patrman' | 'treneri'

const TAB_CONFIG: {
  brand: Brand
  label: string
  activeClass: string
  accentBarClass: string
  downloadClass: string
}[] = [
  {
    brand: 'liberec',
    label: 'Trampolíny Liberec',
    activeClass: 'bg-brand-orange text-white',
    accentBarClass: 'bg-brand-orange',
    downloadClass: 'text-brand-orange',
  },
  {
    brand: 'patrman',
    label: 'Trampolíny Patrman',
    activeClass: 'bg-brand-green text-border-dark',
    accentBarClass: 'bg-brand-green',
    downloadClass: 'text-brand-green',
  },
  {
    brand: 'treneri',
    label: 'Trenéři',
    activeClass: 'bg-brand-navy-deep text-white border border-white/30',
    accentBarClass: 'bg-white/20',
    downloadClass: 'text-white/60',
  },
]

function PdfIcon() {
  return (
    <svg
      className="w-4 h-4 text-white/40 shrink-0"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
  )
}

export function DokumentyTabs({ categories }: { categories: DocumentCategory[] }) {
  const firstNonEmpty =
    TAB_CONFIG.find((t) => categories.some((c) => c.brand === t.brand))?.brand ?? 'patrman'
  const [active, setActive] = useState<Brand>(firstNonEmpty)

  const activeConfig = TAB_CONFIG.find((t) => t.brand === active)!
  const activeCategories = categories.filter((c) => c.brand === active)

  return (
    <div className="max-w-container-max mx-auto px-gutter py-section-padding-mobile md:py-section-padding-desktop">
      {/* Taby */}
      <div className="flex flex-wrap gap-2 mb-12 md:mb-16">
        {TAB_CONFIG.map(({ brand, label, activeClass }) => (
          <button
            key={brand}
            onClick={() => setActive(brand)}
            className={`font-label-bold text-[11px] uppercase tracking-widest px-5 py-3 transition-colors cursor-pointer ${
              active === brand
                ? activeClass
                : 'border border-white/20 text-white/60 hover:text-white hover:border-white/40'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Obsah aktivního tabu */}
      {activeCategories.length === 0 ? (
        <p className="text-white/40 font-light text-sm">
          Žádné dokumenty zatím nejsou k dispozici.
        </p>
      ) : (
        <div className="space-y-12">
          {activeCategories.map((cat) => (
            <div key={cat._id}>
              {/* Kategorie nadpis + dělítko */}
              <div className="flex items-center gap-4 mb-6">
                <span className="font-label-bold text-[11px] uppercase tracking-widest text-white/50 shrink-0">
                  {cat.title}
                </span>
                <div className={`flex-1 h-px ${activeConfig.accentBarClass}`} />
              </div>

              {/* Dokumenty */}
              {cat.documents.length === 0 ? (
                <p className="text-white/30 text-sm font-light">Žádné soubory.</p>
              ) : (
                <div className="divide-y divide-white/5">
                  {cat.documents.map((doc) => (
                    <div
                      key={doc._id}
                      className="flex items-center justify-between gap-6 py-4 hover:bg-white/5 px-2 -mx-2 transition-colors"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <PdfIcon />
                        <span className="text-white/80 font-light text-sm leading-snug truncate">
                          {doc.title}
                        </span>
                      </div>
                      <a
                        href={doc.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`shrink-0 font-label-bold text-[10px] uppercase tracking-widest transition-opacity hover:opacity-70 ${activeConfig.downloadClass}`}
                      >
                        Stáhnout →
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
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
cd /Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz && git add components/dokumenty/DokumentyTabs.tsx && git commit -m "feat(dokumenty): DokumentyTabs klientský komponent s taby a dokumenty"
```

---

### Task 4: Stránka app/dokumenty

**Files:**
- Create: `app/dokumenty/page.tsx`
- Create: `app/dokumenty/loading.tsx`

- [ ] **Krok 1: Vytvořit `app/dokumenty/page.tsx`**

```tsx
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { DokumentyTabs } from '@/components/dokumenty/DokumentyTabs'
import { getDocumentCategories } from '@/sanity/lib/queries'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dokumenty ke stažení',
  description:
    'Formuláře, souhlasy a dokumenty ke stažení pro Trampolíny Liberec, Trampolíny Patrman a trenéry.',
  openGraph: {
    title: 'Dokumenty ke stažení | Trampolíny.cz',
    description:
      'Formuláře, souhlasy a dokumenty ke stažení pro Trampolíny Liberec, Trampolíny Patrman a trenéry.',
    url: 'https://trampoliny.cz/dokumenty',
  },
  alternates: { canonical: 'https://trampoliny.cz/dokumenty' },
}

export default async function DokumentyPage() {
  const categories = await getDocumentCategories()

  return (
    <div className="font-body-md antialiased bg-border-dark min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* ── HERO ── */}
      <section className="bg-border-dark pt-24 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-container-max mx-auto px-gutter">
          <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-4">
            Právní & admin
          </span>
          <h1
            className="font-black uppercase tracking-tight leading-none text-white"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)', letterSpacing: '-0.03em' }}
          >
            Dokumenty
          </h1>
          <p
            className="mt-6 text-white/50 font-light"
            style={{ fontSize: 'clamp(14px, 1.1vw, 17px)' }}
          >
            Formuláře a dokumenty ke stažení
          </p>
        </div>
      </section>

      {/* ── TABS + OBSAH ── */}
      <DokumentyTabs categories={categories} />

      <Footer />
    </div>
  )
}
```

- [ ] **Krok 2: Vytvořit `app/dokumenty/loading.tsx`**

```tsx
import { Nav } from '@/components/layout/Nav'

export default function DokumentyLoading() {
  return (
    <div className="font-body-md antialiased bg-border-dark min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* Hero skeleton */}
      <section className="bg-border-dark pt-24 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="h-3 w-24 bg-white/20 rounded mb-4 animate-pulse" />
          <div className="h-14 w-52 bg-white/20 rounded mb-6 animate-pulse" />
          <div className="h-4 w-72 bg-white/10 rounded animate-pulse" />
        </div>
      </section>

      {/* Content skeleton */}
      <div className="max-w-container-max mx-auto px-gutter py-section-padding-mobile md:py-section-padding-desktop">
        {/* Tab buttons */}
        <div className="flex flex-wrap gap-2 mb-12">
          {[140, 160, 90].map((w, i) => (
            <div
              key={i}
              className="h-10 bg-white/10 rounded animate-pulse"
              style={{ width: w }}
            />
          ))}
        </div>

        {/* Category label + divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="h-3 w-36 bg-white/20 rounded animate-pulse shrink-0" />
          <div className="flex-1 h-px bg-white/10" />
        </div>

        {/* Document rows */}
        {[62, 48, 55, 70].map((pct, i) => (
          <div key={i} className="flex justify-between items-center py-4 border-b border-white/5">
            <div
              className="h-4 bg-white/10 rounded animate-pulse"
              style={{ width: `${pct}%` }}
            />
            <div className="h-3 w-16 bg-white/10 rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Krok 3: TypeScript check**

```bash
cd /Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz && npx tsc --noEmit 2>&1
```

Očekávaný výstup: žádné chyby.

- [ ] **Krok 4: Commit**

```bash
cd /Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz && git add app/dokumenty/page.tsx app/dokumenty/loading.tsx && git commit -m "feat(dokumenty): stránka /dokumenty s hero, taby a loading skeleton"
```

---

### Task 5: Sitemap + Footer + push

**Files:**
- Modify: `app/sitemap.ts`
- Modify: `components/layout/Footer.tsx`

- [ ] **Krok 1: Přidat `/dokumenty` do `app/sitemap.ts`**

Do pole `STATIC_ROUTES` přidej nový řádek za `/jak-na-to`:

```typescript
const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE,                         priority: 1.0, changeFrequency: "weekly" },
  { url: `${BASE}/trampoliny-liberec`, priority: 0.9, changeFrequency: "monthly" },
  { url: `${BASE}/trampoliny-patrman`, priority: 0.9, changeFrequency: "monthly" },
  { url: `${BASE}/treneri`,            priority: 0.7, changeFrequency: "monthly" },
  { url: `${BASE}/cenik`,              priority: 0.8, changeFrequency: "weekly" },
  { url: `${BASE}/jak-na-to`,          priority: 0.6, changeFrequency: "monthly" },
  { url: `${BASE}/dokumenty`,          priority: 0.6, changeFrequency: "monthly" },
  { url: `${BASE}/akce`,               priority: 0.8, changeFrequency: "daily" },
  { url: `${BASE}/galerie`,            priority: 0.7, changeFrequency: "weekly" },
];
```

- [ ] **Krok 2: Přidat link „Dokumenty" do `components/layout/Footer.tsx`**

Najdi sekci „Právní informace" (řádek ~29–36). Stávající kód:

```tsx
<div className="md:col-span-3">
  <h4 className="font-label-bold text-[11px] text-white/40 uppercase tracking-widest mb-6">Právní informace</h4>
  <div className="flex flex-col gap-4">
    {["Ochrana soukromí", "Všeobecné podmínky", "Mapa stránek"].map((item) => (
      <Link key={item} href="#" className="text-white/70 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest">
        {item}
      </Link>
    ))}
  </div>
</div>
```

Nahraď celý blok `<div className="flex flex-col gap-4">...</div>`:

```tsx
<div className="flex flex-col gap-4">
  {([
    ["Dokumenty", "/dokumenty"],
    ["Ochrana soukromí", "#"],
    ["Všeobecné podmínky", "#"],
    ["Mapa stránek", "#"],
  ] as [string, string][]).map(([label, href]) => (
    <Link key={label} href={href} className="text-white/70 hover:text-white transition-colors uppercase text-xs font-bold tracking-widest">
      {label}
    </Link>
  ))}
</div>
```

- [ ] **Krok 3: TypeScript check**

```bash
cd /Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz && npx tsc --noEmit 2>&1
```

Očekávaný výstup: žádné chyby.

- [ ] **Krok 4: Commit a push**

```bash
cd /Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz && git add app/sitemap.ts components/layout/Footer.tsx && git commit -m "feat(dokumenty): přidat /dokumenty do sitemap a footer" && git push origin main
```
