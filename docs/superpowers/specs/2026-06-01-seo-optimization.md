# Design: Kompletní SEO optimalizace

**Datum:** 2026-06-01  
**Status:** Schváleno  
**Produkční URL:** `https://trampoliny.cz`

---

## Přehled

Čtyři oblasti změn:
1. Základ: root layout, robots.ts, sitemap.ts
2. Statická metadata pro 8 statických stránek
3. Dynamická metadata (`generateMetadata`) pro 3 [slug] routes
4. JSON-LD structured data

---

## Část 1 — Základ

### app/layout.tsx — rozšířené metadata

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
}
```

`metadataBase` zajistí, že všechny relativní URL v og:image a canonical budou správně prefixovány.

### app/robots.ts (nový soubor)

```typescript
import type { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/studio" },
    sitemap: "https://trampoliny.cz/sitemap.xml",
  }
}
```

### app/sitemap.ts (nový soubor)

Dynamicky generovaný sitemap. Statické stránky mají pevné priority, dynamické se načtou ze Sanity.

```typescript
import type { MetadataRoute } from "next"
import {
  getAllEventSlugs,
  getAllGalleryAlbumSlugs,
  getAllActivitySlugs, // přidat do queries.ts pokud chybí
} from "@/sanity/lib/queries"

const BASE = "https://trampoliny.cz"

const STATIC_ROUTES: MetadataRoute.Sitemap = [
  { url: BASE,                            priority: 1.0,  changeFrequency: "weekly" },
  { url: `${BASE}/trampoliny-liberec`,    priority: 0.9,  changeFrequency: "monthly" },
  { url: `${BASE}/trampoliny-patrman`,    priority: 0.9,  changeFrequency: "monthly" },
  { url: `${BASE}/treneri`,              priority: 0.7,  changeFrequency: "monthly" },
  { url: `${BASE}/cenik`,                priority: 0.8,  changeFrequency: "weekly" },
  { url: `${BASE}/jak-na-to`,            priority: 0.6,  changeFrequency: "monthly" },
  { url: `${BASE}/akce`,                 priority: 0.8,  changeFrequency: "daily" },
  { url: `${BASE}/galerie`,              priority: 0.7,  changeFrequency: "weekly" },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [eventSlugs, albumSlugs, activitySlugs] = await Promise.all([
    getAllEventSlugs(),
    getAllGalleryAlbumSlugs(),
    getAllActivitySlugs(),
  ])

  return [
    ...STATIC_ROUTES,
    ...eventSlugs.map((slug) => ({
      url: `${BASE}/akce/${slug}`,
      priority: 0.7,
      changeFrequency: "weekly" as const,
    })),
    ...albumSlugs.map((slug) => ({
      url: `${BASE}/galerie/${slug}`,
      priority: 0.5,
      changeFrequency: "monthly" as const,
    })),
    ...activitySlugs.map((slug) => ({
      url: `${BASE}/aktivity/${slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
  ]
}
```

**Poznámka:** `getAllActivitySlugs` přidat do `sanity/lib/queries.ts` pokud neexistuje (stejný vzor jako `getAllEventSlugs`).

### public/og-default.jpg

Statický OG image 1200×630px. Soubor musí být dodán manuálně — umístit do `public/og-default.jpg`.

---

## Část 2 — Statická metadata

Každá statická stránka dostane `export const metadata: Metadata` s těmito hodnotami:

### app/page.tsx (home)
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
}
```

### app/trampoliny-liberec/page.tsx
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
}
```

### app/trampoliny-patrman/page.tsx
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
}
```

### app/treneri/page.tsx
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
}
```

### app/cenik/page.tsx
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
}
```

### app/jak-na-to/page.tsx
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
}
```

### app/akce/page.tsx
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
}
```

### app/galerie/page.tsx
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
}
```

---

## Část 3 — Dynamická metadata

### app/aktivity/[slug]/page.tsx

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) return {}

  const title = service.title
  const description = `Aktivita Trampolín Liberec a Trampolín Patrman — ${service.title}.`
  const ogImage = service.heroImage?.url ?? service.image?.url ?? undefined

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
  }
}
```

### app/akce/[slug]/page.tsx

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const event = await getEventBySlug(slug)
  if (!event) return {}

  const typeLabel = event.type === "jiné" && event.customType ? event.customType : TYPE_LABELS[event.type]
  const date = new Date(event.date).toLocaleDateString("cs-CZ", { day: "numeric", month: "long", year: "numeric" })
  const title = event.title
  const description = `${typeLabel} · ${date} — Trampolíny Liberec a Trampolíny Patrman.`
  const ogImage = event.image ? urlFor(event.image).width(1200).height(630).url() : undefined

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
  }
}
```

`TYPE_LABELS` přesunout nebo importovat ze sdíleného místa (aktuálně definováno v `EventCard.tsx`).

### app/galerie/[slug]/page.tsx

```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const album = await getGalleryAlbumBySlug(slug)
  if (!album) return {}

  const title = album.title
  const count = album.photos.length
  const date = new Date(album.date).toLocaleDateString("cs-CZ", { month: "long", year: "numeric" })
  const description = `Fotogalerie — ${album.title} · ${date} · ${count} fotek. Trampolíny Liberec a Trampolíny Patrman.`
  const ogImage = album.photos[0]?.url ?? undefined

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
  }
}
```

---

## Část 4 — JSON-LD Structured Data

JSON-LD se renderuje jako `<script type="application/ld+json">` přímo v page komponentech (server components). Žádná knihovna — plain object → JSON.stringify.

### app/page.tsx — Organization

```typescript
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Trampolíny.cz",
  url: "https://trampoliny.cz",
  logo: "https://trampoliny.cz/og-default.jpg",
  sameAs: [],  // doplnit URL sociálních sítí pokud existují
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    availableLanguage: "Czech",
  },
}
```

### app/trampoliny-liberec/page.tsx — SportsActivityLocation

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
}
```

### app/trampoliny-patrman/page.tsx — SportsActivityLocation

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
}
```

### app/akce/[slug]/page.tsx — Event

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
  ...(event.registration?.url ? {
    offers: {
      "@type": "Offer",
      url: event.registration.url,
      availability: event.registration.isOpen
        ? "https://schema.org/InStock"
        : "https://schema.org/SoldOut",
    },
  } : {}),
}
```

### Renderování JSON-LD (vzor pro všechny stránky)

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

---

## Co se nemění

- Sanity schema
- Routing a URL struktura
- Komponenty (Nav, Footer, atd.)
- `app/studio` — záměrně bez metadata, v robots.txt zakázáno pro crawlery

---

## Závislosti

- `getAllActivitySlugs` — přidat do `sanity/lib/queries.ts` pokud chybí
- `TYPE_LABELS` pro akce — přesunout do sdíleného souboru nebo duplikovat v page.tsx
- `public/og-default.jpg` — dodat manuálně (1200×630px)
- Adresa Trampolíny Patrman — doplnit přesnou adresu do JSON-LD
