---
name: Homepage design style — trampoliny.cz
description: Visual design language, layout patterns, and component conventions used on the trampoliny.cz homepage
type: project
---

## Brand colors
- Navy dark: `#002b5b` (bg-border-dark) — primary dark, used for nav, footer, dark sections
- Navy deep: `#001736` (bg-brand-navy-deep) — hero gradients, darkest backgrounds
- Orange: `#fe642c` (bg-brand-orange) — Trampolíny Liberec accent, CTAs, badges, highlights
- Green: `#9dd84f` (bg-brand-green) — Trampolíny Patrman accent (text on green must be navy, not white)
- Background: `#f9f9f9` (bg-background)
- White: `bg-white` / `bg-surface-container-lowest`

## Typography
- Headlines: Montserrat (`font-headline-*`), always **uppercase**, tight tracking
  - `font-headline-md text-headline-md` = 48px/800w for section titles
  - `font-headline-sm text-headline-sm` = 24px/700w for card titles, modal titles
  - `font-headline-lg text-headline-lg` = 90px for hero (desktop)
- Body: Work Sans (`font-body-md`, `font-body-lg`), `font-light` for paragraphs
- Labels/badges: `font-label-bold text-label-bold` = 13px/900w, uppercase, `tracking-widest`
- Small labels: `text-[11px] uppercase tracking-widest font-bold`

## Layout
- Max container: `max-w-container-max mx-auto px-gutter` (1440px, 24px gutter)
- Section padding: `py-section-padding-mobile md:py-section-padding-desktop` (64px / 120px)
- Fixed nav + AnnouncementBar: `fixed top-0 left-0 w-full z-50`, `bg-white/95 backdrop-blur-sm border-b border-surface-container-high`
- Hero: `h-[90vh]`, navy gradient left-to-right + subtle bottom overlay, `pt-40` for content to clear fixed nav

## Component patterns

### Section header
```tsx
<span className="inline-block text-brand-orange font-label-bold text-label-bold uppercase tracking-widest mb-6">
  Subtitle
</span>
<h2 className="font-headline-md text-headline-md text-border-dark uppercase tracking-tight">
  Title
</h2>
```

### Brand badges on cards
- Liberec: `bg-brand-orange text-white`
- Patrman: `bg-brand-green text-border-dark` (navy text, NOT white)

### Buttons / CTAs
- Primary filled: `bg-brand-orange text-white hover:bg-border-dark` or `bg-border-dark text-white hover:bg-brand-orange`
- Outline: `border border-border-dark text-border-dark hover:bg-border-dark hover:text-white` (class: `minimal-border-dark`)
- All buttons: `font-label-bold uppercase tracking-widest px-8 py-3.5 text-sm`

### Accent left-border highlight
```tsx
<p className="border-l-4 border-brand-orange pl-6 ...">Lead text</p>
```

### Info/content boxes
- Light: `bg-surface-container-lowest border-t-4 border-brand-orange p-8`
- Dark CTA sidebar: `bg-border-dark text-white p-10`

### Footer
- Full-width `bg-border-dark text-white`
- Logo: "Trampolíny **Liberec**" (orange) + "**& Patrman**" (green)
- Links: `text-white/70 hover:text-white`, section labels `text-white/40`
- Bottom bar: `border-t border-white/10 text-white/40`

### Service cards (ServiceGrid)
- `bg-white rounded-xl shadow-sm hover:shadow-md`
- Accent bar animates: `w-12 h-1 group-hover:w-24 transition-all duration-500`
- "Více info →" fades in on hover

## Section backgrounds (alternating)
1. Hero — dark (navy)
2. Services — `bg-surface-container-lowest`
3. Location/contact — `bg-white`
4. Footer — `bg-border-dark`

## Key files
- `app/page.tsx` — main homepage (async Server Component)
- `app/globals.css` — full @theme with all tokens
- `app/layout.tsx` — Montserrat + Work Sans via next/font
- `components/announcements/AnnouncementBar.tsx` — client, navy bar + modal
- `components/services/ServiceGrid.tsx` — client grid with Link cards
- `sanity/schemaTypes/` — service, event, announcement schemas
- `sanity/lib/queries.ts` — GROQ queries + TypeScript types
- `public/hero.jpg` — real hall photo used in homepage hero

**Why:** User asked to remember the design style for use in future conversations and subpages.
**How to apply:** When building any new page or component for this project, match these patterns exactly — typography scale, color usage, button styles, section structure, and spacing conventions.
