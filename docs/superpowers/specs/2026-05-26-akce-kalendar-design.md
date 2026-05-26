# Akce a kalendář — Design spec
**Datum:** 2026-05-26  
**Projekt:** trampolinycz (trampoliny.cz)

---

## Přehled

Přidání sekce nadcházejících akcí a kalendáře závodů do webu. Obsah spravují admini přes Sanity CMS. Web zobrazuje preview akcí na hlavní stránce a plný přehled na samostatné stránce `/akce` s přepínačem seznam/kalendář.

---

## Sanity datový model

Document type: `event`

| Pole | Typ | Povinné | Poznámka |
|------|-----|---------|----------|
| `title` | string | ano | |
| `date` | datetime | ano | Začátek akce |
| `endDate` | datetime | ne | Pro vícedenní akce (tábory) |
| `type` | string enum | ano | `závod` \| `tábor` \| `open-gym` \| `jiné` |
| `description` | portable text | ne | Rich text |
| `image` | image | ne | Volitelná fotka |
| `links` | array `{ label, url }` | ne | Doplňkové odkazy |
| `registration.url` | string | ne | URL přihlášky |
| `registration.isOpen` | boolean | ne | Příznak "přihlášky otevřeny" |

Zobrazují se pouze akce kde `date >= today`, seřazené vzestupně podle data.

---

## Architektura

### Nové soubory

```
app/akce/page.tsx            Server Component — stránka /akce
app/api/revalidate/route.ts  Webhook endpoint pro Sanity ISR revalidaci
lib/sanity.ts                Sanity client + GROQ dotazy
sanity/                      Sanity Studio (schema, konfigurace)
```

### Datový tok

1. `lib/sanity.ts` — jeden GROQ dotaz vracející budoucí akce seřazené podle data
2. `app/akce/page.tsx` — async Server Component, fetchuje všechny akce ze Sanity, Next.js výsledek cachuje
3. `app/page.tsx` — fetchuje jen 3 nejbližší akce pro homepage preview sekci
4. `app/api/revalidate/route.ts` — přijme POST webhook ze Sanity, ověří `SANITY_REVALIDATE_SECRET` z env, zavolá `revalidatePath('/')` a `revalidatePath('/akce')`

### Sanity Studio

Nasazeno na `trampoliny.cz/studio` — admini editují akce přes prohlížeč bez přístupu ke kódu.

---

## UI komponenty

### Homepage sekce "Nadcházející akce"

- Umístění: mezi sekcí Služby a sekcí Kde nás najdete
- Zobrazuje 3 nejbližší akce jako karty
- Každá karta obsahuje: datum, barevný štítek typu, název, krátký popis
- Badge "Přihlášky otevřeny" pokud `registration.isOpen === true`
- Odkaz "Zobrazit všechny akce →" na `/akce`

### Stránka `/akce`

**Přepínač pohledu** (pravý horní roh): Seznam | Kalendář

**Filtr podle typu** — row s tlačítky: Vše / Závod / Tábor / Open Gym / Jiné

**Seznam view:**
- Karty seřazené podle data
- Fotka (pokud je), plný popis, odkazy, tlačítko přihlášky

**Kalendář view:**
- Vlastní měsíční grid (bez externí knihovny)
- Dny s akcí jsou vizuálně zvýrazněné
- Klik na den zobrazí detail akce pod gridem
- Navigace mezi měsíci (← →)

**Implementační poznámka:** Přepínač seznam/kalendář a navigace v kalendáři jsou klientské komponenty (`"use client"`). Data dostávají jako prop ze server componentu — žádný client-side fetch ze Sanity.

---

## Co je mimo scope

- Přihlašovací formulář přímo na webu (jen odkaz na externí URL)
- Oddělení akcí podle značky Liberec/Patrman
- Archiv minulých akcí
- Push notifikace nebo emailové upozornění na nové akce
