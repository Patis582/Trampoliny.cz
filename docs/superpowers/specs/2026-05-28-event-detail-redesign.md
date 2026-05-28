# Event Detail Page Redesign

**Datum:** 2026-05-28

---

## Cíl

Přepracovat stránku `/akce/[slug]` z layout hero+sidebar na "event poster" styl — velký, vizuálně silný hero přes celou obrazovku, lineární obsah pod ním bez sidebaru.

---

## Hero sekce

- **Výška:** `100vh` (celá obrazovka)
- **Pozadí:** fotka akce přes celou plochu (`object-cover`). Bez fotky = `bg-brand-navy-deep`
- **Gradient overlay:** tmavý přechod zdola nahoru, aby byl text čitelný
- **Obsah hero (vlevo dole, nad spodním okrajem):**
  - Badge typu akce (barevný štítek — závod/oranžová, tábor/zelená, kemp/navy, workshop/tmavá)
  - Datum — výrazné, velké (font-headline-sm nebo větší), bílé
  - Název akce — největší text na stránce (font-headline-md nebo lg), bílý, uppercase
  - Back link „← Všechny akce" malý, nad typem

---

## Hlavní obsah

- Maximální šířka ~720px, centrovaný (`max-w-2xl mx-auto`)
- Žádný sidebar
- Pořadí bloků:
  1. **Popis** — PortableText s plnou podporou formátování včetně `ul`/`ol` odrážkových seznamů
  2. **Tlačítko přihlášky** — zobrazí se **pouze** pokud `registration.isOpen === true` AND `registration.url` je vyplněno. Jinak se nezobrazí vůbec.
  3. **Doplňkové odkazy** — pokud `event.links` není prázdné

---

## PortableText — odrážkové seznamy

Aktuálně chybí `list` komponenty v PortableText konfiguraci. Přidat:

```tsx
list: {
  bullet: ({ children }) => <ul className="list-disc pl-6 space-y-1 font-body-md text-body-md text-on-surface-variant font-light">{children}</ul>,
  number: ({ children }) => <ol className="list-decimal pl-6 space-y-1 font-body-md text-body-md text-on-surface-variant font-light">{children}</ol>,
},
listItem: {
  bullet: ({ children }) => <li>{children}</li>,
  number: ({ children }) => <li>{children}</li>,
},
```

---

## Bottom CTA

Stejný jako teď — tmavý pruh, „Prohlédni si všechny akce", odkaz zpět na `/akce`.

---

## Co se nemění

- `generateStaticParams` a data fetching
- `formatDate` helper
- `TYPE_LABELS` / `TYPE_COLORS` konstanty
- Nav a Footer

---

## Soubory ke změně

- Modify: `app/akce/[slug]/page.tsx` — kompletní přepis JSX
