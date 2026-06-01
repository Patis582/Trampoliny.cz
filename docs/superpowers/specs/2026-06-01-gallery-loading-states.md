# Design: Gallery & Events — Loading States + LQIP Blur

**Datum:** 2026-06-01  
**Status:** Schváleno

---

## Co se mění

Dvě oddělené ale související vylepšení:

1. **LQIP blur placeholder** — Sanity ukládá miniaturní base64 náhled (`metadata.lqip`) u každého obrázku. Přidáme ho do queries a předáme Next.js `<Image>` jako `blurDataURL`. Obrázky se nikdy nezobrazí prázdné — okamžitě ukáží rozmazaný náhled, který se doostří po načtení.

2. **loading.tsx skeletony** — Next.js App Router zobrazí `loading.tsx` ihned při navigaci, zatímco server-side stránka se načítá. Tři nové soubory eliminují bílou obrazovku při přechodu na galerii, album, nebo akce.

---

## Část 1 — Sanity queries

**Soubor:** `sanity/lib/queries.ts`

### getGalleryAlbums (album list cover images)

Do `coverImage` bloku přidat:
```groq
"coverImage": coverImage {
  asset,
  "lqip": asset->metadata.lqip
}
```

### getGalleryAlbumBySlug (album detail photos)

Do `photos[]` bloku přidat:
```groq
"photos": photos[] {
  "_key": _key,
  "url": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "lqip": asset->metadata.lqip,
  alt
}
```

### getUpcomingEvents + getPastEvents (event card images)

Do `image` bloku přidat:
```groq
"image": image {
  asset,
  hotspot,
  "lqip": asset->metadata.lqip
}
```

---

## Část 2 — TypeScript typy

**Soubor:** `sanity/lib/queries.ts` (typy `GalleryPhoto`, `GalleryAlbumCard`, `Event`)

- `GalleryPhoto` — přidat `lqip?: string`
- `GalleryAlbumCard.coverImage` — přidat `lqip?: string`
- `Event.image` — přidat `lqip?: string`

---

## Část 3 — Image komponenty

### AlbumGallery.tsx

- Prvních 6 fotek: `priority` (načtou se ihned, bez lazy)
- Všechny fotky: `placeholder="blur"` + `blurDataURL={photo.lqip ?? undefined}`
- Pokud `lqip` chybí (starší záznamy): placeholder se tiše přeskočí

### AlbumCard.tsx

- Cover image: `placeholder="blur"` + `blurDataURL` z `album.coverImage.lqip`

### EventCard.tsx

- Event image: `placeholder="blur"` + `blurDataURL` z `event.image.lqip`

---

## Část 4 — loading.tsx skeletony

### app/galerie/loading.tsx

Simuluje album grid — 3×2 mřížka karet s `animate-pulse`:
- Každá karta: aspect-ratio 4:3, zaoblené rohy, šedý blok pro titulek pod kartou
- Odpovídá layoutu `AlbumCard` komponent

### app/galerie/[slug]/loading.tsx

Simuluje album detail:
- Nadpisový skeleton (titulek + datum)
- Masonry skeleton: 4 sloupce, různě vysoké bloky (simuluje různé výšky fotek)
- `animate-pulse` na všech blocích

### app/akce/loading.tsx

Simuluje events list:
- Filtrační lišta skeleton (řada tlačítek)
- 2×3 mřížka karet s `animate-pulse`
- Každá karta: image skeleton nahoře + 2 řádky textu

---

## Co se nemění

- Lightbox funkcionalita (`yet-another-react-lightbox`)
- Veškerá filtrace a vyhledávání v akcích
- URL struktura a routing
- Statická generace stránek (`generateStaticParams`)
- Sanity schéma — jen query, žádné změny ve schématu
