# Premium Design System Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgradovat vizuální jazyk webu trampolinycz na úroveň Apple/Linear/Stripe — čistý, disciplinovaný, prémiový minimalismus bez zbytečných efektů.

**Architecture:** Tři fáze — (1) globální design tokeny v globals.css, (2) navigace, (3) homepage. Každá fáze je review checkpoint před pokračováním.

**Tech Stack:** Next.js 16, Tailwind CSS v4 (@theme tokeny v globals.css), React 19, Montserrat + Work Sans

---

## Fáze 1: Globální design tokeny (globals.css)

**Files:**
- Modify: `app/globals.css`

### Změny:

**Border-radius** — zvýšit karty (xl: 8px→12px), přidat sm pro buttony (6px), opravit full na skutečný pill
**Typography** — label tracking 0.15em→0.08em, label weight 900→700, body-lg weight 500→400
**Stíny** — přidat CSS třídy shadow-card / shadow-card-hover / shadow-float s vrstvenými hodnotami
**Bordery** — přidat CSS custom properties pro translucent borders, opravit .minimal-border
**html** — přidat text-rendering a font-feature-settings

- [ ] Upravit globals.css (border-radius, typografie, stíny, bordery)
- [ ] Commit phase 1

---

## Fáze 2: Navigace (Nav.tsx)

**Files:**
- Modify: `components/layout/Nav.tsx`

### Změny:

**Výška** — py-2/py-4 → py-4/py-5
**Scroll blur** — přidat useEffect scroll listener, při scrollY > 16 aplikovat backdrop-blur-md + bg-white/90
**Transition** — transition-all → transition-[background-color,backdrop-filter]
**Buttony** — přidat rounded-sm na Kontakt button
**Mobile menu** — přidat pt-2 na první link, odebrat redundantní gap-0

- [ ] Upravit Nav.tsx
- [ ] Commit phase 2

---

## Fáze 3: Homepage (page.tsx + ServiceGrid.tsx + EventCard.tsx)

**Files:**
- Modify: `app/page.tsx`
- Modify: `components/services/ServiceGrid.tsx`
- Modify: `components/events/EventCard.tsx`

### Změny:

**ServiceGrid** — gap-6→gap-8, card padding p-4/p-5→p-6, shadow-sm→shadow-card, hover:shadow-md→hover:shadow-card-hover, image scale-105→scale-103
**Homepage brand logos** — hover:scale-105→hover:scale-103
**EventCard** — přidat shadow-card, opravit padding, image scale-105→scale-103
**Contact cards** — border + shadow-card, padding p-5→p-6
**Transition-all** — nahradit za konkrétní properties v service/event kartách

- [ ] Upravit ServiceGrid.tsx
- [ ] Upravit EventCard.tsx
- [ ] Upravit page.tsx (brands, events, contact sections)
- [ ] Commit phase 3
