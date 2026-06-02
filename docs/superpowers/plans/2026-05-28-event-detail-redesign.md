# Event Detail Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Přepracovat `/akce/[slug]` na "event poster" styl — fullscreen hero, lineární obsah bez sidebaru, podmíněná přihláška, odrážky v PortableText.

**Architecture:** Jediný soubor `app/akce/[slug]/page.tsx` se kompletně přepíše — odstraní se sidebar a grid layout, hero se roztáhne na 100vh, obsah se centruje do úzkého sloupce `max-w-2xl`.

**Tech Stack:** Next.js App Router, Tailwind CSS v4, @portabletext/react, @sanity/image-url

---

## File Map

```
Upravené soubory:
  app/akce/[slug]/page.tsx    Kompletní přepis JSX
```

---

### Task 1: Přepsat event detail stránku

**Files:**
- Modify: `app/akce/[slug]/page.tsx`

- [ ] **Step 1: Přepsat soubor**

Celý obsah `app/akce/[slug]/page.tsx` nahradit tímto:

```tsx
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { Nav } from '@/components/layout/Nav'
import { Footer } from '@/components/layout/Footer'
import { getEventBySlug, getAllEventSlugs, type EventType } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

export async function generateStaticParams() {
  const slugs = await getAllEventSlugs()
  return slugs.map((slug) => ({ slug }))
}

const TYPE_LABELS: Record<EventType, string> = {
  'závod': 'Závod',
  'tábor': 'Tábor',
  'kemp': 'Kemp',
  'workshop': 'Workshop',
  'jiné': 'Jiné',
}

const TYPE_COLORS: Record<EventType, string> = {
  'závod': 'bg-brand-orange text-white',
  'tábor': 'bg-brand-green text-border-dark',
  'kemp': 'bg-brand-navy-deep text-white',
  'workshop': 'bg-border-dark text-white',
  'jiné': 'bg-surface-container-high text-outline',
}

function formatDate(dateStr: string, endDateStr?: string): string {
  const date = new Date(dateStr)
  const opts: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }
  if (!endDateStr) return date.toLocaleDateString('cs-CZ', opts)
  const end = new Date(endDateStr)
  if (date.toDateString() === end.toDateString()) return date.toLocaleDateString('cs-CZ', opts)
  return `${date.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long' })} – ${end.toLocaleDateString('cs-CZ', opts)}`
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await getEventBySlug(slug)
  if (!event) notFound()

  const typeLabel = event.type === 'jiné' && event.customType ? event.customType : TYPE_LABELS[event.type]
  const badgeClass = TYPE_COLORS[event.type]
  const heroImageUrl = event.image ? urlFor(event.image).width(1920).height(1080).url() : null

  return (
    <div className="font-body-md antialiased bg-white min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50">
        <Nav />
      </div>

      {/* HERO — fullscreen */}
      <section className="relative h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          {heroImageUrl ? (
            <Image
              src={heroImageUrl}
              alt={event.title}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
          ) : (
            <div className="w-full h-full bg-brand-navy-deep" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-deep via-brand-navy-deep/60 to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-container-max mx-auto px-gutter pb-20 pt-32">
          <Link
            href="/akce"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white/90 transition-colors font-label-bold text-[11px] uppercase tracking-widest group mb-8 block"
          >
            <svg className="w-3.5 h-3.5 inline group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            {' '}Všechny akce
          </Link>

          <div className="flex items-center gap-3 mb-6">
            <span className={`inline-flex items-center font-label-bold text-[11px] uppercase tracking-widest px-3 py-1.5 ${badgeClass}`}>
              {typeLabel}
            </span>
          </div>

          <p className="font-headline-sm text-headline-sm text-white/70 uppercase tracking-widest mb-4">
            {formatDate(event.date, event.endDate)}
          </p>

          <h1 className="font-headline-lg-mobile md:font-headline-md text-headline-lg-mobile md:text-headline-md text-white uppercase tracking-tight leading-none">
            {event.title}
          </h1>
        </div>
      </section>

      {/* MAIN CONTENT — centrovaný úzký sloupec */}
      <div className="max-w-2xl mx-auto px-gutter py-section-padding-mobile md:py-section-padding-desktop">

        {event.description && event.description.length > 0 && (
          <div className="space-y-5 mb-12">
            <PortableText
              value={event.description}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">{children}</p>
                  ),
                  h2: ({ children }) => (
                    <h2 className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight text-base">{children}</h3>
                  ),
                  blockquote: ({ children }) => (
                    <p className="font-body-lg text-body-lg text-border-dark font-medium leading-relaxed border-l-4 border-brand-orange pl-6">{children}</p>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="list-disc pl-6 space-y-1 font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">{children}</ul>
                  ),
                  number: ({ children }) => (
                    <ol className="list-decimal pl-6 space-y-1 font-body-md text-body-md text-on-surface-variant font-light leading-relaxed">{children}</ol>
                  ),
                },
                listItem: {
                  bullet: ({ children }) => <li>{children}</li>,
                  number: ({ children }) => <li>{children}</li>,
                },
                marks: {
                  strong: ({ children }: { children: React.ReactNode }) => <strong className="font-semibold text-border-dark">{children}</strong>,
                  em: ({ children }: { children: React.ReactNode }) => <em>{children}</em>,
                },
              }}
            />
          </div>
        )}

        {event.registration?.isOpen && event.registration.url && (
          <div className="mb-12">
            <a
              href={event.registration.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center bg-brand-orange text-white font-label-bold uppercase tracking-widest px-10 py-4 text-[11px] hover:bg-border-dark transition-colors"
            >
              Přihlásit se →
            </a>
          </div>
        )}

        {event.links && event.links.length > 0 && (
          <div className="pt-8 border-t border-surface-container-high">
            <h2 className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight mb-6">
              Odkazy
            </h2>
            <div className="flex flex-wrap gap-3">
              {event.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-label-bold text-[11px] uppercase tracking-widest px-6 py-3 border border-border-dark text-border-dark hover:bg-border-dark hover:text-white transition-colors"
                >
                  {link.label} →
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* BOTTOM CTA */}
      <section className="bg-surface-container-lowest border-t border-surface-container-high py-20">
        <div className="max-w-container-max mx-auto px-gutter flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-4">Program</span>
            <h2 className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight">
              Prohlédni si všechny akce
            </h2>
          </div>
          <Link
            href="/akce"
            className="shrink-0 inline-flex items-center gap-3 bg-border-dark text-white font-label-bold uppercase tracking-widest px-8 py-4 text-[11px] hover:bg-brand-orange transition-colors"
          >
            Všechny akce
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Ověřit v prohlížeči**

Spusť `npm run dev`, otevři `/akce/[libovolný-slug]`. Zkontroluj:
- Hero zabírá celou výšku obrazovky
- Bez fotky = tmavé navy pozadí
- Popis s odrážkami se renderuje správně
- Tlačítko přihlášky se NEZOBRAZUJE pokud `registration.isOpen` není `true`

- [ ] **Step 3: Commit**

```bash
git add app/akce/\[slug\]/page.tsx
git commit -m "feat: redesign event detail page — fullscreen hero, no sidebar, fix list rendering"
```
