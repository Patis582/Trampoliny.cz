# SEO Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Přidat kompletní SEO optimalizaci — metadata, sitemap, robots.txt, JSON-LD structured data a Open Graph pro všechny stránky.

**Architecture:** Next.js Metadata API (`export const metadata` + `generateMetadata`) pro všechny stránky. `app/robots.ts` + `app/sitemap.ts` pro crawlery. JSON-LD `<script>` přímo v page komponentech pro Organization, SportsActivityLocation a Event schema. Žádné nové závislosti.

**Tech Stack:** Next.js 16 App Router, TypeScript, Sanity CDN (`getAllServiceSlugs`, `getAllEventSlugs`, `getAllGalleryAlbumSlugs`)

---

### Task 1: Foundation — layout.tsx, robots.ts, sitemap.ts

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`

- [ ] **Krok 1: Aktualizovat `app/layout.tsx`**

Nahraď stávající `export const metadata` blok (řádky 21–25):

```typescript
export const metadata: Metadata = {
  metadataBase: new URL("https://trampoliny.cz"),
  title: {
    default: "Trampolíny.cz",
    template: "%s | Trampolíny.cz",
  },
  description:
    "Dva trampolínové oddíly v Liberci pod jednou střechou. Trampolíny Liberec — závodní sport a příprava reprezentantů. Trampolíny Patrman — skákání a aktivity pro celou rodinu.",
  openGraph: {
    type: "website",
    locale: "cs_CZ",
    siteName: "Trampolíny.cz",
    images: [{ url: "/og-default.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};
```

- [ ] **Krok 2: Vytvořit `app/robots.ts`**

```typescript
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/studio" },
    sitemap: "https://trampoliny.cz/sitemap.xml",
  };
}
```

- [ ] **Krok 3: Vytvořit `app/sitemap.ts`**

`getAllServiceSlugs` a `getAllEventSlugs` a `getAllGalleryAlbumSlugs` jsou již exportovány z `sanity/lib/queries.ts`.

```typescript
import type { MetadataRoute } from "next";
import {
  getAllEventSlugs,
  getAllGalleryAlbumSlugs,
  getAllServiceSlugs,
} from "@/sanity/lib/queries";

const BASE = "https://trampoliny.cz";

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE,                         priority: 1.0, changeFrequency: "weekly" },
  { url: `${BASE}/trampoliny-liberec`, priority: 0.9, changeFrequency: "monthly" },
  { url: `${BASE}/trampoliny-patrman`, priority: 0.9, changeFrequency: "monthly" },
  { url: `${BASE}/treneri`,            priority: 0.7, changeFrequency: "monthly" },
  { url: `${BASE}/cenik`,              priority: 0.8, changeFrequency: "weekly" },
  { url: `${BASE}/jak-na-to`,          priority: 0.6, changeFrequency: "monthly" },
  { url: `${BASE}/akce`,               priority: 0.8, changeFrequency: "daily" },
  { url: `${BASE}/galerie`,            priority: 0.7, changeFrequency: "weekly" },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [eventSlugs, albumSlugs, serviceSlugs] = await Promise.all([
    getAllEventSlugs(),
    getAllGalleryAlbumSlugs(),
    getAllServiceSlugs(),
  ]);

  return [
    ...STATIC_ROUTES,
    ...eventSlugs.map((slug) => ({
      url: `${BASE}/akce/${slug}`,
      priority: 0.7 as number,
      changeFrequency: "weekly" as const,
    })),
    ...albumSlugs.map((slug) => ({
      url: `${BASE}/galerie/${slug}`,
      priority: 0.5 as number,
      changeFrequency: "monthly" as const,
    })),
    ...serviceSlugs.map((slug) => ({
      url: `${BASE}/aktivity/${slug}`,
      priority: 0.8 as number,
      changeFrequency: "monthly" as const,
    })),
  ];
}
```

- [ ] **Krok 4: TypeScript check**

```bash
cd /Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz && npx tsc --noEmit 2>&1
```

Očekávaný výstup: žádné chyby.

- [ ] **Krok 5: Commit**

```bash
git add app/layout.tsx app/robots.ts app/sitemap.ts && git commit -m "feat(seo): základ — metadataBase, robots.ts, sitemap.ts"
```

---

### Task 2: Statická metadata pro všech 8 stránek

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/trampoliny-liberec/page.tsx`
- Modify: `app/trampoliny-patrman/page.tsx`
- Modify: `app/treneri/page.tsx`
- Modify: `app/cenik/page.tsx`
- Modify: `app/jak-na-to/page.tsx`
- Modify: `app/akce/page.tsx`
- Modify: `app/galerie/page.tsx`

Do každého souboru přidej na začátek (za stávající importy, před `export default`):

```typescript
import type { Metadata } from "next";
```

Pokud soubor již `Metadata` importuje — nepřidávej duplikátní import.

- [ ] **Krok 1: `app/page.tsx` — přidat import a metadata**

Za poslední `import` řádek přidej:
```typescript
import type { Metadata } from "next";
```

Před `export default async function Home()` přidej:
```typescript
export const metadata: Metadata = {
  title: "Dvě značky, jedna vášeň",
  description:
    "Dva trampolínové oddíly v Liberci pod jednou střechou. Trampolíny Liberec — závodní sport a příprava reprezentantů. Trampolíny Patrman — skákání a aktivity pro celou rodinu.",
  openGraph: {
    title: "Trampolíny.cz — Dvě značky, jedna vášeň",
    description:
      "Dva trampolínové oddíly v Liberci pod jednou střechou. Trampolíny Liberec — závodní sport a příprava reprezentantů. Trampolíny Patrman — skákání a aktivity pro celou rodinu.",
    url: "https://trampoliny.cz",
  },
  alternates: { canonical: "https://trampoliny.cz" },
};
```

- [ ] **Krok 2: `app/trampoliny-liberec/page.tsx`**

Za importy přidej `import type { Metadata } from "next";`, pak před `export default`:
```typescript
export const metadata: Metadata = {
  title: "Trampolíny Liberec — Závodní sportovní oddíl",
  description:
    "Závodní trampolínový oddíl s tradicí od roku 2009. 100+ závodníků, 300+ medailí, 10+ reprezentantů ČR. Trénujeme v TC Orionka v Liberci–Harcově.",
  openGraph: {
    title: "Trampolíny Liberec — Závodní sportovní oddíl",
    description:
      "Závodní trampolínový oddíl s tradicí od roku 2009. 100+ závodníků, 300+ medailí, 10+ reprezentantů ČR. Trénujeme v TC Orionka v Liberci–Harcově.",
    url: "https://trampoliny.cz/trampoliny-liberec",
  },
  alternates: { canonical: "https://trampoliny.cz/trampoliny-liberec" },
};
```

- [ ] **Krok 3: `app/trampoliny-patrman/page.tsx`**

```typescript
export const metadata: Metadata = {
  title: "Trampolíny Patrman — Skákání pro celou rodinu",
  description:
    "Trampolínové centrum Miroslava Patrmana v Liberci od roku 2009. Otevřené skákání, kurzy rodič a dítě, oslavy narozenin, výlety pro školy a pronájem hal pro celou rodinu.",
  openGraph: {
    title: "Trampolíny Patrman — Skákání pro celou rodinu",
    description:
      "Trampolínové centrum Miroslava Patrmana v Liberci od roku 2009. Otevřené skákání, kurzy rodič a dítě, oslavy narozenin, výlety pro školy a pronájem hal pro celou rodinu.",
    url: "https://trampoliny.cz/trampoliny-patrman",
  },
  alternates: { canonical: "https://trampoliny.cz/trampoliny-patrman" },
};
```

- [ ] **Krok 4: `app/treneri/page.tsx`**

```typescript
export const metadata: Metadata = {
  title: "Naši trenéři",
  description:
    "Tým trenérů a instruktorů za každým skokem, tréninkem a závodem Trampolín Liberec a Trampolín Patrman.",
  openGraph: {
    title: "Naši trenéři | Trampolíny.cz",
    description:
      "Tým trenérů a instruktorů za každým skokem, tréninkem a závodem Trampolín Liberec a Trampolín Patrman.",
    url: "https://trampoliny.cz/treneri",
  },
  alternates: { canonical: "https://trampoliny.cz/treneri" },
};
```

- [ ] **Krok 5: `app/cenik/page.tsx`**

```typescript
export const metadata: Metadata = {
  title: "Ceník vstupného a tréninků",
  description:
    "Přehled cen vstupů, členství a kurzů pro Trampolíny Liberec a Trampolíny Patrman v Liberci.",
  openGraph: {
    title: "Ceník vstupného a tréninků | Trampolíny.cz",
    description:
      "Přehled cen vstupů, členství a kurzů pro Trampolíny Liberec a Trampolíny Patrman v Liberci.",
    url: "https://trampoliny.cz/cenik",
  },
  alternates: { canonical: "https://trampoliny.cz/cenik" },
};
```

- [ ] **Krok 6: `app/jak-na-to/page.tsx`**

```typescript
export const metadata: Metadata = {
  title: "Jak se přihlásit přes EOS",
  description:
    "Krok za krokem jak se přihlásit na aktivity přes online systém EOS — vytvořte účet, vyberte aktivitu a za pár minut máte dítě přihlášené.",
  openGraph: {
    title: "Jak se přihlásit přes EOS | Trampolíny.cz",
    description:
      "Krok za krokem jak se přihlásit na aktivity přes online systém EOS — vytvořte účet, vyberte aktivitu a za pár minut máte dítě přihlášené.",
    url: "https://trampoliny.cz/jak-na-to",
  },
  alternates: { canonical: "https://trampoliny.cz/jak-na-to" },
};
```

- [ ] **Krok 7: `app/akce/page.tsx`**

```typescript
export const metadata: Metadata = {
  title: "Akce a závody",
  description:
    "Nadcházející závody, tábory, workshopy a akce od Trampolín Liberec a Trampolín Patrman.",
  openGraph: {
    title: "Akce a závody | Trampolíny.cz",
    description:
      "Nadcházející závody, tábory, workshopy a akce od Trampolín Liberec a Trampolín Patrman.",
    url: "https://trampoliny.cz/akce",
  },
  alternates: { canonical: "https://trampoliny.cz/akce" },
};
```

- [ ] **Krok 8: `app/galerie/page.tsx`**

```typescript
export const metadata: Metadata = {
  title: "Galerie",
  description:
    "Fotky z tréninků, závodů, táborů a akcí Trampolín Liberec a Trampolín Patrman.",
  openGraph: {
    title: "Galerie | Trampolíny.cz",
    description:
      "Fotky z tréninků, závodů, táborů a akcí Trampolín Liberec a Trampolín Patrman.",
    url: "https://trampoliny.cz/galerie",
  },
  alternates: { canonical: "https://trampoliny.cz/galerie" },
};
```

- [ ] **Krok 9: TypeScript check**

```bash
cd /Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz && npx tsc --noEmit 2>&1
```

Očekávaný výstup: žádné chyby.

- [ ] **Krok 10: Commit**

```bash
git add app/page.tsx app/trampoliny-liberec/page.tsx app/trampoliny-patrman/page.tsx app/treneri/page.tsx app/cenik/page.tsx app/jak-na-to/page.tsx app/akce/page.tsx app/galerie/page.tsx && git commit -m "feat(seo): statická metadata pro všechny stránky"
```

---

### Task 3: JSON-LD — home, trampoliny-liberec, trampoliny-patrman

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/trampoliny-liberec/page.tsx`
- Modify: `app/trampoliny-patrman/page.tsx`

JSON-LD se vkládá jako `<script>` tag přímo do JSX return — jako první child hlavního wrapperu `<div>`. Funguje v `<body>` i pro Google.

- [ ] **Krok 1: `app/page.tsx` — Organization JSON-LD**

Uvnitř funkce `Home()`, těsně před `return (` přidej:

```typescript
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Trampolíny.cz",
    url: "https://trampoliny.cz",
    logo: "https://trampoliny.cz/og-default.jpg",
    sameAs: [] as string[],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      availableLanguage: "Czech",
    },
  };
```

Do JSX return, jako první child hlavního `<div>` wrapper:
```tsx
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
```

- [ ] **Krok 2: `app/trampoliny-liberec/page.tsx` — SportsActivityLocation**

Před `return (` přidej:

```typescript
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "Trampolíny Liberec",
    url: "https://trampoliny.cz/trampoliny-liberec",
    description: "Závodní trampolínový oddíl s tradicí od roku 2009.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Harcovská 1209/3",
      addressLocality: "Liberec",
      addressRegion: "Liberecký kraj",
      addressCountry: "CZ",
    },
    sport: "Trampolining",
    foundingDate: "2009",
  };
```

Do JSX jako první child hlavního wrapperu:
```tsx
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
```

- [ ] **Krok 3: `app/trampoliny-patrman/page.tsx` — SportsActivityLocation**

Před `return (` přidej:

```typescript
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    name: "Trampolíny Patrman",
    url: "https://trampoliny.cz/trampoliny-patrman",
    description: "Trampolínové centrum Miroslava Patrmana v Liberci od roku 2009.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Liberec",
      addressCountry: "CZ",
    },
    sport: "Trampolining",
    foundingDate: "2009",
  };
```

Do JSX jako první child hlavního wrapperu:
```tsx
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
```

- [ ] **Krok 4: TypeScript check**

```bash
cd /Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz && npx tsc --noEmit 2>&1
```

- [ ] **Krok 5: Commit**

```bash
git add app/page.tsx app/trampoliny-liberec/page.tsx app/trampoliny-patrman/page.tsx && git commit -m "feat(seo): JSON-LD Organization a SportsActivityLocation"
```

---

### Task 4: generateMetadata — app/aktivity/[slug]/page.tsx

**Files:**
- Modify: `app/aktivity/[slug]/page.tsx`

`getServiceBySlug` a `getAllServiceSlugs` jsou již importovány. `ServiceDetail` má `heroImage?: { url: string }` a `image?: { url: string }`.

- [ ] **Krok 1: Přidat import Metadata**

Za stávající importy přidej:
```typescript
import type { Metadata } from "next";
```

- [ ] **Krok 2: Přidat generateMetadata**

Za `export async function generateStaticParams()` blok přidej:

```typescript
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};

  const title = service.title;
  const description = `Aktivita Trampolín Liberec a Trampolín Patrman — ${service.title}.`;
  const ogImage = service.heroImage?.url ?? service.image?.url ?? undefined;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Trampolíny.cz`,
      description,
      url: `https://trampoliny.cz/aktivity/${slug}`,
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
    alternates: { canonical: `https://trampoliny.cz/aktivity/${slug}` },
  };
}
```

- [ ] **Krok 3: TypeScript check**

```bash
cd /Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz && npx tsc --noEmit 2>&1
```

- [ ] **Krok 4: Commit**

```bash
git add "app/aktivity/[slug]/page.tsx" && git commit -m "feat(seo): generateMetadata pro aktivity/[slug]"
```

---

### Task 5: generateMetadata + JSON-LD Event — app/akce/[slug]/page.tsx

**Files:**
- Modify: `app/akce/[slug]/page.tsx`

`getEventBySlug`, `getAllEventSlugs`, `urlFor` a `TYPE_LABELS` jsou již v souboru definovány/importovány.

- [ ] **Krok 1: Přidat import Metadata**

```typescript
import type { Metadata } from "next";
```

- [ ] **Krok 2: Přidat generateMetadata**

Za `generateStaticParams` blok přidej:

```typescript
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) return {};

  const typeLabel =
    event.type === "jiné" && event.customType
      ? event.customType
      : TYPE_LABELS[event.type];
  const date = new Date(event.date).toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const title = event.title;
  const description = `${typeLabel} · ${date} — Trampolíny Liberec a Trampolíny Patrman.`;
  const ogImage = event.image
    ? urlFor(event.image).width(1200).height(630).url()
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Trampolíny.cz`,
      description,
      url: `https://trampoliny.cz/akce/${slug}`,
      type: "article",
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
    alternates: { canonical: `https://trampoliny.cz/akce/${slug}` },
  };
}
```

- [ ] **Krok 3: Přidat Event JSON-LD do page funkce**

V `export default async function` těsně před `return (` přidej (za `if (!event) notFound()` a za existující data fetch):

```typescript
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    startDate: event.date,
    ...(event.endDate ? { endDate: event.endDate } : {}),
    url: `https://trampoliny.cz/akce/${event.slug}`,
    organizer: {
      "@type": "Organization",
      name: "Trampolíny.cz",
      url: "https://trampoliny.cz",
    },
    ...(event.registration?.url
      ? {
          offers: {
            "@type": "Offer",
            url: event.registration.url,
            availability: event.registration.isOpen
              ? "https://schema.org/InStock"
              : "https://schema.org/SoldOut",
          },
        }
      : {}),
  };
```

Do JSX jako první child hlavního wrapperu přidej:
```tsx
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
```

- [ ] **Krok 4: TypeScript check**

```bash
cd /Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz && npx tsc --noEmit 2>&1
```

- [ ] **Krok 5: Commit**

```bash
git add "app/akce/[slug]/page.tsx" && git commit -m "feat(seo): generateMetadata + Event JSON-LD pro akce/[slug]"
```

---

### Task 6: generateMetadata — app/galerie/[slug]/page.tsx

**Files:**
- Modify: `app/galerie/[slug]/page.tsx`

`getGalleryAlbumBySlug` je již importován. `GalleryAlbumDetail` má `title`, `date`, `photos[]` (každá foto má `url`).

- [ ] **Krok 1: Přidat import Metadata**

```typescript
import type { Metadata } from "next";
```

- [ ] **Krok 2: Přidat generateMetadata**

Za `generateStaticParams` blok přidej:

```typescript
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const album = await getGalleryAlbumBySlug(slug);
  if (!album) return {};

  const title = album.title;
  const count = album.photos.length;
  const date = new Date(album.date).toLocaleDateString("cs-CZ", {
    month: "long",
    year: "numeric",
  });
  const description = `Fotogalerie — ${album.title} · ${date} · ${count} fotek. Trampolíny Liberec a Trampolíny Patrman.`;
  const ogImage = album.photos[0]?.url ?? undefined;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Trampolíny.cz`,
      description,
      url: `https://trampoliny.cz/galerie/${slug}`,
      type: "article",
      ...(ogImage ? { images: [{ url: ogImage, width: 1200, height: 630 }] } : {}),
    },
    alternates: { canonical: `https://trampoliny.cz/galerie/${slug}` },
  };
}
```

- [ ] **Krok 3: TypeScript check**

```bash
cd /Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz && npx tsc --noEmit 2>&1
```

- [ ] **Krok 4: Commit + push**

```bash
git add "app/galerie/[slug]/page.tsx" && git commit -m "feat(seo): generateMetadata pro galerie/[slug]" && git push origin v2-redesign
```
