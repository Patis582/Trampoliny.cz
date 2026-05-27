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

### 4. Intro
- Centered, full-width
- Label (oranžový): "Kdo jsme"
- H2: "Sportovní oddíl s tradicí"
- Velký perex přes celou šířku — úvod o oddílu, oranžový levý border

### 5. Story sekce — střídající se bloky

Každý blok `py-section-padding`, oddělený jemnou čarou, střídavé pozadí (bílá / `bg-surface-container-lowest`).

**Blok 1 — Historie** (`bg-white`)
- Foto závodníka vlevo (6/12) — `object-cover`, vysoký poměr stran
- Text vpravo (6/12): label "Od roku 2009", H3 "Naše historie", 2–3 odstavce o vzniku oddílu

**Blok 2 — Úspěchy** (`bg-surface-container-lowest`)
- Text vlevo (6/12): label "Výsledky", H3 "Naše úspěchy", text o medailích a závodech (MČR, ME)
- Foto týmu vpravo (6/12)

### 6. Grid aktivit (ServiceGrid)
- Label (oranžový): "Co nabízíme"
- H2: "Aktivity Trampolíny Liberec"
- `<ServiceGrid services={services} />` — pouze `brand === "liberec"` ze Sanity (`getServicesByBrand`)
- Pozadí: `bg-white`

### 7. CTA banner
- `bg-border-dark`, full-width
- Text: "Chceš trénovat s námi?"
- Dvě tlačítka: "Jak se přihlásit přes EOS" (oranžové) + "Naši trenéři" (outline bílé)

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
