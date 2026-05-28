# Mobile Responsiveness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make all pages look good at 360px–430px by reducing text sizes and spacing on mobile — zero design changes on desktop.

**Architecture:** All changes are additive Tailwind responsive prefixes (`md:`). New CSS tokens for `headline-sm-mobile` (18px) and `body-lg-mobile` (16px) follow the same pattern as existing mobile tokens. Section padding token reduced from 64px to 48px globally. No new components, no structural changes.

**Tech Stack:** Next.js App Router, Tailwind CSS v4 with `@theme` custom tokens, TypeScript

**Dev server:** `npm run dev` at project root. Test at `http://localhost:3000` with DevTools at 390px width.

---

### Task 1: CSS Tokens — add `headline-sm-mobile`, `body-lg-mobile`, reduce section padding

**Files:**
- Modify: `app/globals.css:89–135`

- [ ] **Step 1: Add mobile font tokens after the existing `--font-headline-sm` line**

In `app/globals.css`, after line `--font-headline-sm: var(--font-montserrat), "Montserrat", sans-serif;` (line 89), add:

```css
  --font-headline-sm-mobile: var(--font-montserrat), "Montserrat", sans-serif;
  --font-body-lg-mobile: var(--font-work-sans), "Work Sans", sans-serif;
```

- [ ] **Step 2: Add mobile size tokens after `--text-headline-sm--font-weight: 700;` (line 123)**

```css
  --text-headline-sm-mobile: 18px;
  --text-headline-sm-mobile--line-height: 22px;
  --text-headline-sm-mobile--font-weight: 700;

  --text-body-lg-mobile: 16px;
  --text-body-lg-mobile--line-height: 1.6;
  --text-body-lg-mobile--font-weight: 300;
```

- [ ] **Step 3: Reduce section-padding-mobile**

Change line `--spacing-section-padding-mobile: 64px;` to:

```css
  --spacing-section-padding-mobile: 48px;
```

- [ ] **Step 4: Verify dev server picks up token changes**

Run: `npm run dev` (if not already running)

Open `http://localhost:3000` in browser, DevTools → 390px width. Sections should have slightly less vertical space. No errors in terminal.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css
git commit -m "feat(mobile): add headline-sm-mobile, body-lg-mobile tokens; reduce section-padding-mobile to 48px"
```

---

### Task 2: Nav — reduce height on mobile

**Files:**
- Modify: `components/layout/Nav.tsx:19`

- [ ] **Step 1: Change padding on the inner nav container**

In `components/layout/Nav.tsx`, change line 19:

```tsx
// before
<div className="max-w-container-max mx-auto px-gutter py-6 flex justify-between items-center">

// after
<div className="max-w-container-max mx-auto px-gutter py-3.5 md:py-6 flex justify-between items-center">
```

- [ ] **Step 2: Verify**

DevTools at 390px: nav should be ~52px tall. At 768px+: nav unchanged at ~72px.

- [ ] **Step 3: Commit**

```bash
git add components/layout/Nav.tsx
git commit -m "feat(mobile): reduce nav height on mobile (py-3.5)"
```

---

### Task 3: Homepage hero — fix overflow and text size

**Files:**
- Modify: `app/page.tsx:29–79`

The hero currently clips buttons at the bottom on small screens because `items-center` + `pt-40` pushes content too low. On mobile: use `items-start` and reduce top padding. Also shrink the hard-coded 48px hero text.

- [ ] **Step 1: Fix section alignment**

Change line 29:
```tsx
// before
<section className="relative h-[90vh] flex items-center overflow-hidden">

// after
<section className="relative h-[90vh] flex items-start md:items-center overflow-hidden">
```

- [ ] **Step 2: Reduce top padding on mobile**

Change line 36 (content wrapper div):
```tsx
// before
<div className="relative z-10 w-full max-w-container-max mx-auto px-gutter pt-40 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">

// after
<div className="relative z-10 w-full max-w-container-max mx-auto px-gutter pt-24 md:pt-40 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
```

- [ ] **Step 3: Reduce gap after top label**

Change line 38 (the "TC Orionka" row div):
```tsx
// before
<div className="flex items-center gap-3 mb-10">

// after
<div className="flex items-center gap-3 mb-4 md:mb-10">
```

- [ ] **Step 4: Shrink hero text on mobile**

Change lines 43–45 (the three `<span>` lines inside `<h1>`):
```tsx
// before
<span className="text-white block text-[48px] md:text-[64px]">Posouvej</span>
<span className="text-white block text-[48px] md:text-[64px]">limity</span>
<span className="text-brand-orange block text-[48px] md:text-[64px] mt-2">na maximum</span>

// after
<span className="text-white block text-[36px] md:text-[64px]">Posouvej</span>
<span className="text-white block text-[36px] md:text-[64px]">limity</span>
<span className="text-brand-orange block text-[36px] md:text-[64px] mt-2">na maximum</span>
```

- [ ] **Step 5: Reduce gap after paragraph**

Find the paragraph with `mb-12` (line ~47):
```tsx
// before
<p className="text-base text-white/75 mb-12 max-w-sm font-light leading-relaxed">

// after
<p className="text-base text-white/75 mb-6 md:mb-12 max-w-sm font-light leading-relaxed">
```

- [ ] **Step 6: Verify**

DevTools at 390px: all three hero lines visible, buttons visible, no clipping. Small label visible above hero text (not behind nav). Desktop (1280px) unchanged.

- [ ] **Step 7: Commit**

```bash
git add app/page.tsx
git commit -m "feat(mobile): fix homepage hero overflow — items-start, smaller text and gaps"
```

---

### Task 4: trampoliny-liberec page

**Files:**
- Modify: `app/trampoliny-liberec/page.tsx`

- [ ] **Step 1: Shrink hero badge**

Line 25–27, change the `<span>` badge:
```tsx
// before
<span className="inline-flex items-center font-label-bold text-[11px] uppercase tracking-widest bg-brand-orange text-white px-3 py-1.5">
  Trampolíny Liberec
</span>

// after
<span className="inline-flex items-center font-label-bold text-[9px] md:text-[11px] uppercase tracking-widest bg-brand-orange text-white px-2 py-0.5 md:px-3 md:py-1.5">
  Trampolíny Liberec
</span>
```

- [ ] **Step 2: Make hero intro text responsive**

Line 32–34:
```tsx
// before
<p className="font-body-lg text-body-lg text-white/75 font-light max-w-xl leading-relaxed">

// after
<p className="font-body-lg-mobile text-body-lg-mobile md:font-body-lg md:text-body-lg text-white/75 font-light max-w-xl leading-relaxed">
```

- [ ] **Step 3: Reduce stats band padding**

Line 47:
```tsx
// before
<div key={label} className="px-8 py-7 first:pl-0">

// after
<div key={label} className="px-4 py-5 md:px-8 md:py-7 first:pl-0">
```

- [ ] **Step 4: Add mobile variant to stats values (headline-sm)**

Line 49:
```tsx
// before
<p className="font-headline-sm text-headline-sm text-white uppercase tracking-tight">{value}</p>

// after
<p className="font-headline-sm-mobile text-headline-sm-mobile md:font-headline-sm md:text-headline-sm text-white uppercase tracking-tight">{value}</p>
```

- [ ] **Step 5: Add mobile variant to "Sportovní oddíl" heading (headline-md)**

Line 60–62:
```tsx
// before
<h2 className="font-headline-md text-headline-md text-border-dark uppercase tracking-tight mb-10">
  Sportovní oddíl
</h2>

// after
<h2 className="font-headline-md-mobile text-headline-md-mobile md:font-headline-md md:text-headline-md text-border-dark uppercase tracking-tight mb-10">
  Sportovní oddíl
</h2>
```

- [ ] **Step 6: Make intro paragraph responsive (body-lg)**

Line 63–65:
```tsx
// before
<p className="font-body-lg text-body-lg text-on-surface-variant font-light leading-relaxed">

// after
<p className="font-body-lg-mobile text-body-lg-mobile md:font-body-lg md:text-body-lg text-on-surface-variant font-light leading-relaxed">
```

- [ ] **Step 7: Add mobile variant to "Naše historie" heading (headline-sm)**

Line 84–86:
```tsx
// before
<h2 className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight">
  Naše historie
</h2>

// after
<h2 className="font-headline-sm-mobile text-headline-sm-mobile md:font-headline-sm md:text-headline-sm text-border-dark uppercase tracking-tight">
  Naše historie
</h2>
```

- [ ] **Step 8: Add mobile variant to "Naše úspěchy" heading**

Line 109–111:
```tsx
// before
<h2 className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight">
  Naše úspěchy
</h2>

// after
<h2 className="font-headline-sm-mobile text-headline-sm-mobile md:font-headline-sm md:text-headline-sm text-border-dark uppercase tracking-tight">
  Naše úspěchy
</h2>
```

- [ ] **Step 9: Add mobile variant to stats numbers ("300+", "10+")**

Lines 126–127:
```tsx
// before
<p className="font-headline-sm text-headline-sm text-brand-orange uppercase tracking-tight">{num}</p>

// after
<p className="font-headline-sm-mobile text-headline-sm-mobile md:font-headline-sm md:text-headline-sm text-brand-orange uppercase tracking-tight">{num}</p>
```

- [ ] **Step 10: Add mobile variant to "Aktivity Trampolíny Liberec" heading (headline-md)**

Lines 150–152:
```tsx
// before
<h2 className="font-headline-md text-headline-md text-border-dark uppercase tracking-tight">
  Aktivity<br /><span className="font-medium">Trampolíny Liberec</span>
</h2>

// after
<h2 className="font-headline-md-mobile text-headline-md-mobile md:font-headline-md md:text-headline-md text-border-dark uppercase tracking-tight">
  Aktivity<br /><span className="font-medium">Trampolíny Liberec</span>
</h2>
```

- [ ] **Step 11: Add mobile variant to CTA heading "Chceš trénovat s námi?"**

Lines 169–171:
```tsx
// before
<h2 className="font-headline-sm text-headline-sm text-white uppercase tracking-tight">
  Chceš trénovat s námi?
</h2>

// after
<h2 className="font-headline-sm-mobile text-headline-sm-mobile md:font-headline-sm md:text-headline-sm text-white uppercase tracking-tight">
  Chceš trénovat s námi?
</h2>
```

- [ ] **Step 12: Verify**

DevTools at 390px on `/trampoliny-liberec`. Badge small, intro text readable (not 24px), all headings proportional, stats band not too crowded.

- [ ] **Step 13: Commit**

```bash
git add app/trampoliny-liberec/page.tsx
git commit -m "feat(mobile): responsive typography on trampoliny-liberec page"
```

---

### Task 5: trampoliny-patrman page

**Files:**
- Modify: `app/trampoliny-patrman/page.tsx`

- [ ] **Step 1: Shrink hero badge**

Lines 31–33:
```tsx
// before
<span className="inline-flex items-center font-label-bold text-[11px] uppercase tracking-widest bg-on-tertiary-container text-white px-3 py-1.5">
  Trampolíny Patrman
</span>

// after
<span className="inline-flex items-center font-label-bold text-[9px] md:text-[11px] uppercase tracking-widest bg-on-tertiary-container text-white px-2 py-0.5 md:px-3 md:py-1.5">
  Trampolíny Patrman
</span>
```

- [ ] **Step 2: Make hero intro text responsive (body-lg)**

Line 38:
```tsx
// before
<p className="font-body-lg text-body-lg text-white/75 font-light max-w-xl leading-relaxed">

// after
<p className="font-body-lg-mobile text-body-lg-mobile md:font-body-lg md:text-body-lg text-white/75 font-light max-w-xl leading-relaxed">
```

- [ ] **Step 3: Add mobile variant to "Trampolíny Patrman" section heading (headline-sm)**

Lines 67–69:
```tsx
// before
<h2 className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight">
  Trampolíny Patrman
</h2>

// after
<h2 className="font-headline-sm-mobile text-headline-sm-mobile md:font-headline-sm md:text-headline-sm text-border-dark uppercase tracking-tight">
  Trampolíny Patrman
</h2>
```

- [ ] **Step 4: Add mobile variant to "Jak to u nás vypadá" heading (headline-md)**

Lines 91–93:
```tsx
// before
<h2 className="font-headline-md text-headline-md text-border-dark uppercase tracking-tight">
  Jak to u nás <span className="font-medium">vypadá</span>
</h2>

// after
<h2 className="font-headline-md-mobile text-headline-md-mobile md:font-headline-md md:text-headline-md text-border-dark uppercase tracking-tight">
  Jak to u nás <span className="font-medium">vypadá</span>
</h2>
```

- [ ] **Step 5: Add mobile variant to "Co u nás najdeš" heading (headline-md)**

Lines 108–110:
```tsx
// before
<h2 className="font-headline-md text-headline-md text-border-dark uppercase tracking-tight">
  Co u nás <span className="font-medium">najdeš</span>
</h2>

// after
<h2 className="font-headline-md-mobile text-headline-md-mobile md:font-headline-md md:text-headline-md text-border-dark uppercase tracking-tight">
  Co u nás <span className="font-medium">najdeš</span>
</h2>
```

- [ ] **Step 6: Add mobile variant to "Napiš nebo zavolej" heading (headline-sm)**

Lines 127–129:
```tsx
// before
<h2 className="font-headline-sm text-headline-sm text-white uppercase tracking-tight">
  Napiš nebo zavolej
</h2>

// after
<h2 className="font-headline-sm-mobile text-headline-sm-mobile md:font-headline-sm md:text-headline-sm text-white uppercase tracking-tight">
  Napiš nebo zavolej
</h2>
```

- [ ] **Step 7: Add mobile variant to contact card names (headline-sm)**

Line 134:
```tsx
// before
<p className="font-headline-sm text-white font-bold uppercase tracking-tight mb-4">{name}</p>

// after
<p className="font-headline-sm-mobile text-headline-sm-mobile md:font-headline-sm md:text-headline-sm text-white font-bold uppercase tracking-tight mb-4">{name}</p>
```

- [ ] **Step 8: Verify**

DevTools at 390px on `/trampoliny-patrman`. Badge small, headings proportional, intro text readable.

- [ ] **Step 9: Commit**

```bash
git add app/trampoliny-patrman/page.tsx
git commit -m "feat(mobile): responsive typography on trampoliny-patrman page"
```

---

### Task 6: ServiceCard — smaller number and padding

**Files:**
- Modify: `components/services/ServiceGrid.tsx:61–63`

- [ ] **Step 1: Reduce number font size on mobile**

Line 63:
```tsx
// before
<span className={`block font-headline-lg text-4xl transition-colors ${cls.num}`}>{num}</span>

// after
<span className={`block font-headline-lg text-3xl md:text-4xl transition-colors ${cls.num}`}>{num}</span>
```

- [ ] **Step 2: Reduce card body padding on mobile**

Line 61:
```tsx
// before
<div className="p-8 flex flex-col flex-1">

// after
<div className="p-5 md:p-8 flex flex-col flex-1">
```

- [ ] **Step 3: Verify**

DevTools at 390px on any page with service cards (e.g., `/`). Cards should feel tighter but still readable.

- [ ] **Step 4: Commit**

```bash
git add components/services/ServiceGrid.tsx
git commit -m "feat(mobile): reduce ServiceCard number size and padding on mobile"
```

---

### Task 7: EventCard and TrainerCard — tighter padding

**Files:**
- Modify: `components/events/EventCard.tsx:50`
- Modify: `components/trainers/TrainerCard.tsx:39`

- [ ] **Step 1: Reduce EventCard body padding**

`components/events/EventCard.tsx` line 50:
```tsx
// before
<div className="p-6 flex flex-col flex-1">

// after
<div className="p-4 md:p-6 flex flex-col flex-1">
```

- [ ] **Step 2: Add mobile variant to TrainerCard name (headline-sm)**

`components/trainers/TrainerCard.tsx` line 39:
```tsx
// before
<p className="font-headline-sm text-headline-sm text-border-dark uppercase tracking-tight mb-3">

// after
<p className="font-headline-sm-mobile text-headline-sm-mobile md:font-headline-sm md:text-headline-sm text-border-dark uppercase tracking-tight mb-3">
```

- [ ] **Step 3: Verify**

DevTools at 390px on `/akce` and `/treneri`. Cards compact, trainer names proportional.

- [ ] **Step 4: Commit**

```bash
git add components/events/EventCard.tsx components/trainers/TrainerCard.tsx
git commit -m "feat(mobile): tighter EventCard padding, TrainerCard name responsive"
```

---

### Task 8: Final check — all pages at 360px

- [ ] **Step 1: Check each page at 360px (smallest common Android)**

Open DevTools, set width to 360px. Visit each:
- `/` — hero fits, buttons visible, sections not too spacious
- `/trampoliny-liberec` — badge small, headings proportional
- `/trampoliny-patrman` — same
- `/cenik` — tables readable (already has `overflow-x-auto`)
- `/treneri` — trainer cards look good
- `/akce` — event cards compact

- [ ] **Step 2: Check desktop unchanged at 1280px**

At 1280px width: everything looks exactly the same as before — no regressions.

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat(mobile): final responsive pass — all pages verified at 360px and 1280px"
```
