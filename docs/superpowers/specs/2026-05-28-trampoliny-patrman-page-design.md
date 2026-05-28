# Trampolíny Patrman Page — Design Spec

## Goal

Vytvořit stránku `/trampoliny-patrman` pro komerční brand Trampolíny Patrman. Cíl: ukázat atmosféru, představit aktivity a navést návštěvníka ke konkrétní službě nebo kontaktu.

## Architecture

Server Component `app/trampoliny-patrman/page.tsx`. Fotky z `/public`, služby z Sanity přes `getServicesByBrand("patrman")`. Nový Client Component `PatrmanHeroSlideshow` podle vzoru `LiberecHeroSlideshow`. Akcent barva: `brand-green` / `on-tertiary-container`.

---

## Sekce (shora dolů)

### 1. Hero Slideshow

Fullscreen slideshow, stejný pattern jako `LiberecHeroSlideshow`.

**Fotky (4):**
- `hero-patrman-33.jpg` — backflip do foam pitu (dramatické, barevné)
- `hero-patrman-25.jpg` — děti skáčou na trampolíně
- `hero-patrman-14.jpg` — trenér zvedá holčičku, velký úsměv
- `hero-patrman-10.jpg` — trenér s batoletem na trampolíně

**Gradient:** `bg-gradient-to-r from-black/75 via-black/30 to-transparent` + `bg-gradient-to-t from-black/40 via-transparent to-transparent`

**Hero text (vlevo):**
- Eyebrow: `Trampolínová hala Nádraží · Liberec`
- H1: `Zábava` / `bez hranic`
- Subtext: `Kroužky, tábory, oslavy i volné skákání. Pro každého od 1 roku.`
- CTA button: `Naše služby` (scroll na #sluzby)

---

### 2. Kdo jsme (intro)

Dvousloupcový layout: fotka vlevo, text vpravo. Stejný vzor jako sekce "Histoire" na Liberec stránce.

**Fotka:** `hero-patrman-1.jpg` (trenér zvedá holčičku na podlaze — teplá, osobní)  
**Aspect ratio:** `aspect-[3/2]`

**Text:**
```
Trampolíny Patrman provozuje Miroslav Patrman v Liberci od roku 2009.
Začínali jsme s jednou halou a hrstkou nadšených dětí — dnes
každý týden přivítáme stovky dětí od jednoho roku až po dospělé.

Naším cílem není vychovat závodníky, ale dát každému dítěti
radost z pohybu, sebevědomí a bezpečné prostředí kde se mohou
posouvat svým vlastním tempem.
```

---

### 3. Galerie — "Jak to u nás vypadá"

Nadpis: `Jak to u nás vypadá`

**Layout:** 4 fotky vedle sebe v řadě, každá offsetnutá vertikálně pomocí `translateY` — lichá vlevo nahoru, sudá vlevo dolů. Efekt: přirozené, živé, nesymetrické.

Konkrétní offsets (aplikované přes inline style nebo Tailwind `-translate-y-*`):
- Foto 1: `translateY(0px)`
- Foto 2: `translateY(32px)`
- Foto 3: `translateY(-16px)`
- Foto 4: `translateY(24px)`

Pod tím druhá řada 4 fotek se zrcadlovými offsety.

**Fotky (8 celkem):**
1. `hero-patrman-6.jpg` — barevný padák s dětmi (landscape)
2. `hero-patrman-14.jpg` — trenér zvedá holčičku (portrait)
3. `hero-patrman-22.jpg` — velká skupina batolat v hale (landscape)
4. `hero-patrman-28.jpg` — teenager backflip (portrait)
5. `hero-patrman-4.jpg` — děti s míči a tunelem (landscape)
6. `hero-patrman-30.jpg` — trenér s klukem na žíněnkách (portrait)
7. `hero-patrman-19.jpg` — starší děti na koberci (landscape)
8. `hero-patrman-25.jpg` — děti skáčou v řadě (portrait)

Každá fotka: `object-cover`, zaoblené rohy `rounded-sm`, pevná výška v rámci řady (landscape ~240px, portrait ~320px).

---

### 4. Naše služby

`id="sluzby"` — ServiceGrid filtrovaný na `brand: "patrman"`.

Nadpis: `Co u nás najdeš`, label: `Aktivity` (brand-green)

---

### 5. CTA Banner

Tmavé pozadí (`bg-brand-navy-deep`), nadpis, dva kontakty vedle sebe — bez kategorií, jen jméno + telefon + email.

**Kontakty:**
- Kamila Brücklérová — +420 720 987 654 — kamilabrucklerova@gmail.com
- Klára Patrmanová — +420 731 123 456 — pripravky@trampoliny-liberec.cz

---

## Nové soubory

| Soubor | Akce |
|---|---|
| `components/layout/PatrmanHeroSlideshow.tsx` | Create — slideshow pro Patrman hero |
| `app/trampoliny-patrman/page.tsx` | Create — hlavní stránka |

## Upravované soubory

Žádné.

---

## Barvy

- Akcent: `text-on-tertiary-container` / `border-on-tertiary-container` (stejné jako Patrman badge)
- Hero CTA button: `bg-on-tertiary-container` nebo `bg-brand-green`
- Label tagy: `text-brand-green`
