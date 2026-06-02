# Trenéři Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `/treneri` page — a grid of trainer cards driven by Sanity CMS with a new `trainer` schema.

**Architecture:** New Sanity schema `trainer` → `getTrainers()` query in `sanity/lib/queries.ts` → `TrainerCard` component → Server Component page at `app/treneri/page.tsx`. Follows the same patterns as the existing `/akce` page and `service` schema.

**Tech Stack:** Next.js App Router (Server Components), Sanity CMS with ISR, Tailwind CSS v4

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `sanity/schemaTypes/trainer.ts` | Create | Sanity document schema for trainer |
| `sanity/schemaTypes/index.ts` | Modify | Register trainerType |
| `sanity/lib/queries.ts` | Modify | Trainer type + getTrainers() |
| `components/trainers/TrainerCard.tsx` | Create | Single trainer card UI |
| `app/treneri/page.tsx` | Create | Page — fetches + renders grid |

---

### Task 1: Sanity schema for trainer

**Files:**
- Create: `sanity/schemaTypes/trainer.ts`
- Modify: `sanity/schemaTypes/index.ts`

- [ ] **Step 1: Create `sanity/schemaTypes/trainer.ts`**

```ts
import { defineField, defineType, defineArrayMember } from 'sanity'

const SPECIALIZATIONS = [
  { title: 'Závodní oddíl', value: 'zavodni-oddil' },
  { title: 'Přípravky', value: 'pripravky' },
  { title: 'Parkour', value: 'parkour' },
  { title: 'Tábory', value: 'tabory' },
  { title: 'Workshopy', value: 'workshopy' },
  { title: 'Oslavy', value: 'oslavy' },
  { title: 'Rodiče a děti', value: 'rodice-a-deti' },
]

export const trainerType = defineType({
  name: 'trainer',
  title: 'Trenér',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Jméno',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Fotka',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'specializations',
      title: 'Specializace',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: { list: SPECIALIZATIONS },
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Telefon',
      type: 'string',
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
    select: { title: 'name', media: 'photo' },
    prepare({ title, media }) {
      return { title, media }
    },
  },
})
```

- [ ] **Step 2: Register in `sanity/schemaTypes/index.ts`**

Replace the current content:

```ts
import { type SchemaTypeDefinition } from 'sanity'
import { serviceType } from './service'
import { eventType } from './event'
import { announcementType } from './announcement'
import { trainerType } from './trainer'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [serviceType, eventType, announcementType, trainerType],
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add sanity/schemaTypes/trainer.ts sanity/schemaTypes/index.ts
git commit -m "feat: add trainer Sanity schema"
```

---

### Task 2: Trainer type and query

**Files:**
- Modify: `sanity/lib/queries.ts`

- [ ] **Step 1: Add `Trainer` type and `getTrainers()` at the end of `sanity/lib/queries.ts`**

Append after the last export in the file:

```ts
export type Trainer = {
  _id: string
  name: string
  slug: string
  photo?: { url: string; alt?: string; hotspot?: { x: number; y: number } }
  bio: string
  specializations: string[]
  email?: string
  phone?: string
  order: number
}

export async function getTrainers(): Promise<Trainer[] | null> {
  try {
    return await client.fetch(
      `*[_type == "trainer"] | order(order asc) {
        _id,
        name,
        "slug": slug.current,
        "photo": photo { "url": asset->url, "alt": alt, "hotspot": hotspot },
        bio,
        specializations,
        email,
        phone,
        order
      }`,
      {},
      { next: { tags: ['trainer'] } }
    )
  } catch {
    return null
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add sanity/lib/queries.ts
git commit -m "feat: add Trainer type and getTrainers query"
```

---

### Task 3: TrainerCard component

**Files:**
- Create: `components/trainers/TrainerCard.tsx`

- [ ] **Step 1: Create `components/trainers/TrainerCard.tsx`**

```tsx
import Image from 'next/image'
import { Trainer } from '@/sanity/lib/queries'

const SPECIALIZATION_LABELS: Record<string, string> = {
  'zavodni-oddil': 'Závodní oddíl',
  'pripravky': 'Přípravky',
  'parkour': 'Parkour',
  'tabory': 'Tábory',
  'workshopy': 'Workshopy',
  'oslavy': 'Oslavy',
  'rodice-a-deti': 'Rodiče a děti',
}

export function TrainerCard({ trainer }: { trainer: Trainer }) {
  const { name, photo, bio, specializations, email, phone } = trainer
  const objectPosition = photo?.hotspot
    ? `${photo.hotspot.x * 100}% ${photo.hotspot.y * 100}%`
    : 'center top'

  return (
    <div className="flex flex-col">
      {/* Photo */}
      <div className="relative w-full aspect-[3/4] overflow-hidden bg-surface-container mb-5">
        {photo?.url ? (
          <Image
            src={photo.url}
            alt={photo.alt ?? name}
            fill
            className="object-cover"
            style={{ objectPosition }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          />
        ) : (
          <div className="w-full h-full bg-surface-container-high" />
        )}
      </div>

      {/* Name */}
      <p className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight mb-3">
        {name}
      </p>

      {/* Badges */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {specializations.map((s) => (
          <span
            key={s}
            className="inline-block bg-brand-orange text-white font-label-bold text-[10px] uppercase tracking-widest px-2.5 py-1"
          >
            {SPECIALIZATION_LABELS[s] ?? s}
          </span>
        ))}
      </div>

      {/* Bio */}
      <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed mb-4 flex-1">
        {bio}
      </p>

      {/* Contact */}
      {(email || phone) && (
        <div className="flex flex-col gap-1 mt-auto pt-4 border-t border-surface-container-high">
          {phone && (
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="font-body-md text-body-md text-border-dark font-medium hover:text-brand-orange transition-colors"
            >
              {phone}
            </a>
          )}
          {email && (
            <a
              href={`mailto:${email}`}
              className="font-body-md text-body-md text-on-surface-variant font-light hover:text-brand-orange transition-colors text-sm"
            >
              {email}
            </a>
          )}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/trainers/TrainerCard.tsx
git commit -m "feat: add TrainerCard component"
```

---

### Task 4: /treneri page

**Files:**
- Create: `app/treneri/page.tsx`

- [ ] **Step 1: Create `app/treneri/page.tsx`**

```tsx
import { getTrainers } from '@/sanity/lib/queries'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { TrainerCard } from '@/components/trainers/TrainerCard'
import { SectionError } from '@/components/ui/SectionError'

export default async function TreneriPage() {
  const trainers = await getTrainers()

  return (
    <div className="font-body-md antialiased bg-white min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>
      <main className="pt-40 pb-section-padding-mobile md:pb-section-padding-desktop">
        <div className="max-w-container-max mx-auto px-gutter">
          <div className="mb-16">
            <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-6">
              Realizační tým
            </span>
            <h1 className="font-headline-md text-headline-md text-border-dark uppercase tracking-tight">
              Naši trenéři
            </h1>
          </div>
          {trainers === null ? (
            <SectionError message="Trenéři se momentálně nepodařilo načíst. Zkuste obnovit stránku." />
          ) : trainers.length === 0 ? (
            <p className="font-body-md text-on-surface-variant font-light">Trenéři brzy přibydou.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {trainers.map((trainer) => (
                <TrainerCard key={trainer._id} trainer={trainer} />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles and Next.js builds**

```bash
npx tsc --noEmit && npx next build
```

Expected: build completes without errors, `/treneri` listed as static route

- [ ] **Step 3: Start dev server and verify the page**

```bash
npx next dev
```

Open `http://localhost:3000/treneri` — expect:
- Nav and footer visible
- Header "Realizační tým / Naši trenéři"
- Empty state text "Trenéři brzy přibydou." (no Sanity data yet)
- No TypeScript or hydration errors in console

- [ ] **Step 4: Commit**

```bash
git add app/treneri/page.tsx
git commit -m "feat: add /treneri page"
```
