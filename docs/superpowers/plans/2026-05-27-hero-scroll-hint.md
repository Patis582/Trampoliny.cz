# Hero Scroll Hint Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Přidat do hero sekce na homepage SVG trampolínu s panáčkem, jehož pozice je navázaná na `scrollY` — scroll dolů = panáček padá dolů a prohne mat, scroll nahoru = panáček vyskočí nahoru.

**Architecture:** Jeden Client Component `HeroScrollHint` s inline SVG. Animace běží přes `requestAnimationFrame` loop s lerp interpolací (`displayY += (target - displayY) * 0.15`). Scroll pozice čtena přes `window.scrollY` v ref (ne state) aby se předešlo re-renderům. Komponenta vložena do hero sekce v `app/page.tsx`, absolutně pozicovaná vpravo dole.

**Tech Stack:** React (useEffect, useRef), requestAnimationFrame, inline SVG, CSS transform

---

## File Structure

| Soubor | Akce | Popis |
|---|---|---|
| `components/layout/HeroScrollHint.tsx` | Create | Client Component — SVG + animační logika |
| `app/page.tsx` | Modify | Přidat `<HeroScrollHint />` do hero sekce |

---

### Task 1: Vytvořit HeroScrollHint komponentu

**Files:**
- Create: `components/layout/HeroScrollHint.tsx`

- [ ] **Step 1: Vytvořit soubor s kompletní implementací**

Vytvořit `components/layout/HeroScrollHint.tsx`:

```tsx
"use client";

import { useEffect, useRef } from "react";

export function HeroScrollHint() {
  const figureRef = useRef<SVGGElement>(null);
  const matRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    let displayY = 0;
    let prevDisplayY = 0;
    let rafId: number;

    const MAX_DOWN = 18;

    function tick() {
      const scrollY = window.scrollY;
      const target = Math.min(scrollY * 0.12, MAX_DOWN);

      displayY += (target - displayY) * 0.15;

      const velocity = displayY - prevDisplayY;
      prevDisplayY = displayY;

      const rotate = velocity * 3;
      const compression = Math.max(0, displayY / MAX_DOWN);
      const matD = compression > 0
        ? `M10,0 Q40,${8 + compression * 6} 70,0`
        : `M10,0 Q40,8 70,0`;

      if (figureRef.current) {
        figureRef.current.setAttribute(
          "transform",
          `translate(0, ${displayY}) rotate(${rotate}, 40, 20)`
        );
      }
      if (matRef.current) {
        matRef.current.setAttribute("d", matD);
      }

      rafId = requestAnimationFrame(tick);
    }

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="absolute bottom-8 right-8 z-20 opacity-70 hidden md:block">
      <svg
        width="80"
        height="90"
        viewBox="0 0 80 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Panáček — pohyblivý */}
        <g ref={figureRef}>
          {/* hlava */}
          <circle cx="40" cy="14" r="6" stroke="#0f1f45" strokeWidth="2" />
          {/* tělo */}
          <line x1="40" y1="20" x2="40" y2="36" stroke="#0f1f45" strokeWidth="2" strokeLinecap="round" />
          {/* ruce */}
          <line x1="40" y1="25" x2="30" y2="32" stroke="#0f1f45" strokeWidth="2" strokeLinecap="round" />
          <line x1="40" y1="25" x2="50" y2="32" stroke="#0f1f45" strokeWidth="2" strokeLinecap="round" />
          {/* nohy */}
          <line x1="40" y1="36" x2="32" y2="46" stroke="#0f1f45" strokeWidth="2" strokeLinecap="round" />
          <line x1="40" y1="36" x2="48" y2="46" stroke="#0f1f45" strokeWidth="2" strokeLinecap="round" />
        </g>

        {/* Trampolína — statická */}
        {/* levá nožička */}
        <line x1="14" y1="60" x2="6" y2="82" stroke="#0f1f45" strokeWidth="2.5" strokeLinecap="round" />
        {/* pravá nožička */}
        <line x1="66" y1="60" x2="74" y2="82" stroke="#0f1f45" strokeWidth="2.5" strokeLinecap="round" />
        {/* základna vlevo */}
        <line x1="2" y1="82" x2="18" y2="82" stroke="#0f1f45" strokeWidth="2.5" strokeLinecap="round" />
        {/* základna vpravo */}
        <line x1="62" y1="82" x2="78" y2="82" stroke="#0f1f45" strokeWidth="2.5" strokeLinecap="round" />
        {/* rám trampolíny */}
        <line x1="10" y1="60" x2="70" y2="60" stroke="#0f1f45" strokeWidth="2.5" strokeLinecap="round" />
        {/* mat — prohnutý, animovaný */}
        <path
          ref={matRef}
          d="M10,0 Q40,8 70,0"
          stroke="#0f1f45"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          transform="translate(0, 60)"
        />
      </svg>
    </div>
  );
}
```

- [ ] **Step 2: Ověřit TypeScript**

```bash
npx tsc --noEmit
```

Expected: žádný výstup.

---

### Task 2: Přidat komponentu do hero sekce

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Přidat import**

Na začátek `app/page.tsx` přidat import:

```tsx
import { HeroScrollHint } from "@/components/layout/HeroScrollHint";
```

- [ ] **Step 2: Vložit komponentu do hero sekce**

V `app/page.tsx` najít hero `<section>` (řádek ~25):

```tsx
<section
  className="relative h-[90vh] flex items-center overflow-hidden"
>
  <div className="absolute inset-0 z-0">
    <HeroSlideshow />
  </div>
  {/* ... obsah ... */}
  <HeroScrollHint />
</section>
```

`<HeroScrollHint />` přidat jako poslední child uvnitř `<section>`, před uzavírací `</section>`.

- [ ] **Step 3: Ověřit TypeScript**

```bash
npx tsc --noEmit
```

Expected: žádný výstup.

- [ ] **Step 4: Otestovat v prohlížeči**

Spustit `npm run dev`, otevřít `http://localhost:3000`. Zkontrolovat:
- Panáček a trampolína jsou vidět vpravo dole v hero sekci ✓
- Scroll dolů → panáček se pohybuje dolů, mat se prohýbá ✓
- Scroll nahoru → panáček vyskočí nahoru ✓
- Na mobile není vidět (hidden md:block) ✓

- [ ] **Step 5: Commit**

```bash
git add components/layout/HeroScrollHint.tsx app/page.tsx
git commit -m "feat: add scroll-driven trampoline hint to hero"
```
