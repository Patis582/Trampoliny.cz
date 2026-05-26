# Akce, kalendář a aktuality — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Přidat správu akcí (závody, tábory) a aktualit přes Sanity CMS — zobrazit je na homepage i na samostatné stránce `/akce` s přepínačem seznam/kalendář.

**Architecture:** Sanity CMS drží data (`event` + `announcement`), Next.js fetchuje data jako Server Components (ISR), Sanity webhook zavolá `/api/revalidate` po každé změně. Interaktivní části (filtr, kalendář, přepínač pohledu) jsou Client Components, ale data dostávají jako prop — žádný client-side fetch.

**Tech Stack:** Next.js 16 (App Router), Sanity v3, next-sanity v9, @portabletext/react, @sanity/image-url, Vitest + @testing-library/react

---

## File Map

```
Nové soubory:
  .env.local.example
  sanity.config.ts                          Sanity Studio konfigurace (root)
  sanity/schema/event.ts                    Schema pro akce
  sanity/schema/announcement.ts             Schema pro aktuality
  sanity/schema/index.ts                    Export schémat
  app/studio/[[...tool]]/page.tsx           Embedded Sanity Studio na /studio
  lib/sanity/client.ts                      Sanity klient
  lib/sanity/types.ts                       TypeScript typy
  lib/sanity/queries.ts                     GROQ dotazy + imageUrlBuilder
  app/api/revalidate/route.ts               Webhook endpoint
  components/announcements/AnnouncementBanner.tsx
  components/events/EventCard.tsx
  components/events/EventsList.tsx          List view + filtr (Client Component)
  components/events/EventsCalendar.tsx      Kalendářový grid (Client Component)
  components/events/EventsViewToggle.tsx    Přepínač seznam/kalendář (Client Component)
  app/akce/page.tsx                         Stránka /akce (Server Component)
  app/akce/AkceClient.tsx                   Client wrapper — přepínač + obsah
  vitest.config.ts
  vitest.setup.ts
  __tests__/api/revalidate.test.ts
  __tests__/components/AnnouncementBanner.test.tsx

Upravené soubory:
  package.json                              Přidat závislosti
  next.config.ts                            Přidat Sanity CDN do remotePatterns
  app/page.tsx                              Přidat sekce aktuality + nadcházející akce
```

---

### Task 1: Nainstalovat závislosti a připravit env

**Files:**
- Modify: `package.json`
- Create: `.env.local.example`

- [ ] **Step 1: Nainstalovat balíčky**

```bash
npm install next-sanity@^9 sanity @sanity/image-url @portabletext/react
npm install --save-dev vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 2: Vytvořit `.env.local.example`**

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_read_token
SANITY_REVALIDATE_SECRET=your_random_secret
```

- [ ] **Step 3: Zkopírovat do `.env.local` a vyplnit hodnoty**

Jdi na https://sanity.io/manage → vytvoř nový projekt (nebo použij existující) → zkopíruj Project ID a Dataset → vytvoř Read token v Settings → API tokens → vygeneruj náhodný řetězec pro `SANITY_REVALIDATE_SECRET` (např. `openssl rand -hex 32`).

- [ ] **Step 4: Přidat `.env.local` do `.gitignore` (pokud tam ještě není)**

```bash
grep -q ".env.local" .gitignore || echo ".env.local" >> .gitignore
```

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json .env.local.example .gitignore
git commit -m "chore: add Sanity and Vitest dependencies"
```

---

### Task 2: Sanity schémata

**Files:**
- Create: `sanity/schema/event.ts`
- Create: `sanity/schema/announcement.ts`
- Create: `sanity/schema/index.ts`

- [ ] **Step 1: Vytvořit `sanity/schema/event.ts`**

```typescript
import { defineType, defineField } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Akce',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název akce',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Datum začátku',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'Datum konce',
      type: 'datetime',
      description: 'Vyplň jen pro vícedenní akce (tábory, soustředění)',
    }),
    defineField({
      name: 'type',
      title: 'Typ akce',
      type: 'string',
      options: {
        list: [
          { title: 'Závod', value: 'závod' },
          { title: 'Tábor', value: 'tábor' },
          { title: 'Open Gym', value: 'open-gym' },
          { title: 'Jiné', value: 'jiné' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Popis',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'image',
      title: 'Fotka',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'links',
      title: 'Doplňkové odkazy',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Popis', type: 'string' },
            { name: 'url', title: 'URL', type: 'url' },
          ],
        },
      ],
    }),
    defineField({
      name: 'registration',
      title: 'Přihlášky',
      type: 'object',
      fields: [
        { name: 'url', title: 'URL přihlášky', type: 'url' },
        {
          name: 'isOpen',
          title: 'Přihlášky jsou otevřeny',
          type: 'boolean',
          initialValue: false,
        },
      ],
    }),
  ],
  orderings: [
    {
      title: 'Datum (nejbližší první)',
      name: 'dateAsc',
      by: [{ field: 'date', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'date' },
  },
})
```

- [ ] **Step 2: Vytvořit `sanity/schema/announcement.ts`**

```typescript
import { defineType, defineField } from 'sanity'

export const announcement = defineType({
  name: 'announcement',
  title: 'Aktualita',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Nadpis',
      type: 'string',
      description: 'Krátký nadpis (např. "Otevřeny přihlášky na letní tábor")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Text',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Volitelný delší text',
    }),
    defineField({
      name: 'link',
      title: 'Odkaz / CTA tlačítko',
      type: 'object',
      fields: [
        { name: 'label', title: 'Text tlačítka', type: 'string' },
        { name: 'url', title: 'URL', type: 'url' },
      ],
    }),
    defineField({
      name: 'expiresAt',
      title: 'Platí do',
      type: 'datetime',
      description: 'Po tomto datu se aktualita automaticky skryje. Nech prázdné pro trvalé zobrazení.',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'expiresAt' },
  },
})
```

- [ ] **Step 3: Vytvořit `sanity/schema/index.ts`**

```typescript
import { event } from './event'
import { announcement } from './announcement'

export const schemaTypes = [event, announcement]
```

- [ ] **Step 4: Commit**

```bash
git add sanity/
git commit -m "feat: add Sanity schema for events and announcements"
```

---

### Task 3: Sanity Studio nastavení

**Files:**
- Create: `sanity.config.ts`
- Create: `app/studio/[[...tool]]/page.tsx`

- [ ] **Step 1: Vytvořit `sanity.config.ts` (v root adresáři)**

```typescript
import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schema'

export default defineConfig({
  name: 'trampolinycz',
  title: 'Trampolíny Liberec',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  plugins: [structureTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
})
```

- [ ] **Step 2: Vytvořit `app/studio/[[...tool]]/page.tsx`**

```typescript
import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

export { metadata, viewport } from 'next-sanity/studio'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

- [ ] **Step 3: Ověřit Studio na `http://localhost:3000/studio`**

Spusť `npm run dev`, otevři `http://localhost:3000/studio`. Mělo by se zobrazit Sanity Studio s typy Akce a Aktualita v menu.

- [ ] **Step 4: Commit**

```bash
git add sanity.config.ts app/studio/
git commit -m "feat: embed Sanity Studio at /studio"
```

---

### Task 4: Sanity klient, typy a GROQ dotazy

**Files:**
- Create: `lib/sanity/client.ts`
- Create: `lib/sanity/types.ts`
- Create: `lib/sanity/queries.ts`

- [ ] **Step 1: Vytvořit `lib/sanity/client.ts`**

```typescript
import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

const builder = imageUrlBuilder(sanityClient)

export function urlFor(source: { asset: { _ref: string } }) {
  return builder.image(source)
}
```

- [ ] **Step 2: Vytvořit `lib/sanity/types.ts`**

```typescript
export type EventType = 'závod' | 'tábor' | 'open-gym' | 'jiné'

export interface EventLink {
  label: string
  url: string
}

export interface SanityImageAsset {
  asset: { _ref: string; _type: 'reference' }
  hotspot?: { x: number; y: number }
}

export interface Event {
  _id: string
  title: string
  date: string
  endDate?: string
  type: EventType
  description?: unknown[]
  image?: SanityImageAsset
  links?: EventLink[]
  registration?: {
    url?: string
    isOpen: boolean
  }
}

export interface Announcement {
  _id: string
  title: string
  body?: unknown[]
  link?: {
    label: string
    url: string
  }
  expiresAt?: string
}
```

- [ ] **Step 3: Vytvořit `lib/sanity/queries.ts`**

```typescript
import { sanityClient } from './client'
import type { Event, Announcement } from './types'

const EVENT_FIELDS = `
  _id, title, date, endDate, type, description,
  image { asset, hotspot },
  links[] { label, url },
  registration { url, isOpen }
`

export async function getUpcomingEvents(limit?: number): Promise<Event[]> {
  const slice = limit ? `[0...${limit}]` : ''
  return sanityClient.fetch(
    `*[_type == "event" && date >= now()] | order(date asc) ${slice} { ${EVENT_FIELDS} }`
  )
}

export async function getActiveAnnouncements(): Promise<Announcement[]> {
  return sanityClient.fetch(
    `*[_type == "announcement" && (!defined(expiresAt) || expiresAt >= now())] | order(_createdAt desc) {
      _id, title, body, link { label, url }, expiresAt
    }`
  )
}
```

- [ ] **Step 4: Commit**

```bash
git add lib/
git commit -m "feat: add Sanity client, types and GROQ queries"
```

---

### Task 5: Revalidate webhook endpoint + Vitest setup

**Files:**
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `app/api/revalidate/route.ts`
- Create: `__tests__/api/revalidate.test.ts`

- [ ] **Step 1: Vytvořit `vitest.config.ts`**

```typescript
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
})
```

- [ ] **Step 2: Vytvořit `vitest.setup.ts`**

```typescript
import '@testing-library/jest-dom'
```

- [ ] **Step 3: Přidat test script do `package.json`**

Otevři `package.json` a přidej do `"scripts"`:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Napsat failing testy pro webhook**

Vytvořit `__tests__/api/revalidate.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { NextRequest } from 'next/server'

vi.mock('next/cache', () => ({
  revalidatePath: vi.fn(),
}))

describe('POST /api/revalidate', () => {
  beforeEach(() => {
    process.env.SANITY_REVALIDATE_SECRET = 'test-secret'
    vi.clearAllMocks()
  })

  it('returns 401 when secret is missing', async () => {
    const { POST } = await import('@/app/api/revalidate/route')
    const req = new NextRequest('http://localhost/api/revalidate', { method: 'POST' })
    const res = await POST(req)
    expect(res.status).toBe(401)
  })

  it('returns 401 when secret is wrong', async () => {
    const { POST } = await import('@/app/api/revalidate/route')
    const req = new NextRequest('http://localhost/api/revalidate?secret=wrong', { method: 'POST' })
    const res = await POST(req)
    expect(res.status).toBe(401)
  })

  it('returns 200 and revalidates paths when secret is correct', async () => {
    const { revalidatePath } = await import('next/cache')
    const { POST } = await import('@/app/api/revalidate/route')
    const req = new NextRequest('http://localhost/api/revalidate?secret=test-secret', { method: 'POST' })
    const res = await POST(req)
    expect(res.status).toBe(200)
    expect(revalidatePath).toHaveBeenCalledWith('/')
    expect(revalidatePath).toHaveBeenCalledWith('/akce')
  })
})
```

- [ ] **Step 5: Spustit testy a ověřit že failují**

```bash
npm test
```

Očekávaný výstup: 3 failing testy s chybou "Cannot find module '@/app/api/revalidate/route'"

- [ ] **Step 6: Vytvořit `app/api/revalidate/route.ts`**

```typescript
import { revalidatePath } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
  }

  revalidatePath('/')
  revalidatePath('/akce')

  return NextResponse.json({ revalidated: true, timestamp: Date.now() })
}
```

- [ ] **Step 7: Spustit testy a ověřit že prochází**

```bash
npm test
```

Očekávaný výstup: 3 passing tests

- [ ] **Step 8: Commit**

```bash
git add vitest.config.ts vitest.setup.ts app/api/ __tests__/ package.json
git commit -m "feat: add revalidate webhook endpoint with tests"
```

---

### Task 6: AnnouncementBanner komponenta

**Files:**
- Create: `components/announcements/AnnouncementBanner.tsx`
- Create: `__tests__/components/AnnouncementBanner.test.tsx`

- [ ] **Step 1: Napsat failing testy**

Vytvořit `__tests__/components/AnnouncementBanner.test.tsx`:

```typescript
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AnnouncementBanner } from '@/components/announcements/AnnouncementBanner'
import type { Announcement } from '@/lib/sanity/types'

describe('AnnouncementBanner', () => {
  it('renders nothing when announcements array is empty', () => {
    const { container } = render(<AnnouncementBanner announcements={[]} />)
    expect(container.firstChild).toBeNull()
  })

  it('renders announcement title', () => {
    const announcements: Announcement[] = [
      { _id: '1', title: 'Otevřeny přihlášky na letní tábor' },
    ]
    render(<AnnouncementBanner announcements={announcements} />)
    expect(screen.getByText('Otevřeny přihlášky na letní tábor')).toBeTruthy()
  })

  it('renders CTA link when provided', () => {
    const announcements: Announcement[] = [
      {
        _id: '1',
        title: 'Test',
        link: { label: 'Přihlásit se', url: 'https://example.com' },
      },
    ]
    render(<AnnouncementBanner announcements={announcements} />)
    const link = screen.getByRole('link', { name: 'Přihlásit se' })
    expect(link).toBeTruthy()
    expect(link.getAttribute('href')).toBe('https://example.com')
  })

  it('renders multiple announcements', () => {
    const announcements: Announcement[] = [
      { _id: '1', title: 'První aktualita' },
      { _id: '2', title: 'Druhá aktualita' },
    ]
    render(<AnnouncementBanner announcements={announcements} />)
    expect(screen.getByText('První aktualita')).toBeTruthy()
    expect(screen.getByText('Druhá aktualita')).toBeTruthy()
  })
})
```

- [ ] **Step 2: Spustit testy a ověřit že failují**

```bash
npm test
```

Očekávaný výstup: 4 failing testy s "Cannot find module '@/components/announcements/AnnouncementBanner'"

- [ ] **Step 3: Vytvořit `components/announcements/AnnouncementBanner.tsx`**

```tsx
import type { Announcement } from '@/lib/sanity/types'

interface Props {
  announcements: Announcement[]
}

export function AnnouncementBanner({ announcements }: Props) {
  if (announcements.length === 0) return null

  return (
    <div className="bg-border-dark text-white">
      <div className="max-w-container-max mx-auto px-gutter py-4">
        {announcements.map((item) => (
          <div
            key={item._id}
            className="flex flex-col sm:flex-row sm:items-center gap-3 py-2 border-b border-white/10 last:border-0"
          >
            <span className="inline-block bg-brand-orange text-white font-label-bold text-label-bold uppercase tracking-widest px-2 py-0.5 text-xs shrink-0">
              Novinka
            </span>
            <p className="font-body-md text-sm text-white/90 flex-1">{item.title}</p>
            {item.link?.url && (
              <a
                href={item.link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label-bold text-label-bold text-brand-orange uppercase tracking-wider text-xs hover:text-white transition-colors shrink-0"
              >
                {item.link.label} →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Spustit testy a ověřit že prochází**

```bash
npm test
```

Očekávaný výstup: všechny testy passing

- [ ] **Step 5: Commit**

```bash
git add components/announcements/ __tests__/components/
git commit -m "feat: add AnnouncementBanner component"
```

---

### Task 7: EventCard komponenta

**Files:**
- Create: `components/events/EventCard.tsx`

- [ ] **Step 1: Vytvořit `components/events/EventCard.tsx`**

```tsx
import Image from 'next/image'
import type { Event, EventType } from '@/lib/sanity/types'
import { urlFor } from '@/lib/sanity/client'

const TYPE_LABELS: Record<EventType, string> = {
  'závod': 'Závod',
  'tábor': 'Tábor',
  'open-gym': 'Open Gym',
  'jiné': 'Jiné',
}

const TYPE_COLORS: Record<EventType, string> = {
  'závod': 'bg-brand-orange text-white',
  'tábor': 'bg-brand-green text-border-dark',
  'open-gym': 'bg-border-dark text-white',
  'jiné': 'bg-surface-container text-on-surface',
}

function formatDate(dateStr: string, endDateStr?: string): string {
  const date = new Date(dateStr)
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
  if (!endDateStr) return date.toLocaleDateString('cs-CZ', opts)
  const end = new Date(endDateStr)
  if (date.toDateString() === end.toDateString()) return date.toLocaleDateString('cs-CZ', opts)
  return `${date.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long' })} – ${end.toLocaleDateString('cs-CZ', opts)}`
}

interface Props {
  event: Event
  compact?: boolean
}

export function EventCard({ event, compact = false }: Props) {
  return (
    <div className="group flex flex-col bg-white border border-surface-container-high hover:shadow-md transition-shadow">
      {event.image && !compact && (
        <div className="aspect-video overflow-hidden relative">
          <Image
            src={urlFor(event.image).width(800).height(450).url()}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-3 mb-4">
          <span
            className={`font-label-bold text-label-bold uppercase tracking-widest text-xs px-2 py-1 shrink-0 ${TYPE_COLORS[event.type]}`}
          >
            {TYPE_LABELS[event.type]}
          </span>
          {event.registration?.isOpen && (
            <span className="font-label-bold text-label-bold uppercase tracking-widest text-xs px-2 py-1 bg-brand-green/20 text-on-tertiary-container border border-brand-green shrink-0">
              Přihlášky otevřeny
            </span>
          )}
        </div>
        <p className="font-label-bold text-label-bold text-outline uppercase tracking-wider text-xs mb-2">
          {formatDate(event.date, event.endDate)}
        </p>
        <h3 className="font-headline-sm text-headline-sm text-border-dark uppercase mb-3 leading-tight">
          {event.title}
        </h3>
        {!compact && event.links && event.links.length > 0 && (
          <div className="mt-auto pt-4 flex flex-wrap gap-3">
            {event.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-label-bold text-label-bold text-xs uppercase tracking-wider text-border-dark hover:text-brand-orange transition-colors"
              >
                {link.label} →
              </a>
            ))}
          </div>
        )}
        {event.registration?.url && (
          <a
            href={event.registration.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex justify-center items-center bg-brand-orange text-white font-label-bold text-label-bold px-6 py-3 text-xs uppercase tracking-wider hover:bg-border-dark transition-colors"
          >
            Přihlásit se
          </a>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add components/events/EventCard.tsx
git commit -m "feat: add EventCard component"
```

---

### Task 8: /akce stránka — server component + list view s filtrem

**Files:**
- Create: `components/events/EventsList.tsx`
- Create: `components/events/EventsViewToggle.tsx`
- Create: `app/akce/page.tsx`

- [ ] **Step 1: Vytvořit `components/events/EventsList.tsx`** (Client Component — filtr)

```tsx
'use client'

import { useState } from 'react'
import { EventCard } from './EventCard'
import type { Event, EventType } from '@/lib/sanity/types'

type Filter = 'vše' | EventType

const FILTERS: { value: Filter; label: string }[] = [
  { value: 'vše', label: 'Vše' },
  { value: 'závod', label: 'Závody' },
  { value: 'tábor', label: 'Tábory' },
  { value: 'open-gym', label: 'Open Gym' },
  { value: 'jiné', label: 'Jiné' },
]

interface Props {
  events: Event[]
}

export function EventsList({ events }: Props) {
  const [filter, setFilter] = useState<Filter>('vše')

  const filtered = filter === 'vše' ? events : events.filter((e) => e.type === filter)

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-12">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`font-label-bold text-label-bold text-xs uppercase tracking-widest px-4 py-2 border transition-colors ${
              filter === f.value
                ? 'bg-border-dark text-white border-border-dark'
                : 'bg-white text-outline border-surface-container-high hover:border-border-dark hover:text-border-dark'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="font-body-md text-outline text-center py-24">
          Žádné nadcházející akce v této kategorii.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((event) => (
            <EventCard key={event._id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Vytvořit `components/events/EventsViewToggle.tsx`** (Client Component)

```tsx
'use client'

interface Props {
  view: 'seznam' | 'kalendář'
  onChange: (view: 'seznam' | 'kalendář') => void
}

export function EventsViewToggle({ view, onChange }: Props) {
  return (
    <div className="flex border border-surface-container-high">
      {(['seznam', 'kalendář'] as const).map((v) => (
        <button
          key={v}
          onClick={() => onChange(v)}
          className={`font-label-bold text-label-bold text-xs uppercase tracking-widest px-5 py-2 transition-colors capitalize ${
            view === v
              ? 'bg-border-dark text-white'
              : 'bg-white text-outline hover:text-border-dark'
          }`}
        >
          {v}
        </button>
      ))}
    </div>
  )
}
```

- [ ] **Step 3: Vytvořit `app/akce/page.tsx`** (Server Component — wrapper)

```tsx
import { getUpcomingEvents } from '@/lib/sanity/queries'
import { AkceClient } from './AkceClient'

export default async function AkcePage() {
  const events = await getUpcomingEvents()

  return (
    <main className="pt-32 pb-section-padding-mobile md:pb-section-padding-desktop bg-white min-h-screen">
      <div className="max-w-container-max mx-auto px-gutter">
        <div className="mb-16">
          <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-6">
            Program
          </span>
          <h1 className="font-headline-md text-headline-md text-border-dark uppercase tracking-tight">
            Akce a kalendář
          </h1>
        </div>
        <AkceClient events={events} />
      </div>
    </main>
  )
}
```

- [ ] **Step 4: Vytvořit `app/akce/AkceClient.tsx`** (Client Component — přepínač + obsah)

```tsx
'use client'

import { useState } from 'react'
import { EventsList } from '@/components/events/EventsList'
import { EventsCalendar } from '@/components/events/EventsCalendar'
import { EventsViewToggle } from '@/components/events/EventsViewToggle'
import type { Event } from '@/lib/sanity/types'

interface Props {
  events: Event[]
}

export function AkceClient({ events }: Props) {
  const [view, setView] = useState<'seznam' | 'kalendář'>('seznam')

  return (
    <div>
      <div className="flex justify-end mb-8">
        <EventsViewToggle view={view} onChange={setView} />
      </div>
      {view === 'seznam' ? (
        <EventsList events={events} />
      ) : (
        <EventsCalendar events={events} />
      )}
    </div>
  )
}
```

- [ ] **Step 5: Ověřit `/akce` v prohlížeči**

Spusť `npm run dev`, otevři `http://localhost:3000/akce`. Měla by se zobrazit stránka (zatím prázdná, bez dat ze Sanity). Zkontroluj přepínač seznam/kalendář funguje.

- [ ] **Step 6: Commit**

```bash
git add components/events/EventsList.tsx components/events/EventsViewToggle.tsx app/akce/
git commit -m "feat: add /akce page with list view and filter"
```

---

### Task 9: Kalendářový pohled

**Files:**
- Create: `components/events/EventsCalendar.tsx`

- [ ] **Step 1: Vytvořit `components/events/EventsCalendar.tsx`**

```tsx
'use client'

import { useState } from 'react'
import type { Event } from '@/lib/sanity/types'
import { EventCard } from './EventCard'

const DAYS = ['Po', 'Út', 'St', 'Čt', 'Pá', 'So', 'Ne']
const MONTHS = [
  'Leden', 'Únor', 'Březen', 'Duben', 'Květen', 'Červen',
  'Červenec', 'Srpen', 'Září', 'Říjen', 'Listopad', 'Prosinec',
]

function getMondayBasedDay(date: Date): number {
  return (date.getDay() + 6) % 7
}

interface Props {
  events: Event[]
}

export function EventsCalendar({ events }: Props) {
  const today = new Date()
  const [current, setCurrent] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const year = current.getFullYear()
  const month = current.getMonth()
  const firstDayOffset = getMondayBasedDay(new Date(year, month, 1))
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const totalCells = Math.ceil((firstDayOffset + daysInMonth) / 7) * 7

  const monthEvents = events.filter((e) => {
    const d = new Date(e.date)
    return d.getFullYear() === year && d.getMonth() === month
  })

  const eventsByDay = monthEvents.reduce<Record<number, Event[]>>((acc, e) => {
    const day = new Date(e.date).getDate()
    if (!acc[day]) acc[day] = []
    acc[day].push(e)
    return acc
  }, {})

  const selectedEvents = selectedDay ? (eventsByDay[selectedDay] ?? []) : []

  function prevMonth() {
    setSelectedDay(null)
    setCurrent(new Date(year, month - 1, 1))
  }

  function nextMonth() {
    setSelectedDay(null)
    setCurrent(new Date(year, month + 1, 1))
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={prevMonth}
          className="font-label-bold text-label-bold text-xs uppercase tracking-widest px-4 py-2 border border-surface-container-high hover:border-border-dark hover:text-border-dark text-outline transition-colors"
        >
          ← Předchozí
        </button>
        <h2 className="font-headline-sm text-headline-sm text-border-dark uppercase">
          {MONTHS[month]} {year}
        </h2>
        <button
          onClick={nextMonth}
          className="font-label-bold text-label-bold text-xs uppercase tracking-widest px-4 py-2 border border-surface-container-high hover:border-border-dark hover:text-border-dark text-outline transition-colors"
        >
          Další →
        </button>
      </div>

      {/* Grid header */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((d) => (
          <div
            key={d}
            className="font-label-bold text-label-bold text-xs uppercase tracking-widest text-outline text-center py-2"
          >
            {d}
          </div>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 border-l border-t border-surface-container-high">
        {Array.from({ length: totalCells }).map((_, i) => {
          const dayNum = i - firstDayOffset + 1
          const isCurrentMonth = dayNum >= 1 && dayNum <= daysInMonth
          const hasEvents = isCurrentMonth && !!eventsByDay[dayNum]
          const isSelected = dayNum === selectedDay
          const isToday =
            isCurrentMonth &&
            dayNum === today.getDate() &&
            month === today.getMonth() &&
            year === today.getFullYear()

          return (
            <div
              key={i}
              onClick={() => isCurrentMonth && hasEvents && setSelectedDay(isSelected ? null : dayNum)}
              className={`border-r border-b border-surface-container-high min-h-[80px] p-2 flex flex-col transition-colors ${
                !isCurrentMonth ? 'bg-surface-container-lowest' : ''
              } ${hasEvents ? 'cursor-pointer hover:bg-surface-container-low' : ''} ${
                isSelected ? 'bg-primary-fixed' : ''
              }`}
            >
              {isCurrentMonth && (
                <span
                  className={`font-label-bold text-xs w-6 h-6 flex items-center justify-center rounded-full ${
                    isToday
                      ? 'bg-brand-orange text-white'
                      : 'text-on-surface'
                  }`}
                >
                  {dayNum}
                </span>
              )}
              {isCurrentMonth && hasEvents && (
                <div className="mt-1 flex flex-col gap-1">
                  {eventsByDay[dayNum].slice(0, 2).map((e) => (
                    <span
                      key={e._id}
                      className="text-xs font-medium text-border-dark bg-brand-orange/10 px-1 truncate leading-tight"
                    >
                      {e.title}
                    </span>
                  ))}
                  {eventsByDay[dayNum].length > 2 && (
                    <span className="text-xs text-outline">
                      +{eventsByDay[dayNum].length - 2} další
                    </span>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Selected day detail */}
      {selectedEvents.length > 0 && (
        <div className="mt-12">
          <h3 className="font-headline-sm text-headline-sm text-border-dark uppercase mb-8">
            Akce {selectedDay}. {MONTHS[month].toLowerCase()}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {selectedEvents.map((e) => (
              <EventCard key={e._id} event={e} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Ověřit kalendář v prohlížeči**

Spusť `npm run dev`, jdi na `http://localhost:3000/akce`, přepni na Kalendář. Mělo by se zobrazit mřížka dnů, navigace měsíců funguje.

- [ ] **Step 3: Commit**

```bash
git add components/events/EventsCalendar.tsx
git commit -m "feat: add calendar view for events"
```

---

### Task 10: Aktualizovat homepage — aktuality + nadcházející akce

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Aktualizovat `app/page.tsx` — přidat fetching**

Na začátek souboru `app/page.tsx` přidej import a změň `Home` na async:

```tsx
import { getUpcomingEvents, getActiveAnnouncements } from '@/lib/sanity/queries'
import { AnnouncementBanner } from '@/components/announcements/AnnouncementBanner'
import { EventCard } from '@/components/events/EventCard'
import Link from 'next/link'
// ... ostatní importy zůstávají

export default async function Home() {
  const [upcomingEvents, announcements] = await Promise.all([
    getUpcomingEvents(3),
    getActiveAnnouncements(),
  ])
  // ... zbytek komponenty
```

- [ ] **Step 2: Přidat `AnnouncementBanner` těsně pod `<nav>` v JSX**

Najdi v `app/page.tsx` uzavírací tag `</nav>` a hned za něj vlož:

```tsx
<AnnouncementBanner announcements={announcements} />
```

- [ ] **Step 3: Přidat sekci "Nadcházející akce" mezi Services a Location**

Najdi v `app/page.tsx` komentář `{/* Location & Contact Section */}` a těsně před něj vlož:

```tsx
{/* Upcoming Events Section */}
{upcomingEvents.length > 0 && (
  <section className="py-section-padding-mobile md:py-section-padding-desktop bg-surface-container-lowest">
    <div className="max-w-container-max mx-auto px-gutter">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
        <div>
          <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-6">
            Program
          </span>
          <h2 className="font-headline-md text-headline-md text-border-dark uppercase tracking-tight">
            Nadcházející akce
          </h2>
        </div>
        <Link
          href="/akce"
          className="font-label-bold text-label-bold text-xs uppercase tracking-widest text-outline hover:text-brand-orange transition-colors shrink-0"
        >
          Zobrazit vše →
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {upcomingEvents.map((event) => (
          <EventCard key={event._id} event={event} compact />
        ))}
      </div>
    </div>
  </section>
)}
```

- [ ] **Step 4: Ověřit homepage v prohlížeči**

Spusť `npm run dev`. Bez dat ze Sanity sekce "Nadcházející akce" nebude vidět (podmínka `length > 0`). AnnouncementBanner taktéž. Přidej testovací data přes Sanity Studio na `http://localhost:3000/studio` a ověř zobrazení.

- [ ] **Step 5: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add announcements banner and upcoming events to homepage"
```

---

### Task 11: next.config.ts — Sanity CDN pro obrázky

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Přidat Sanity CDN doménu do `remotePatterns`**

Otevři `next.config.ts` a rozšiř `images.remotePatterns`:

```typescript
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig
```

- [ ] **Step 2: Ověřit že obrázky z Sanity se načítají**

Nahraj obrázek k testovací akci v Sanity Studio, obnov homepage, ověř zobrazení bez Next.js chyby o nepovolené doméně.

- [ ] **Step 3: Nastavit Sanity webhook**

Jdi na https://sanity.io/manage → vyber projekt → API → Webhooks → Create webhook:
- URL: `https://tvuj-web.cz/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>`
- Trigger on: Create, Update, Delete
- Filter: `_type == "event" || _type == "announcement"`

- [ ] **Step 4: Commit**

```bash
git add next.config.ts
git commit -m "feat: add Sanity CDN to image remotePatterns"
```

---

## Finální ověření

Po dokončení všech tasků:

```bash
npm run build
```

Očekávaný výstup: build proběhne bez chyb. Stránky `/` a `/akce` jsou vygenerovány.

```bash
npm test
```

Očekávaný výstup: všechny testy passing.
