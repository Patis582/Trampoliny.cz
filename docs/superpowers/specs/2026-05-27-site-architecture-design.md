# Trampolíny Liberec & Patrman — Site Architecture Design

## Goal

Definovat kompletní strukturu webu trampoliny.cz včetně všech stránek, navigace, Sanity schémat a propojení mezi stránkami.

## Stav ke dni návrhu

Hotovo:
- `/` — Homepage (hero slideshow, kdo jsme, grid aktivit, kontakt sekce)
- `/aktivity/[slug]` — Detail aktivity napojený na Sanity
- `/studio` — Sanity Studio

---

## Navigace

Hlavní nav (`components/layout/Nav.tsx`) se aktualizuje:

| Položka | Cíl | Poznámka |
|---|---|---|
| Oddíl | `/trampoliny-liberec` | Dnes `/#oddil` |
| Služby | `/trampoliny-patrman` | Dnes `/#sluzby` |
| Akce | `/akce` | Nová položka |
| Ceník | `/cenik` | Dnes `/#cenik` |
| Kontakt | `/#kontakt` | Zůstává scroll na homepage |

---

## Stránky

### `/trampoliny-liberec`
- Hero s fotkou haly Orionka
- Krátký popis závodního oddílu
- Grid aktivit filtrovaný na `brand === "liberec"` (kroužky, závodní oddíl, přípravky, parkour)
- Odkaz na `/treneri` a `/jak-na-eos`

### `/trampoliny-patrman`
- Hero s fotkou haly Nádraží
- Krátký popis komerčních služeb
- Grid aktivit filtrovaný na `brand === "patrman"` (oslavy, tábory, workshopy, volné skákání, open gym)
- Odkaz na `/treneri`

### `/akce`
- Seznam / kalendářové zobrazení akcí z Sanity (`event` schema)
- Filtry: datum (range), typ akce (závody, kempy/tábory, workshopy, ostatní)
- Každá akce: název, datum, typ, popis, odkaz na registraci
- Data ze Sanity, ISR revalidace

### `/cenik`
- Dvě sekce: Trampolíny Liberec + Trampolíny Patrman
- Každá aktivita má cenu — buď staticky na stránce nebo jako pole v Sanity service schema
- Ke stažení: PDF ceníky (soubory z Sanity)

### `/treneri`
- Grid karet trenérů
- Každá karta: fotka, jméno, badge značky (Liberec/Patrman), krátký popis, email/telefon
- Data ze Sanity (nový `trainer` schema typ)
- Linked ze sidebar na `/aktivity/[slug]`

### `/galerie`
- Fotogalerie obou hal a akcí
- Data ze Sanity (nový `gallery` schema typ nebo pole na existujícím)
- Lightbox pro zobrazení fotek

### `/jak-na-eos`
- Statická stránka — krok za krokem návod na registraci přes EOS systém
- Linked ze sidebar aktivit s typem registrace `eos`

---

## Sanity — nová schémata

| Schema | Pole |
|---|---|
| `trainer` | name, slug, brand, photo, bio, email, phone, order |
| `galleryImage` | image, alt, caption, brand, date |
| `event` | title, date, endDate, type (závody/tábory/workshopy/ostatní), description, registrationUrl, image |

Schéma `event` již existuje — zkontrolovat a případně rozšířit o pole `type` s výše uvedenými hodnotami.

---

## Pořadí implementace (doporučené)

1. `/trampoliny-liberec` + `/trampoliny-patrman` — brand pages (využívají existující `service` data)
2. Nav update — přepnout links
3. `/treneri` — nový Sanity schema + stránka
4. `/cenik` — statická nebo Sanity
5. `/akce` — kalendář s filtry
6. `/galerie` — fotogalerie s lightboxem
7. `/jak-na-eos` — statická stránka

---

## Sdílené komponenty (existující)

- `components/layout/Nav.tsx` — bude aktualizován
- `components/layout/Footer.tsx` — beze změny
- `components/services/ServiceGrid.tsx` — použit na brand pages s filtrováním

## Sdílené komponenty (nové)

- `components/services/FilteredServiceGrid.tsx` — ServiceGrid s prop `brand` pro filtrování
