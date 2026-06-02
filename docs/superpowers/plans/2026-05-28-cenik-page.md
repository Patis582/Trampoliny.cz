# Ceník Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the `/cenik` page with three pricing sections (Orionka, Nádraží, Tréninky) driven by a new `pricingSection` Sanity schema with structured price rows.

**Architecture:** New `pricingSection` Sanity schema → `getPricingSections()` query → `PricingTable` + `PricingSection` components → Server Component page at `app/cenik/page.tsx`. Nav link updated from `/#cenik` to `/cenik`. Follows the same patterns as `/treneri`.

**Tech Stack:** Next.js App Router (Server Components), Sanity CMS with ISR, Tailwind CSS v4

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `sanity/schemaTypes/pricingSection.ts` | Create | Sanity document schema for pricing sections |
| `sanity/schemaTypes/index.ts` | Modify | Register pricingSectionType |
| `sanity/lib/queries.ts` | Modify | PricingRow/Group/Section types + getPricingSections() |
| `components/pricing/PricingTable.tsx` | Create | Single pricing group: title + table or info block |
| `components/pricing/PricingSection.tsx` | Create | Full section: title, validFrom, groups, PDF button, note |
| `app/cenik/page.tsx` | Create | Page — fetches sections, renders them, error handling |
| `components/layout/Nav.tsx` | Modify | Change Ceník href from `/#cenik` to `/cenik` |

---

### Task 1: Sanity schema for pricingSection

**Files:**
- Create: `sanity/schemaTypes/pricingSection.ts`
- Modify: `sanity/schemaTypes/index.ts`

- [ ] **Step 1: Create `sanity/schemaTypes/pricingSection.ts`**

```ts
import { defineField, defineType, defineArrayMember } from 'sanity'

export const pricingSectionType = defineType({
  name: 'pricingSection',
  title: 'Ceník — sekce',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Název sekce',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'order',
      title: 'Pořadí',
      type: 'number',
      validation: (r) => r.required().integer().positive(),
    }),
    defineField({
      name: 'validFrom',
      title: 'Platnost od',
      type: 'string',
      placeholder: 'např. od 1.8.2025',
    }),
    defineField({
      name: 'pdf',
      title: 'PDF ke stažení',
      type: 'file',
    }),
    defineField({
      name: 'pdfLabel',
      title: 'Popisek tlačítka PDF',
      type: 'string',
      initialValue: 'Stáhnout ceník PDF',
    }),
    defineField({
      name: 'note',
      title: 'Poznámka pod sekcí',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'groups',
      title: 'Skupiny cen',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'pricingGroup',
          title: 'Skupina cen',
          fields: [
            defineField({
              name: 'title',
              title: 'Název skupiny',
              type: 'string',
              validation: (r) => r.required(),
            }),
            defineField({ name: 'subtitle', title: 'Podtitulek', type: 'string' }),
            defineField({
              name: 'columnHeaders',
              title: 'Záhlaví sloupců',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
            }),
            defineField({
              name: 'rows',
              title: 'Řádky cen',
              type: 'array',
              of: [
                defineArrayMember({
                  type: 'object',
                  name: 'pricingRow',
                  title: 'Řádek',
                  fields: [
                    defineField({
                      name: 'label',
                      title: 'Popis',
                      type: 'string',
                      validation: (r) => r.required(),
                    }),
                    defineField({ name: 'note', title: 'Poznámka', type: 'string' }),
                    defineField({
                      name: 'highlight',
                      title: 'Zvýraznit řádek',
                      type: 'boolean',
                      initialValue: false,
                    }),
                    defineField({
                      name: 'values',
                      title: 'Hodnoty (ceny)',
                      type: 'array',
                      of: [defineArrayMember({ type: 'string' })],
                    }),
                  ],
                  preview: { select: { title: 'label' } },
                }),
              ],
            }),
            defineField({
              name: 'infoBlock',
              title: 'Info text (místo tabulky)',
              type: 'text',
              rows: 4,
            }),
          ],
          preview: { select: { title: 'title' } },
        }),
      ],
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
    select: { title: 'title', subtitle: 'validFrom' },
    prepare({ title, subtitle }) {
      return { title, subtitle: subtitle ?? '' }
    },
  },
})
```

- [ ] **Step 2: Register in `sanity/schemaTypes/index.ts`**

Replace current content:

```ts
import { type SchemaTypeDefinition } from 'sanity'
import { serviceType } from './service'
import { eventType } from './event'
import { announcementType } from './announcement'
import { trainerType } from './trainer'
import { pricingSectionType } from './pricingSection'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [serviceType, eventType, announcementType, trainerType, pricingSectionType],
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz && npx tsc --noEmit
```

Expected: no new errors

- [ ] **Step 4: Commit**

```bash
git add sanity/schemaTypes/pricingSection.ts sanity/schemaTypes/index.ts
git commit -m "feat: add pricingSection Sanity schema"
```

---

### Task 2: Pricing types and getPricingSections query

**Files:**
- Modify: `sanity/lib/queries.ts` (append at end of file)

- [ ] **Step 1: Append to end of `sanity/lib/queries.ts`**

```ts
export type PricingRow = {
  _key: string
  label: string
  note?: string
  highlight?: boolean
  values: string[]
}

export type PricingGroup = {
  _key: string
  title: string
  subtitle?: string
  columnHeaders: string[]
  rows?: PricingRow[]
  infoBlock?: string
}

export type PricingSection = {
  _id: string
  title: string
  slug: string
  validFrom?: string
  pdfUrl?: string
  pdfLabel?: string
  note?: string
  groups: PricingGroup[]
  order: number
}

export async function getPricingSections(): Promise<PricingSection[] | null> {
  try {
    return await client.fetch(
      `*[_type == "pricingSection"] | order(order asc) {
        _id,
        title,
        "slug": slug.current,
        validFrom,
        "pdfUrl": pdf.asset->url,
        pdfLabel,
        note,
        groups[] {
          _key,
          title,
          subtitle,
          columnHeaders,
          rows[] {
            _key,
            label,
            note,
            highlight,
            values
          },
          infoBlock
        },
        order
      }`,
      {},
      { next: { tags: ['pricing'] } }
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

Expected: no new errors

- [ ] **Step 3: Commit**

```bash
git add sanity/lib/queries.ts
git commit -m "feat: add PricingSection types and getPricingSections query"
```

---

### Task 3: PricingTable component

**Files:**
- Create: `components/pricing/PricingTable.tsx`

- [ ] **Step 1: Create `components/pricing/PricingTable.tsx`**

```tsx
import { PricingGroup } from '@/sanity/lib/queries'

export function PricingTable({ group }: { group: PricingGroup }) {
  const { title, subtitle, columnHeaders, rows, infoBlock } = group

  return (
    <div className="mb-10 last:mb-0">
      <div className="mb-4">
        <h3 className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="font-body-md text-body-md text-outline font-light mt-1">{subtitle}</p>
        )}
      </div>

      {infoBlock ? (
        <div className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed whitespace-pre-line">
          {infoBlock}
        </div>
      ) : rows && rows.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[320px] text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-border-dark">
                <th className="font-label-bold text-[10px] uppercase tracking-widest text-outline pb-3 pr-8 min-w-[180px]">
                  Položka
                </th>
                {columnHeaders.map((h) => (
                  <th
                    key={h}
                    className="font-label-bold text-[10px] uppercase tracking-widest text-outline pb-3 px-4 text-right whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row._key}
                  className={`border-b border-surface-container-high last:border-0 ${row.highlight ? 'bg-brand-orange/5' : ''}`}
                >
                  <td className="py-3 pr-8">
                    <span className="font-body-md text-body-md text-border-dark font-medium">
                      {row.label}
                    </span>
                    {row.note && (
                      <span className="block font-body-md text-[13px] text-outline font-light">
                        {row.note}
                      </span>
                    )}
                  </td>
                  {row.values.map((v, i) => (
                    <td
                      key={i}
                      className="py-3 px-4 text-right font-body-md text-body-md text-border-dark font-medium whitespace-nowrap"
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no new errors

- [ ] **Step 3: Commit**

```bash
git add components/pricing/PricingTable.tsx
git commit -m "feat: add PricingTable component"
```

---

### Task 4: PricingSection component

**Files:**
- Create: `components/pricing/PricingSection.tsx`

- [ ] **Step 1: Create `components/pricing/PricingSection.tsx`**

```tsx
import { PricingSection as PricingSectionType } from '@/sanity/lib/queries'
import { PricingTable } from './PricingTable'

export function PricingSection({ section, alt }: { section: PricingSectionType; alt?: boolean }) {
  return (
    <section className={alt ? 'bg-surface-container-lowest' : 'bg-white'}>
      <div className="max-w-container-max mx-auto px-gutter py-section-padding-mobile md:py-section-padding-desktop">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-12">
          <div>
            <h2 className="font-headline-md text-headline-md text-border-dark uppercase tracking-tight mb-3">
              {section.title}
            </h2>
            {section.validFrom && (
              <span className="inline-block font-label-bold text-[10px] uppercase tracking-widest text-white bg-border-dark px-3 py-1">
                {section.validFrom}
              </span>
            )}
          </div>
          {section.pdfUrl && (
            <a
              href={section.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 shrink-0 border border-border-dark text-border-dark font-label-bold text-[11px] uppercase tracking-widest px-5 py-3 hover:bg-border-dark hover:text-white transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              {section.pdfLabel ?? 'Stáhnout PDF'}
            </a>
          )}
        </div>

        <div className="space-y-10">
          {section.groups.map((group) => (
            <PricingTable key={group._key} group={group} />
          ))}
        </div>

        {section.note && (
          <p className="mt-10 font-body-md text-body-md text-outline font-light italic border-t border-surface-container-high pt-6">
            {section.note}
          </p>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no new errors

- [ ] **Step 3: Commit**

```bash
git add components/pricing/PricingSection.tsx
git commit -m "feat: add PricingSection component"
```

---

### Task 5: /cenik page and Nav link update

**Files:**
- Create: `app/cenik/page.tsx`
- Modify: `components/layout/Nav.tsx` (line 11: change `"/#cenik"` to `"/cenik"`)

- [ ] **Step 1: Create `app/cenik/page.tsx`**

```tsx
import { getPricingSections } from '@/sanity/lib/queries'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { PricingSection } from '@/components/pricing/PricingSection'
import { SectionError } from '@/components/ui/SectionError'

export default async function CenikPage() {
  const sections = await getPricingSections()

  return (
    <div className="font-body-md antialiased bg-white min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>
      <main>
        <div className="pt-40 pb-16 max-w-container-max mx-auto px-gutter">
          <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-6">
            Vstupné & tréninky
          </span>
          <h1 className="font-headline-md text-headline-md text-border-dark uppercase tracking-tight">
            Ceník
          </h1>
        </div>
        {sections === null ? (
          <div className="max-w-container-max mx-auto px-gutter pb-section-padding-mobile md:pb-section-padding-desktop">
            <SectionError message="Ceník se momentálně nepodařilo načíst. Zkuste obnovit stránku." />
          </div>
        ) : sections.length === 0 ? (
          <div className="max-w-container-max mx-auto px-gutter pb-section-padding-mobile md:pb-section-padding-desktop">
            <p className="font-body-md text-on-surface-variant font-light">Ceník brzy přibude.</p>
          </div>
        ) : (
          sections.map((section, i) => (
            <PricingSection key={section._id} section={section} alt={i % 2 === 1} />
          ))
        )}
      </main>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Update Nav link in `components/layout/Nav.tsx`**

Find line with `["Ceník", "/#cenik"]` and change to:

```ts
["Ceník", "/cenik"],
```

- [ ] **Step 3: Verify TypeScript compiles and build passes**

```bash
npx tsc --noEmit && npx next build
```

Expected: build succeeds, `/cenik` listed as static route

- [ ] **Step 4: Start dev server and verify**

```bash
npx next dev
```

Open `http://localhost:3000/cenik` — expect:
- Nav and footer visible
- Header "Vstupné & tréninky / Ceník"
- Empty state "Ceník brzy přibude." (no Sanity data yet)
- No errors in console

- [ ] **Step 5: Commit**

```bash
git add app/cenik/page.tsx components/layout/Nav.tsx
git commit -m "feat: add /cenik page and update Nav link"
```
