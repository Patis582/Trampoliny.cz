# Trenéři — Design Spec

## Goal

Stránka `/treneri` zobrazuje grid karet všech trenérů obou značek. Data spravována přes Sanity CMS.

## Architecture

Server component stránka (`app/treneri/page.tsx`) fetchuje data z Sanity pomocí `getTrainers()`. Grid karet je statická prezentace — žádná client-side interakce.

**Tech Stack:** Next.js App Router, Sanity CMS, Tailwind CSS v4, ISR revalidace

---

## Sanity Schema: `trainer`

Nový typ dokumentu `trainer` v `sanity/schemaTypes/trainer.ts`.

| Pole | Typ | Povinné | Poznámka |
|---|---|---|---|
| `name` | string | ✅ | Jméno trenéra |
| `slug` | slug (source: name) | ✅ | Pro ISR cache tag |
| `photo` | image (hotspot) | ✅ | Fotka trenéra |
| `bio` | text | ✅ | Krátký popis, pár vět |
| `specializations` | array of string | ✅ | Výběr z fixního listu, min 1 |
| `email` | string | ❌ | Kontaktní email |
| `phone` | string | ❌ | Kontaktní telefon |
| `order` | number | ✅ | Řídí pořadí v gridu |

**Fixní seznam specializací:**
- `zavodni-oddil` → "Závodní oddíl"
- `pripravky` → "Přípravky"
- `parkour` → "Parkour"
- `tabory` → "Tábory"
- `workshopy` → "Workshopy"
- `oslavy` → "Oslavy"
- `rodice-a-deti` → "Rodiče a děti"

---

## Nové soubory

- `sanity/schemaTypes/trainer.ts` — Sanity schema
- `app/treneri/page.tsx` — stránka (Server Component)
- `components/trainers/TrainerCard.tsx` — karta trenéra

## Změněné soubory

- `sanity/schemaTypes/index.ts` — přidat `trainerType`
- `sanity/lib/queries.ts` — přidat `Trainer` typ a `getTrainers()` query

---

## Stránka `/treneri`

Stejný pattern jako `/akce`:
- Fixed Nav + Footer
- `pt-40` padding top (kvůli fixed nav)
- Label "Realizační tým" (brand-orange) + H1 "Naši trenéři"
- Grid karet pod nadpisem
- `SectionError` při výpadku Sanity (null response)
- Prázdný stav: "Trenéři brzy přibydou." pokud prázdné pole

---

## Karta trenéra (`TrainerCard`)

Vertikální karta:
1. **Fotka** — aspect-ratio 3/4, `object-cover`, `object-position` dle hotspot
2. **Jméno** — `font-headline-sm uppercase`
3. **Badges** — flex-wrap řada, každá specializace jako malý pill (brand-orange pozadí, bílý text)
4. **Bio** — `font-body-md font-light text-on-surface-variant`
5. **Kontakt** — email a telefon jako klikatelné `<a>` tagy, zobrazí se jen pokud vyplněné

Grid layout: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`, gap-8

---

## Query

```ts
export type Trainer = {
  _id: string
  name: string
  slug: string
  photo?: { url: string; alt?: string }
  bio: string
  specializations: string[]
  email?: string
  phone?: string
  order: number
}

export async function getTrainers(): Promise<Trainer[] | null> {
  try {
    return await client.fetch(
      `*[_type == "trainer"] | order(order asc) { _id, name, "slug": slug.current, "photo": photo { "url": asset->url, "alt": alt }, bio, specializations, email, phone, order }`,
      {},
      { next: { tags: ['trainer'] } }
    )
  } catch {
    return null
  }
}
```

---

## Badge labels (mapping)

Komponenta `TrainerCard` mapuje hodnoty na zobrazené texty:

```ts
const SPECIALIZATION_LABELS: Record<string, string> = {
  'zavodni-oddil': 'Závodní oddíl',
  'pripravky': 'Přípravky',
  'parkour': 'Parkour',
  'tabory': 'Tábory',
  'workshopy': 'Workshopy',
  'oslavy': 'Oslavy',
  'rodice-a-deti': 'Rodiče a děti',
}
```

---

## Error Handling

- `getTrainers()` vrací `null` při chybě Sanity → `SectionError`
- `getTrainers()` vrací `[]` pokud žádní trenéři → prázdný stav text
- Fotka: pokud `photo` chybí, zobrazit šedý placeholder (stejný pattern jako event detail)
