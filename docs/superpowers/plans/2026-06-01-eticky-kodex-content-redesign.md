# EtickyKodex Content Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Nahradit `— text` bullet list v `EtickyKodex` za sportovní big-number layout (velké oranžové číslo vlevo, text vpravo, oddělovací linky).

**Architecture:** Jediná změna v `components/liberec/EtickyKodex.tsx` — přepis `<ul>` a `<li>` elementů. Logika tabů, ARIA atributy, PDF tlačítko a obsah `CONTENT` se nemění.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4

---

### Task 1: Přepsat list items na big-number layout

**Files:**
- Modify: `components/liberec/EtickyKodex.tsx`

- [ ] **Krok 1: Nahradit `<ul>` a `<li>` markup**

V souboru `components/liberec/EtickyKodex.tsx` najdi tento blok (začíná u `{/* Obsah aktivního tabu */}`):

```tsx
      {/* Obsah aktivního tabu */}
      <ul
        role="tabpanel"
        id={`kodex-panel-${active}`}
        aria-labelledby={`kodex-tab-${active}`}
        tabIndex={0}
        className="space-y-3 mb-10 max-w-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
      >
        {CONTENT[active].map((item, i) => (
          <li key={`${active}-${i}`} className="flex gap-3 items-baseline">
            <span aria-hidden="true" className="text-brand-orange font-black text-sm shrink-0 leading-relaxed">—</span>
            <span className="text-on-surface-variant font-light leading-relaxed" style={{ fontSize: "clamp(14px, 1vw, 16px)" }}>
              {item}
            </span>
          </li>
        ))}
      </ul>
```

Nahraď ho tímto:

```tsx
      {/* Obsah aktivního tabu */}
      <ul
        role="tabpanel"
        id={`kodex-panel-${active}`}
        aria-labelledby={`kodex-tab-${active}`}
        tabIndex={0}
        className="divide-y divide-outline mb-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
      >
        {CONTENT[active].map((item, i) => (
          <li key={`${active}-${i}`} className="flex items-start gap-6 py-4">
            <span
              aria-hidden="true"
              className="font-black text-brand-orange shrink-0 leading-none tabular-nums"
              style={{ fontSize: "clamp(28px, 3vw, 42px)" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className="text-on-surface-variant font-light leading-relaxed pt-1"
              style={{ fontSize: "clamp(14px, 1vw, 16px)" }}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
```

- [ ] **Krok 2: TypeScript check**

```bash
cd /Users/filippatrman/Documents/WEBY/Zakazky/trampolinycz && npx tsc --noEmit 2>&1
```

Očekávaný výstup: žádné chyby (prázdný výstup).

- [ ] **Krok 3: Commit a push**

```bash
git add components/liberec/EtickyKodex.tsx
git commit -m "feat(liberec): redesign kodex list — big-number layout"
git push origin v2-redesign
```
