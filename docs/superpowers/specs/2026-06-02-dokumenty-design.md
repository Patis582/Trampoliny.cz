# Dokumenty ke stažení — Design Spec

## Cíl

Dedikovaná stránka `/dokumenty` s taby pro tři sekce (Trampolíny Liberec, Trampolíny Patrman, Trenéři). Kategorie i dokumenty spravovány v Sanity CMS. Odkaz z patičky webu.

## Architektura

### Sanity schéma — 2 nové typy

**`documentCategory`**
```ts
{
  name: 'documentCategory',
  title: 'Dokumenty — kategorie',
  type: 'document',
  fields: [
    { name: 'title',  type: 'string',  title: 'Název kategorie', required },
    { name: 'brand',  type: 'string',  title: 'Sekce',
      options: { list: ['liberec', 'patrman', 'treneri'] }, required },
    { name: 'order',  type: 'number', title: 'Pořadí', required },
  ]
}
```

**`downloadableDocument`**
```ts
{
  name: 'downloadableDocument',
  title: 'Dokumenty — soubor',
  type: 'document',
  fields: [
    { name: 'title',    type: 'string',    title: 'Název dokumentu', required },
    { name: 'file',     type: 'file',      title: 'Soubor (PDF, DOCX…)', required },
    { name: 'category', type: 'reference', to: [{ type: 'documentCategory' }], required },
    { name: 'order',    type: 'number',    title: 'Pořadí v kategorii', required },
  ]
}
```

Oba typy přidat do `sanity/schemaTypes/index.ts`.

---

### GROQ dotaz

Jeden dotaz vrátí kategorie s vnořenými dokumenty, seřazené:

```groq
*[_type == "documentCategory"] | order(order asc) {
  _id,
  title,
  brand,
  "documents": *[_type == "downloadableDocument" && references(^._id)] | order(order asc) {
    _id,
    title,
    "fileUrl": file.asset->url,
  }
}
```

TypeScript typy:
```ts
export type DocumentFile = {
  _id: string
  title: string
  fileUrl: string
}

export type DocumentCategory = {
  _id: string
  title: string
  brand: 'liberec' | 'patrman' | 'treneri'
  documents: DocumentFile[]
}
```

Funkce `getDocumentCategories(): Promise<DocumentCategory[]>` přidat do `sanity/lib/queries.ts`.

---

### Stránka `app/dokumenty/page.tsx`

Server component — fetchne data, předá do klientského tab-komponentu.

```
app/dokumenty/
  page.tsx          ← server component, metadata, data fetch
  loading.tsx       ← skeleton (hero + tab skeleton)
```

Metadata:
```ts
export const metadata: Metadata = {
  title: "Dokumenty ke stažení",
  description: "Formuláře, souhlasy a dokumenty ke stažení pro Trampolíny Liberec, Trampolíny Patrman a trenéry.",
  alternates: { canonical: "https://trampoliny.cz/dokumenty" },
}
```

---

### Komponenta `components/dokumenty/DokumentyTabs.tsx`

`'use client'` — spravuje aktivní tab pomocí `useState`.

**Props:** `categories: DocumentCategory[]`

**Logika:**
- Rozdělí kategorie podle `brand` do tří skupin
- Výchozí aktivní tab: `'patrman'` (nejširší veřejná sekce) — pokud jsou dostupné obě, jinak první neprázdná
- Pro každou kategorii v aktivním tabu renderuje sekci s dokumenty

---

### Sitemap

Přidat `/dokumenty` do `app/sitemap.ts` jako statickou routu s `priority: 0.6, changeFrequency: "monthly"`.

---

## Vizuální design

### Hero sekce
Tmavý navy background — stejný vzor jako `/cenik`:
```
[brand accent label] PRÁVNÍ & ADMIN
DOKUMENTY
[podtitulek] Formuláře a dokumenty ke stažení
```

### Taby
Tři tlačítka pod hero, zarovnaná vlevo:

| Tab | Accent barva aktivního stavu |
|-----|------------------------------|
| Trampolíny Liberec | `bg-brand-orange text-white` |
| Trampolíny Patrman | `bg-brand-green text-border-dark` |
| Trenéři | `bg-brand-navy-deep text-white` (s border) |

Neaktivní taby: `border border-white/20 text-white/60 hover:text-white`.

### Obsah tabu
Pro každou kategorii v aktivním tabu:

```
── [NÁZEV KATEGORIE] ────────────────── (accent barva dělítko)

  📄 Název dokumentu                    [Stáhnout →]
  📄 Název dokumentu 2                  [Stáhnout →]
```

- Kategorie nadpis: `font-label-bold uppercase tracking-widest text-[11px]` ve white/50
- Dělítko: 1px linka v brand barvě aktivního tabu
- Dokument řádek: flex justify-between, hover: `bg-white/5`, padding `py-4`
- PDF ikonka: SVG (inline, `w-4 h-4 text-white/40`)
- „Stáhnout →" button: `target="_blank" rel="noopener noreferrer"`, `font-label-bold text-[10px] uppercase tracking-widest` v accent barvě

### Loading skeleton
Hero skeleton (dark) + 3 tab skeleton buttons + 4 document row skeletons s `animate-pulse`.

---

## Footer update

V `components/layout/Footer.tsx`, sekce „Právní informace" — přidat „Dokumenty" jako nový link do existujícího pole:

```tsx
["Dokumenty", "/dokumenty"],
["Ochrana soukromí", "#"],       // zůstává jako placeholder
["Všeobecné podmínky", "#"],     // zůstává jako placeholder
["Mapa stránek", "#"],           // zůstává jako placeholder
```

Pouze přidat řádek „Dokumenty" — ostatní linky neměnit.

---

## Soubory ke změně / vytvoření

| Soubor | Akce |
|--------|------|
| `sanity/schemaTypes/documentCategory.ts` | Vytvořit |
| `sanity/schemaTypes/downloadableDocument.ts` | Vytvořit |
| `sanity/schemaTypes/index.ts` | Přidat oba typy |
| `sanity/lib/queries.ts` | Přidat `DocumentFile`, `DocumentCategory` typy + `getDocumentCategories()` |
| `app/dokumenty/page.tsx` | Vytvořit |
| `app/dokumenty/loading.tsx` | Vytvořit |
| `components/dokumenty/DokumentyTabs.tsx` | Vytvořit |
| `app/sitemap.ts` | Přidat `/dokumenty` do statických rout |
| `components/layout/Footer.tsx` | Přidat „Dokumenty" link |
