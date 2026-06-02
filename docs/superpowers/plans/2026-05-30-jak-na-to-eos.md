# Jak na to — EOS Registration Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a static `/jak-na-to` page explaining the EOS registration process step-by-step, with an EOS login URL stored in Sanity.

**Architecture:** Static Next.js App Router page with hardcoded step content and one Sanity fetch for the EOS login URL. A new `siteConfig` singleton schema stores the URL. The aktivity sidebar "Jak na to →" link is updated to point to `/jak-na-to`.

**Tech Stack:** Next.js App Router, Sanity (GROQ), Tailwind CSS v4 tokens, `next/image`

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `sanity/schemaTypes/siteConfig.ts` | Create | siteConfig singleton with eosLoginUrl field |
| `sanity/schemaTypes/index.ts` | Modify | Register siteConfig type |
| `sanity/lib/queries.ts` | Modify | Add SiteConfig type + getSiteConfig() |
| `app/jak-na-to/page.tsx` | Create | Static how-to page |
| `app/aktivity/[slug]/page.tsx` | Modify | Update "Jak na to →" href from `#` to `/jak-na-to` |

---

## Task 1: Read Next.js docs before writing any code

> AGENTS.md requires this. This project may use APIs that differ from training data.

**Files:**
- Read: `node_modules/next/dist/docs/`

- [ ] **Step 1: Check which Next.js docs are available**

```bash
ls node_modules/next/dist/docs/
```

- [ ] **Step 2: Read the App Router page conventions doc**

Look for a file about pages, layouts, or server components. Read whichever is most relevant to creating a new App Router page. Pay attention to any deprecation notices.

---

## Task 2: Create siteConfig Sanity schema

**Files:**
- Create: `sanity/schemaTypes/siteConfig.ts`

- [ ] **Step 1: Create the schema file**

```typescript
// sanity/schemaTypes/siteConfig.ts
import { defineField, defineType } from 'sanity'

export const siteConfigType = defineType({
  name: 'siteConfig',
  title: 'Nastavení webu',
  type: 'document',
  fields: [
    defineField({
      name: 'eosLoginUrl',
      title: 'EOS — přihlašovací odkaz',
      type: 'url',
      description: 'Odkaz na přihlášení do EOS systému (zobrazuje se na stránce Jak na to)',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Nastavení webu' }
    },
  },
})
```

---

## Task 3: Register siteConfig in schema index

**Files:**
- Modify: `sanity/schemaTypes/index.ts`

- [ ] **Step 1: Add import and register the type**

Current `index.ts`:
```typescript
import { type SchemaTypeDefinition } from 'sanity'
import { serviceType } from './service'
import { eventType } from './event'
import { announcementType } from './announcement'
import { trainerType } from './trainer'
import { pricingSectionType } from './pricingSection'
import { galleryAlbumType } from './galleryAlbum'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [serviceType, eventType, announcementType, trainerType, pricingSectionType, galleryAlbumType],
}
```

Replace with:
```typescript
import { type SchemaTypeDefinition } from 'sanity'
import { serviceType } from './service'
import { eventType } from './event'
import { announcementType } from './announcement'
import { trainerType } from './trainer'
import { pricingSectionType } from './pricingSection'
import { galleryAlbumType } from './galleryAlbum'
import { siteConfigType } from './siteConfig'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [serviceType, eventType, announcementType, trainerType, pricingSectionType, galleryAlbumType, siteConfigType],
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add sanity/schemaTypes/siteConfig.ts sanity/schemaTypes/index.ts
git commit -m "feat(sanity): add siteConfig schema with eosLoginUrl field"
```

---

## Task 4: Add getSiteConfig query

**Files:**
- Modify: `sanity/lib/queries.ts` (append at end of file)

- [ ] **Step 1: Add SiteConfig type and query at the end of queries.ts**

```typescript
// ── SITE CONFIG ──────────────────────────────────────────────────────────────

export type SiteConfig = {
  eosLoginUrl?: string
}

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    return await client.fetch(
      `*[_type == "siteConfig"][0] { eosLoginUrl }`,
      {},
      { next: { tags: ['siteConfig'] } }
    ) ?? {}
  } catch {
    return {}
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add sanity/lib/queries.ts
git commit -m "feat(queries): add getSiteConfig for EOS login URL"
```

---

## Task 5: Create the /jak-na-to page

**Files:**
- Create: `app/jak-na-to/page.tsx`

- [ ] **Step 1: Create the page file**

```typescript
// app/jak-na-to/page.tsx
import Image from 'next/image'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { getSiteConfig } from '@/sanity/lib/queries'

const steps = [
  {
    number: '01',
    title: 'Otevři přihlašovací stránku',
    description: 'Klikni na tlačítko „Přihlásit se do EOS" níže na této stránce nebo přejdi přímo na eos.trampoliny.cz.',
    image: null as string | null, // nahraď cestou '/jak-na-to/step-1.png' po přidání screenshotu
  },
  {
    number: '02',
    title: 'Vytvoř si účet nebo se přihlas',
    description: 'Pokud ještě nemáš účet, klikni na „Registrace" a vyplň své údaje. Pokud účet máš, přihlas se emailem a heslem.',
    image: null as string | null,
  },
  {
    number: '03',
    title: 'Vyber aktivitu',
    description: 'Po přihlášení najdi aktivitu, do které chceš přihlásit své dítě, a klikni na „Přihlásit".',
    image: null as string | null,
  },
  {
    number: '04',
    title: 'Dokončení přihlášky',
    description: 'Vyplň potřebné údaje o dítěti a odešli přihlášku. Potvrzení přijde na tvůj email.',
    image: null as string | null,
  },
]

export default async function JakNaToPage() {
  const config = await getSiteConfig()
  const eosUrl = config?.eosLoginUrl ?? 'https://eos.trampoliny.cz/'

  return (
    <div className="font-body-md antialiased bg-white min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* Hero */}
      <section className="bg-border-dark pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="max-w-container-max mx-auto px-gutter">
          <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-4">
            Registrace
          </span>
          <h1 className="font-headline-md-mobile text-headline-md-mobile md:font-headline-md md:text-headline-md text-white uppercase tracking-tight mb-6">
            Jak se přihlásit přes EOS
          </h1>
          <p className="text-white/60 font-light max-w-xl leading-relaxed">
            EOS je náš online systém pro přihlašování na aktivity. Stačí si vytvořit účet a za pár minut máš dítě přihlášené.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="py-section-padding-mobile md:py-section-padding-desktop">
        <div className="max-w-container-max mx-auto px-gutter space-y-20 md:space-y-32">
          {steps.map((step, i) => {
            const isEven = i % 2 === 1
            return (
              <div
                key={step.number}
                className={`grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center ${isEven ? 'md:[&>*:first-child]:order-2' : ''}`}
              >
                {/* Text */}
                <div>
                  <span className="font-bold text-[56px] md:text-[72px] text-brand-orange leading-none block mb-5 tracking-tighter">
                    {step.number}
                  </span>
                  <h2 className="font-headline-sm-mobile text-headline-sm-mobile md:font-headline-sm md:text-headline-sm text-border-dark uppercase tracking-tight mb-4">
                    {step.title}
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {/* Screenshot */}
                <div className="border border-surface-container-high shadow-sm overflow-hidden bg-surface-container-lowest">
                  <div className="relative aspect-[16/10]">
                    {step.image ? (
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-surface-container-high flex items-center justify-center">
                        <span className="text-outline text-[10px] font-label-bold uppercase tracking-widest">
                          Screenshot
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-border-dark py-20">
        <div className="max-w-container-max mx-auto px-gutter flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-4">
              Připraven/a?
            </span>
            <h2 className="font-headline-sm-mobile text-headline-sm-mobile md:font-headline-sm md:text-headline-sm text-white uppercase tracking-tight">
              Otevřít EOS
            </h2>
          </div>
          <a
            href={eosUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 inline-flex items-center gap-3 bg-brand-orange text-white font-label-bold uppercase tracking-widest px-8 py-4 text-[11px] hover:bg-white hover:text-border-dark transition-colors"
          >
            Přihlásit se do EOS
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Start dev server and verify page renders**

```bash
npm run dev
```

Open `http://localhost:3000/jak-na-to`. Verify:
- Hero section renders with dark background, orange label, H1
- 4 steps render with alternating layout (desktop: step 1 text-left/image-right, step 2 image-left/text-right)
- Screenshot placeholders show gray boxes with "Screenshot" label
- CTA section renders at bottom with orange button

- [ ] **Step 4: Commit**

```bash
git add app/jak-na-to/page.tsx
git commit -m "feat: add /jak-na-to EOS registration guide page"
```

---

## Task 6: Update sidebar link on aktivity page

**Files:**
- Modify: `app/aktivity/[slug]/page.tsx` line ~237

The current sidebar contains a hardcoded `href="#"` for "Jak na to →". Update it to point to the real page.

- [ ] **Step 1: Find and replace the href**

In `app/aktivity/[slug]/page.tsx`, find this block (around line 233–240):

```tsx
{service.registration?.type === "eos" && (
  <div className="p-6 space-y-1">
    <p className="font-label-bold text-[10px] uppercase tracking-widest text-outline">Registrace</p>
    <p className="font-body-md text-body-md text-on-surface-variant font-light mb-1">Systém EOS</p>
    <Link href="#" className="font-body-md text-body-md text-brand-orange font-medium hover:text-border-dark transition-colors">
      Jak na to →
    </Link>
  </div>
)}
```

Replace `href="#"` with `href="/jak-na-to"`:

```tsx
{service.registration?.type === "eos" && (
  <div className="p-6 space-y-1">
    <p className="font-label-bold text-[10px] uppercase tracking-widest text-outline">Registrace</p>
    <p className="font-body-md text-body-md text-on-surface-variant font-light mb-1">Systém EOS</p>
    <Link href="/jak-na-to" className="font-body-md text-body-md text-brand-orange font-medium hover:text-border-dark transition-colors">
      Jak na to →
    </Link>
  </div>
)}
```

- [ ] **Step 2: Verify the link works**

Open an activity page that uses EOS registration (e.g. `http://localhost:3000/aktivity/sportovni-krouzek`). Click "Jak na to →" in the sidebar. Should navigate to `/jak-na-to`.

- [ ] **Step 3: Commit**

```bash
git add app/aktivity/[slug]/page.tsx
git commit -m "feat(aktivity): link Jak na to sidebar to /jak-na-to"
```

---

## Task 7: Create siteConfig document in Sanity Studio and verify EOS URL

- [ ] **Step 1: Open Sanity Studio**

Go to `http://localhost:3000/studio` (or run `npx sanity dev` in the `sanity/` directory if studio is separate).

- [ ] **Step 2: Create the siteConfig document**

Find "Nastavení webu" in the Studio sidebar. Create a new document. Fill in the EOS login URL field with `https://eos.trampoliny.cz/` (or the exact login URL). Publish.

- [ ] **Step 3: Verify the CTA button URL on the page**

Reload `http://localhost:3000/jak-na-to`. The CTA button should now use the URL from Sanity. Open DevTools → Network and confirm the button's `href` matches what was saved.

---

## Task 8: Add real screenshots (client task)

> This task is performed by the client, not the developer.

- [ ] **Step 1: Take screenshots of each EOS step**

Log into eos.trampoliny.cz and take a screenshot of each step in the registration flow.

- [ ] **Step 2: Save screenshots**

Save files as:
- `public/jak-na-to/step-1.png`
- `public/jak-na-to/step-2.png`
- `public/jak-na-to/step-3.png`
- `public/jak-na-to/step-4.png`

Recommended size: 1600×1000px or similar 16:10 ratio. PNG or WebP.

- [ ] **Step 3: Update the steps array in the page**

In `app/jak-na-to/page.tsx`, update each `image: null` to point to the file:

```typescript
const steps = [
  {
    number: '01',
    title: 'Otevři přihlašovací stránku',
    description: '...',
    image: '/jak-na-to/step-1.png',
  },
  {
    number: '02',
    title: 'Vytvoř si účet nebo se přihlas',
    description: '...',
    image: '/jak-na-to/step-2.png',
  },
  // ...
]
```

Also update the step titles and descriptions to match the real EOS flow.

- [ ] **Step 4: Commit**

```bash
git add public/jak-na-to/ app/jak-na-to/page.tsx
git commit -m "content: add real EOS screenshots and step descriptions"
```
