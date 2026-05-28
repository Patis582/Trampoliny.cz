# Ceník — Design Spec

## Goal

Stránka `/cenik` zobrazuje přehledné cenové tabulky pro obě haly a tréninky. Data spravována přes Sanity CMS, PDF soubory ke stažení.

## Architecture

Server Component stránka (`app/cenik/page.tsx`) fetchuje 3 `pricingSection` dokumenty ze Sanity. Každý dokument obsahuje skupiny cen s řádky. Stránka je staticky generovaná s ISR revalidací.

**Tech Stack:** Next.js App Router, Sanity CMS, Tailwind CSS v4, ISR

---

## Tři sekce stránky

### 1. Trampolínové centrum Orionka
- Platnost od: 1.8.2025
- PDF: `Cenik-od-1_8_2025-verejnost-2.pdf`
- Skupiny cen:
  - **Vstupné** (HALA A+B, max 2 hodiny) — 1 sloupcová tabulka
  - **Dětské skupiny včetně trenéra** — 3 sloupce (60 min / 90 min / 120 min)
  - **Trenér pro jednotlivce nebo skupiny** — 3 sloupce
  - **Narozeninové oslavy** — 1 sloupec
  - **Rodiče a děti** — 1 sloupec

### 2. Trampolínová hala Nádraží
- Platnost od: 1.9.2025
- PDF: `cenik-Nadrazi-2025.pdf`
- Skupiny cen:
  - **Vstupné** — 3 sloupce (60 min / 90 min / 120 min)
  - **Dětské skupiny včetně lektora** — 3 sloupce
  - **Pronájem haly** — 3 sloupce
  - **Dětské oslavy narozenin** — 1 sloupec
  - **Rodiče a děti** — 1 sloupec

### 3. Tréninky & kroužky 2025/26
- Platnost od: 1.9.2025
- PDF: `cenik-2025_26-TL.pdf`
- Skupiny cen:
  - **Kroužky** — 4 sloupce (Hala / Frekvence / Délka / Cena za pololetí)
  - **Závodní družstva** — 2 sloupce (Frekvence / Cena za pololetí)
  - **Slevy** — info blok (bez tabulky)

---

## Sanity Schema: `pricingSection`

Nový typ dokumentu `pricingSection` v `sanity/schemaTypes/pricingSection.ts`.

### Struktura:

```
pricingSection
  title: string (required)           — "Trampolínové centrum Orionka"
  slug: slug (source: title, req.)   — "orionka" / "nadrazi" / "treninky"
  validFrom: string                  — "od 1.8.2025"
  pdf: file                          — PDF ke stažení
  pdfLabel: string                   — "Stáhnout ceník PDF"
  note: string (optional)            — poznámka pod sekcí (např. "Ceny jsou uvedeny včetně DPH")
  groups: array of pricingGroup
    pricingGroup (object):
      title: string (required)       — "Vstupné"
      subtitle: string (optional)    — "HALA A+B, max 2 hodiny"
      columnHeaders: array of string — ["VSTUP"] nebo ["60 min", "90 min", "120 min"]
      rows: array of pricingRow
        pricingRow (object):
          label: string (required)   — "dospělí"
          note: string (optional)    — "po předložení průkazu"
          highlight: boolean         — false (zvýraznění řádku)
          values: array of string    — ["250 Kč"] nebo ["150 Kč", "180 Kč", "200 Kč"]
      infoBlock: text (optional)     — volný text místo tabulky (pro Slevy sekci)
  order: number (required)           — pořadí sekcí: 1=Orionka, 2=Nádraží, 3=Tréninky
```

---

## Přednastavená data v Sanity

Data k ručnímu zadání při prvním spuštění studia:

### Sekce 1: Orionka (slug: `orionka`, order: 1)

**Vstupné** (subtitle: "HALA A+B, max 2 hodiny", columns: ["VSTUP"]):
| Label | Note | Value |
|---|---|---|
| děti do 2 let | | zdarma |
| děti od 3 do 5 let | | 150 Kč |
| děti od 6–15 let | | 190 Kč |
| studenti 15–26 let | po předložení průkazu | 190 Kč |
| osoba 18+ | | 250 Kč |
| senioři 65+ | | 150 Kč |
| aktivní/pasivní doprovod pro děti do 10 let | | 150 Kč |
| osoba čekající v recepci nebo tribuně | | zdarma |

**Dětské skupiny včetně trenéra** (columns: ["60 min", "90 min", "120 min"]):
| Label | Note | 60 min | 90 min | 120 min |
|---|---|---|---|---|
| do 20 osob | min.cena 1600/2200/2700 Kč | 150 Kč/os | 210 Kč/os | 250 Kč/os |
| 21 a více osob | | 130 Kč/os | 180 Kč/os | 230 Kč/os |

**Trenér pro jednotlivce nebo skupiny** (columns: ["60 min", "90 min", "120 min"]):
| Label | 60 min | 90 min | 120 min |
|---|---|---|---|
| Trenér | 350 Kč | 500 Kč | 600 Kč |
| Trenér specialista | dle dohody | dle dohody | dle dohody |

**Narozeninové oslavy** (subtitle: "90 min tělocvična + 45 min recepce", columns: ["CENA"]):
| Label | Note | Value |
|---|---|---|
| Narozeninová oslava | max 12 dětí, každé další +300 Kč | 2 990 Kč |

**Rodiče a děti** (columns: ["CENA/HOD"]):
| Label | Value |
|---|---|
| 1 dítě s doprovodem (1 osoba) | 140 Kč |
| 1 sourozenec | 50 Kč |
| 1 další doprovod | 50 Kč |
| dítě do 1 roku | zdarma |

note: "Ceny jsou uvedeny včetně DPH"

---

### Sekce 2: Nádraží (slug: `nadrazi`, order: 2)

**Vstupné** (columns: ["60 min", "90 min", "120 min"]):
| Label | Note | 60 min | 90 min | 120 min |
|---|---|---|---|---|
| dospělí | | 150 Kč | 180 Kč | 200 Kč |
| děti od 6–15 let | | 100 Kč | 140 Kč | 170 Kč |
| studenti 15–26 let | po předložení průkazu | 100 Kč | 140 Kč | 170 Kč |
| senioři 65+ | | 80 Kč | 100 Kč | 120 Kč |
| dítě do 5 let | při doprovodu dospělé platící osoby | zdarma | zdarma | zdarma |
| doprovod čekající v recepci | | zdarma | zdarma | zdarma |

**Dětská skupina vč. lektora** (columns: ["60 min", "90 min", "120 min"]):
| Label | Note | 60 min | 90 min | 120 min |
|---|---|---|---|---|
| do 15 osob | min.cena 1300/1800/2000 Kč | 130 Kč/os | 180 Kč/os | 200 Kč/os |
| 16 a více osob | | 100 Kč/os | 150 Kč/os | 180 Kč/os |

**Pronájem haly** (subtitle: "trampolíny, akroba, herna, recepce — max 20 osob", columns: ["60 min", "90 min", "120 min"]):
| Label | 60 min | 90 min | 120 min |
|---|---|---|---|
| Pronájem haly | 1 590 Kč | 1 990 Kč | 2 590 Kč |
| Trenér | dle dohody | dle dohody | dle dohody |

**Dětské oslavy narozenin** (subtitle: "trampolíny, akroba, herna, recepce, lektor", columns: ["CENA"]):
| Label | Note | Value |
|---|---|---|
| Dětská oslava narozenin | do 12 dětí, každé další +300 Kč | 2 790 Kč/2 hod |

**Rodiče a děti** (columns: ["CENA/HOD"]):
| Label | Value |
|---|---|
| 1 dítě s doprovodem (1 osoba) | 140 Kč |
| 1 sourozenec | 50 Kč |
| 1 další doprovod | 50 Kč |
| dítě do 1 roku | zdarma |

---

### Sekce 3: Tréninky (slug: `treninky`, order: 3)

**Kroužky** (columns: ["Hala", "Frekvence", "Délka", "Cena/pololetí"]):
| Label | Hala | Frekvence | Délka | Cena/pololetí |
|---|---|---|---|---|
| Gymnastická přípravka | Orionka | 1× týdně | 90 min | 3 600 Kč |
| Děti na startu (všestrannost) | Nádraží | 1× týdně | 60 min | 3 200 Kč |
| Děti na startu (všestrannost) | Nádraží/Orionka | 1× týdně | 90 min | 3 700 Kč |
| Parkour | Orionka | 1× týdně | 90 min | 3 800 Kč |
| Sportovní kroužek | Orionka/Nádraží | 1× týdně | 90 min | 3 700 Kč |

**Závodní družstva** (columns: ["Frekvence", "Cena/pololetí"]):
| Label | Frekvence | Cena/pololetí |
|---|---|---|
| ZD přípravka | 1× týdně | 3 700 Kč |
| ZD žáci | 2× týdně | 6 500 Kč |
| ZD žáci | 3× týdně | 7 600 Kč |
| ZD junioři A | 3× týdně | 7 900 Kč |
| ZD junioři A | 4× týdně | 9 200 Kč |
| ZD junioři B / ženy a muži B | 2× týdně | 6 500 Kč |
| ZD senioři s Marcelou | 5× týdně | 9 500 Kč |
| ZD senioři s Pavlem | 4× týdně | 8 200 Kč |

**Slevy** (infoBlock):
```
10% sleva u sourozenců
500 Kč sleva na druhý kroužek (neplatí u sourozenecké slevy)
```

note: "Platba je pololetní (září–leden, únor–červen). Kurzovné se platí na základě příkazu k platbě, který dorazí na email po registraci do systému EOS."

---

## Nové soubory

- `sanity/schemaTypes/pricingSection.ts` — Sanity schema
- `app/cenik/page.tsx` — stránka
- `components/pricing/PricingSection.tsx` — sekce s tabulkami
- `components/pricing/PricingTable.tsx` — jednotlivá cenová tabulka

## Změněné soubory

- `sanity/schemaTypes/index.ts` — přidat `pricingSectionType`
- `sanity/lib/queries.ts` — přidat `PricingSection` typ a `getPricingSections()` query
- `components/layout/Nav.tsx` — odkaz "Ceník" změnit z `/#cenik` na `/cenik`

---

## Query

```ts
export type PricingRow = {
  _key: string
  label: string
  note?: string
  highlight?: boolean
  values: string[]
}

export type PricingGroup = {
  _key: string
  title: string
  subtitle?: string
  columnHeaders: string[]
  rows?: PricingRow[]
  infoBlock?: string
}

export type PricingSection = {
  _id: string
  title: string
  slug: string
  validFrom?: string
  pdfUrl?: string
  pdfLabel?: string
  note?: string
  groups: PricingGroup[]
  order: number
}

export async function getPricingSections(): Promise<PricingSection[] | null>
```

GROQ: `*[_type == "pricingSection"] | order(order asc) { _id, title, "slug": slug.current, validFrom, "pdfUrl": pdf.asset->url, pdfLabel, note, groups, order }`

ISR tag: `pricing`

---

## Vzhled stránky

- Stejný pattern jako `/treneri` — plain header (`pt-40`) bez hero
- Sekce odděleny barvou pozadí (střídání white / surface-container-lowest)
- Každá sekce: nadpis + badge "od X.X.XXXX" + cenové tabulky + tlačítko PDF ke stažení
- Tabulka: záhlaví sloupců tučně, řádky s `divide-y`, highlight řádky zvýrazněny jemně
- Na mobilu: horizontální scroll pro vícesloupcové tabulky (`overflow-x-auto`)
- `SectionError` při výpadku Sanity

---

## Error Handling

- `getPricingSections()` vrací `null` → `SectionError`
- `getPricingSections()` vrací `[]` → prázdný stav
- PDF není nahrané → tlačítko ke stažení se nezobrazí
