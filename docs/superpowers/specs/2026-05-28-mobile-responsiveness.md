# Mobile Responsiveness Design Spec

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Make the entire site look and feel good at 360px–430px mobile width by reducing sizes and spacing — no design changes, only responsive adjustments.

**Constraint:** Zero visual changes on desktop (md: and above). All changes are mobile-only via Tailwind responsive prefixes.

**Breakpoint:** `md` = 768px. Below that = mobile.

---

## Decisions Made

- Nav height: `py-6` → `py-3.5` on mobile (~52px)
- Hero badges: keep but smaller on mobile (`px-2 py-0.5 text-[9px]` instead of `px-3 py-1.5 text-[11px]`)
- Homepage hero overflow bug: fix with `items-start` + reduced `pt` on mobile
- All other changes: purely smaller sizes and tighter spacing on mobile

---

## 1. Design Tokens (`app/globals.css`)

Add mobile variant for `headline-sm` (currently 24px, no mobile variant):

```css
--font-headline-sm-mobile: var(--font-montserrat), "Montserrat", sans-serif;
--text-headline-sm-mobile: 18px;
--text-headline-sm-mobile--line-height: 22px;
--text-headline-sm-mobile--font-weight: 800;
```

Add mobile variant for `body-lg` (currently 24px, no mobile variant):

```css
--font-body-lg-mobile: var(--font-work-sans), "Work Sans", sans-serif;
--text-body-lg-mobile: 16px;
--text-body-lg-mobile--line-height: 26px;
--text-body-lg-mobile--font-weight: 300;
```

---

## 2. Nav (`components/layout/Nav.tsx`)

**Change:** `py-6` → `py-3.5 md:py-6` on the inner container div.

```tsx
// before
<div className="max-w-container-max mx-auto px-gutter py-6 flex justify-between items-center">
// after
<div className="max-w-container-max mx-auto px-gutter py-3.5 md:py-6 flex justify-between items-center">
```

---

## 3. Homepage Hero (`app/page.tsx`)

**Problems:**
- `items-center` + `pt-40` clips buttons at bottom on small screens
- Small label text hidden under fixed nav

**Changes:**

```tsx
// section: add items-start md:items-center
<section className="relative h-[90vh] flex items-start md:items-center overflow-hidden">

// content div: pt-40 → pt-24 md:pt-40, reduce gaps
<div className="relative z-10 w-full max-w-container-max mx-auto px-gutter pt-24 md:pt-40 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

// top badge row: mb-10 → mb-4 md:mb-10
<div className="flex items-center gap-3 mb-4 md:mb-10">

// paragraph: mb-12 → mb-6 md:mb-12
<p className="... mb-6 md:mb-12 ...">

// hero h1 text: text-[48px] → text-[36px] md:text-[64px]  (both occurrences of 48px and 64px)
<span className="text-white block text-[36px] md:text-[64px]">Posouvej</span>
<span className="text-white block text-[36px] md:text-[64px]">limity</span>
<span className="text-brand-orange block text-[36px] md:text-[64px] mt-2">na maximum</span>
```

---

## 4. `trampoliny-liberec/page.tsx`

**a) Hero badge — smaller on mobile:**
```tsx
// before
<span className="inline-flex items-center font-label-bold text-[11px] uppercase tracking-widest bg-brand-orange text-white px-3 py-1.5">
// after
<span className="inline-flex items-center font-label-bold text-[9px] md:text-[11px] uppercase tracking-widest bg-brand-orange text-white px-2 py-0.5 md:px-3 md:py-1.5">
```

**b) Hero intro text — `body-lg` → responsive:**
```tsx
// before
<p className="font-body-lg text-body-lg text-white/75 font-light max-w-xl leading-relaxed">
// after
<p className="font-body-lg-mobile text-body-lg-mobile md:font-body-lg md:text-body-lg text-white/75 font-light max-w-xl leading-relaxed">
```

**c) Section headings `headline-md` → add mobile variant:**
```tsx
// "Sportovní oddíl" and "Aktivity Trampolíny Liberec" headings:
// before
<h2 className="font-headline-md text-headline-md ...">
// after
<h2 className="font-headline-md-mobile text-headline-md-mobile md:font-headline-md md:text-headline-md ...">
```

**d) Intro paragraph — `body-lg` → responsive:**
```tsx
// before
<p className="font-body-lg text-body-lg text-on-surface-variant font-light leading-relaxed">
// after
<p className="font-body-lg-mobile text-body-lg-mobile md:font-body-lg md:text-body-lg text-on-surface-variant font-light leading-relaxed">
```

**e) Stats band — smaller padding on mobile:**
```tsx
// before
<div key={label} className="px-8 py-7 first:pl-0">
// after
<div key={label} className="px-4 py-5 md:px-8 md:py-7 first:pl-0">
```

---

## 5. `trampoliny-patrman/page.tsx`

Same pattern as trampoliny-liberec:
- Hero badge: `text-[9px] md:text-[11px]`, `px-2 py-0.5 md:px-3 md:py-1.5`
- Hero `body-lg` → `body-lg-mobile ... md:body-lg`
- Section headings `headline-md` → add mobile variant
- Section intro `body-lg` → responsive

---

## 6. `components/services/ServiceGrid.tsx` (ServiceCard)

**Number size:** `text-4xl` → `text-3xl md:text-4xl`
**Card padding:** `p-8` → `p-5 md:p-8`

```tsx
// number
<span className={`block font-headline-lg text-3xl md:text-4xl transition-colors ${cls.num}`}>{num}</span>

// card body padding
<div className="p-5 md:p-8 flex flex-col flex-1">
```

---

## 7. `components/events/EventCard.tsx`

**Card padding:** `p-6` → `p-4 md:p-6`

```tsx
<div className="p-4 md:p-6 flex flex-col flex-1">
```

---

## 8. Section spacing — pages with `headline-sm` headings

Pages where `font-headline-sm text-headline-sm` is used for section headings (h2/h3) without mobile variant:
- `trampoliny-liberec/page.tsx` (Naše historie, Naše úspěchy, Chceš trénovat s námi?)
- `trampoliny-patrman/page.tsx` (same pattern)
- `app/treneri/page.tsx`
- `components/pricing/PricingSection.tsx`

**Change pattern:**
```tsx
// before
<h2 className="font-headline-sm text-headline-sm ...">
// after
<h2 className="font-headline-sm-mobile text-headline-sm-mobile md:font-headline-sm md:text-headline-sm ...">
```

---

## 9. Section padding on all pages

Pages using `py-section-padding-mobile` are already using the 64px token. Change the token value from 64px to 48px:

```css
/* app/globals.css */
--spacing-section-padding-mobile: 48px; /* was 64px */
```

This automatically fixes all pages at once since they all reference the same token.

---

## Files Touched

| File | Changes |
|---|---|
| `app/globals.css` | Add `headline-sm-mobile` and `body-lg-mobile` tokens, reduce `section-padding-mobile` |
| `components/layout/Nav.tsx` | `py-3.5 md:py-6` |
| `app/page.tsx` | Hero fix: items-start, pt-24, text-[36px], reduced mb gaps |
| `app/trampoliny-liberec/page.tsx` | Badge, body-lg, headline-md, stats band |
| `app/trampoliny-patrman/page.tsx` | Same as liberec |
| `app/treneri/page.tsx` | `headline-sm` → mobile variant |
| `components/pricing/PricingSection.tsx` | `headline-sm` → mobile variant |
| `components/services/ServiceGrid.tsx` | Number size, card padding |
| `components/events/EventCard.tsx` | Card padding |

No new components. No design changes. All changes are `sm:` or `md:` prefixed additions.
