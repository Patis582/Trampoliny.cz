# Design: Etický kodex — sekce na stránce Trampolíny Liberec

**Datum:** 2026-06-01  
**Status:** Schváleno

---

## Co stavíme

Nová sekce „Etický kodex" na stránce `/trampoliny-liberec` zobrazující etické kodexy tří rolí (sportovec, trenér, rodič) formou přepínacích tabů. Sekce obsahuje tlačítko pro stažení PDF dokumentu se všemi třemi kodexy.

---

## Zdroj obsahu

- Zdrojový soubor: `public/Kodex sportovce trenéra rodiče TL.docx`
- Obsah bude hardcoded v komponentě (dokument se mění jen výjimečně, Sanity CMS je zde zbytečný overhead)
- PDF: konvertováno z .docx pomocí LibreOffice CLI, uloženo jako `public/eticky-kodex-tl.pdf`

---

## Umístění na stránce

`app/trampoliny-liberec/page.tsx` — nová sekce vložena **mezi** sekci Aktivity (`id="aktivity"`) a sekci CTA.

---

## Komponenta

**Soubor:** `components/liberec/EtickyKodex.tsx`  
**Typ:** Client component (`"use client"`) — potřeba `useState` pro přepínání tabů

### Struktura

```
<section> bg-surface-container-lowest
  <div> max-w-container-max, padding
    <ScrollReveal> — nadpis sekce
      label: "Pravidla oddílu"
      h2: "Etický kodex"
    </ScrollReveal>

    <EtickyKodex /> — client component
      [Tab: Sportovec] [Tab: Trenér] [Tab: Rodič]
      ──────────────────────────────────────────
      — položka 1
      — položka 2
      ...
      [Stáhnout kodex (PDF) ↓]
  </div>
</section>
```

### Tab design

- Taby: `display:flex`, borderless, pod celou řadou tabů tenká linka `border-b border-outline`
- Aktivní tab: `border-b-2 border-brand-orange text-border-dark font-black`
- Neaktivní tab: `text-on-surface-variant hover:text-border-dark transition-colors`
- Obsah: seznam bodů, každý `— text` (em-dash + text), font-light, konzistentní se zbytkem webu

### PDF tlačítko

```html
<a href="/eticky-kodex-tl.pdf" download
   class="inline-flex items-center gap-2 border-t-2 border-brand-orange px-6 py-3 ...">
  Stáhnout kodex (PDF)
  <svg><!-- download icon --></svg>
</a>
```

---

## Obsah tabů (ze zdrojového dokumentu)

### Sportovec
- Chovám se slušně, přátelsky a sportovně, v duchu fair play.
- Svým slušným chováním reprezentuji klub nejen na trénincích, ale i ve škole a na veřejnosti.
- Na akce spojené s oddílem oblékám oddílové triko nebo soupravu.
- Plně respektuji své trenéry.
- K majetku a náčiní ve sportovních halách se chovám tak, jako by se jednalo o moje věci.
- V tréninku poslouchám pokynů trenéra a neohrožuji bezpečnost svou ani nikoho jiného.
- V tréninku pracuji naplno.
- Pokud se necítím dobře, informuji o tom svého trenéra.
- Jsem zodpovědný sám za sebe a za své věci.
- Na tréninky chodím včas, pokud nemohu přijít, předem se omluvím.
- Včas potvrzuji nominaci na závody.
- Pokud něčemu nerozumím, nebojím se oslovit svého trenéra.
- Trenéra oslovuji dle dohody, nejlépe: „Trenére" / „Trenérko".
- Sleduji oddílovou aplikaci EOS.

### Trenér
- Jsem si dobře vědom/a toho, že za děti přebírám odpovědnost.
- Dbám na bezpečnost dětí i okolí.
- Respektuji doporučení lékaře, pokud takové je.
- Spoluvytvářím příjemné prostředí, kam se děti rády vrací.
- Vedu děti vlastním příkladem.
- Jsem spravedlivá/ý a jsem pro děti vzorem.
- Na tréninky chodím včas a pečlivě se na ně připravuji.
- Jsem jim příkladem ve všem (nosím oddílové oblečení, nenošuji řetízky, nežvýkám apod.).
- Před zahájením tréninku zkontroluji, že cvičební plochy a trampolíny jsou bezpečně zajištěny.
- Sportovní pomůcky mnou použité vracím na místo jim určené.
- Udržuji pořádek v tělocvičnách.
- Učím děti, že pravidla jsou vzájemnou dohodou, kterou nikdo nemůže porušovat.
- Jsem velkorysá/ý, co se pochvaly týče. Svěřence neurážím, neshazuji a nevysmívám se jim.
- Na děti nekřičím. Na druhou stranu jsem přísná/ý a mám přiměřené nároky.
- Vedu děti tak, aby je pohyb naplňoval a přinášel jim radost.
- Snažím se předat co nejvíce ze svých znalostí a zkušeností, zároveň trénuji formou zábavy.
- Beru ohled na cíle a motivace každého jedince.
- Stále pracuji na svém rozvoji, absolvuji trenérské kurzy a semináře.
- Vyžaduji zpětnou vazbu a umím ji přijmout. Nikdo se nesmí bát za mnou přijít.
- Snažím se o optimální souhru trojúhelníku sportovec – trenér – rodič.
- Informuji rodiče i vedení oddílu o všem nezbytném.

### Rodič
- Společně s trenéry jsme partnery, kteří děti vedou a učí.
- Respektuji rozhodnutí trenéra.
- Nezpochybňuji autoritu trenéra před dítětem.
- Pokud je v tělocvičně trenér, nevyjadřuji se negativně k situacím.
- Neradím — cílem je, aby si děti dokázaly poradit samy a vnímaly pokyny trenéra.
- Trenérům důvěřuji.
- Nevyjadřuji se negativně k ostatním závodníkům při závodech.
- Snažím se podporovat zdravé sportovní prostředí.
- Fandím a podporuji své dítě.
- Trénink by neměl být trestem za nevhodné chování.
- Dbám na správnou životosprávu dítěte, stravu, pitný režim a spánek.
- Šířím dobré jméno oddílu.
- Pokud mám výhrady, řeším to s hlavním trenérem nebo vedením oddílu.
- Plním včas své závazky (náklady na sportovní přípravu, závody a oddílové akce).
- Sleduji klubové nástěnky, web a klubovou aplikaci.

---

## PDF konverze

```bash
libreoffice --headless --convert-to pdf \
  "public/Kodex sportovce trenéra rodiče TL.docx" \
  --outdir public/
# Přejmenovat výstup na eticky-kodex-tl.pdf
```

Výsledný soubor: `public/eticky-kodex-tl.pdf`

---

## Co se nemění

- Žádné změny v Sanity schématu
- Žádné nové routy
- Ostatní sekce stránky Liberec zůstávají beze změny
