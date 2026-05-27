# Trampolíny Liberec — Page Design Spec

## Goal

Vytvořit stránku `/trampoliny-liberec` — plnohodnotnou brand page závodního oddílu Trampolíny Liberec, která prezentuje historii, úspěchy a aktivity oddílu.

## Architecture

Server Component (`app/trampoliny-liberec/page.tsx`), data ze Sanity přes `getServicesByBrand("liberec")`. Hero slideshow jako Client Component (stejný pattern jako `HeroSlideshow` na homepage). Ostatní sekce statické — obsah bude doplněn přímo v kódu.

**Tech Stack:** Next.js App Router, Tailwind CSS v4, Sanity (services), `components/layout/Nav`, `components/layout/Footer`, `components/services/ServiceGrid`

---

## Sekce (shora dolů)

### 1. Nav
Sdílený `<Nav />` fixed nahoře. Položka "Oddíl" v navu odkazuje na `/trampoliny-liberec`.

### 2. Hero — slideshow
- Fotky z `/public`: hero.jpg + další fotky Orionky (pojmenovány `orionka-1.jpg`, `orionka-2.jpg` atd. — uživatel doplní)
- Client Component `LiberecHeroSlideshow` — stejný pattern jako `HeroSlideshow.tsx` (Ken Burns, 12s animace, 7s interval, 1.5s crossfade)
- Přes foto: tmavý gradient (stejný jako homepage hero)
- Obsah nad fotkou:
  - Oranžový badge: "Trampolíny Liberec"
  - H1: "Závodní oddíl" (velký, uppercase, bílý)
  - Perex: "Výkonnostní trénink, závody a přípravky pro děti i dospělé v TC Orionka v Liberci."

### 3. Stats band
Tmavý (`bg-border-dark`) pruh, 3 sloupce rozdělené svislou čarou:

| Label | Hodnota |
|---|---|
| Závodníků | 100+ |
| Medailí | 300+ |
| Trénujeme od roku | 2009 |

### 4. O oddílu (hlavní obsah)
Layout: 2 sloupce `lg:grid-cols-12` — obsah (8) + sidebar (4), stejný pattern jako detail aktivity.

**Levý sloupec — story:**
- Label (oranžový): "Kdo jsme"
- H2: "Sportovní oddíl s tradicí"
- Lead odstavec s oranžovým levým borderem: úvod o oddílu
- 2–3 odstavce: historie, úspěchy závodníků (Mistrovství ČR, Evropy), co nabízíme
- 4 ikony / highlights ve 2×2 gridu:
  - Závodní tréninky
  - Závody (oblastní, národní, mezinárodní)
  - Přípravky pro děti od 5 let
  - Parkour

**Pravý sloupec — sidebar (sticky):**
- Info box: Lokalita (TC Orionka, Liberec – Harcov), Telefon, Email
- Embedded Google mapa Orionky
- Tlačítko "Jak se přihlásit přes EOS" → `/jak-na-eos`
- Tlačítko "Naši trenéři" → `/treneri`

### 5. Grid aktivit
- Label (oranžový): "Co nabízíme"
- H2: "Aktivity Trampolíny Liberec"
- `<ServiceGrid services={services} />` — pouze `brand === "liberec"` ze Sanity
- Pozadí: `bg-surface-container-lowest`

### 6. Footer
Sdílený `<Footer />`

---

## Propojení

- `components/layout/Nav.tsx` — změnit `"Oddíl"` link z `/#oddil` na `/trampoliny-liberec`
- `app/page.tsx` — sekce "Kdo jsme": Trampolíny Liberec blok obalit do `<Link href="/trampoliny-liberec">`
- `sanity/lib/queries.ts` — přidat `getServicesByBrand(brand)` funkci

---

## Nové soubory

- `app/trampoliny-liberec/page.tsx` — Server Component, hlavní stránka
- `components/layout/LiberecHeroSlideshow.tsx` — Client Component, slideshow hero

## Upravované soubory

- `components/layout/Nav.tsx` — update link "Oddíl"
- `app/page.tsx` — přidat Link na Liberec blok v "Kdo jsme"
- `sanity/lib/queries.ts` — přidat `getServicesByBrand`
