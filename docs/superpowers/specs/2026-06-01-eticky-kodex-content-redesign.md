# Design: EtickyKodex — redesign obsahu (big-number list)

**Datum:** 2026-06-01  
**Status:** Schváleno

---

## Co se mění

Vizuální přepracování seznamu pravidel uvnitř `components/liberec/EtickyKodex.tsx`. Logika (taby, ARIA, keyboard nav, PDF tlačítko) se nemění — pouze `<ul>` a `<li>` elementy.

---

## Nový layout položky

Každé pravidlo = řádek se dvěma sloupci:

```
[01]   Chovám se slušně, přátelsky a sportovně, v duchu fair play.
────────────────────────────────────────────────────────────────────
[02]   Svým slušným chováním reprezentuji klub nejen na trénincích...
────────────────────────────────────────────────────────────────────
```

### `<ul>` wrapper
- Odstraní se: `space-y-3`, `items-baseline`, `max-w-2xl`
- Přidá se: `divide-y divide-outline` (jemné oddělovací linky mezi řádky)
- Zachová se: `mb-10`, ARIA atributy (`role`, `id`, `aria-labelledby`, `tabIndex`, `focus-visible`)

### `<li>` každá položka
```tsx
<li key={`${active}-${i}`} className="flex items-start gap-6 py-4">
  <span aria-hidden="true" className="font-black text-brand-orange shrink-0 leading-none tabular-nums"
    style={{ fontSize: "clamp(28px, 3vw, 42px)" }}>
    {String(i + 1).padStart(2, "0")}
  </span>
  <span className="text-on-surface-variant font-light leading-relaxed pt-1"
    style={{ fontSize: "clamp(14px, 1vw, 16px)" }}>
    {item}
  </span>
</li>
```

### Odstraní se
- `<span aria-hidden="true">—</span>` (em-dash bullet) — nahrazeno číslem

---

## Co se nemění

- Veškerá logika tabů, `useState`, `handleKeyDown`
- ARIA role, `aria-selected`, `aria-controls`, `tabIndex`
- Tab přepínač (taby Sportovec / Trenér / Rodič)
- PDF download tlačítko
- Obsah `CONTENT` record — žádné změny v textech
