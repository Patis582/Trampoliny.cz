# Hero Scroll Hint — Design Spec

## Goal

Přidat do hero sekce na homepage jemnou scroll-hint animaci: SVG trampolína s panáčkem, jehož pozice je navázaná na `scrollY`. Scroll dolů → panáček padá dolů a prohne trampolínu. Scroll nahoru → panáček vyskočí nahoru. Přirozená, nenápadná, navy blue.

## Architecture

Client Component `HeroScrollHint` vložený do hero sekce v `app/page.tsx`. Animace běží přes `requestAnimationFrame` loop s lerp interpolací — žádná knihovna, čisté JS + SVG.

**Tech Stack:** React (useEffect, useRef), requestAnimationFrame, inline SVG, CSS transform

---

## Komponenta

**Soubor:** `components/layout/HeroScrollHint.tsx`

**Pozice:** `absolute bottom-8 left-1/2 -translate-x-1/2 z-20` uvnitř hero `<section>`

**Barva:** `#0f1f45` (brand navy) s opacity `0.85`

---

## SVG Design

Výška celého SVG: `90px`, šířka: `80px`. Čistý, minimalistický styl — žádné detaily navíc.

### Trampolína (statická)
- Dva svislé sloupky (nožičky) vlevo a vpravo
- Vodorovný rám nahoře
- Mat (podložka): lehce prohnutá křivka mezi nožičkami — `<path>` s quadratic bezier
- Mat se mírně komprimuje (`scaleY`) podle pozice panáčka

### Panáček (pohyblivý)
- Hlava: `<circle>` r=5
- Tělo: svislá čára dolů
- Ruce: dvě šikmé čáry od středu těla
- Nohy: dvě šikmé čáry dolů od konce těla
- Celý panáček je v `<g transform="translateY(figureY)">` — pohybuje se jako celek

---

## Animační logika

```
scrollY ref → target = scrollY * 0.12 (capped max +20px dolů)
každý rAF frame: displayY += (target - displayY) * 0.15  ← lerp spring
```

- `displayY > 0` → panáček jde dolů, mat se komprimuje (`scaleY = 1 - displayY/60`)
- `displayY < 0` → panáček letí nahoru (žádný cap nahoru — nechá přestřelit)
- `rotate = velocity * 2` → panáček se mírně nakloní podle rychlosti pohybu (přirozenost)
- Velocity: `velocity = displayY - prevDisplayY` každý frame

### Kdy animace běží
Stále — rAF loop jede po celou dobu kdy je komponenta mounted. Zastaví se (`cancelAnimationFrame`) při unmount.

---

## Integrace do homepage

V `app/page.tsx` uvnitř hero `<section>`:
```tsx
<HeroScrollHint />
```

Sekce má `relative overflow-hidden` — komponenta je absolutně uvnitř, scrolluje pryč přirozeně s hero sekcí.

---

## Nové soubory

- `components/layout/HeroScrollHint.tsx` — Client Component

## Upravované soubory

- `app/page.tsx` — přidat `<HeroScrollHint />` do hero sekce
